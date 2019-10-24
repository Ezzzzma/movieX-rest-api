const express = require("../node_modules/express");
const router = express.Router();
const Actor = require("../models/Actor");

//Create a GET request handler for actors
router.get("/", async (req, res) => {
  const actors = await Actor.find(); //Get all actors from the Actor model
  return res.send(actors); // Send all actors in response
});

router.get("/:id", async (req, res) => {
  const actorId = req.params.id;
  const actor = await Actor.findById(actorId);

  if (!actor) return res.status(404).send(`Actor with ${actorId} not exist!`);
  res.send(actor);
});

router.post("/", async (req, res) => {
  const actor = new Actor(req.body);
  const saved = await actor.save();
  res.send(saved);
});

router.put("/:id", async (req, res) => {
  const actorId = req.params.id;
  const updates = req.body;
  const actor = await Actor.findByIdAndUpdate(actorId, updates, { new: true });
  if (!actor) return res.status(404).send(`Actor with ${actorId} not exist!`);
  res.send(actor);
});

router.delete("/:id", async (req, res) => {
  const actorId = req.params.id;
  const actor = await Actor.findByIdAndDelete(actorId);

  if (!actor) return res.status(404).send(`Actor with ${actorId} not exist!`);
  res.send(actor);
});

module.exports = router;
