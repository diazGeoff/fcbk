var express = require("express");
var parser = require("body-parser");
var _ = require("lodash");
var app = express( );

var allowCrossDomain = function( req, res, next ) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.engine('.html', require("ejs").__express);
app.set('view engine', 'html');
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));
app.set('views', __dirname + '../');
app.use(allowCrossDomain);

var users = [
	{
		"userId": "1",
		"email": "kristy@gmail.com",
		"name": "Kristy Almuete",
		"password": "123"
	},
	{
		"userId": "2",
		"email": "geoff@gmail.com",
		"name": "Geoff Diaz",
		"password": "456"
	}
];

var posts = [];

app.post('/user/auth' , function ( request , response ) {
	var cred = request.body;
	var user = _.where( users , {"email": cred.email , "password": cred.password} ).shift();

	if ( user ) {
		response.json( {
			"status": true,
			"message": "User Found",
			"data": user
		} );
	}else {
		response.json( {
			"status": false,
			"message": "User Not Found",			
		} );
	}
} );

app.post('/user/post' , function ( request , response ) {
	posts.push(request.body);

	response.json(request.body);
} );

app.post('/post/like' , function ( request , response ) {
	posts.map( 
		function find ( post ) {			
			if ( post.id == request.body.id ){
				var status;
				var index = _.indexOf(post.like , request.body.userLike);
				if (index < 0) {
					post.like.push( request.body.userLike );
					status = "Unlike";
				}else {
					_.remove(post.like , function ( like ) {
						return like == request.body.userLike;
					} );
					status = "Like";
				}
				response.json( { status: status } );
			}
			return post;
		} );	
} );

app.get('/get/all/post' , function ( request , response ) {
	response.json( posts );
} );

app.listen( 8000 );