
/*var user_det = new Array();
var friends = new Array();
var show_groups = new Array();
var news_feed = new Array();
var groupsss_name;
var show_friends = new Array();
var groupName;
var search_users = new Array();
var group_members = new Array();
var html_text;
var sent_email;
var sent_firstname;
var sent_lastname;
var pool1 = require('./sqlConnection');
*/
var news_feed = [];
var ejs = require("ejs");
var amqp = require('amqp');
//var mq_client = require('../rpc/client');
var connection = amqp.createConnection({host:'127.0.0.1'});
var rpc = new (require('../rpc/amqprpc'))(connection);
var email_id;
var firstname;
var lastname;
var groupName;
exports.checklogin = function(req,res)
{
	var email, password;
	email = req.param("email");
	password = req.param("password");
	var task = "login";
	var msg_payload = { "email": email, "password": password, "task": task };
	
	console.log("In POST Request = email:"+ email+" "+password);
	
	rpc.makeRequest('login_queue',msg_payload, function(err,results){ //login-queue is rpc queue name
		
		console.log(results);
		if(err){
			console.log("errro");
			throw err;
		}
		else 
		{
			
			if(results.code == 200){
				console.log("valid Login");
				req.session.email = results.email;
					
				email_id = results.email;
				firstname = results.firstname;
				lastname = results.lastname;
				//news_feed = results.array;
				res.send({"login":"Success"});
				//res.render("Home", {news_feed:results.news_feed});
			}
			
			else {    
				
				console.log("Invalid Login");
				res.send({"login":"Fail"});
			}
		}  
	});
	
}
	
	

exports.signup = function(req,res)
{
	var email, password, fname, lname, date_of_birth, gender;
	password = req.param("password");
	fname = req.param("fname");
	lname = req.param("lname");
	email = req.param("email");
	
	gender = req.param("gender");
	date_of_birth = req.param("date_of_birth");
	
	var task = "signup";
	var msg_payload = { "email": email, "password": password, "fname": fname, "lname": lname, "gender": gender, "date_of_birth": date_of_birth, "task": task };
	
	console.log("In POST Request = email:"+ email+" "+password);
	
	rpc.makeRequest('login_queue',msg_payload, function(err,results){ //login-queue is rpc queue name
		
		console.log(results);
		if(err){
			console.log("errro");
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				session = results.session;
				res.send({"login":"Success"});
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"login":"Fail"});
			}
		}  
	});
};


exports.Home = function(req,res)
{
	console.log("Session are "+ req.session.email);
	var task = "news_feed";
	var msg_payload = { "email": email_id, "firstname": firstname, "task": task };
	
	console.log("In POST Request Home HOme = email:"+ email_id+" "+firstname);
	
rpc.makeRequest('login_queue',msg_payload, function(err,results){ //login-queue is rpc queue name
		
		console.log("results ae:" + results);
		if(err){
			console.log("errro");
			throw err;
		}
		else 
		{
			
			if(results.code == 200 && results.news_feed != undefined){
				console.log("valid Login");
				//req.session.email = results.email;
				
				res.render("Home", {news_feed:results.news_feed, firstname: firstname});
			}
			else if(results.code != 200){    
				
				console.log("Invalid Login");
				res.render("Home", {news_feed:results.news_feed, firstname: firstname});
			}
			else{
				res.render("Home", {news_feed:results.news_feed, firstname: firstname});
			}
		}  
	});
	
	
		
};

exports.post_newsfeed = function(req, res){
	
	
	var text;
	text = req.param("text");
	var task = "post_newsfeed";
	var msg_payload = { "email": email_id, "firstname": firstname, "text":text, "task": task };
	
	console.log("In POST Request of posting news feed = email:"+ email_id+" "+firstname);
	
	rpc.makeRequest('login_queue',msg_payload, function(err,results){ //login-queue is rpc queue name
		
		console.log(results);
		if(err){
			console.log("errro");
			throw err;
		}
		else 
		{
			
			if(results.code == 200){
				console.log("valid Login");
				//req.session.email = results.email;
				
				//news_feed = results.array;
				res.send({"login":"Success"});
				//res.render("Home", {news_feed:results.news_feed});
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"login":"Fail"});
			}
		}  
	});
};



/*
exports.homepage = function(req, res){
	if(req.session.email !== 'undefined' && req.session.user_det !== 'undefined')
		
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		
		console.log("Here in homepage");
		console.log("html_text is: " + html_text);
		console.log(req.session.email);
		var i = 0;
		
		for(i = 0; i < user_det.length; i++){
			if(user_det[i].email == req.session.email)
				{
				   console.log(user_det[i].email);
				   break;
				   
				}
			
		}
		
		res.render("user_info", {user_det: user_det[i], html_text: html_text});
		
	}
	else
	{
		
		console.log("Back here");
		res.render('index');
	}
};

exports.errorLogin = function(req, res){
		
		res.render("errorLogin");
		
	};


/*exports.homepage_1 = function(req, res){
	if(req.session.email !== 'undefined' && req.session.user_det !== 'undefined')
		
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		
		console.log("Here in homepage_1");
		/*for(var i = 0; i < user_det.length; i++ )
		{
			console.log(user_det[i].college+ " " + user_det[i].contact + " " + user_det[i].place + " " + user_det[i].occupation);
		}*/
		//res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		/*res.render("user_info", {user_det: user_det, html_text: html_text});
	}
	else
	{
		
		console.log("Back here");
		res.render('index');
	}
};*/

/*
exports.about = function(req,res)
{
	
	if(req.session.email)
	{
		        res.render('user_info', {user_det: user_det, html_text:"nullo"});
				//user_det = undefined;
			
	}	
};
*/





exports.checkfriend = function(req, res){
	
	
	var firstname;
	var json_responses;
	firstname = req.param("firstname");
	var task = "checkfriend";
	var msg_payload = { "firstname": firstname, "task": task };
	
	//console.log("In POST Request = email:"+ email+" "+password);
	
	rpc.makeRequest('login_queue',msg_payload, function(err,results){ //login-queue is rpc queue name
		
		console.log(results);
		if(err){
			console.log("errro is" + err);
			throw err;
		}
		else 
		{
			
			if(results.code == 200){
				console.log("valid Login");
				//req.session.email = results.email;
				json_responses = {"statusCode" : 200};
				//news_feed = results.array;
				res.send({a:json_responses, match_frnd_results:results.match_frnd_results});
				//res.render("Home", {news_feed:results.news_feed});
			}
			else {    
				json_responses = {"statusCode" : 401};
				console.log("Invalid Login");
				res.send({a:json_responses, match_frnd_results:results.match_frnd_results});
			}
		}  
	});
	
	
	
	
	/*var checkQuery2 = "select a.firstname as firstname, a.email as email, b.Accepted_request as request_status from (select firstname, email from user where firstname = '" + firstname + "') a left join (select email, Accepted_request, friend_email from friends_info where friend_name = '" + firstname + "' and email = '" + req.session.email + "') b on a.email = b.friend_email;";
    search_users.push({
					firstname: result[0].firstname,
					email: result[0].email,
					request_status : result[0].request_status});
				json_responses = {"statusCode" : 200};
				res.send({a:json_responses, b:search_users});*/

};

exports.addfriend = function(req, res){
	
	var frnd_firstname, frnd_email;
	frnd_firstname = req.param("frnd_firstname");
	frnd_email = req.param("frnd_email");
	var json_responses;
	var task = "addFriend";
	var msg_payload = { "frnd_firstname": frnd_firstname,"frnd_email": frnd_email, "firstname": firstname, "lastname":lastname, "email":email_id, "task": task };
	
	//console.log("In POST Request = email:"+ email+" "+password);
	
	rpc.makeRequest('login_queue',msg_payload, function(err,results){ //login-queue is rpc queue name
		
		console.log(results);
		if(err){
			console.log("errro is" + err);
			throw err;
		}
		else 
		{
			
			if(results.code == 200){
				console.log("valid Login");
				//req.session.email = results.email;
				json_responses = {"statusCode" : 200};
				//news_feed = results.array;
				res.send(json_responses);
				//res.render("Home", {news_feed:results.news_feed});
			}
			else {    
				json_responses = {"statusCode" : 401};
				console.log("Invalid Login");
				res.send(json_responses);
			}
		}  
	});
	
};


exports.extract_req = function(req,res)
{
	var task = "extract_req";
	var msg_payload = { "email": email_id, "firstname": firstname, "task": task };
	
	console.log("In POST Request extract_req extract_req = email:"+ email_id+" "+firstname);
	
rpc.makeRequest('login_queue',msg_payload, function(err,results){ //login-queue is rpc queue name
		
		console.log("results ae:" + results);
		if(err){
			console.log("errro");
			throw err;
		}
		else 
		{
			
			if(results.code == 401){
				console.log("Invalid Login");
				res.send({"login":"Fail",req:results.Pendingreq});
				
			}
			else {    
				console.log("valid Login");
				//req.session.email = results.email;
				
				//news_feed = results.array;
				res.send({"login":"Success","request_array":results });
				//res.render("Home", {news_feed:results.news_feed});
				
			}
		}  
	});
	
	
		
};


/*
exports.deletefriend = function(req, res){
	
	var firstname, email;
	firstname = req.param("firstname");
	email = req.param("email");
	
	var json_responses;
	sent_firstname = req.session.firstname;
	sent_lastname = req.session.lastname;
	sent_email = req.session.email;
	var checkQuery8 = "delete from friends_info where (email = '"+ req.session.email+ "' and friend_email = '"+ email + "') or (email = '"+ email + "' and friend_email = '"+ req.session.email + "');";
	pool1.fetchData(function(err,result){
		if(err){
			console.log(err);
			res.end(err);
			
		}
		else{
				
			json_responses = {"statusCode" : 200};
			res.send(json_responses);
			
		}	
	
},checkQuery8);
};
*/
exports.Accept_request = function(req, res){
	var req_sent, pr_email;
	req_sent = req.param("req_sent");
	
	var request_firstname = req.param("request_firstname");
	var task = "accept_request";
	var msg_payload = { "req_email": req_sent, "pr_email": email_id, "req_firstname":request_firstname,"firstname": firstname, "lastname": lastname,  "task": task };
	
//console.log("In POST Request extract_req extract_req = email:"+ email_id+" "+firstname);
	
rpc.makeRequest('login_queue',msg_payload, function(err,results){ //login-queue is rpc queue name
		
		console.log("results ae:" + results);
		if(err){
			console.log("errro");
			throw err;
		}
		else 
		{
			
			if(results.code == 401){
				console.log("Invalid Login");
				res.send({"login":"Fail"});
				
			}
			else {    
				console.log("valid Login");
				//req.session.email = results.email;
				
				//news_feed = results.array;
				res.send({"login":"Success"});
				//res.render("Home", {news_feed:results.news_feed});
				
			}
		}  
	});
	
	
		
};

exports.Create_grp = function(req,res)
{
	
	if(req.session.email)
	{
		        res.render('Create_grp');
				//user_det = undefined;
			
	}
	else
		{
		   res.render('index');
		}
};

exports.showFriends = function(req, res){

	var group_name; 
	group_name = req.grp_name;
	var task = "showFriends";
	var msg_payload = { email: email_id, "task": task };
	
//console.log("In POST Request extract_req extract_req = email:"+ email_id+" "+firstname);
	
rpc.makeRequest('login_queue',msg_payload, function(err,results){ //login-queue is rpc queue name
		
		console.log("results ae:" + results);
		if(err){
			console.log("errro");
			throw err;
		}
		else 
		{
			
			if(results.code == 401){
				console.log("Invalid Login");
				res.send({"login":"Fail"});
				
			}
			else {    
				console.log("valid Login");
				//req.session.email = results.email;
				
				//news_feed = results.array;
				res.send({"login":"Success", "friends_list":results.friends_list});
				//res.render("Home", {news_feed:results.news_feed});
				
			}
		}  
	});
};


exports.showFriends_1 = function(req, res){

	var group_name; 
	group_name = req.grp_name;
	var task = "showFriends";
	var msg_payload = { email: email_id, "task": task };
	
//console.log("In POST Request extract_req extract_req = email:"+ email_id+" "+firstname);
	
rpc.makeRequest('login_queue',msg_payload, function(err,results){ //login-queue is rpc queue name
		
		console.log("results ae:" + results);
		if(err){
			console.log("errro");
			throw err;
		}
		else 
		{
			
			if(results.code == 401){
				console.log("Invalid Login");
				res.send({"login":"Fail"});
				
			}
			else {    
				console.log("valid Login");
				//req.session.email = results.email;
				
				//news_feed = results.array;
				
				res.render("friends", {"friends_list":results.friends_list});
				
			}
		}  
	});
};


exports.Showgroup = function(req, res){

	
	var task = "Showgroup";
	var msg_payload = { "email": email_id, "task": task };
	console.log("email is "+ email_id);
//console.log("In POST Request extract_req extract_req = email:"+ email_id+" "+firstname);
	
rpc.makeRequest('login_queue',msg_payload, function(err,results){ //login-queue is rpc queue name
		
		console.log("results ae:" + results);
		if(err){
			console.log("errro");
			throw err;
		}
		else 
		{
			
			if(results.code == 401){
				console.log("Invalid Login");
				res.send({"login":"Fail"});
				
			}
			else {    
				console.log("valid Login");
				//req.session.email = results.email;
				
				//news_feed = results.array;
				
				res.render("groups", {"groups_list":results.groups_list});
				
			}
		}  
	});
};



exports.showFriends_2 = function(req, res){
	var task = "showFriends_2";
	var msg_payload = { "email": email_id, "firstname": firstname, "groupName": groupName, "task": task };
	
//console.log("In POST Request extract_req extract_req = email:"+ email_id+" "+firstname);
	
rpc.makeRequest('login_queue',msg_payload, function(err,results){ //login-queue is rpc queue name
		
		console.log("results ae:" + results);
		if(err){
			console.log("errro");
			throw err;
		}
		else 
		{
			
			if(results.code == 401){
				console.log("Invalid Login");
				res.send({"login":"Fail"});
				
			}
			else {    
				console.log("valid Login");
				//req.session.email = results.email;
				
				//news_feed = results.array;
				res.send({"login":"Success", "friends_list":results.friends_list});
				//res.render("Home", {news_feed:results.news_feed});
				
			}
		}  
	});
};



exports.showMembers = function(req, res){
	var task = "showMembers";
	var msg_payload = { "groupName": groupName, "task": task };
	
//console.log("In POST Request extract_req extract_req = email:"+ email_id+" "+firstname);
	
rpc.makeRequest('login_queue',msg_payload, function(err,results){ //login-queue is rpc queue name
		
		console.log("results ae:" + results);
		if(err){
			console.log("errro");
			throw err;
		}
		else 
		{
			
			if(results.code == 401){
				console.log("Invalid Login");
				res.send({"login":"Fail"});
				
			}
			else {    
				console.log("valid Login");
				//req.session.email = results.email;
				
				//news_feed = results.array;
				res.send({"login":"Success", "members_list":results.members_list});
				//res.render("Home", {news_feed:results.news_feed});
				
			}
		}  
	});
};


exports.addMembers = function(req, res){
	
	var groupName;
	var firstname, email;
	groupName = req.param("grp_name");
	firstname = req.param("firstname");
	email = req.param("email");
	var task = "addMembers";
	var msg_payload = { groupName: groupName, firstname: firstname, email: email, "task": task };
	
//console.log("In POST Request extract_req extract_req = email:"+ email_id+" "+firstname);
	
rpc.makeRequest('login_queue',msg_payload, function(err,results){ //login-queue is rpc queue name
		
		console.log("results ae:" + results);
		if(err){
			console.log("errro");
			throw err;
		}
		else 
		{
			
			if(results.code == 401){
				console.log("Invalid Login");
				res.send({"login":"Fail"});
				
			}
			else {    
				console.log("valid Login");
				//req.session.email = results.email;
				
				//news_feed = results.array;
				res.send({"login":"Success"});
				//res.render("Home", {news_feed:results.news_feed});
				
			}
		}  
	});
	
};


exports.addMembers_1 = function(req, res){
	
	
	var firstname, email;
	
	firstname = req.param("firstname");
	email = req.param("email");
	var task = "addMembers";
	var msg_payload = { groupName: groupName, firstname: firstname, email: email, "task": task };
	
//console.log("In POST Request extract_req extract_req = email:"+ email_id+" "+firstname);
	
rpc.makeRequest('login_queue',msg_payload, function(err,results){ //login-queue is rpc queue name
		
		console.log("results ae:" + results);
		if(err){
			console.log("errro");
			throw err;
		}
		else 
		{
			
			if(results.code == 401){
				console.log("Invalid Login");
				res.send({"login":"Fail"});
				
			}
			else {    
				console.log("valid Login");
				//req.session.email = results.email;
				
				//news_feed = results.array;
				res.send({"login":"Success"});
				//res.render("Home", {news_feed:results.news_feed});
				
			}
		}  
	});
	
};


exports.viewGroup = function(req,res)
{
	var json_responses;
	groupName = req.param("grp_name");
	console.log("name is: " + groupName);
	var task = "addAdmin";
	var msg_payload = { groupName: groupName, firstname: firstname, email: email_id, "task": task };
	
//console.log("In POST Request extract_req extract_req = email:"+ email_id+" "+firstname);
	
rpc.makeRequest('login_queue',msg_payload, function(err,results){ //login-queue is rpc queue name
		
		console.log("results ae:" + results);
		if(err){
			console.log("errro");
			throw err;
		}
		else 
		{
			
			if(results.code == 401){
				console.log("Invalid Login");
				res.send({"login":"Fail"});
				
			}
			else {    
				console.log("valid Login");
				//req.session.email = results.email;
				
				//news_feed = results.array;
				res.send({"login":"Success"});
				//res.render("Home", {news_feed:results.news_feed});
				
			}
		}  
	});
	
	
};


exports.deleteMember = function(req,res)
{
	
	var firstname = req.param("firstname");
	var email = req.param("email");
	console.log("name is: " + groupName);
	var task = "deleteMember";
	
	var msg_payload = { groupName: groupName, "firstname": firstname, "email": email, "task": task };
	
//console.log("In POST Request extract_req extract_req = email:"+ email_id+" "+firstname);
	
rpc.makeRequest('login_queue',msg_payload, function(err,results){ //login-queue is rpc queue name
		
		console.log("results ae:" + results);
		if(err){
			console.log("errro");
			throw err;
		}
		else 
		{
			
			if(results.code == 401){
				console.log("Invalid Login");
				res.send({"login":"Fail"});
				
			}
			else {    
				console.log("valid Login");
				//req.session.email = results.email;
				
				//news_feed = results.array;
				res.send({"login":"Success"});
				//res.render("Home", {news_feed:results.news_feed});
				
			}
		}  
	});
	
	
};


exports.deleteGroup = function(req,res)
{
	
	console.log("name is: " + groupName);
	var task = "deleteGroup";
	
	var msg_payload = { groupName: groupName, "task": task };
	
//console.log("In POST Request extract_req extract_req = email:"+ email_id+" "+firstname);
	
rpc.makeRequest('login_queue',msg_payload, function(err,results){ //login-queue is rpc queue name
		
		console.log("results ae:" + results);
		if(err){
			console.log("errro");
			throw err;
		}
		else 
		{
			
			if(results.code == 401){
				console.log("Invalid Login");
				res.send({"login":"Fail"});
				
			}
			else {    
				console.log("valid Login");
				//req.session.email = results.email;
				
				//news_feed = results.array;
				res.send({"login":"Success"});
				//res.render("Home", {news_feed:results.news_feed});
				
			}
		}  
	});
	
	
};


exports.group_home = function(req, res){
	if(req.session.email !== 'undefined')
		
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		
		console.log("Here in group_home");
		console.log(req.session.email);	
		//console.log(groupName);	
		res.render("groupHome", {groupName:groupName});
		
	}
	else
	{
		
		console.log("Back here");
		res.render('index');
	}
};

exports.showGrp = function(req, res){
	var group_name = req.param("grp_name");
	if(req.session.email !== 'undefined')
		
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		
		console.log("Here in group_home");
		console.log(req.session.email);	
		//console.log(groupName);	
		res.render("groupHome", {groupName:group_name});
		
	}
	else
	{
		
		console.log("Back here");
		res.render('index');
	}
};


	
/*
exports.showFriends_2 = function(req, res){
	groupsss_name = groupName;
	console.log("1 is: " + groupsss_name);
	var json_responses; 
	var counter = 0;
	var checkQuery9 = "select friend_name as friend_name, friend_email as friend_email from  (select friend_name as friend_name, friend_email as friend_email from friends_info where email = '" + req.session.email + "') a where friend_email not in (select email from groups where grp_name = '" + groupName + "');";
	pool1.fetchData(function(err,result){
		if(err){
			console.log(err);
			res.end(err);
			
		}
		else{
		            
		            
			var j = 0;
		       while(j < result.length)
		    	{ 
		    	   show_friends.push({
		    	   friend_name: result[j].friend_name,
		    	   friend_email: result[j].friend_email
				});
		    	   j++;
		    	}   
		          
				json_responses = {"statusCode" : 200};
				res.send({a:json_responses, b:show_friends});
		
}
	
},checkQuery9);
};


exports.showFriends = function(req, res){

	var json_responses; 
	var counter = 0;
	var checkQuery14 = "select friend_name as friend_name, friend_email as friend_email from friends_info where email = '" + req.session.email + "';";
	pool1.fetchData(function(err,result){
		if(err){
			console.log(err);
			res.end(err);
			
		}
		else{
		           var j = 0;
			       while(j < result.length)
			    	{ 
			    	   friends.push({
			    	   friend_name: result[j].friend_name,
			    	   friend_email: result[j].friend_email
					});
			    	   j++;
			    	}   
		}
				json_responses = {"statusCode" : 200};
				res.send({a:json_responses, b:friends});
		

	
},checkQuery14);
};



exports.showFriends_1 = function(req, res){

	var json_responses; 
	var counter = 0;
	var checkQuery14 = "select friend_name as friend_name, friend_email as friend_email from friends_info where email = '" + req.session.email + "';";
	pool1.fetchData(function(err,result){
		if(err){
			console.log(err);
			res.end(err);
			
		}
		else{
		           var j = 0;
			       while(j < result.length)
			    	{ 
			    	   friends.push({
			    	   friend_name: result[j].friend_name,
			    	   friend_email: result[j].friend_email
					});
			    	   j++;
			    	} 
			       for(var i = 0; i < friends.length; i++)
			       {
			    	   console.log("friends are: " + friends[i].friend_email);
			       }
		}
				json_responses = {"statusCode" : 200};
				res.render('friends', {friends:friends});
		

	
},checkQuery14);
};


exports.showMembers = function(req, res){
	
	var json_responses; 
	var counter = 0;
	var checkQuery15 = "select firstname as firstname, email as email from groups where grp_name = '" + groupName + "';";
	pool1.fetchData(function(err,result){
		if(err){
			console.log(err);
			res.end(err);
			
		}
		else{
			var j = 0;
		       while(j < result.length)
		    	{ 
		    	   group_members.push({
		    	   firstname: result[j].firstname,
		    	   email: result[j].email
				});
		    	   j++;
		    	}   
				json_responses = {"statusCode" : 200};
				res.send({a:json_responses, b:group_members});
		
}
	
},checkQuery15);
};


exports.deleteMember = function(req, res){
	
	var json_responses, firstname, email; 
	
	
	firstname = req.param("firstname");
	email = req.param("email");
	var checkQuery25 = "delete from groups where grp_name = '" + groupName + "' and email = '" + email + "';";
	pool1.fetchData(function(err,result){
		if(err){
			console.log(err);
			res.end(err);
			
		}
		else{
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
		
}
	
},checkQuery25);
};

exports.deleteGroup = function(req, res){
	
	var json_responses;
	
	var checkQuery26 = "delete from groups where grp_name = '" + groupName + "';";
	pool1.fetchData(function(err,result){
		if(err){
			console.log(err);
			res.end(err);
			
		}
		else{
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
		
}
	
},checkQuery26);
};

exports.group = function(req, res){
	
	var json_responses;
	
	var checkQuery27 = "select grp_name as grp_name from groups where email = '" + req.session.email + "';";
	pool1.fetchData(function(err,result){
		if(err){
			console.log(err);
			res.end(err);
			
		}
		else{
			   var j = 0;
		       while(j < result.length)
		    	{ 
		    	   show_groups.push({
		    	   grp_name: result[j].grp_name,
		    	   
				});
		    	   j++;
		    	   
		    	}   
			    json_responses = {"statusCode" : 200};
				res.render('groups',{show_groups:show_groups});
		
}
	
},checkQuery27);
};

exports.addMembers = function(req, res){
	
	
	var firstname, email;
	groupName = req.param("grp_name");
	firstname = req.param("firstname");
	email = req.param("email");
	var json_responses; 
	var checkQuery10 = "insert into groups values('"+firstname+"', '"+email+"', '"+groupName+"', '"+req.session.firstname+"', '"+req.session.email+"');";
	
	pool1.fetchData(function(err,result){
		if(err){
			console.log(err);
			res.end(err);
			
		}
		else{
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
		
}
	
},checkQuery10);
};


exports.addMembers_1 = function(req, res){
	
	
	var firstname, email;
	firstname = req.param("firstname");
	email = req.param("email");
	var json_responses; 
	console.log("2 is : " +  groupsss_name);
	var checkQuery19 = "insert into groups values('"+firstname+"', '"+email+"', '"+ groupsss_name + "', '"+req.session.firstname+"', '"+req.session.email+"');";
	
	pool1.fetchData(function(err,result){
		if(err){
			console.log(err);
			res.end(err);
			
		}
		else{
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
		
}
	
},checkQuery19);
};

exports.Create_grp = function(req,res)
{
	
	if(req.session.email)
	{
		        res.render('Create_grp');
				//user_det = undefined;
			
	}
	else
		{
		   res.render('index');
		}
};



exports.viewGroup = function(req,res)
{
	var json_responses;
	groupName = req.param("group_name");
	console.log("name is: " + groupName);
	json_responses = {"statusCode" : 200};
	res.send(json_responses);
	
};

exports.group_home = function(req, res){
	if(req.session.email !== 'undefined')
		
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		
		console.log("Here in group_home");
		console.log(req.session.email);	
		console.log(groupName);	
		res.render("groupHome", {groupName:groupName});
		
	}
	else
	{
		
		console.log("Back here");
		res.render('index');
	}
};


exports.post_newsfeed = function(req, res){
	
	
	var text;
	text = req.param("text");
	var json_responses;
	var checkQuery20 = "insert into news_feed values('"+req.session.email+"', '"+req.session.firstname+"', '"+ text + "');";
	pool1.fetchData(function(err,result){
		if(err){
			console.log(err);
			res.end(err);
			
		}
		else{
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
		
}
	
},checkQuery20);
};

exports.saveMusic = function(req, res){
	
	
	var music, sports, show;
	music = req.param("music");
	sports = req.param("sports");
	show = req.param("show");
	var json_responses;
	var checkQuery23 = "insert into interests values('"+req.session.email+"', '"+req.session.firstname+"', '"+ music + "', '"+ show + "', '"+ sports + "');";
	pool1.fetchData(function(err,result){
		if(err){
			console.log(err);
			res.end(err);
			
		}
		else{
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
		
}
	
},checkQuery23);
};



exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/');
};
*/
