var express = require('express');
var router = express.Router();
var contentful = require('contentful');
var config = require('../config/config');

// Configure contentful
var client = contentful.createClient({
	space: 				config.contentful.space,
	accessToken: 	config.contentful.accessToken,
	resolveLinks: true
});

/* GET home page. */
router.get('/', function(req, res, next) {
	client.entries({ content_type: '5KMiN6YPvi42icqAUQMCQe' })
		.then(function(entries) {
			res.render('index', {
				title: 'nickrttn',
				categories: entries
			});
		});
});

module.exports = router;
