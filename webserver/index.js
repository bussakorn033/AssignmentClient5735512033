const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')

let curriculums = [{ id: 1, faculty: 'B.ENG (COMPUTER ENGINEERING)'}, { id: 2, faculty: 'B.SC (INFORMATION TECHNOLOGY)'},
{ id: 3, faculty: 'B.SC (SOFTWARE ENGINEERING)'}, { id: 4, faculty: 'B.SC (ELECTRONIC BUSINESS)'}]

app.use(express.static('test\\public'))
app.use(cors(),bodyParser.urlencoded({extended: false}), router)
 
router.route('/curriculums')
    .get((req,res) => {
        res.send(curriculums)
    })

    .post((req,res) =>{
        let curriculum ={};
        curriculum.id = curriculums.length+1
        console.log('body.faculty', req.body)
        curriculum.faculty = req.body.faculty
        curriculums.push(curriculum)
        res.send(curriculums)
    })

router.route('/curriculum/:id')
    .get((req,res) => { 
        res.send(curriculums[req.params.id])
    } ) 

    .put ((req,res) => {
        const id = req.params.id        
        curriculums[id].faculty = req.body.faculty; 
        res.json({ message: 'Curriculum updated!' });        
     })

    .delete ((req,res) => {
        const id = req.params.id
        console.log('id',id)
        delete  curriculums[id]
        res.json({ message: 'Curriculum deleted!' });        
    })
   
app.use('/api', bodyParser.json(), router);  

app.listen(8888)