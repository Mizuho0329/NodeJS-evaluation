import express from 'express'
const router = express.Router()
import axios from 'axios'
import db from './db'

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// GET method 'localhost:5000/api/' => 'route'
router.get('/', function (req, res) {
    res.status(200).send('route') // localhost:5000/api/ => 'route' 
});

// create instance axios
const axiosApi = axios.create({
    baseURL : 'https://cat-fact.herokuapp.com',
})

// GET methode : router gets request from frontend *async/await ES6*
// localhost:5000/api/cats/:factID
router.get('/facts/:factID', ({ params }, res, next) => { // req, res, next
    const {factID} = params // optimisation 2 ({params} , res, next)
    console.log(factID)
    // axiosApi gets request
    async function axiosApiCall(){
        try {
        // access to db
        let result = db
            .get('results')
            .find(result => {
                return (result.id === factID)
            })
            .value()
        
            if(!result){
                const response = await axiosApi.get(`/facts/${factID}`) //(`/?_id=${factID}`)//('/facts/58e008800aac31001185ed07') //
                console.log(response)
                result = {
                    id: response.data._id,
                    fact: response.data.text
                }
                // insertion to db
                db.get('results')
                .push(result)
                .write()
            }
            res.send(result)
        } catch (err) {
            next(err)
        }
    }
    axiosApiCall()
})

// 




export default router // ES5 with babel
export const restApi = axiosApi