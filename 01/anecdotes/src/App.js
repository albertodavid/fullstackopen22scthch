import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [anec, setAnec] = useState([0,0,0,0,0,0,0])
  let temp = []

  return (
    <div>
      {anecdotes[selected]}
      <button onClick={()=>setSelected(Math.floor(Math.random() * 6))}>Next!</button>
      <button onClick={()=>{
        temp = [...anec]
        temp[selected] = temp[selected] + 1
        setAnec(temp)
      }}>Like!</button>
      <p>Votes: {anec[selected]}</p>

      <h2>The most liked phrase is: {anecdotes[anec.indexOf(Math.max(...anec))]} with: {Math.max(...anec)} votes </h2>

    </div>
  )
}

export default App
