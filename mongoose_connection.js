'use strict';

const mongoose = require('mongoose'),
      consts = require('./consts'),
      promise = require('promise'),
      Movie = require('./movie');

mongoose.connect(consts.MLAB_KEY);
var conn = mongoose.connection;

conn.on('error', (err) => {
    console.log(`connection error: ${err}`);
});

class newOldGenVOD {
    getAllMovies() {
        return new Promise((resolve, reject) => {
            Movie.find({}, '-_id',
                (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }

    getMovieByGenreDate(_genre, _year) {
        return new Promise((resolve, reject) => {
            Movie.find({genre : _genre, year : _year}, '-_id',
                (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }

    getMovieById(_id) {
        return new Promise((resolve, reject) => {
            Movie.find({id : _id}, '-_id',
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
        });
    }

    getCastByMovieName(_name) {
        return new Promise((resolve, reject) => {
            Movie.find({name : {$regex : _name}}, '-_id',
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
        });
    }
}

module.exports = () => {
    return new newOldGenVOD()
};