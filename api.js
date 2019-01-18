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
// localhost:5000/api/facts/:factID
router.get('/facts/:factID', ({ params }, res, next) => {
    const {factID} = params
    // axiosApi gets request
    async function axiosApiCall(){
        try {
        // access db 
        let result = db
            .get('results')
            .find(result => {
                return (result.id === factID)
            })
            .value()
        
            if(!result){
                const response = await axiosApi.get(`/facts/${factID}`)
                result = {
                    id: Date.now(),
                    id_source: response.data._id,
                    fact: respondbse.data.text
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

//POST method
// curl -X POST http://localhost:5000/api/add -H "Content-type: application/json" -d '{ "fact" : "toto" }'
router.post('/add', (req, res, next) => {
    
    let newfact = req.body.fact

    let facts = db.get('results')
    if(facts.filter(facts => facts == newfact)){
        res.send(`${newfact} exists already !`)
    }else{
        let newItem =  {
            id: Date.now(),
            id_source: "",
            fact: newfact
        }
        facts.push(newItem)
        .write()
        res.send(`${newfact} has been added !`)
    }
})

//route de suppression par id
// commande a lancer dans un autre terminal curl -X "DELETE" http://localhost:5000/api/delete/58e008780aac31001185ed05
router.delete('/delete/:id', ({ params: { id } }, res) => {
    db.get('results')
        .remove({ id: parseInt(id)})   //conversion en entier
        .write()
    res.status(204).send()
})



//gestion de l'history http://localhost:5000/api/all
router.get('/all', (req, res) =>{

    let results = db.get('results')
    res.send(results.value())
})

//PUT method
// curl -X PUT http://localhost:5000/api/update -H "Content-type: application/json" -d '{ "id" : "xxx", "fact" : "newfact"}'
router.put('/update', (req, res) => {
    let idToUpdate = req.body.id
    let newFact = req.body.fact

    let facts = db.get('results')
    let result = facts.find(facts => facts.id == idToUpdate)
    if(result){
        result.assign({ fact: newFact})
        .write()
        res.send(`${newFact} has been changed !`)
    }else{
        res.send(`${idToUpdate} doesn't exist !`)
    }
})

export default router // ES5 with babel
export const restApi = axiosApi