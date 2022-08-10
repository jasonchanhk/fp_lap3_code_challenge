import { useState, useEffect } from 'react'

import './App.css';

function App() {

  const [username, setUsername] = useState("");
  const [search, setSearch] = useState()

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
      console.log(data)
    }

    fetchData()
  }, [search]);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Username" value={username} onChange={handleChange} />
        <input type="submit" value="Search Github"/>
      </form>
    </div>
  );
}

export default App;
