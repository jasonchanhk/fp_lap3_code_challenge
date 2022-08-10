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
        <label>
          Username:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>

    </div>
  );
}

export default App;
