const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_URI);

const Movie = sequelize.define('Movie', {
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    poster: {
        type: DataTypes.STRING

    },
    language: {
        type: DataTypes.STRING

    },
    year: {
        type: DataTypes.INTEGER
    },
    length: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    tableName: 'movies',
    schema: 'public'
});


module.exports = Movie;