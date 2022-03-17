import React, { useEffect, useState } from 'react'
import Notification from './components/Notification.js'
import Nameform from './components/Nameform.js'
import Content from './components/Content.js'
import Filter from './components/Filter.js'
import phonebookService from './services/PhonebookService.js'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    phonebookService.getAll().then(data => {
      setPersons(data)
    })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterStr, setNewFilterStr] = useState('')
  const [notif, setNotif] = useState(null)

  const setNotifHelper = (message, isError) => {
    setNotif({ message, isError })
    setTimeout(() => setNotif(null), 5000)
  }

  const setFilter = (e) => {
    setNewFilterStr(e.target.value)
  }

  const submitName = (e) => {
    e.preventDefault()
    const filtered = persons.filter(p => p.name === newName || p.number == newNumber)
    const newPerson = {name: newName, number: newNumber, id: persons.length + 1}

    if (filtered.length == 0) {
      phonebookService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotifHelper(`${newPerson.name} was added to the phonebook`, false)
        })
        .catch(error  => {
          if (error.response) {
            setNotifHelper(`Failed to add ${newPerson.name} to the phonebook: ${error.response.data.error}`, true)
          } else {
            setNotifHelper(`Failed to add ${newPerson.name}, something went wrong with the server`, true)
          }
        })

      return
    }

    if (filtered[0].name === newName) {
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
        newPerson.id = filtered[0].id
        phonebookService.update(filtered[0].id, newPerson)
          .then(() => {
            setPersons(persons.map((p) => {
              if (p.id != filtered[0].id) {
                return p
              }

              const updatedPerson = { ...p, number: newNumber }
              return updatedPerson
            }))
          })
          .catch((err) => {
            console.log(err.response)
            if (err.response && err.response.status === 404) {
              setNotifHelper(`${newPerson.name} has already been removed from the server`, true)
              return
            }
            
            setNotifHelper(`Failed to update ${newPerson.name}, something went wrong with the server`, true)
          })
      }

      return
    }
    
    setNotifHelper(`Number '${newNumber}' is already registered to ${filtered[0].name}!`, true)
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService.del(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id != id))
        })
        .catch((err) => {
          console.log(`Failed to delete ${name}`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notif={notif} />
      <Filter onFilterChange={setFilter} />
      <h3>Numbers</h3>
      <Content persons={persons} filter={newFilterStr} deleteCallback={deletePerson} />
      <h2>Add a new number</h2>
      <Nameform name={newName} setName={setNewName} setNumber={setNewNumber} submitCallback={submitName} />
    </div>
  )
}

export default App