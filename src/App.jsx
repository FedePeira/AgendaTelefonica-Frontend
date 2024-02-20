import { useState, useEffect } from 'react'
import personServices from './services/persons'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import Persons from './components/Persons'

// Componente App
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setNewFilterName] = useState('')

  // Metiendo los datos de las personas del servidor al useState([]) de App
  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        console.log('Persons available')
        setPersons(initialPersons)
      })
      .catch(error => {
        console.error('Error trying to get persons: ', error);
      })
  }, [])


  const filterPersons =  filterName === '' ? persons : persons.filter(person => person.name.includes(filterName))

  const findPerson = ( id ) => {
    return persons.some(person => person.id === id);
  }

  const createPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: (persons.length +  1).toString()
    }

    if(!findPerson(personObject.id)){
      personServices
      .create(personObject)
      .then(returnedPerson => {
        console.log(returnedPerson)
        console.log('Person added')
        setNewName('')
        setNewNumber('')
      })      
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const deletePerson = (id) => {
    if(window.confirm(`Delete ${id}`)){
      personServices
        .deleteObject(id)
        .then(deleteObject => {
          console.log('Person deleted')
          console.log(deleteObject)
        })
    } 
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilterName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
        <Filter 
        value={filterName} 
        handleChange={handleFilterChange}/>
      <h3>Add a New</h3>
        <PersonsForm 
        valueName={newName}
        handleNameChange={handleNameChange}
        valueNumber={newNumber}
        handleNumberChange={handleNumberChange}
        createPerson={createPerson}/>
      <h3>Persons</h3>
        <Persons 
        array={filterPersons}
        deletePerson={deletePerson}/>
    </div>
  )
}

export default App
