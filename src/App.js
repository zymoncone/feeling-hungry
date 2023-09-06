function App() {

  const getMessage = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: "what is 5+5?" // this doesn't matter, gets sent to backend to pass to OPENAI
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const response = await fetch('http://localhost:8000/completitions', options)
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="app">
      <section className="main">
        <h1>Feeling Hungry?</h1>
        <h4>Just enter below what you have and we'll tell you what you can make!</h4>
        <button>clear chat box</button>
        <p id="output"></p>
        <div className="bottom-section">
          <h3>What's in your fridge?</h3>
            <div className="input-container">

              <textarea id="entry" type="text" placeholder="(input as comma separated words)"></textarea>
              
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
