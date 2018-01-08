const config = require('./config.json')

/* Deps */
const express = require('express')
const bodyparser = require('body-parser')
const fs = require('fs')
const crypto = require('crypto')
const { spawn } = require('child_process')

/* Express app */
const app = express()

app.use(bodyparser.json())

app.post('/webhook', (req, res) => {
  if(!req.body.repository) return res.json({ success: false, err: 'Invalid body' })
  if(!config.repositories[req.body.repository.full_name]) return res.json({ success: false, err: 'Invalid repository' })
  if(!req.headers['x-hub-signature']) return res.json({ success: false, err: 'No signature provided' })

  console.log(req.body)

  const sha1 = crypto
    .createHmac('sha1', config.repositories[req.body.repository.full_name].secret)
    .update(JSON.stringify(req.body))
    .digest('hex')

  const signature = `sha1=${sha1}`

  console.log(`computed sha1: ${sha1}`)
  console.log(`computed signature: ${signature}`)
  console.log(`original signature: ${req.headers['x-hub-signature']}`)

  if(req.headers['x-hub-signature'] != signature) return res.json({ success: false, err: 'Invalid signature' })

  res.json({ success: true })
})

app.listen(config.port)

console.log(`Agent is listening on port ${config.port}`)