import { useState, useEffect } from 'react'
import { Animated } from "react-animated-css"
import PasswordEntry from './components/PasswordEntry'
import DishChoices from './components/DishChoices'
import UserEntry from './components/UserEntry'

function App() {

  // set constants
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState("")
  const [message, setMessage] = useState("")
  const [allowEntry, setAllowEntry] = useState(false)
  const [entryPermission, setEntryPermission] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)
  
  // clear all inputs to allow for new entries
  const clearInput = () => {
    setValue("")
    setMessage("")
  }

  // get new message from Node.js backend server fetching from OpenAI API
  const getMessage = async () => {

    // clear message from chatGPT and remove submit and show loading to confirm click
    setMessage("")
    setShowSubmit(false)
    setLoading("Loading...")

    // load options as per OpenAI API requirements
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value // this is what we are passing to backend. value comes from text area input
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      // fetch from server
      const response = await fetch('https://feeling-hungry-server.azurewebsites.net/completitions', options)
      // get response data
      const data = await response.json()
      // remove loading display and assign message
      setLoading("")
      setMessage(data.choices[0].message.content)

    } catch (error) {
      console.error(error)
    }
  }

  // when allow entry gets set to true (aka changes values) from server, set entryPermission to true
  useEffect(() => {
    if (allowEntry) {
      setEntryPermission(true)
    }
  },[allowEntry])

  // create effect so anytime value is adjusted submit button shows up
  useEffect(() => {
    if (value !== "") {
      setShowSubmit(true)
    } else {
      setShowSubmit(false)
    }
  }, [value])

  return (
    <div className="app">
      <section className="main">
        <Animated animationIn="jello">
          <h1>Feeling Hungry?</h1>
        </Animated>
        <h4>Just enter below what you have and we'll tell you what you can make!</h4>
        {entryPermission ? (<>
                              <button className="clear-button" onClick={clearInput}>clear output</button>
                              {value !== "" && <p id="user-list"><b>Your list: </b>{value}</p>}
                              {message === "" ? <p id="loading">{loading}</p> : <Animated animationIn='fadeIn'><DishChoices message={message}/></Animated>}
                              <UserEntry value={value} setValue={setValue} getMessage={getMessage} showSubmit={showSubmit} />
                            </>)
        : <PasswordEntry setEntryPermission={setEntryPermission} allowEntry={allowEntry} setAllowEntry={setAllowEntry}/>}
      </section>
      <footer>
          <p>Have suggestions? Message me on <a href="https://www.linkedin.com/in/szymonsarnowicz/" target="_blank" rel="noreferrer">LinkedIn</a></p>
      </footer>
    </div>
  );
}

export default App
