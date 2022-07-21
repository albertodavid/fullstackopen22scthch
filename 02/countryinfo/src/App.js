import axios from "axios";
import { useState, useEffect } from "react";

function App() {

  const [data, setData] = useState([])
  const [filter, setFilter] = useState("")
  

  useEffect(() => {
    
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(res => {
      console.log(res.data);
      setData(res.data)
    })
  
  }, []);
  
  const dataFilter = data.filter((e)=>e.name.common.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div className="App">
      <form>
        Filter: <input onChange={(e)=>setFilter(e.target.value)} value={filter}/>
      </form>

      {dataFilter.length < 10 && dataFilter.length > 1
      ? dataFilter.map((e)=>(
      <div>
        <p key={e.flag}>{e.name.common}</p><button onClick={() => setFilter(e.name.common)}>+</button>
      </div>
      )
      
      ) :""}

      {dataFilter.length === 1 
      ? dataFilter.map((e)=>(
      <div key={e.name.common}>
        <h1>{e.name.common} </h1>
        <p>{e.capital[0]}</p>
        <p>{e.continents[0]}</p>
      </div>)) :""}

    </div>
  );
}

export default App;
