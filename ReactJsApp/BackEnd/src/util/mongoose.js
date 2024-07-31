const MultiMongoToObject = (array) =>
    array = array.map(e => e.toObject())

module.exports = MultiMongoToObject