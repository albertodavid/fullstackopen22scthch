import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5500/db.json")
      .then(res => {
        setPersons(res.data.persons)
      })
  
  }, []);
  

  const handleInputButton = (event) => {
    event.preventDefault();

    if (persons.find((e) => e.name===newName) !== undefined) {
      alert(`${newName} is already added to phonebook`)
    }else{
      setPersons(persons.concat({name: newName, number: newNumber}))
    }    
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter: <input onChange={(event) => setNewFilter(event.target.value)} />
        </div>
        <div>
          name: <input onChange={(event) => setNewName(event.target.value)} />
          number: <input onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit" onClick={handleInputButton}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {newFilter === "" 
        ? persons.map((x) => <p key={x.name}>{x.name} {x.number}</p>) 
        : persons.filter(x => x.name.toLowerCase().includes(newFilter.toLowerCase())).map((x) => <p key={x.name}>{x.name} {x.number}</p>) }
    </div>
  )
}

export default App