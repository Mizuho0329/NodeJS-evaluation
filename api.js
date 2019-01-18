import express from 'express'
import router from express.Router()
import axios from 'axios'
import db from './db'

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// GET method route
router.get('/', function (req, res) {
    res.status(200).send('route') // localhost:5000/api/ => 'route' 
});

// create instance axios
const axiosApi = axios.create({
    baseURL : '',
    headers: {}
})

// GET methode : router gets request from frontend *async/await ES6*




export default router // ES5 with babel
export const restApi = axiosApi