import { useState, useEffect } from 'react'
import personServices from './services/persons'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import Persons from './components/Persons'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'

// Componente App
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setNewFilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        console.log('Persons available')
        setSuccessMessage('Person available')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
        setPersons(initialPersons)  
      })
      .catch(error => {
        setErrorMessage('Error trying to get persons')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        console.error(error);
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
          setSuccessMessage('Person created')
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage('Error trying to create person')
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          console.error(error);
        })
    }
  }

  const updatePerson = (id, updatedPerson) => {
    personServices.update(id, updatedPerson)
      .then(updatedPersonData => {
        console.log('Person updated:', updatedPersonData);
        setSuccessMessage('Person updated')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
      .catch(error => {
        setErrorMessage('Error trying to update person')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        console.error(error);
      })
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
          setErrorMessage('Error trying to delete persons')
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          console.error(error);
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
      <ErrorNotification message={errorMessage}/>
      <SuccessNotification message={successMessage}/>
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
