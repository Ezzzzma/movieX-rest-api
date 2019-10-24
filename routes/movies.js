const express = require("../node_modules/express");
const router = express.Router(); // expressin implamentasyonu olan Router class ini cagiriyoruz.
const Movie = require("../models/Movie");
const Actor = require("../models/Actor");

//Create a GET request handler for movies
router.get("/", async (req, res) => {
  const movies = await Movie.find(); //Get all movies from the Movie model
  return res.send(movies); // Send all movies in response
});

//Create a GET request handler for /movies/:id, to get a movie data
router.get("/:id", async (req, res) => {
  const movieId = req.params.id;
  const movie = await Movie.findById(movieId);
  //if movie not exist send 404
  if (!movie)
    return res.status(404).send(`Movie with the id ${movieId} not exist.`);

  res.send(movie);
});

//Create a GET request handler for /movies/:id/actors, to get the actors
router.get("/:id/actors", async (req, res) => {
  const movieId = req.params.id;
  const movie = await Movie.findById(movieId).populate("actors");
  if (!movie)
    return res.status(404).send(`Movie with the id ${movieId} not exist.`);
  res.send(`${movie.name}'de oynayan aktorler: ${movie.actors}`);
});

//Create a POST request handler for /movies to create a movie in database
router.post("/", async (req, res) => {
  const movie = new Movie(req.body);
  const saved = await movie.save(); // save a movie to mongoDB
  res.send(saved);
});

//Create a PUT request handler for movie/:id, to update a movie's data
router.put("/:id", async (req, res) => {
  const movieId = req.params.id; // Get movie id parameter from url
  const updates = req.body; // Get request body for updates
  const movie = await Movie.findByIdAndUpdate(movieId, updates, { new: true });
  if (!movie)
    return res.status(404).send(`Movie with the id ${movieId} not exist.`);
  res.send(movie);
});

//Create a DELETE request handler for /movies/:id, to delete a movie from db
router.delete("/:id", async (req, res) => {
  const movieId = req.params.id;
  const movie = await Movie.findByIdAndDelete(movieId); // Find movie with id and delete with mongoose
  if (!movie)
    return res.status(404).send(`Movie with the id ${movieId} not exist.`);
  res.send(movie);
});

//Create a POST reques handler for /movies/:movieId/actors/add/:actorId, to add an actor to a movie
router.post("/:movieId/actors/:actorId", async (req, res) => {
  const movieId = req.params.movieId;
  const actorId = req.params.actorId;

  const movie = await Movie.findById(movieId).populate("actors");
  // If movie not exist send 404
  if (!movie)
    return res.status(404).send(`Movie with the id ${movieId} not exist.`);

  const actor = await Actor.findById(actorId);

  // If actor not exist send 404
  if (!actor)
    return res.status(404).send(`Actor with the id ${actorId} not exist.`);

  //Check if actor is already exist in actors array
  const isActorExist = movie.actors.find(actor => actorId === actor.id); //burada  daha once aktorler (populate yapmadan)array oldugu icin includes ile aradik, obje olsaydi find kullanmamiz gerekirdi

  if (isActorExist)
    return res
      .status(400)
      .send(
        `Actor with the name ${actor.name} ${actor.surname} already exist in movie ${movie.name} with id ${actorId} .`
      );

  movie.actors.push(actor);
  await movie.save();
  res.send(movie);
});

module.exports = router;
