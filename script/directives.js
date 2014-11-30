facebook
	.directive('mainDirective' , [
		function directive ( ) {
			return {
				"restrict": "A",
				"scope": true,
				"controller": "mainController"
			};
		}
	])
	.directive('loginPage' , [
		"userSession",		
		function directive ( userSession , $rootScope ) {
			return {
				"restrict": "A",
				"scope": true,
				"templateUrl": "script/temp/login-page.html",
				"link": function onLink ( scope , element , attributeSet ) {
					if ( userSession.getSession() ) element.addClass("hidden");
					
					scope.mainScope.$on( "set-user-data" , 
						function on ( evt , data ) {
							if ( data ) element.addClass("hidden");
						} );
				}
			};
		}
	])	
	.directive('loginForm' , [
		function directive (  ) {
			return {
				"restrict": "A",
				"scope": true,
				"templateUrl": "script/temp/login-form.html",
				"controller": "loginFormController"
			};
		}
	])
	.directive('homepage' , [
		"userSession",
		function directive ( userSession ) {
			return {
				"restrict": "A",
				"scope": true,
				"templateUrl": "script/temp/homepage.html",				
				"link": function onLink ( scope , element , attributeSet ) {
					if ( !userSession.getSession() ) element.addClass("hidden");
					
					scope.mainScope.$on( "set-user-data" , 
						function on ( evt , data ) {
							if ( data ) {
								element.removeClass("hidden");
								scope.mainScope.$broadcast( "user-logged" );
							}
						} );	
				}
			};
		}
	])
	.directive('postContent' , [
		function directive ( ) {
			return {
				"restrict": "A",
				"scope": true,
				"controller": "postController"
			};
		}
	])
	.directive('postArea' , [
		function directive ( ) {
			return {
				"restrict": "A",
				"scope": true,
				"templateUrl": "script/temp/post-area.html",
				"controller": "postAreaController"
			};
		}
	])
	.directive('likeButton' , [
		function directive ( ) {
			return {
				"restrict": "A",
				"scope": "=",
				"controller": "likeController",
				"link": function onLink ( scope , element , attributeSet ) {
					element.bind("click" , 
						function onClick ( ) {							
							scope.$broadcast( "like-post" , scope.post );
						} );

					scope.$on( "change-status" , 
						function on ( evt , data ) {
							element[0].innerHTML = data.status;
						} );
				}
			};
		}
	]);