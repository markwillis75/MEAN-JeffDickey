var app=angular.module('app', [])

app.controller('PostsCtrl', function($scope, $http){

    $scope.addPost = function(){
    	$http.post('/api/posts', {
    		username: 'dickeyxxx',
    		body: $scope.postBody
    	})
    	.success(function(post){
    		$scope.posts.unshift(post)
    		$scope.postBody = null
    	})
    }

	// starting data
	$http.get('/api/posts')
	.success(function(posts){
		$scope.posts=posts
	})
})