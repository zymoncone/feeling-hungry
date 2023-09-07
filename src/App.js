import {useState, useEffect} from 'react'

function App() {

  const [value, setValue] = useState("")
  const [message, setMessage] = useState({content:''})

  const clearInput = () => {
    setValue("")
    setMessage({content:''})
  }

  const getMessage = async () => {
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
      const response = await fetch('http://localhost:8000/completitions', options)
      const data = await response.json()
      setMessage(data.choices[0].message)

    } catch (error) {
      console.error(error)
    }
  }

  console.log(message)

  return (
    <div className="app">
      <section className="main">
        <h1>Feeling Hungry?</h1>
        <h4>Just enter below what you have and we'll tell you what you can make!</h4>
        <button onClick={clearInput}>clear chat box</button>
        {message.content != "" && <p id="output">{message.content}</p>}
        <div className="bottom-section">
          <h3>What's in your fridge?</h3>
            <div className="input-container">

              <textarea id="entry" type="text" placeholder="(input as comma separated words)" value={value} onChange={(e) => setValue(e.target.value)}></textarea>
              
              <div id="submit" onClick={getMessage}>
                  ➱
              </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
