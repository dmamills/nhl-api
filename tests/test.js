"use strict";

const should = require('should');
const requests = require('../src/requests');
const nhlApi = require('../');

describe('request utilities', function() {

    it('should properly create resource url', () => {
		requests.getResourceUrl('teams').should.equal('https://statsapi.web.nhl.com/api/v1/teams');
    });

	it('should create resource request functions', () => {
		let getTeamFn = requests.getResource('teams');
		let teamPromise = getTeamFn();
		getTeamFn.should.be.a.Function();
		teamPromise.should.be.a.Promise();
	});

	it('should fetch a single resource when passed an id', (cb) => {
		requests.getResource('teams')(10).then(team => {
            team.should.be.Object();
			team.name.should.equal('Toronto Maple Leafs');
			cb();
		});
	});

	it('should fetch all teams when not passed an id', cb => {
		requests.getResource('teams')().then(teams => {
            teams.should.be.Array();
			teams.should.have.length(30);
			cb();
		});
	});

	it('should allow expand parameters', cb => {
		requests.getResource('teams')(10, {
			expand: ['team.roster','roster.person','person.stats']
		}).then(team => {
			team.should.have.ownProperty('roster');
			cb();
		});
	});
});

describe('team api', () => {

    it('should retrieve a single team', cb => {
        nhlApi.team(10).then(team => {
            team.name.should.equal('Toronto Maple Leafs');
            cb();
        });
    });

    it('should retrieve a all teams', cb => {
        nhlApi.team().then(teams => {
            teams.should.be.Array();
            teams.length.should.be.above(1);
            cb();
        });
    });

    it('should accept expands as a string', cb => {
        nhlApi.team(10, {
            expand: 'team.roster'
        }).then(toronto => {
            toronto.should.have.ownProperty('roster');
            cb();
        });
    });

    it('should accept expands as an array', cb => {
        nhlApi.team(10, {
            expand: ['team.roster'],
        }).then(toronto => {
            toronto.should.have.ownProperty('roster');
            cb();
        });
    });
});

describe('person api', _ => {

    let playerPromise = nhlApi.people(8471392, {
        expand: ['person.stats'],
        stats: 'yearByYear'
    });

    it('should get a player', cb => {
        playerPromise.then(player => {
            player.fullName.should.equal('Roman Polak');
            cb();
        });
    });

    it('should expand stats for player', cb => {
        playerPromise.then(player => {
            player.should.have.ownProperty('stats');
            cb();
        });
    });

});
