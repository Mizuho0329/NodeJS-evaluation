import express from 'express'
const app = express()
import api from './api'

app.use(express.json())
app.use('/api', api)

// handle error
app.use((err, req, res, next) => {
    res.status(500).send(err.message)
})

// listen at port 5000
app.listen(5000, function () {
    console.log('Example app listening on port 5000!')
})

export default app