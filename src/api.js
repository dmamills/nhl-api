const request = require('./requests');

module.exports = {
    team: request.getResource('teams'),
    people: request.getResource('people'),
    schedule: request.getResource('schedule'),
    division: request.getResource('divisions'),
    standings: request.getResource('standings'),
    conference: request.getResource('conferences')
};
