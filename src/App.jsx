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

  const findPerson = ( name ) => {
    return persons.some(person => person.name === name);
  }

  const getPerson = ( name ) => {
    return persons.find(person => person.name === name);
  }

  const createPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: (persons.length +  1).toString()
    }

    if(findPerson(personObject.name)){
      const existingPerson = getPerson(personObject.name)
      console.log(existingPerson)
      if(existingPerson && personObject.number !== existingPerson.number){
        if(window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
          updatePerson(existingPerson.id, personObject)
        }
      } else {
        console.log(personObject)
        alert(`${personObject.name} is already added to phonebook`)
      }
    } else {
      personServices
        .create(personObject)
        .then(returnedPerson => {
          console.log(returnedPerson)
          console.log('Person added')
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.error('Error creating person:', error);
        })
    }
  }

  const updatePerson = (id, updatedPerson) => {
    personServices.update(id, updatedPerson)
      .then(updatedPersonData => {
        console.log('Person updated:', updatedPersonData);
      })
      .catch(error => {
        console.error('Error updating person:', error);
      });
  }

  const deletePerson = (id) => {
    if(window.confirm(`Delete ${id}`)){
      personServices
        .deleteObject(id)
        .then(deleteObject => {
          console.log('Person deleted')
          console.log(deleteObject)
        })
        .catch(error => {
          console.error('Error deleting person:', error);
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
