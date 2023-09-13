import {useState, useEffect} from 'react'

function App() {

  const [value, setValue] = useState("")
  const [user_list, setList] = useState("")
  const [loading, setLoading] = useState("")
  const [message, setMessage] = useState({content:''})

  // clear all inputs to allow for new entries
  const clearInput = () => {

    setValue("")
    setMessage({content:''})
    setList("")

  }

  // get new message from Node.js backend server fetching from OpenAI API
  const getMessage = async () => {

    // clear input to verify click & set user inputed list as from input value
    clearInput()
    setList(value)
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
      const response = await fetch('http://localhost:8000/completitions', options)
      // get response data
      const data = await response.json()
      // remove loading display and assign message
      setLoading("")
      setMessage(data.choices[0].message)

    } catch (error) {
      console.error(error)
    }
  }

  // return regex mapped value with bolded and linked item titles
  const MappedRegex = () => {
    // grab all item titles starting with 1. , 2. , 3. , ... 
    let regexp = /[0-9].\s.*?:/g
    // match all items to regex
    let matchAll = Array.from(message.content.matchAll(regexp))
    // split all items by regex. Get opposite array of matchAll from string
    let splitAll = message.content.split(regexp)
    // init splitByTitleArray
    const splitByTitleArray = []
    const searchLinkArray = []
    
    // combine split and match array by regex pattern for mapping
    for (let i=0, len=matchAll.length; i<len; i++) {
      splitByTitleArray.push(matchAll[i])
      splitByTitleArray.push(splitAll[i+1])
      console.log(matchAll[i])
      const titleSplit = matchAll[i][0].split(" ")
      for (let j=0; j < titleSplit.length; j++) {
        // get rid of any text with ':'
        titleSplit[j] = titleSplit[j].replace(/(\w+):/g,"$1")
        // make all lowercase
        titleSplit[j] = titleSplit[j].toLowerCase()
      }
      // remove first index which contains numbers. This is certain from earlier regex
      titleSplit.splice(0, 1) 
      searchLinkArray.push("https://www.google.com/search?q=" + titleSplit.join("+"))
    }

    // map array to output, bold titles and give them google links for more info
    return (
      <span>
        {splitByTitleArray.map((item, index) => (
          <>
            {index % 2 === 1 && item}
            {index % 2 === 0 && (
              <a href={searchLinkArray[index/2]} target="_blank" rel="noreferrer">
                <b>{item}</b>
              </a>
            )}
          </>
        ))}
      </span>)
  }

  return (
    <div className="app">
      <section className="main">
        <h1>Feeling Hungry?</h1>
        <h4>Just enter below what you have and we'll tell you what you can make!</h4>
        <button onClick={clearInput}>clear chat box</button>
        {user_list !== "" && <p id="user-list"><b>Your list: </b>{user_list}</p>}
        {loading !== "" && <p id="loading">{loading}</p>}
        {message.content !== "" && <p id="output"><MappedRegex/></p>}
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
      <footer>
          <p>Have suggestions? Message me on <a href="https://www.linkedin.com/in/szymonsarnowicz/" target="_blank" rel="noreferrer">LinkedIn</a></p>
      </footer>
    </div>
  );
}

export default App;
