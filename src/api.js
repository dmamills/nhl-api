const request = require('./requests');

module.exports = {
    team: request.getResource('teams'),
	people: request.getResource('people'),
    schedule: request.getResource('schedule'),
    division: request.getResource('divisions'),
    conference: request.getResource('conferences')
};
