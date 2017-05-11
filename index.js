'use strict';

const bodyParser = require('body-parser'),
      express = require('express'),
      // data = require('./data/movies.json'),
      port = process.env.PORT || 3000,
      app = express(),
      oldVOD = require('./app/index.js');

var oldGenVOD = oldVOD();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));
app.use('/extras', express.static(__dirname) + '/includes');
app.use('/imgs', express.static(__dirname) + '/images');

app.all('*', (req, res, next) => {
    console.log('Request received');
    req.next();
});

app.get('/', (req, res) => {
   res.sendFile(`index.html`);
});

app.get('/getAllMovies', (req, res) => {
    console.log(`Movies List: \n ${JSON.stringify(oldGenVOD.getAllMovies, null, 2)}`);
    res.json(oldGenVOD.getAllMovies());
});

app.get('/getMovieByGenreDate/:genre/:year', (req, res) => {
    if (!oldGenVOD.getMovieByGenreDate(req.params.genre, req.params.year)) {
        console.log(`Error! No ${req.params.genre} movie that was released on ${req.params.year} was found`);
        res.status(200).json({err : `Error! No ${req.params.genre} movie that was released on ${req.params.year} was found`});
    }
    else {
        console.log(`A movie was found`);
        res.status(200).json(oldGenVOD.getMovieByGenreDate(req.params.genre, req.params.year));
    }
});


app.post('/getMovieById/', (req, res) => {
    if (!oldGenVOD.getMovieByID(req.body.movie_id)) {
        console.log(`Error! No movie was found with id #${req.body.movie_id}`);
        res.status(200).json({err : `Error! No movie was found with id #${req.body.movie_id}`});
    }
    else {
        console.log(`A movie was found`);
        res.status(200).json(oldGenVOD.getMovieByID(req.body.movie_id));
    }
});

app.post('/getCastByMovieName/', (req, res) => {
    if (!oldGenVOD.getCastByMovieName(req.body.movie_name)) {
        console.log(`Error! No movie was found with id #${req.body.movie_name}`);
        res.status(200).json({err : `Error! No movie was found with id #${req.body.movie_name}`});
    }
    else {
        console.log(`A movie was found`);
        res.status(200).json(oldGenVOD.getCastByMovieName(req.body.movie_name));
    }
});

app.listen(port);
console.log(`listening on port ${port}`);

