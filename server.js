const PORT = 8000
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())


const OPENAI_API_KEY = process.env.API_KEY
const num_of_answers = 2

app.post('/completitions', async (req, res) => {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: "What can I make with these ingredients? " + req.body.message + " Give me your top " + num_of_answers + " answers."}],
            max_tokens: 100,
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        // console.log(data)
        res.send(data)

    } catch (error) {
        console.error(error)
    }
})

app.listen(PORT, () => console.log('Your server is running on Port ' + PORT))
