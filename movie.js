const mongoose = require('mongoose'),
    schema = mongoose.Schema,
    movieSchema = new schema({
        id: Number,
        name: {type: String, index: 1, required: true, unique: true},
        year: Number,
        genre: {type: String, index: 1, required: true, unique: true},
        producer: {type: String, index: 1, required: true, unique: true},
        cast: [
            {
                actor: {type: String, index: 1, required: true, unique: true},
                role: {type: String, index: 1, required: true, unique: true},
            }
        ]
    }, {collection: 'oldGenVOD'});
// console.log(`required paths: ${movieSchema.requiredPaths()}`);
// console.log(`indexes: ${JSON.stringify(movieSchema.indexes())}`);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;