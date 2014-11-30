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
							if ( data ) element.removeClass("hidden");
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
	]);
