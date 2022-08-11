import { useState, useEffect } from 'react'
import { AiFillGithub } from "react-icons/ai";

import './App.css';

const DisplayInfo = (props) => {
  const [show, setShow] = useState(false)

  const displayDetail = () => {
    setShow(!show)
  }

  return (

    <div className='details'>
      <p>{props.repo.name}</p>
      <button onClick={displayDetail}>Show detail</button>
      {show 
      ? <>
        <div id='results'>
          <p>The fork count = {props.repo.forks_count}</p>
          <p>The stargazers count = {props.repo.stargazers_count}</p>
          <p>The watchers count = {props.repo.watchers_count} </p>
          <p>The issues count = {props.repo.open_issues_count}</p>
        </div>
        </>
      : <></>}
    </div>
  )
}

function App() {

  const [username, setUsername] = useState("");
  const [search, setSearch] = useState()
  const [data, setData]=useState([])

  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearch(username)
    setUsername("")
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.github.com/users/${search}/repos`)
      const data = await response.json()
      setData(data)
      console.log(data)
    }

    fetchData()
  }, [search]);

  return (
    <div className="App">
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Username" value={username} onChange={handleChange} />
          <input type="submit" value="Search Github" />
        </form>
      </div>

      {search &&
        <div className="repos">
          <div className="repos-owner"> <AiFillGithub /><span>{data[0]?.owner?.login}'s Repositories</span></div>
          <div id="info">
          {data?.map((data) => {
            return <DisplayInfo repo={data} />
          })}
          </div>
        </div>}
    </div>
  );
}

export default App;


