"use strict";

const request = require('request');
const querystring = require('qs');

const BASE_URL = 'https://statsapi.web.nhl.com/api/v1/';

/**
* Makes a simple GET request to a url
* @param String
* @return Promise<Object>
*/
const getRequest = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    });
}

/**
* Creates the base url to a resource
* @param String
* @return String
*/
const getResourceUrl = resource => {
    return `${BASE_URL}${resource}`;
}


/**
* Creates a GET request function for a resource
* @param resource
* @return Function
*/
const getResource = resource => {

    let url = getResourceUrl(resource);
    let parseResource = res => {
        if(res[resource]) {
            if(Array.isArray(res[resource]) && res[resource].length === 1) {
                return res[resource][0];
            } else {
                return res[resource];
            }

        }

        return res;
    };

    /**
    * Return GET request function
    * @param String|Object
    * @param Object
    * @return Promise<Object>
    */
    return (id, options = {}) => {

        let baseUrl = url;

        if(id && typeof id === 'string' || typeof id === 'number') {
            baseUrl = baseUrl + '/' + id;
        }

        if(typeof id === 'object') {
            options = id;
        }

        if(options && typeof options === 'object') {
            if(options.expand && Array.isArray(options.expand)) {
                options.expand = options.expand.join(',');
            }

            baseUrl = baseUrl + '?' + querystring.stringify(options);
        }

        return getRequest(baseUrl).then(parseResource);
    }
}

module.exports = {
    getResource,
    getResourceUrl,
    get: getRequest
};
