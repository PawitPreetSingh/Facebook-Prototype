
//Mine




//loading the 'login' angularJS module
var login = angular.module('login', []);


//defining the login controller
login.controller('login', function($scope, $http) {
	$scope.invalid_email = true;
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	/*$scope.invalid_login = true;
	$scope.unexpected_error = true;*/
	$scope.submit = function() {
		$http({
			method : "POST",
			url : '/checklogin',
			data : {
				
				"email" : $scope.email_id, //It is taking from ng-model
				"password" : $scope.password
			}
		
		}).success(function(response) {
			alert(JSON.stringify(response));
			if(response.login == "Fail") {
				window.location.assign("/errorLogin");
			
			
			}
			//else if(response.login == "Fail")
			else
				//Making a get call to the '/redirectToHomepage' API
				{
				window.location.assign("/Home");
				
	}
		}).error(function(error) {
			/*
			$scope.unexpected_error = false;
			$scope.invalid_login = true;*/
			window.alert("errororradbdhvhafhjuaoror");			
			
		});
	};
	
	
	
	$scope.signup = function() {
		
		if($scope.email != $scope.reemail){
			$scope.invalid_email = false;
		}
		else{
		$http({
			method : "POST",
			url : '/Signup',
			data : {
				
				"fname" : $scope.fname,
				"lname" : $scope.lname,
				"email" : $scope.email, //It is taking from ng-model
				"reemail" : $scope.reemail,
				"password" : $scope.pass,
				"date_of_birth" : $scope.DOBMonth + "-" + $scope.DOBDay + "-" + $scope.DOBYear,
				"gender" : $scope.gender
			}
		
		}).success(function(response) {
			alert(JSON.stringify(response));
			if(response.login == "Fail") {
				/*
				$scope.invalid_login = false;
				$scope.unexpected_error = true;*/
			
			
			}
			else
				//Making a get call to the '/redirectToHomepage' API
				{
				
				    window.location.assign("/"); 
				
				
				}
		}).error(function(error) {
			/*
			$scope.unexpected_error = false;
			$scope.invalid_login = true;*/
			
			
		});
	};
	}
	
});
