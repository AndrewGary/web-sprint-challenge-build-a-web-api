// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
    .then(resp => {
        // console.log('This works');
        res.status(200).json(resp);
    })
    .catch(error => {
        res.status(500).json({ message: 'Problem getting Projects - server error'})
    } )
})

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then(resp => {
        if(req.params.id){
            console.log(resp)
            res.status(201).json(resp);
        } else{
            console.log('222222')
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'SERVER ERROR: Problem retrieving that project'})
    })
})

router.post('/', (req, res) => {
    if(!req.body.name || !req.body.description){
        res.status(400).json({ message: 'Please provide name and description'})
        return;
    }
    
    Projects.insert(req.body)
    .then(project => {
        console.log('Project created')
        res.status(201).json(project);
    })
    .catch(error => {
        res.status(500).json({ message: 'Error adding the post'})
    })
})

router.put('/:id', (req, res) => {
    if(!req.body.name || !req.body.description){
        res.status(400).json({ message: 'You need to provide a name and description in the body of the request' })
        return;
    }

    Projects.update(req.params.id, req.body)
    .then(resp => {
        console.log('This works');
        res.status(201).json(resp);
    })
    .catch(error => {
        res.status(500).json({ message: 'Server Error, could not update.' })
    })
})

router.delete('/:id', (req, res) => {

    Projects.get(req.params.id)
    .then(resp => {
        if(resp){
            console.log('there is a project with that id')
            Projects.remove(req.params.id)
            .then(resp => {
                res.status(200).json({ message: 'deleted'})
            })
            .catch(error => {
                res.status(500).json({ message: 'Server Error, could not delete' })
            })
        } else{
            console.log('there was not a project with that id')
        }
    })
    .catch(error => {
        res.status(404).json({ message: 'Server error: could not delete'})
    })
})

router.get('/:id/actions', (req, res) => {
    Projects.get(req.params.id)
    .then(resp => {
        if(resp){
            // console.log('resp')
            // res.status(200).json(resp);
            Projects.getProjectActions(req.params.id)
            .then(innerResp => {
                res.status(200).json(innerResp);
            })
        }else{
            res.status(404).json({ message: 'could not find a project with that id' })
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Server Error: could not get actions' })
    })
})

//UNCOMMENT THIS AFTER YOU CREATE THE projects-middleware.js
//import all methos from projects-middlware.js
// const { } = require('./projects-middlware');


module.exports = router;