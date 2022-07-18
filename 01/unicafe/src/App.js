import { useState } from 'react'

const Button = ({eventHandler, text})  => {

  return(
    <button onClick={eventHandler} >{text}</button>
  )
}

const StatisticLine = ({text, stat}) => {
  return (
    <tr>
    <td>{text}</td>
    <td>{stat}</td>
  </tr>
)
}

const Statistics = ({good, neutral, bad}) => {
  return (
    <>
    
    <h1>Data</h1>
    <table>
      <tbody>
      {/*<br/>_'s are temporal*/}
      <StatisticLine text={"Good:"} stat={good} />
      <StatisticLine text={"Neutral:"} stat={neutral} />
      <StatisticLine text={"Bad:"} stat={bad} />
    
      <StatisticLine text={"All:"} stat={good + neutral + bad} />
      <StatisticLine text={"Average"} stat= {(good-bad)/(good+neutral+bad)} />
      <StatisticLine text={"Positive"} stat={(good/(good+neutral+bad)*100)} />
    
      </tbody>
    </table>

    </>)
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedback, setFeedback] = useState(false)

  return (
    <div>
      <div>
      <h1>Give Feedback</h1>

        <Button eventHandler={()=>{
          setGood(good+1)
          setFeedback(true)}
          } text={"Good"} setFeedback={setFeedback}/>

        <Button eventHandler={()=>{
          setNeutral(neutral+1)
          setFeedback(true)}} text={"Neutral"} setFeedback={setFeedback}/>

        <Button eventHandler={()=>{
          setBad(+1)
          setFeedback(true)}} text={"Bad"}/>
        {feedback ? <Statistics good={good} neutral={neutral} bad={bad}/> : <p>No feedback given</p>}
      </div>

    </div>
  )
}

export default App