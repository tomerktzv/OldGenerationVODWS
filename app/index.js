'use strict';

const data = require('../data/movies.json');
      // moviesArray = Array();

class oldGenVOD {

    getAllMovies() {
        return data;
    }

    getMovieByID(id)  {
        for (let i in data) {
            if (id == data[i].id)
                return data[i];
        }
        return false;
    }

    getMovieByGenreDate(genre, year) {
        for (let i in data) {
            if (genre == data[i].genre && year == data[i].year)
                return data[i];
        }
        return false;
    }

    getCastByMovieName(name) {
        for (let i in data) {
            if (name == data[i].name) {
                return data[i].cast;
            }
        }
        return false;
    }
}

module.exports = () => {
    return new oldGenVOD();
};