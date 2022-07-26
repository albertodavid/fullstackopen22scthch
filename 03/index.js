const express = require('express')
const app = express()
const morgan = require('morgan')
const port = 3001

app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res.body' ));



let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/persons', (req, res) => {
  res.send(persons)
})

app.get('/info', (req, res) => {
  res.send(`Phonebook has: ${persons.length}, ${new Date().toUTCString()}`)
})

app.get('/api/persons/:id', (req, res) => {
  
    const id = Number(req.params.id)
    console.log(id);
    const person = persons.find(persona => persona.id===id)

    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }

})


app.delete('/api/persons/:id', function(req, res) {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end();
});

app.post('/api/persons', function (req, res) {
    const person = req.body
    console.log(req.body)

    person.id = persons.length + 1 
    

    if(!person.name || !person.number ){
        console.log("Número o nombre faltante");
        res.status(400).end()
    }else{
        const exist = persons.find(x => x.name == person.name )
        if(exist){
            res.status(404).end()
        }else{
            persons = persons.concat(person)
            res.json(person)
    }
}                   
})

app.listen(port, () => console.log(`Phonebook app listening on port ${port}!`))