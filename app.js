import express from 'express'
const app = express()
import api from './api'

app.use('/api', api)

// handle error
app.use((err, req, res, next) => {
    res.status(500).send(err.message)
})

// listen at port 5000
app.listen(5000, function () {
    console.log('Example app listening on port 5000!')
})


// 1
//http://www.all-my-favourite-flower-names.com/list-of-flower-names.html

// 2
//https://www.gardeningchannel.com/
//https://www.gardeningchannel.com/category/flowers/
//https://www.gardeningchannel.com/category/fruits-vegetables/

//pour utiliser Supertest
export default app;