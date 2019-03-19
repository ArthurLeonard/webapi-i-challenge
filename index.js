// implement your API here

    // import express
const express = require('express');

    //import database files
const db = require('./data/db.js');

const server = express();


console.log('server is up');

    // allows program to read json files
server.use(express.json( ));

server.get('/', (req, res) => { res.send('Server is running')})

/*****  IMPLEMENT GET    *******/
server.get('/api/users', (req, res) => {
    console.log(req.query)
    console.log(req.users)
     console.log(db.find().then())
    db.find()
        .then( users => {
            res.status(200).json({users});
        })
         .catch( error => {
            res.status(500).json({message: 'Could not retrieve users'})
        })
}) //end get

/*****   GET WITH ID     ********/
server.get( '/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then( user => {
            console.log(!user)
            if(!user){
                res.status(404).json({ message: 'could not find user'})
            }
            else
                res.status(200).json( {user})
        })
        .catch( error => {
            res.status(500).json({ message: 'Users information could not be retrieved'})
        })
}) //end get with ID

/****** DELETE with ID    ******/
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
     .then( num => {
        console.log(num)
         if( num === 0){
            res.status(404).json({ message: 'could not find user'})
         }
         else
            res.status(200).json( {message: "1 user removed from db"})
     })
     .catch( error => {
         res.status(500).json({ message: 'We had a problem'})
     })
})// end delete

/***** POST  ********/
server.post('/api/users', (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    db.insert(newUser)
    .then( id => {
        res.status(200).json({ message: "user added"})
        
    })
    .catch( error =>{
        res.status(500).json({ message: "We had a problem"})
    })
})//end post

server.listen(3000, () => {
    console.log('\n Server is running on port 3000')
})