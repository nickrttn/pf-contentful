var fs = require('fs');
var express = require('express');
var fm = require('front-matter');
var marked = require('marked');
var contentful = require('contentful');
var config = require('../config/config');

var router = express.Router();

// Configure contentful
var client = contentful.createClient({
	space: 				config.contentful.space,
	accessToken: 	config.contentful.accessToken,
	resolveLinks: true
});

router.get('*', function(req, res, next) {
	client.space().then(function(space) {
		res.locals.title = space.name;
		next();
	});
});

/* GET home page. */
router.get('/', function(req, res, next) {
	client.entries({content_type: '2wKn6yEnZewu2SCCkus4as'})
		.then(function(entries) {
			res.render('portfolio/index', {
				posts: entries
			});
		});
});

// router.get('/rendezvous', function(req, res) {
// 	// construct the markdown file path
// 	var mdPath = 'posts' + req.url + '.md';

// 	// read, convert and render the file async
// 	fs.readFile(mdPath, 'utf-8', function(err, data) {
// 		var file = fm(data);
// 		res.render('portfolio/rendezvous', {
// 			title: 'Rendezvous | nickrttn',
// 			meta: file.attributes,
// 			content: marked(file.body)
// 		})
// 	});

// });

router.get('/:slug', function(req, res) {
	client.entries({ content_type: '2wKn6yEnZewu2SCCkus4as', 'fields.slug': req.params.slug })
		.then(function(entries) {
			res.render('portfolio/post.ejs', {
				postTitle: entries[0].fields.title,
				featuredImage: entries[0].fields.featuredImage,
				body: marked(entries[0].fields.body),
				categories: entries[0].fields.category,
				tags: entries[0].fields.tags
			});
		});
});

module.exports = router;
