
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , loginRoute = require('./routes/loginRoute')
  , path = require('path')
   , session = require('client-sessions');
var mongoSessionConnectURL = "mongodb://localhost:27017/db1";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");

var app = express();
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


// all environments
app.set('port', process.env.PORT || 3020);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
	console.log(req.session.email);
	/*if(req.session.email)
		{
			console.log("homepage");
			res.render("homepage",{username:req.session.email});
		}
	else
		{*/
		  	console.log("here");
			res.render('index');
		//}
});
app.get('/users', user.list);
app.get('/Friends', loginRoute.showFriends_1);
app.get('/Home', loginRoute.Home);
app.get('/group', loginRoute.Showgroup);
app.get('/Create_grp', loginRoute.Create_grp);
app.get('/group_home', loginRoute.group_home);
app.post('/showGrp', loginRoute.showGrp);
app.post('/checklogin',loginRoute.checklogin);
app.post('/checkfriend',loginRoute.checkfriend);
app.post('/Signup',loginRoute.signup);
app.post('/addfriend',loginRoute.addfriend);
app.post('/extract_req',loginRoute.extract_req);
app.post('/post_newsfeed',loginRoute.post_newsfeed);
app.post('/Accept_request',loginRoute.Accept_request);
app.post('/showFriends',loginRoute.showFriends);
app.post('/showFriends_2',loginRoute.showFriends_2);
app.post('/showMembers',loginRoute.showMembers);
app.post('/deleteMember',loginRoute.deleteMember);
app.post('/deleteGroup',loginRoute.deleteGroup);
app.post('/addMembers',loginRoute.addMembers);
app.post('/addMembers_1',loginRoute.addMembers_1);
app.post('/viewGroup',loginRoute.viewGroup);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
