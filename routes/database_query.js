var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/db1";
var notify = new Array();
var groupName;
console.log("han aaa gaya");
function handle_request(req, callback){

	var res = {};
	
	var email = req.email;
	var password = req.password;
	if(email == undefined || password == undefined)
	{
		res.code = "401";
		res.value = "Failed Login";
		callback(null, res);
	}
	else{
	console.log("email is:" + email);
	console.log("password is:" + password);
	console.log("In handle request:"+ req.email);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');
        console.log("coll is:" + coll);
		coll.findOne({"email": email, "password": password}, function(err, user){
			console.log("user is:" + user);
			if (user) {
				// This way subsequent requests will know the user is logged in.
				//req.session.email = user.email;
				console.log("user for session is" + user.email);
				
				res.code = "200";
				res.value = "Succes Login";
		        res.email = user.email ;
		        res.firstname = user.firstname;
		        res.lastname = user.lastname;
		        
	}
	else{
		res.code = "401";
		res.value = "Failed Login";
	}
	console.log("res.code is" + res.code);		
	callback(null, res);
});
	});	
}
}

function handle_request_1(req, callback){

	var res = {};
	
	var email = req.email;
	var password = req.password;
	var firstname = req.fname;
	var lastname = req.lname;
	var gender = req.gender;
	var date_of_birth = req.date_of_birth;
	console.log("email is:" + email);
	console.log("password is:" + password);
	
	console.log("firstname is:" + firstname);
	console.log("In handle request:"+ req.email);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');
        console.log("coll is:" + coll);
        coll.insert({"email": email, "password": password, "firstname" : firstname, "lastname" : lastname, "gender" : gender, "date_of_birth": date_of_birth});
		coll.findOne({"email": email, "password": password}, function(err, user){
			console.log("user is:" + user);
			if (user) {
				// This way subsequent requests will know the user is logged in.
				
				console.log("user for session is" + user.email);
				res.code = "200";
				res.value = "Succes Login";
		        res.session = user.email ;
	}
	else{
		res.code = "401";
		res.value = "Failed Login";
	}
	callback(null, res);
});
	});	
}

function news_feed(req, callback){

	var res = {};
	var array2 = [];
	var array1 = [];
	var array3 = [];
	console.log("happy");
	var email = req.email;
	var firstname = req.firstname;
	if(email == undefined)
	{
		console.log("happy132");
		res.code = "401";
		res.value = "Failed Login";
		callback(null, res);
	}
	else{
	console.log("email is:" + email);
	
	console.log("In handle request:"+ req.email);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('news_feed');
        console.log("coll is:" + coll);
        coll.find({}).toArray(function(err, user){
			console.log("user is:" + user);
			
			if (user) {
				for(var i = 0; i < user.length; i++){
					array1.push({
						email: user[i].email,
						firstname: user[i].firstname,
						post: user[i].post
					});
				}
				for( var t=0; t < array1.length; t++){
					console.log("email os posted aasasa is :" + array1[t].email);
				}
				
				var coll2 = mongo.collection('Friends');
		        console.log("coll is:" + coll);
		        coll2.find({email:email, req_status: "1"}, {frnd_email:1}).toArray(function(err, user){
					console.log("user is:" + user);
					var j = 0;
					if (user.length > 0) {
						
						
						for(var i = 0; i < user.length; i++){
							array2.push({
								email: user[i].frnd_email
							});
						}
						
						for( var t=0; t < array2.length; t++){
							console.log("frnd is :" + array2[t].email);
						}
						
						
						for(var k = 0; k < array1.length; k++){
							var x = array1[k].email;
							console.log(" x is "+ x);
							for(var n = 0; n < array2.length; n++){
								console.log("array[2].email is "+ array2[n].email);
								if(x == array2[n].email || x == email){
									console.log("ok inserted");
									array3.push({
										email: array1[k].email,
										firstname: array1[k].firstname,
										post: array1[k].post
									});
								}
							}
						}
						
						
						res.news_feed = array3;			
						res.code = "200";
						res.value = "Succes Login";
						
				        
				        
			}
					
			/*else if(array2.length <= 0){
				console.log("yahan a a gaye humm");
				res.news_feed = array1;
				res.code = "200";
				res.value = "Succes Login";
			}*/
					
			else{
				var array4 = [];
				for(var p = 0; p < array1.length; p++){
					if(array1[p].email == email){
						array4.push({
							email: array1[p].email,
							firstname: array1[p].firstname,
							post: array1[p].post
						});
					}
				}
					
				//res.news_feed = array1;
				res.news_feed = array4;
				res.code = "200";
				res.value = "Succes Login";
			}
					
			callback(null, res);
		});
				
		        for( var t=0; t < array3.length; t++){
					console.log("email who posted the post is:" + array3[t].email);
				}
				console.log("length is:" + array3.length);
				//res.news_feed = array3;			
				res.code = "200";
				res.value = "Succes Login";
		        
		        
	}
	else{
		//res.news_feed = user;
		res.code = "401";
		res.value = "Failed Login";
	}
			
	//callback(null, res);
});
	});	
}
}



function post_newsfeed(req, callback){

	var res = {};
	
	var email = req.email;
	var firstname = req.firstname;
	var text = req.text;
	if(email == undefined)
	{
		res.code = "401";
		res.value = "Failed Login";
		callback(null, res);
	}
	else{
	console.log("email is:" + email);
	
	console.log("In handle request:"+ req.email);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('news_feed');
        console.log("coll is:" + coll);
        
        coll.insert({"email":email, "firstname":firstname, "post":text}, function(err, user){
			console.log("user is:" + user);
			if (user) {
				
				// This way subsequent requests will know the user is logged in.
				//req.session.email = user.email;
				res.code = "200";
				res.value = "Succes Login";
		        console.log("ethhet ethhet");
		        
	}
	else{
		res.code = "401";
		res.value = "Failed Login";
	}
			
	callback(null, res);
});
	});	
}
}

function checkfriend(req, callback){

	var res = {};
	
	
	var firstname = req.firstname;
	
	if(firstname == undefined)
	{
		res.code = "401";
		res.value = "Failed Login";
		callback(null, res);
	}
	else{
	console.log("in checkfriend query");
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');
        console.log("coll is:" + coll);
        
        coll.find({"firstname": firstname}, {"email":1, "firstname":1,"lastname":1}).toArray(function(err, user){
			console.log("user is:" + user);
			if (user) {
				for(var i = 0; i < user.length; i++){
					console.log(user[i].email);
					console.log(user[i].firstname);
				}
				
				// This way subsequent requests will know the user is logged in.
				//req.session.email = user.email;
				res.code = "200";
				console.log("asjkdjjsjbfjbfhdsbhjsfhsdfhsfhsfhdshfsdhfsdhbfbshflsf:  "+ user.email);
				console.log("asjkdjjsjbfjbfhdsbhjsfhsdfhsfhsfhdshfsdhfsdhbfbshflsf:  "+ user.firstname);
				res.match_frnd_results = user;
				res.value = "Succes Login";
		        console.log("ethh");
		        
	}
	else{
		res.code = "401";
		res.value = "Failed Login";
	}
			
	callback(null, res);
});
	});	
}
}


function addFriend(req, callback){

	var res = {};
	var firstname = req.firstname;
	var lastname = req.lastname;
	var email = req.email;
	var frnd_email = req.frnd_email;
	var frnd_firstname = req.frnd_firstname;
	
	
	
	if(firstname == undefined)
	{
		res.code = "401";
		res.value = "Failed Login";
		callback(null, res);
	}
	else{
	console.log("in checkfriend query");
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('Friends');
        console.log("coll is:" + coll);
        
        coll.insert({"firstname": firstname, "lastname":lastname, "email":email, "frnd_firstname": frnd_firstname, "frnd_email": frnd_email, "req_status": "0"}, function(err, user){
			console.log("user is:" + user);
			if (user) {
				var coll2 = mongo.collection('Requests');
				
				coll2.insert({"email": frnd_email, "firstname":frnd_firstname, "request_sent": email, "request_firstname":firstname,  "requests": "You have got a new friend request from " + firstname + " " + lastname}, function(err, user){
					if(user){
						res.code = "200";
						res.value = "Succes Login";
				        console.log("ethh");
				        
			}
			else{
				res.code = "401";
				res.value = "Failed Login";
			}
					
			callback(null, res);
		});
				// This way subsequent requests will know the user is logged in.
				//req.session.email = user.email;
				res.code = "200";
				res.value = "Succes Login";
		        console.log("ethh");
		        
	}
	else{
		res.code = "401";
		res.value = "Failed Login";
	}
			
	callback(null, res);
});
        });
	
}
}

function extract_req(req, callback){

	var res = {};
	var email = req.email;
	var firstname = req.firstname;
	console.log("email in extaract req is "+ email);
	if(email == undefined)
	{
		console.log("happy132");
		res.code = "401";
		res.value = "Failed Login";
		callback(null, res);
	}
	else{
	console.log("email is:" + email);
	
	console.log("In handle request:"+ req.email);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('Requests');
        console.log("coll is:" + coll);
        coll.find({"email": email}).toArray(function(err, user){
			console.log("user is:" + user);
			
			if (user) {
				
				// This way subsequent requests will know the user is logged in.
				//req.session.email = user.email;
				//console.log("user for session is"+ user.email);
				console.log("length is:" + user.length);
				res= user;		
				console.log("extract request isisisisis   "+ user);
				console.log("extract request isisisisis   "+ user.requests);
		        
		        
	}
	else{
		res.Pendingreq = user;		
		res.code = "401";
		res.value = "Failed Login";
	}
			
	callback(null, res);
});
	});	
}
}

function accept_request(req, callback){

	var res = {};
	var req_sent = req.req_email;
	var pr_email = req.pr_email;
	var req_firstname = req.req_firstname;
	var firstname = req.firstname;
	var lastname = req.lastname;
	console.log("req_sent is "+req_sent);
	console.log("pr_email is "+pr_email);
	console.log("req_firstname is "+req_firstname);
	console.log("firstname is "+firstname);
	console.log("lastname is "+lastname);
	
	if(req_sent == undefined)
	{
		res.code = "401";
		res.value = "Failed Login";
		callback(null, res);
		console.log("failed in accept _login");
	}
	else{
	console.log("in accept_request query");
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('Friends');
        console.log("coll is:" + coll);
        coll.update({"email": req_sent, "frnd_email":pr_email}, {$set: {"req_status":"1"}}, function(err, user){
			console.log("user is:" + user);
			if (user) {
				
				coll.insert({"firstname": firstname, "lastname":lastname, "email":pr_email, "frnd_firstname": req_firstname, "frnd_email": req_sent, "req_status": "1"}, function(err, user){
					if(user){
						var coll2 = mongo.collection('Requests');
						coll2.update({"email":pr_email , "request_sent":req_sent},{$set: {"requests":"1"}}, function(err, user){
							if(user){
								res.code = "200";
								res.value = "Succes Login";
						        console.log("ethh");
						        
					}
					else{
						res.code = "401";
						res.value = "Failed Login";
					}
							
					callback(null, res);
				});
						
						
						res.code = "200";
						res.value = "Succes Login";
				        console.log("ethh");
				        
			}
			else{
				res.code = "401";
				res.value = "Failed Login";
			}
					
			callback(null, res);
		});
				// This way subsequent requests will know the user is logged in.
				//req.session.email = user.email;
				res.code = "200";
				res.value = "Succes Login";
		        console.log("ethh");
		        
	}
	else{
		res.code = "401";
		res.value = "Failed Login";
	}
			
	callback(null, res);
});
        });
	
}
}

function showFriends(req, callback){

	var res = {};
	
	var email = req.email;
	
	if(email == undefined)
	{
		res.code = "401";
		res.value = "Failed Login";
		callback(null, res);
	}
	else{
	console.log("email is:" + email);
	console.log("In handle request:"+ email);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('Friends');
        console.log("coll is:" + coll);
        coll.find({email:email, req_status: "1"}, {frnd_email:1, frnd_firstname:1}).toArray(function(err, user){
			console.log("user is:" + user);
			var j = 0;
			if (user.length > 0) {
				// This way subsequent requests will know the user is logged in.
				//req.session.email = user.email;
				console.log("user for session is" + user.email);
				for(var i = 0; i < user.length; i++){
					console.log("friendsis/are " + user[i].frnd_email);
				}
				res.code = "200";
				res.value = "Succes Login";
		        res.friends_list = user;
	}
	else{
		res.code = "401";
		res.value = "Failed Login";
	}
	console.log("res.code is" + res.code);		
	callback(null, res);
});
	});	
}
}


function Showgroup(req, callback){

	var res = {};
	
	var email = req.email;
	
	if(email == undefined)
	{
		res.code = "401";
		res.value = "Failed Login";
		console.log("with showgroup!!!");
		callback(null, res);
		
	}
	else{
	console.log("email is:" + email);
	console.log("In handle request:"+ email);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('Groups');
        console.log("coll is:" + coll);
        coll.find({email:email}, {groupName:1}).toArray(function(err, user){
			console.log("user is:" + user);
			var j = 0;
			if (user.length > 0) {
				// This way subsequent requests will know the user is logged in.
				//req.session.email = user.email;
				
				
				res.code = "200";
				res.value = "Succes Login";
		        res.groups_list = user;
	}
	else{
		res.code = "401";
		res.value = "Failed Login";
	}
	console.log("res.code is" + res.code);		
	callback(null, res);
});
	});	
}
}



function showMembers(req, callback){

	var res = {};
	
	var groupName = req.groupName;
	
	if(groupName == undefined)
	{
		res.code = "401";
		res.value = "Failed Login";
		callback(null, res);
		console.log("bakchodii");
	}
	else{
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('Groups');
        console.log("coll is:" + coll);
        coll.find({groupName:groupName}).toArray(function(err, user){
			console.log("user is:" + user);
			
			if (user.length > 0) {
				// This way subsequent requests will know the user is logged in.
				//req.session.email = user.email;
				console.log("user for session is" + user.email);
				for(var i = 0; i < user.length; i++){
					console.log("members /are " + user[i].email);
				}
				res.code = "200";
				res.value = "Succes Login";
		        res.members_list = user;
	}
	else{
		res.code = "401";
		res.value = "Failed Login";
	}
	console.log("res.code is" + res.code);		
	callback(null, res);
});
	});	
}
}


function showFriends_2(req, callback){

	var res = {};
	var email = req.email;
	var firstname = req.firstname;
	var groupName = req.groupName;
	console.log("Group name is " + groupName);
	var array2 = [];
	var array1 = [];
	var array3 = [];
	console.log("happy");
	if(email == undefined)
	{
		console.log("happy132");
		res.code = "401";
		res.value = "Failed Login";
		callback(null, res);
	}
	else{
	console.log("email is:" + email);
	
	console.log("In handle request:"+ req.email);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('Friends');
        console.log("coll is:" + coll);
        coll.find({email:email, req_status: "1"}, {frnd_email:1, frnd_firstname:1}).toArray(function(err, user){
			console.log("user is:" + user);
			
			if (user.length > 0) {
				for(var i = 0; i < user.length; i++){
					array1.push({
						frnd_email: user[i].frnd_email,
						frnd_firstname: user[i].frnd_firstname
					});
				}
				/*for( var t=0; t < array1.length; t++){
					console.log("email os posted aasasa is :" + array1[t].email);
				}*/
				
				var coll2 = mongo.collection('Groups');
		        console.log("coll is:" + coll);
		        coll2.find({groupName:groupName}).toArray(function(err, user){
					console.log("user is:" + user);
					
					if (user.length > 0) {
						
						
						for(var i = 0; i < user.length; i++){
							array2.push({
								email: user[i].email
							});
						}
						
						/*for( var t=0; t < array2.length; t++){
							console.log("frnd is :" + array2[t].email);
						}*/
						
						
						for(var k = 0; k < array1.length; k++){
							var x = array1[k].frnd_email;
							console.log(" x is "+ x);
							for(var n = 0; n < array2.length; n++){
								console.log("array[2].email is "+ array2[n].email);
								if(x == array2[n].email){
									break;
								}
							}
							if(n >= array2.length){
									console.log("ok inserted");
									array3.push({
										email: array1[k].frnd_email,
										firstname: array1[k].frnd_firstname
										
									});
							}
							
						}
						
						for( var t=0; t < array3.length; t++){
							console.log("frnd is dssds:" + array3[t].firstname);
						}
						
						
						res.friends_list = array3;			
						res.code = "200";
						res.value = "Succes Login";
						
				        
				        
			}
					
			/*else if(array2.length <= 0){
				console.log("yahan a a gaye humm");
				res.news_feed = array1;
				res.code = "200";
				res.value = "Succes Login";
			}*/
					
			else{
					
				//res.news_feed = array1;
				//res.news_feed = array4;
				res.code = "200";
				res.value = "Succes Login";
			}
					
			callback(null, res);
		});
				
		        /*for( var t=0; t < array3.length; t++){
					console.log("email who posted the post is:" + array3[t].email);
				}*/
				console.log("length is:" + array3.length);
				//res.news_feed = array3;			
				res.code = "200";
				res.value = "Succes Login";
		        
		        
	}
	else{
		res.friends_list = array3;
		res.code = "200";
		callback(null, res);
	}
			
	//
});
	});	
}
}




function addMembers(req, callback){

	var res = {};
	var groupName = req.groupName;
	var email = req.email;
	var firstname = req.firstname;
	
	if(email == undefined)
	{
		res.code = "401";
		res.value = "Failed Login";
		callback(null, res);
	}
	else{
	console.log("email is:" + email);
	console.log("In handle request:"+ email);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('Groups');
        console.log("coll is:" + coll);
        coll.insert({"email":email, "firstname":firstname, "groupName":groupName}, function(err, user){
			console.log("user is:" + user);
			var j = 0;
			if (user) {
				// This way subsequent requests will know the user is logged in.
				//req.session.email = user.email;
				console.log("user for session is" + user.email);
				
				res.code = "200";
				res.value = "Succes Login";
		        
	}
	else{
		res.code = "401";
		res.value = "Failed Login";
	}
	console.log("res.code is" + res.code);		
	callback(null, res);
});
	});	
}
}


function addAdmin(req, callback){

	var res = {};
	groupName = req.groupName;
	var email = req.email;
	var firstname = req.firstname;
	var admin_email = req.email;
	if(email == undefined)
	{
		res.code = "401";
		res.value = "Failed Login";
		callback(null, res);
	}
	else{
	console.log("email is:" + email);
	console.log("In handle request:"+ email);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('Groups');
        console.log("coll is:" + coll);
        coll.insert({"email":email, "firstname":firstname, "groupName":groupName, admin_email:admin_email}, function(err, user){
			console.log("user is:" + user);
			var j = 0;
			if (user) {
				// This way subsequent requests will know the user is logged in.
				//req.session.email = user.email;
				console.log("user for session is" + user.email);
				
				res.code = "200";
				res.value = "Succes Login";
		        
	}
	else{
		res.code = "401";
		res.value = "Failed Login";
	}
	console.log("res.code is" + res.code);		
	callback(null, res);
});
	});	
}
}


function deleteMember(req, callback){

	var res = {};
	groupName = req.groupName;
	var email = req.email;
	var firstname = req.firstname;
	console.log("groupName is:" + groupName);
	console.log("email is "+ email);
	if(email == undefined)
	{
		res.code = "401";
		res.value = "Failed Login";
		callback(null, res);
	}
	else{
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('Groups');
        console.log("coll is:" + coll);
        coll.remove({"groupName":groupName, "email":email}, function(err, user){
			
			var j = 0;
			if (user) {
				// This way subsequent requests will know the user is logged in.
				//req.session.email = user.email;
				
				
				res.code = "200";
				res.value = "Succes Login";
		        
	}
	else{
		res.code = "401";
		res.value = "Failed Login";
	}
	console.log("res.code is" + res.code);		
	callback(null, res);
});
	});	
}
}

function deleteGroup(req, callback){

	var res = {};
	groupName = req.groupName;
	
	console.log("groupName is:" + groupName);
	
	if(groupName == undefined)
	{
		res.code = "401";
		res.value = "Failed Login";
		callback(null, res);
	}
	else{
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('Groups');
        console.log("coll is:" + coll);
        coll.remove({"groupName":groupName}, function(err, user){
			
			var j = 0;
			if (user) {
				// This way subsequent requests will know the user is logged in.
				//req.session.email = user.email;
				
				
				res.code = "200";
				res.value = "Succes Login";
		        
	}
	else{
		res.code = "401";
		res.value = "Failed Login";
	}
	console.log("res.code is" + res.code);		
	callback(null, res);
});
	});	
}
}



exports.post_newsfeed = post_newsfeed;
exports.extract_req = extract_req;
exports.showFriends = showFriends;
exports.Showgroup = Showgroup;
exports.addMembers = addMembers;
exports.showFriends_2 = showFriends_2;
exports.showMembers = showMembers;
exports.addAdmin = addAdmin;
exports.deleteMember = deleteMember;
exports.deleteGroup = deleteGroup;
exports.accept_request = accept_request;
exports.addFriend = addFriend;
exports.checkfriend = checkfriend;  
exports.news_feed = news_feed;
exports.handle_request = handle_request;
exports.handle_request_1 = handle_request_1;