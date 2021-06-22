const express = require("express");

const controller = require("../controller/movieController");

const movieRoutes = express.Router();

movieRoutes.get("/", controller.getAllMovies);
movieRoutes.get("/:movieId", controller.findByMovieId);

movieRoutes.post("/create", controller.createMovie);
movieRoutes.delete("/delete/:movieId", controller.deleteMovie);

movieRoutes.put("/update/:movieId", controller.updateMovie);

module.exports = movieRoutes;
