import { useState, useEffect } from 'react'
import './App.css';

function App() {

  const [username, setUsername] = useState("");
  const [search, setSearch] = useState()
  const [data, setdata]=useState([])
  const [info, setInfo]= useState({
    data:'',
    loading: true
  })
  

  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearch(username)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.github.com/users/${search}/repos`)
      const data = await response.json()
      setdata(data)
      console.log(data)
    }

    fetchData()
  }, [search]);


  const showdetails =  (data)=> {
    return(
      <>
        <p>The fork count = {data.forks_count}</p>
        <p>The stargazers count = {data.stargazers_count}</p>
        <p>The watchers count = {data.watchers_count} </p>
        <p>The issues count = {data.open_issues_count}</p>


      </>
      

    )

  }

  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>
        {data?.map((data,index)=>{
          const [show,setShow]=useState(false)

          const toggle=()=>{
            setShow(perviousState=> !perviousState)
          }



          return(
            <>
              <p key={index}>Name of repo={data.name}, index_position={index}</p>

              <button onClick={toggle}>Details</button>
              {show?showdetails(data):<></>}

              <p>The fork count = {data.forks_count}</p>
              <p>The stargazers count = {data.stargazers_count}</p>
              <p>The watchers count = {data.watchers_count} </p>
              <p>The issues count = {data.open_issues_count}</p>
            </>
            
          )
        })}
      </div>

      

    </div>
  );
}

export default App;


