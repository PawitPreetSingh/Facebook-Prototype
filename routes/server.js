//super simple rpc server example
var express = require('express')
, http = require('http')
, path = require('path');

var app = express();
app.set('port', process.env.PORT || 3010);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

var amqp = require('amqp')
, util = require('util');
var mongoSessionConnectURL = "mongodb://localhost:27017/db1";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require('./mongo');
app.use(expressSession({
	secret: 'cmpe273_teststring',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));

var database_query = require('./database_query');

var cnn = amqp.createConnection({host:'127.0.0.1'});

cnn.on('ready', function(){
	console.log("listening on login_queue");

	cnn.queue('login_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			console.log("message.task: "+ message.task);
			var t = message.task;
			console.log("t is: " + t);
			if(t === "login")
			{
			    console.log("inside value oof t: " + t);
			    database_query.handle_request(message, function(err,res){
               console.log("inside server");
               console.log("server.replyto "+ m.replyTo);
                console.log("server.id "+ m.correlationId);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
			}
			else if(t === "signup")
			{
				console.log("inside value snfzjkdzsdbzsdbdoof t: " + t);
				database_query.handle_request_1(message, function(err,res){
		            console.log("inside server");
		            console.log("server.replyto "+ m.replyTo);
		            console.log("server.id "+ m.correlationId);
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				
			}
			else if(t === "news_feed"){
				console.log("inside value of t: " + t);
				database_query.news_feed(message, function(err,res){
		            console.log("inside server");
		            console.log("server.replyto "+ m.replyTo);
		            console.log("server.id "+ m.correlationId);
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			else if(t === "post_newsfeed"){
				console.log("inside value of t: " + t);
				database_query.post_newsfeed(message, function(err,res){
		            console.log("inside server");
		            console.log("server.replyto "+ m.replyTo);
		            console.log("server.id "+ m.correlationId);
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			
			else if(t === "checkfriend"){
				console.log("inside value of t: " + t);
				database_query.checkfriend(message, function(err,res){
		            console.log("inside server");
		            console.log("server.replyto "+ m.replyTo);
		            console.log("server.id "+ m.correlationId);
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			
			else if(t === "addFriend"){
				console.log("inside value of t: " + t);
				database_query.addFriend(message, function(err,res){
		            console.log("inside server");
		            console.log("server.replyto "+ m.replyTo);
		            console.log("server.id "+ m.correlationId);
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			else if(t === "extract_req"){
				console.log("inside value of t: " + t);
				database_query.extract_req(message, function(err,res){
		            console.log("inside server");
		            console.log("server.replyto "+ m.replyTo);
		            console.log("server.id "+ m.correlationId);
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			else if(t === "accept_request"){
				console.log("inside value of t: " + t);
				database_query.accept_request(message, function(err,res){
		            console.log("inside server");
		            console.log("server.replyto "+ m.replyTo);
		            console.log("server.id "+ m.correlationId);
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			
			else if(t === "showFriends"){
				console.log("inside value of t: " + t);
				database_query.showFriends(message, function(err,res){
		            console.log("inside server");
		            console.log("server.replyto "+ m.replyTo);
		            console.log("server.id "+ m.correlationId);
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			
			else if(t === "addMembers"){
				console.log("inside value of t: " + t);
				database_query.addMembers(message, function(err,res){
		            console.log("inside server");
		            console.log("server.replyto "+ m.replyTo);
		            console.log("server.id "+ m.correlationId);
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			
			else if(t === "addAdmin"){
				console.log("inside value of t: " + t);
				database_query.addAdmin(message, function(err,res){
		            console.log("inside server");
		            console.log("server.replyto "+ m.replyTo);
		            console.log("server.id "+ m.correlationId);
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			
			else if(t === "showFriends_2"){
				console.log("inside value of t: " + t);
				database_query.showFriends_2(message, function(err,res){
		            console.log("inside server");
		            console.log("server.replyto "+ m.replyTo);
		            console.log("server.id "+ m.correlationId);
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			
			else if(t === "Showgroup"){
				console.log("inside value of t: " + t);
				database_query.Showgroup(message, function(err,res){
		            console.log("inside server");
		            console.log("server.replyto "+ m.replyTo);
		            console.log("server.id "+ m.correlationId);
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			
			
			else if(t === "showMembers"){
				console.log("inside value of t: " + t);
				database_query.showMembers(message, function(err,res){
		            console.log("inside server");
		            console.log("server.replyto "+ m.replyTo);
		            console.log("server.id "+ m.correlationId);
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			
			else if(t === "deleteMember"){
				console.log("inside value of t: " + t);
				database_query.deleteMember(message, function(err,res){
		            console.log("inside server");
		            console.log("server.replyto "+ m.replyTo);
		            console.log("server.id "+ m.correlationId);
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			
			else if(t === "deleteGroup"){
				console.log("inside value of t: " + t);
				database_query.deleteGroup(message, function(err,res){
		            console.log("inside server");
		            console.log("server.replyto "+ m.replyTo);
		            console.log("server.id "+ m.correlationId);
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			
			
		});
	});
});

mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
});