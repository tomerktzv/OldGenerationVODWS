'use strict';

const bodyParser = require('body-parser'),
      express = require('express'),
      // data = require('./data/movies.json'),
      port = process.env.PORT || 3000,
      app = express(),
      // mongoose = require('mongoose'),
      // consts = require('./consts'),
      // Movie = require('./movie'),
      newVOD = require('./mongoose_connection'),
      oldVOD = require('./app/index.js');

var newOldGenVOD = newVOD();
var oldGenVOD = oldVOD();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));
app.use('/extras', express.static(__dirname + '/includes'));
app.use('/imgs', express.static(__dirname + '/images'));


//
// conn.once(`open`, () => {
//     Movie.find({}, (err, movie) => {
//         if (err) console.log(`query error: ${err}`);
//         console.log(movie);
//         // mongoose.disconnect();
//     });
// });

app.all('*', (req, res, next) => {
    console.log('==== Request received ====');
    req.next();
});

app.get('/', (req, res) => {
   res.sendFile(`${__dirname}/index.html`);
});


app.get('/getAllMovies', (req, res) => {
    newOldGenVOD.getAllMovies().then((result) => {
        if (result.length !== 0) {
            console.log(`==========\n${result}\n Received successfully from the database!\n==========`);
            res.status(200).json(result);
        }
        else {
            console.log(`==========\nFailed to retrieve data\n==========`);
            res.status(200).json(`Failed to retrieve data`);
        }
    });
});

app.get('/getMovieByGenreDate/:genre/:year', (req, res) => {
    newOldGenVOD.getMovieByGenreDate(req.params.genre, req.params.year).then((result) => {
        if (result.length !== 0) {
            console.log(`==========\n${result}\n Received successfully from the database!\n==========`);
            res.status(200).json(result);
        }
        else {
            console.log(`==========\nFailed to retrieve data - No matching collections were found\n==========`);
            res.status(200).json(`Failed to retrieve data - No matching collections were found`);
        }
    });
});


app.post('/getMovieById/', (req, res) => {
    newOldGenVOD.getMovieById(req.body.movie_id).then((result) => {
        if (result.length !== 0) {
            console.log(`==========\n${result}\n Received successfully from the database!\n==========`);
            res.status(200).json(result);
        }
        else {
            console.log(`==========\nFailed to retrieve data - No matching collections were found\n==========`);
            res.status(200).json(`Failed to retrieve data - No matching collections were found`);
        }
    });
});

app.post('/getCastByMovieName/', (req, res) => {
    newOldGenVOD.getCastByMovieName(req.body.movie_name).then((result) => {
        if (result.length !== 0) {
            console.log(`==========\n${result}\n Received successfully from the database!\n==========`);
            res.status(200).json(result);
        }
        else {
            console.log(`==========\nFailed to retrieve data - No matching collections were found\n==========`);
            res.status(200).json(`Failed to retrieve data - No matching collections were found`);
        }
    });
});

app.listen(port);
console.log(`listening on port ${port}`);

