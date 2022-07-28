const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

const port = 3001
const pwd = ""

app.use(express.json())

const url =
  `mongodb+srv://alberto:${pwd}@cluster0.e0pkqeg.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  date: Date,
  number: String,
})

const Notes = mongoose.model('Notes', contactSchema)

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/persons', (req, res) => {
    Notes.find({}).then(x => {
        console.log(x)
        res.json(x)
      })
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