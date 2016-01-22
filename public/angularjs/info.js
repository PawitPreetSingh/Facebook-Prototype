var info = angular.module('info', []);

info.controller('pageController', function($scope, $http) {
	$scope.inputMusic = true;
	$scope.inputSports = true;
	$scope.inputShow = true;
	$scope.save= true;
	$scope.musicButon = false;
	$scope.sportsButon = false;
	$scope.showButon = false;
	
	$http({
		method : "POST",
		url : '/extract_req',
		data : {
			
			
		}
	
	}).success(function(response) {
		if(response.login == "Fail") {
			window.location.assign("/errorLogin");
		}
		else{
			 $scope.request_array = response.request_array;	
			 window.alert("extract_req is:"+ response.request_array.requests);
		}
		
}).error(function(error) {
/*
$scope.unexpected_error = false;
$scope.invalid_login = true;*/
window.alert("errororroror");

});
	
	$scope.search = function(req, res) {
		$http({
			method : "POST",
			url : '/checkfriend',
			data : {
				
				"firstname" : $scope.name //It is taking from ng-model
			}
		}).success(function(data) {
			if (data.a.statusCode === 401) {
				/*
				$scope.invalid_login = false;
				$scope.unexpected_error = true;*/
			    console.log("error");
			
			}
			else{
				   
				   $scope.match_frnd_results = data.match_frnd_results;			
				
				}
		}).error(function(error) {
			console.log(error);
			/*
			$scope.unexpected_error = false;
			$scope.invalid_login = true;*/
			
			
		});
	};
	
	
	
	$scope.post_newsfeed = function(req, res) {
		$http({
			method : "POST",
			url : '/post_newsfeed',
			data : {
				
				"text" : $scope.text //It is taking from ng-model
			}
		}).success(function(data) {
			if (data.statusCode === 401) {
				/*
				$scope.invalid_login = false;
				$scope.unexpected_error = true;*/
			    console.log("error");
			
			}
			else{
				   
				window.location.assign("/Home");		
				
				}
		}).error(function(error) {
			console.log(error);
			/*
			$scope.unexpected_error = false;
			$scope.invalid_login = true;*/
			
			
		});
	};
	
	
	
	$scope.Add = function(name, email, req, res){
		window.alert("firstname is ssss" + name);
		window.alert("firstname is ssss" + email);
		$http({
			method : "POST",
			url : '/addfriend',
			data : {
				
				"frnd_firstname" : name,
				"frnd_email" : email,
				
			}
		}).success(function(data) {
			if (data.statusCode === 401) {
				/*
				$scope.invalid_login = false;
				$scope.unexpected_error = true;*/
			    console.log("error");
			    
			
			}
			else{
				   
				   
				window.location.assign("/Home");
				   		
				
				}
		}).error(function(error) {
			window.alert(error);
			/*
			$scope.unexpected_error = false;
			$scope.invalid_login = true;*/
			
			
		});
	};
	
	$scope.Delete = function(name, email, req, res) {
		window.alert(email);
		$http({
			method : "POST",
			url : '/deletefriend',
			data : {
				
				"firstname" : name,
				"email" : email
			}
		}).success(function(data) {
			if (data.statusCode === 401) {
				/*
				$scope.invalid_login = false;
				$scope.unexpected_error = true;*/
			    console.log("error");
			
			}
			else{
				   
				   $scope.deleteAlert = "You have successfully deleted this friend!";		
				
				}
		}).error(function(error) {
			console.log(error);
			/*
			$scope.unexpected_error = false;
			$scope.invalid_login = true;*/
			
			
		});
	};
	
	
	
	$scope.Accept_request = function(req_sent,firstname, req, res){
		window.alert("req_sent " + req_sent);
		window.alert("firstname " + firstname);
		$http({
			method : "POST",
			url : '/Accept_request',
			data : {
				"req_sent": req_sent,
				
				"request_firstname": firstname
			}
		}).success(function(data) {
			if (data.login === "Fail") {
				/*
				$scope.invalid_login = false;
				$scope.unexpected_error = true;*/
			    console.log("error");
			    
			
			}
			else{
				   console.log("successs");
				   window.location.assign("/Home");
				   		
				
				}
		}).error(function(error) {
			window.alert(error);
			/*
			$scope.unexpected_error = false;
			$scope.invalid_login = true;*/
			
			
		});
	};
	
	$scope.addMusic = function(){
		
		$scope.save = false;
		$scope.musicButon = true;
		$scope.inputMusic = false;
	};
	
$scope.addSports = function(){
		
		$scope.sportsButon = true;
		$scope.inputSports = false;
	};
	
$scope.addShow = function(){
		
		$scope.showButon = true;
		$scope.inputShow = false;
	};

$scope.saveMusic = function(){
	$scope.save = true;
	$http({
		method : "POST",
		url : '/saveMusic',
		data : {
			"music" : $scope.music,
			"sports" : $scope.Sports,
			"show" : $scope.Show
			
		}
	}).success(function(data) {
		if (data.statusCode === 401) {
			/*
			$scope.invalid_login = false;
			$scope.unexpected_error = true;*/
		    console.log("error");
		    
		
		}
		else{
			   console.log("successs");
			   
			   		
			
			}
		
	});
};
	
});