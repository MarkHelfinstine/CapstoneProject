const { Router } = require("express");
const Leaderboard = require("../models/Leaderboard");
const router = Router();

router.get("/", (request, response) => {
  Leaderboard.find({}, (error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

// Get (read) all records from the collection
router.get("/", (request, response) => {
  Leaderboard.find({}, (error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

// Get a single record by ID using a query parameter
router.get("/:id", (request, response) => {
  Leaderboard.findById(request.params.id, (error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

router.delete("/:id", (request, response) => {
  Leaderboard.findByIdAndRemove(request.params.id, {}, (error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

router.put("/:id", (request, response) => {
  const body = request.body;
  Leaderboard.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        name: body.name,
        distance: body.distance,
        elevation: body.elevation,
        age: body.age
      }
    },
    {
      new: true,
      upsert: true
    },
    (error, record) => {
      if (error) return response.status(500).json(error.error);
      return response.json(record);
    }
  );
});

module.exports = router;
