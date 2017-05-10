'use strict';

const bodyParser = require('body-parser'),
      express = require('express'),
      data = require('./data/movies.json'),
      port = process.env.PORT || 3000,
      app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));

app.all('*', (req, res, next) => {
    console.log('Request received');
    req.next();
});

app.get('/getAllMovies', (req, res) => {
    console.log(`Movies List: \n ${JSON.stringify(data, null, 2)}`);
    res.json(data);
});

app.get('/getMovieByGenreDate/:genre/:year', (req, res) => {
    let movie;
    for (let i in data) {
        if (data[i].genre == req.params.genre && data[i].year == req.params.year) {
            movie = data[i];
            console.log(`Selected Movie: ${JSON.stringify(data[i])}`);
            res.status(200).json({"Selected Movie" : movie});
        }
    }
    if (!movie) {
        console.log(`No movie matching genre ${req.params.genre} that was released on ${req.params.year} was found`);
        res.status(200).json('No movie exists :(');
    }
});


app.post('/getMovieById/', (req, res) => {
    console.log(req.body.movie_id);
    var movie = data[req.body.movie_id-1];
    if (!movie) {
        console.log(`No movie matching id #${req.body.movie_id} was found`);
        res.status(200).json('No movie with this id exists :(');
    }
    else {
        console.log(`Preseting movie id #${req.body.movie_id} - ${movie.name}`);
        res.status(200).json({"Selected Movie" : movie});
    }
    // res.send(req.body.movie_id);

});


app.listen(port);
console.log(`listening on port ${port}`);

