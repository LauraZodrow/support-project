const request = require('request');
const parser = require('xml2json');
const express = require('express');
const _ = require('lodash');

const routes = express.Router();

routes.get('/latest-news/:board', (req, res) => {
  const board = req.params.board

  const APIKey = '83763672b224d323d2aec131d3ae19d0'
  request.get({
      url: `http://api.springer.com/metadata/json?q=keyword:${board}&api_key=${APIKey}`,
    }, function(err, response, body) {
      body = JSON.parse(body)
      const articles = _.map(body.records, function(value, key){
        return {
          title: value.publicationName,
          description: value.abstract,
          link: value.url[0].value,
          starCount: 0
        }
      })
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(articles));
  })

})

module.exports = routes;