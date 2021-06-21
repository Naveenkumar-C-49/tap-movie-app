const lodash = require('lodash');
const { Op } = require('sequelize');
const { Movie } = require('../models');

const getAllMovies = async (req, res) => {
    const { title } = req.query;

    console.log(title);

    if (title) {
        const movies = await Movie.findAll({
            where: {
                title: {
                    [Op.iLike]: "%" + title + "%"
                }
            }
        });
        return res.json(movies);
    }
    else {
        const movies = await Movie.findAll({ raw: true });
        return res.json(movies);
    }
}

const findByMovieId = async (req, res) => {
    const { movieId } = req.params;

    //const movie = movies.filter(movie => movie.id === Number(movieId));
    const movie = await Movie.findOne({
        where: {
            movie_id: Number(movieId)
        }
    })
    if (!movie) {
        return res.status(404).json({
            message: "Movie Id not found!"
        });
    }
    res.json(movie);
}

const deleteMovie = async (req, res) => {
    const { movieId } = req.params;


    const movie = await Movie.destroy({
        where: {
            movie_id: Number(movieId)
        }
    })
    if (!movie) {
        return res.status(404).json({
            message: "Movie Id not deleted!"
        });
    }
    res.json(movie);
}
const createMovie = async (req, res) => {

    const { title, poster, length, language, year } = req.body;
    if (!title || !poster) {
        return res.status(400).json({ message: "Please fill all the mandatory fields[title, poster]" });
    }

    const movieRecord = {
        title,
        poster,
        language,
        year,
        length
    }

    const result = await Movie.create(movieRecord);
    if (result) {
        return res.json({ message: "Movie added successfully..." });
    } else {
        return res.json({ message: "Movie not added" });
    }
}
module.exports = {
    getAllMovies,
    findByMovieId,
    createMovie,
    deleteMovie
}