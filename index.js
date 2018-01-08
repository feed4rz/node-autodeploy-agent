const config = require('./config.json')

if(Object.keys(config.repositories).length == 0) {
  console.error('Please add at least one repository to the list in config.json')
  process.exit(1)
}

/* Deps */
const express = require('express')
const bodyparser = require('body-parser')
const crypto = require('crypto')
const { exec } = require('child_process')

/* Express app */
const app = express()

/* Applying body parser to parse JSON body */
app.use(bodyparser.json())

app.post('/webhook/push', (req, res) => {
	/* Checking request params */
  if(!req.body.repository) return res.json({ success: false, err: 'Invalid body' })
  if(!config.repositories[req.body.repository.full_name]) return res.json({ success: false, err: 'Invalid repository' })
  if(!req.headers['x-hub-signature']) return res.json({ success: false, err: 'No signature provided' })

  console.log(req.body)

  const repo = config.repositories[req.body.repository.full_name]

  /* Calculating sha1 for signature validation */
  const sha1 = crypto
    .createHmac('sha1', repo.secret)
    .update(JSON.stringify(req.body))
    .digest('hex')

  const signature = `sha1=${sha1}`

  console.log(`computed sha1: ${sha1}`)
  console.log(`computed signature: ${signature}`)
  console.log(`original signature: ${req.headers['x-hub-signature']}`)

  /* Validating signature */
  if(req.headers['x-hub-signature'] != signature) return res.json({ success: false, err: 'Invalid signature' })

  /* Executing commands */
  exec(`cd / && cd ${config.root_dir} && cd ${repo.dir} && ${repo.on_push}`, (error, stdout, stderr) => {
    if(error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(`exec stdout: ${stdout}`)
    console.log(`exec stderr: ${stderr}`)
  })

  res.json({ success: true })
})

app.listen(config.port)

console.log(`Agent is listening on port ${config.port}`)