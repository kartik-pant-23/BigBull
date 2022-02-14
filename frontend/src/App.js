import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [ message, setMessage ] = useState("Failed loading message!")

  function loadMessage() {
    fetch('http://127.0.0.1:3000/routes/')
      .then(data => data.json()
        .then(jsonData => setMessage(jsonData.message)))
        .catch(err => console.log(err))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    loadMessage()
  }, []);

  return (
    <div className='App AppHeader'>
      <p>{message}</p>
    </div>
  )
}

export default App;