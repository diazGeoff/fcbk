facebook
	.service('userSession' , [
		function service ( ) {
			var session = false;
			var user = {};

			this.getSession = function ( ) {
				return session;
			};

			this.getUser = function ( ) {
				return user;
			};

			this.setSession = function ( bool ) {
				session = bool;
			};

			this.setUser = function ( userData ) {
				user = userData;
			};
		}
	])
	.factory('serverData' , [
		function factory ( ) {
			return {
				url: "http://localhost:8000"
			}
		}
	]);