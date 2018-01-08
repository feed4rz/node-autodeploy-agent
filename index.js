const config = require('./config.json')

/* Deps */
const express = require('express')
const bodyparser = require('body-parser')
const fs = require('fs')
const { spawn } = require('child_process')

/* Express app */
const app = express()

app.use(bodyparser.json())

app.post('/webhook', (req, res) => {
	console.log(req.body)
})

app.listen(config.port)

console.log(`Agent is listening on port ${config.port}`)