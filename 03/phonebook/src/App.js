import { useState, useEffect } from "react";
import personService from "./services/communication";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  const handleInputButton = (event) => {
    event.preventDefault();

    if (persons.find((e) => e.name === newName) !== undefined) {
      
      if(window.confirm("The person is in the list, do you want to change the number?")===true){
        
        const id = persons[persons.indexOf(newName)+1].id

        personService.update(id, {name: newName, number:newNumber});

        const updated = persons.map(x => {
          if(x.id === id)
          return {name: newName, number:newNumber, id:id}
          else{
            return x
          }
        })

        console.log(updated);

        setPersons(updated)
      }

    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      personService.create({ name: newName, number: newNumber, id:persons.length()+1 }).then((res) => {
        console.log(res);
      });
    }
  };

  const handDelete = (x) => {
    personService.deletePost(x.id);
    setPersons(persons.slice(persons.indexOf(x) + 1));
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter:{" "}
          <input onChange={(event) => setNewFilter(event.target.value)} />
        </div>
        <div>
          name: <input onChange={(event) => setNewName(event.target.value)} />
          number:{" "}
          <input onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit" onClick={handleInputButton}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {newFilter === ""
        ? persons.map((x) => (
            <div key={x.id}>
              <p key={x.id}>
                {x.name} {x.number}
              </p>
              <button onClick={() => handDelete(x)}>Delete entry</button>
            </div>
          ))
        : persons
            .filter((x) =>
              x.name.toLowerCase().includes(newFilter.toLowerCase())
            )
            .map((x) => (
              <div key={x.id}>
                <p>
                  {x.name} {x.number}
                </p>
                <button onClick={() => personService.deletePost(x.id)}>
                  Delete entry
                </button>
              </div>
            ))}
    </div>
  );
};

export default App;
