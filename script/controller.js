facebook
	.controller('mainController' , [
		"$scope",
		function controller ( $scope ) {
			$scope.mainScope = $scope;
		}
	])
	.controller('loginFormController' , [
		"$scope",
		"$http",
		"userSession",
		"serverData",
		function controller ( $scope , $http , userSession , serverData ) {
			$scope.login = function login ( ) {
				var cred = $scope.cred;

				$http.post(serverData.url + "/user/auth" , cred )
				.success ( function onSuccess ( response ) {
					if ( response.status ) {
						userSession.setSession( response.status );
						userSession.setUser( response.data );
					}else {
						userSession.setSession( response.status );
					}

					$scope.mainScope.$broadcast( "set-user-data" , response.data );

					$scope.cred = {};					
				} );				
			};			
		}
	])
	.controller('postController' , [
		"$scope",
		"$http",
		"userSession",
		"serverData",		
		function controller ( $scope , $http , userSession , serverData ) {
			$scope.post = function post ( ) {				
				$http.post(serverData.url + "/user/post" , 
					{
						"PostOwner": userSession.getUser().name,
						"PostContent": $scope.postContainer,
						"PostDate": new Date ()
					} )
				.success( function onSuccess ( response ) {
					$scope.mainScope.$broadcast( "new-post" , response );
				} );
			};
		}
	])
	.controller('postAreaController' , [
		"$scope",
		"$http",
		"userSession",
		"serverData",		
		function controller ( $scope , $http , userSession , serverData ) {
			$scope.posts = [];

			$http.get(serverData.url + '/get/all/post')
			.success( function onSuccess ( response ) {
				$scope.posts = response.reverse();
			} );

			$scope.mainScope.$on( "new-post" , 
				function on ( evt , data ) {
					$scope.posts.unshift( data );
				} );
		}
	]);