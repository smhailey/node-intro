import express from 'express'
import bp from 'body-parser'

let port = 3000

let server = express()
server.use(bp.json())

let fakeDB = {
  cats: [{ name: "Garfield", legs: 4, favoriteFood: "Lasagna" }, { name: "Felix", legs: 4, favoriteFood: "Catnip" }],
  dogs: [{ name: "Spot", legs: 4, favoriteFood: "Anything you are eating" }, { name: "Lucky", legs: 3, favoriteFood: "Little brown bits" }]
}

function getAllCats(req, res, next) {
  res.send({ data: fakeDB.cats, message: "Got the cats!" })
}

function getAllDogs(req, res, next) {
  res.send({ data: fakeDB.dogs, message: "Got the dogs!" })
}

function addCat(req, res, next) {
  let newCat = req.body
  fakeDB.cats.push(newCat)
  res.status(201).send("Created a new cat!")
}

function addDog(req, res, next) {
  let newDog = req.body
  fakeDB.dogs.push(newDog)
  res.status(201).send("Created a new dog!")
}

function defaultErrorHandler(req, res, next) {
  res.status(404).send("Route not found")
}

server.get('/', express.static(__dirname + '/../public'))
server.get('/api/cats', getAllCats)
server.post('/api/cats', addCat)
server.get('/api/dogs', getAllDogs)
server.post('/api/dogs', addDog)
server.use('*', defaultErrorHandler)

server.listen(port, () => {
  console.log("Server is running on port: ", port, "you better go catch it!")
})
