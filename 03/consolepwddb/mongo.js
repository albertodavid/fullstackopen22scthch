const mongoose = require('mongoose')

if (process.argv.length < 5 && process.argv.length != 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://alberto:${password}@cluster0.e0pkqeg.mongodb.net/?retryWrites=true&w=majority
`

const contactSchema = new mongoose.Schema({
  name: String,
  date: Date,
  number: String,
})

const Contact = mongoose.model('Note', contactSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')

    if (process.argv.length === 3) {
      Contact.find({}).then(result => {
        result.forEach(contact => {
          console.log(contact)
        })
        mongoose.connection.close()
      })}else{

    const contact = new Contact({
      name: process.argv[3],
      date: new Date(),
      number: process.argv[4],
    })

    return contact.save()
  }})
  .then(() => {
    console.log('contact saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))

