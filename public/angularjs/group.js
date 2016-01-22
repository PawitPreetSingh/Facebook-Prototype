var group = angular.module('group', []);
var group_name;
group.controller('grppageController', function($scope, $http) {
	$scope.name = group_name;
    $scope.save = false;
    $scope.delete_mem = false;
    $scope.add = false;
	$scope.addMember = true;
	$scope.showMember = true;
	$scope.showFriends = function(req, res) {
		$http({
			method : "POST",
			url : '/showFriends',
			data : {
				
				"grp_name" : $scope.groupName //It is taking from ng-model
			}
		}).success(function(data) {
			if (data.login === "Fail") {
				/*
				$scope.invalid_login = false;
				$scope.unexpected_error = true;*/
			    console.log("error");
			
			}
			else{
				   //window.alert($scope.groupName);
				   
				   $scope.friends_list = data.friends_list;	
				   
				
				}
		}).error(function(error) {
			console.log(error);
			/*
			$scope.unexpected_error = false;
			$scope.invalid_login = true;*/
			
			
		});
	};
	
	
	
	$scope.showMembers = function(req, res) {
		$scope.showMember = false;
		$http({
			method : "POST",
			url : '/showMembers',
			data : {
				
				//It is taking from ng-model
			}
		}).success(function(data) {
			if (data.login === "Fail") {
				/*
				$scope.invalid_login = false;
				$scope.unexpected_error = true;*/
			    console.log("error");
			
			}
			else{
				   
				   
				   $scope.members_list = data.members_list;	
				   
				
				}
		}).error(function(error) {
			console.log(error);
			/*
			$scope.unexpected_error = false;
			$scope.invalid_login = true;*/
			
			
		});
	};
	
	
	$scope.delete_member = function(firstname, email, req, res){
		$http({
			method : "POST",
			url : '/deleteMember',
			data : {
				
				"firstname" : firstname,
				"email" : email
				
			}
		}).success(function(data) {
			if (data.statusCode === 401) {
				/*
				$scope.invalid_login = false;
				$scope.unexpected_error = true;*/
				 $scope.delete_mem = true;
			    console.log("error");
			
			}
			else{
				   
				window.location.assign("/group_home");
				
				}
		}).error(function(error) {
			console.log(error);
			/*
			$scope.unexpected_error = false;
			$scope.invalid_login = true;*/
			
			
		});
	};
	
	$scope.deleteGroup = function( req, res){
		$http({
			method : "POST",
			url : '/deleteGroup',
			data : {
				
				
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
	
	
	$scope.showFriends_2 = function(req, res) {
		$http({
			method : "POST",
			url : '/showFriends_2',
			data : {
				
				
			}
		}).success(function(data) {
			if (data.login === "Fail") {
				/*
				$scope.invalid_login = false;
				$scope.unexpected_error = true;*/
			    console.log("error");
			
			}
			else{

				   $scope.addMember = false;
				   $scope.friends_list = data.friends_list;	
				   
				
				}
		}).error(function(error) {
			console.log(error);
			/*
			$scope.unexpected_error = false;
			$scope.invalid_login = true;*/
			
			
		});
	};
	
	
	
	$scope.Add_member = function(frnd_email, frnd_firstname, req, res) {
		
		group_name = $scope.groupName;
		$http({
			method : "POST",
			url : '/addMembers',
			data : {
				
				"grp_name" : $scope.groupName,//It is taking from ng-model
				"firstname" : frnd_firstname,
				"email" : frnd_email
			}
		}).success(function(data) {
			if (data.statusCode === 401) {
				/*
				$scope.invalid_login = false;
				$scope.unexpected_error = true;*/
			    console.log("error");
			
			}
			else{
				   
				   //$scope.msg = "Successfully added";
				   $scope.save = true;
				
				}
		}).error(function(error) {
			console.log(error);
			/*
			$scope.unexpected_error = false;
			$scope.invalid_login = true;*/
			
			
		});
	};
	
	
	$scope.Add_member_1 = function(friend_name,friend_email, req, res) {
		
		
		$http({
			method : "POST",
			url : '/addMembers_1',
			data : {
				"firstname" : friend_name,
				"email" : friend_email,
				
			}
		}).success(function(data) {
			if (data.login === "Fail") {
				/*
				$scope.invalid_login = false;
				$scope.unexpected_error = true;*/
			    console.log("error");
			
			}
			else{
				   
				   //$scope.msg = "Successfully added";	
				   $scope.add = true;
				
				}
		}).error(function(error) {
			console.log(error);
			/*
			$scope.unexpected_error = false;
			$scope.invalid_login = true;*/
			
			
		});
	};
	
	
	
	$scope.create = function(req, res) {
		window.alert("value is ok: " + group_name);
		$http({
			method : "POST",
			url : '/viewGroup',
			data : {
				"grp_name" : $scope.groupName
				
			}
		}).success(function(data) {
			if (data.statusCode === 401) {
				
			    console.log("error");
			
			}
			else{
				   
				window.location.assign("/group_home");	
				
				}
		}).error(function(error) {
			console.log(error);
			
			
			
		});
	};
	
	$scope.showGrp = function(groupName, req, res) {
		
		$http({
			method : "POST",
			url : '/showGrp',
			data : {
				"grp_name" : groupName
				
			}
		}).success(function(data) {
			if (data.statusCode === 401) {
				
			    console.log("error");
			
			}
			else{
				   
				
				
				}
		}).error(function(error) {
			console.log(error);
			
			
			
		});
	};
	
	
	
	
});