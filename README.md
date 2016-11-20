# nhl-api

[![Build Status](https://secure.travis-ci.org/dmamills/nhl-api.png)](http://travis-ci.org/dmamills/nhl-api)

poorly made promise based node library for getting nhl stats. basically a wrapper around the ajax requests nhl.com makes.

## usage

```javascript
const nhlApi = require('nhl-api');

nhlApi.team(10).then(team => {
    console.log(team.name) //Toronto Maple Leafs
});

nhlApi.schedule({
    start_date: '2016-11-11',
    end_date; '2016-11-12',
    expand: [ 'schedule.linescore' ]
}).then(schedule => {
    console.log(schedule) // { !!! }
});

```

Expand is an option that fills out properties on the response. They can be passed as options as either an array, or a comma seperated string.

```javascript
let teamPromise = nhlApi.team(<id>, {
    expand: [
        'team.roster',
        'roster.person',
        'person.stats' //requires 'stats' query param
    ],
    stats: 'yearByYear' // or 'statsSingleSeason'
});

let schedulePromise = nhlApi.schedule({
    start_date: 'YYYY-MM-DD',
    end_date: 'YYYY-MM-DD'
    expand: [
        'schedule.teams',
        'schedule.linescore',
        'schedule.broadcasts.all',
        'schedule.ticket',
        'schedule.game.content.media.epg',
        'schedule.radioBroadcasts',
        'schedule.game.seriesSummary',
        'seriesSummary.series'
    ]
});

let playerPromise = nhlApi.people(<id>, {
    expand: [ 'person.stats'],
    stats: 'yearByYear'
});

let conferencesPromise = nhlApi.conference();
let divisionPromise = nhlApi.division();

```

## license

to ill
