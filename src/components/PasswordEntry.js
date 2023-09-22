import {useState, useEffect} from 'react'

const PasswordEntry = (props) => {

  const [password, setPassword] = useState("")

  const getPassword = async () => {

    const passOptions = {
      method: "POST",
      body: JSON.stringify({
        message: password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      // fetch from server
      const passwordResponse = (await fetch('https://feeling-hungry-server.azurewebsites.net/passwords', passOptions)).json()
      // grab response of password match from Promise and assign to allowEntry
      passwordResponse.then((response) => {props.setAllowEntry(response)})

    } catch (error) {
      console.error(error)
    }
  }

  const handlePasswordEntry = (e) => {
    setPassword(e.target.value)
  }

  // call getPassword anytime password updates, this will set allowEntry after password value is set
  useEffect(() => {
      getPassword()
  },[password])

  return (
    <form style={{border:"solid", borderRadius:10, borderWidth:0.5, padding:"25px 50px", backgroundColor:'burlywood'}}>
      <p style={{margin:0}}>... but first enter the password to get started!</p>
      <input
        style={{marginTop:10, backgroundColor:'antiquewhite'}}
        type="password"
        value={password}
        onChange={handlePasswordEntry}
        placeholder='password'
      />
    </form>
  )
}

export default PasswordEntry