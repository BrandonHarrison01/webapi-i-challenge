// implement your API here
const express = require("express")

const userData = require("./data/db")

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('hello world')
})

server.get('/api/users', (req, res) => {
    userData.find()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})

server.post('/api/users', (req, res) => {

    const newData = req.body;

    console.log('new data', req.body)
    userData.insert(newData)
        .then(result => {
            if (newData.name && newData.bio) {
                res.status(201).json(result)
            } else {
                res.status(500).json({ errorMessage: "Please provide name and bio for the user." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })
})

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id

    userData.findById(userId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    userData.remove(userId)
        .then(result => {
            if (userId) {
                res.status(200).json(result)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The user could not be removed" })
        })
})



const port = 8000;
server.listen(port, () => console.log('api running'))