(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global FFB901 */

/**
 * Step 1 - Making our own module
 * Dependencies in this Demo
 *  PointyPony : The angular module from Advans. It contains elements that we can reuse.
 * Read the docs to learn more. http://advans.herokuapp.com/#/docs
 *  ui.router  : The angular modole to help navigate from page to page. 
 * learn more on http://angular-ui.github.io/ui-router/site/#/api/ui.router
 *  ngMaterial : An Angular based framework for rendering material styled elements
 * read more on  https://material.angularjs.org/latest/
 *  ngMdIcons : An Angular based framework for showing icons
*/
var app = angular.module('Prog5', ["PointyPony", "ngMdIcons", "ui.router",  "ngMaterial"]);


/**
 * Step 2 - Referencing our online course
 * You can find your course token on advans.herokuapp.com
 */
app.constant('appConfig', {
	//Replace this token with your token from the course
	courseToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IlByb2c1Ig.Lbd5e9wYohfEPkA-t_DE4SJuIIrpyKQBwHiA73dpTXQ",
});

//Make your own elements, in our case a routing config and a app controller
var routesConfig = require('./config/routes');
var appCtrl = require("./controllers/appCtrl");
var submitCtrl = require("./controllers/submitCtrl");
var reviewCtrl = require("./controllers/reviewCtrl");
var towerCtrl = require('./controllers/towerCtrl');
var sbLoad = require('./directives/sbLoad');
var twentytwenty = require('./directives/twentytwenty');
var hoverCtrl = require('./controllers/hoverCtrl');

var emailShort = require('./filters/emailshort');

//Add the controller and config to the module
app.controller('appCtrl', appCtrl);
app.controller('towerCtrl', towerCtrl);
app.controller('hoverCtrl', hoverCtrl);
app.controller('submitCtrl', submitCtrl);
app.controller('reviewCtrl', reviewCtrl);
app.controller('assignmentCtrl', require("./controllers/assignmentCtrl"));

app.directive('sbLoad', sbLoad);
app.directive('twentytwenty', twentytwenty);

app.filter('emailShort',  emailShort);

app.config(routesConfig);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('blue');
});




  


},{"./config/routes":2,"./controllers/appCtrl":3,"./controllers/assignmentCtrl":4,"./controllers/hoverCtrl":5,"./controllers/reviewCtrl":6,"./controllers/submitCtrl":7,"./controllers/towerCtrl":8,"./directives/sbLoad":9,"./directives/twentytwenty":10,"./filters/emailshort":11}],2:[function(require,module,exports){
module.exports = function($stateProvider, $urlRouterProvider) {
    
    //Default route
    $urlRouterProvider.otherwise('home');
    
    //Methode voor toevoegen state, 
    //State is in camelCase
    function addState(state){
         var url = state.replace(/([a-z])([A-Z])/g, '$1/$2').toLowerCase();
         $stateProvider.state(state, {url: '/' + url, templateUrl : 'onderwerp/' + url + '.html' });
    }
    
    //Register all the routes
    $stateProvider
        
        //Default pages
        .state('home', { url: '/home',  templateUrl:'default/home.html' })
        .state('leaderboards', { url: '/leaderboards',  templateUrl:'default/leaderboards.html' })
        .state('profile', { url: '/profile',  templateUrl:'default/profile.html' })
        
        .state('opdrachten1', { url: '/opdrachten/week1', templateUrl:'opdrachten/week1.html' } )
        .state('opdrachten2', { url: '/opdrachten/week2', templateUrl:'opdrachten/week2.html' } )
        .state('opdrachten3', { url: '/opdrachten/week3', templateUrl:'opdrachten/week3.html' } )
        .state('opdrachten4', { url: '/opdrachten/week4', templateUrl:'opdrachten/week4.html' } )
        .state('opdrachten5', { url: '/opdrachten/week5', templateUrl:'opdrachten/week5.html' } )
        .state('opdrachten6', { url: '/opdrachten/week6', templateUrl:'opdrachten/week6.html' } )
        .state('opdrachtenOverview', { url: '/opdrachten/overview', templateUrl:'opdrachten/overview.html' } );

        
        //Content
        //net
        addState('netIntroductie');
        addState('netVisualstudio');
        addState('netAssemblies');
        //csharp
        addState('csharpIntroductie');
        addState('csharpProperties');
        addState('csharpLambda');
        addState('csharpLinq');
        addState('csharpGuidelines');
        //wpf
        addState('wpfIntroductie');
        addState('wpfXaml');
        addState('wpfComponenten');
        addState('wpfBinding');
        addState('wpfCommand');
        addState('wpfConvert');
        //mvvm
        addState('mvvmIntroductie');
        addState('mvvmArchitectuur');
        addState('mvvmFrameworks');
        //Mvc
        addState('efIntroductie');
        addState('efDatabase');
        addState('efEntityframework');
        addState('efDatabasefirst');

};
},{}],3:[function(require,module,exports){
module.exports = function ($scope, $timeout, $mdDialog, ppAuthService, $mdSidenav, $mdMedia, $log, $rootScope, $location, $anchorScroll, $document) {

    $(window).on('scroll', function(data, two){
		$('.scrollWidth').css('top',  $(this).scrollTop() + "px");
        
        // 		$('.scrollWith').animate({
        //     transform: 'translateY(' + $(this).scrollTop() + "px" +')'
        // });
        
	});
    
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        $mdSidenav('left').close();
    });
    
     $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    
    $scope.toggleLeft = function(){
         $mdSidenav('left').toggle();
    }
    
    $scope.closeLeft = function(){
          $mdSidenav('left').close();
    }
   
    $scope.scrollTo = function(id) {
        var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        $location.hash(old);
   }

   ppAuthService.getUser(function(user){
		if(user.error)
			return;

		$rootScope.user = user;
    });
   
   $rootScope.showDialog = function(dialogName, ev, params){
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        
        $mdDialog.show({
            controller: dialogName + 'Ctrl',
            templateUrl: 'templates/dialogs/'  + dialogName +'.html',
            locals: params,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
        }).then(function(result){
            if(params.cb){
                params.cb(result);
            }
        });
   }
   
  
};
},{}],4:[function(require,module,exports){
module.exports = function($scope, $mdDialog, $mdToast, ppAssignmentService, ppReviewService){
            
            $scope.assignments = [];
            
            ppAssignmentService.getAssignments(function(){
                $scope.assignments = ppAssignmentService.assignments;
            })
}
},{}],5:[function(require,module,exports){
module.exports = function($scope){
	var self = $scope;
	

	self.isShowing = true;

	self.toggle = function(){
		self.isShowing = !self.isShowing;
	}
}
},{}],6:[function(require,module,exports){
module.exports = function($scope, $mdDialog, $mdToast, ppAssignmentService, ppReviewService, assignment){
                    
    //Maybe there already is a review open
    $scope.review = assignment.myReview;
    
    
    $scope.requestSubmission = function(){
        ppReviewService.getSubmission(assignment._id, function(review){
            if(review.error == 503){
                alert("Er zijn op dit moment helaas geen submissions om te reviewen. Probeer het later nog eens!");
                $mdDialog.cancel();
            }
            $scope.review = review;
        });
    }
    
    $scope.cancelDialog = function() {
        assignment.review = $scope.review;
        ppAssignmentService.assignmentDic[assignment.name] = assignment;  
        $mdDialog.cancel();
    };
    
    $scope.submitReview = function(){
        ppReviewService.submitReview($scope.review, function(review){
            assignment.review = review;
            ppAssignmentService.assignmentDic[assignment.name] = assignment;
            $mdDialog.hide();
            $mdToast.show({
                template: '<md-toast class="md-toast success"><span flex>Review submitted! </span></md-toast>',
                hideDelay: 3000,
                parent : $document[0].querySelector('#toastBounds'),
                position: 'top right'
            });
        });
    }

    

};
},{}],7:[function(require,module,exports){
module.exports = function($scope, $mdDialog, $mdToast, ppAssignmentService, $document, assignment){
                
    $scope.submission = assignment.mySubmission;
    
    $scope.submitAssignment = function(){
        ppAssignmentService.submitAssignment(assignment._id, $scope.submission, function(){
            $mdDialog.hide();
            showSuccess();
        });
    }
            
    $scope.cancelDialog = function() {
        $mdDialog.cancel();
    };
    
    function showSuccess(){
        $mdToast.show({
                template: '<md-toast class="md-toast success"><span flex>Assignment submitted! </span></md-toast>',
                hideDelay: 3000,
                parent : $document[0].querySelector('#toastBounds'),
                position: 'top right'
            });
    }
};
},{}],8:[function(require,module,exports){
module.exports = function ($scope, $timeout, $mdSidenav, $log, $rootScope, $q) {
    var self = this;

	var ratio = 1.743;

	self.imageLocations = [
		{ src: "default/img/Background_medium.png", offset: 0.4 },
		{ src: "default/img/wolk1_medium.png", offset: 0.5, classes:"cloud" },
		{ src: "default/img/MVC_medium.png", offset: 0 },
		{ src: "default/img/WCF_medium.png", offset: 1.2 },
		{ src: "default/img/EF.png", offset: 1.4 },
		{ src: "default/img/WPF.png", offset: 1.6 },
		{ src: "default/img/wolk2_medium.png", offset: 0, classes:"cloud reeverse" },
	];

	var canvasWidth = document.getElementById('canvas').offsetWidth;
	var canvasHeight = document.getElementById('canvas').offsetHeight;
	
	$scope.ready = false;
	$scope.realHeight = (canvasWidth * ratio - canvasHeight);

	$scope.toLevel = function(newLevel){
		$scope.level = $scope.realHeight / 100 * newLevel;
	}
	
	$scope.isNear = function(value){
		if(!$scope.ready)
			return false;
			
		value =  $scope.realHeight / 100 * value;
		return $scope.level < (value + 100) && $scope.level > (value - 100);
	};
	
	$scope.getSrcset = function(img){
		
		var root = "default/img/";
		return root + img + "_small.png 600w, " + root + img + "_medium.png 900w, " + root + img + "_large.png 1200w";
	}

	var preloadImages = function(images){
		  var deferred = $q.defer();
		  var count = 0;

		  images.forEach(function(img){
			$('<img>').attr({ src: img.src }).load(function() {
				count++;
				if(count == images.length){
					deferred.resolve();
				}
			});
		  });
		 
		  return deferred.promise;
	}

	preloadImages(self.imageLocations).then(function(){
		$('#loader').height(0);
		$scope.ready = true;
		$scope.toLevel(100);
	});
	
};
},{}],9:[function(require,module,exports){
module.exports = ['$parse', function ($parse) {
    return {
      restrict: 'A',
      scope: {
        onsort: '='
      },
      link: function (scope, elem, attrs) {
        
        //subscribe
        if(!scope.$parent.elementsToLoad){
          scope.$parent.elementsToLoad = 0;
          scope.$parent.elementsLoaded = 0;
        }
        
        scope.$parent.elementsToLoad++;

        elem.on('load', function (event) {
            scope.$parent.elementsLoaded++;
           
            if(scope.$parent.elementsLoaded == scope.$parent.elementsToLoad){
                if(scope.$parent.loadingComplete)
                    scope.$parent.loadingComplete();
            }
        });
      }
    };
  }];
},{}],10:[function(require,module,exports){
module.exports = function() {
  return {
	transclude: true,
	template: "<div class='row'><div class='col-md-1'></div><div class='col-md-10'><ng-transclude></ng-transclude></div><div class='col-md-1'></div></div>",
    link: function(scope, element){
		
		//Moet met timeout dankzij bootstrap
		setTimeout(function() {
			$(element).find('.wrapper').twentytwenty();
		}, 300);
		
			
	}
  };
};
},{}],11:[function(require,module,exports){
module.exports = function() {
    return function(input) {
        return input ? input.split('@')[0] : "";
  }
}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvYXBwLmpzIiwiYXBwL2pzL2NvbmZpZy9yb3V0ZXMuanMiLCJhcHAvanMvY29udHJvbGxlcnMvYXBwQ3RybC5qcyIsImFwcC9qcy9jb250cm9sbGVycy9hc3NpZ25tZW50Q3RybC5qcyIsImFwcC9qcy9jb250cm9sbGVycy9ob3ZlckN0cmwuanMiLCJhcHAvanMvY29udHJvbGxlcnMvcmV2aWV3Q3RybC5qcyIsImFwcC9qcy9jb250cm9sbGVycy9zdWJtaXRDdHJsLmpzIiwiYXBwL2pzL2NvbnRyb2xsZXJzL3Rvd2VyQ3RybC5qcyIsImFwcC9qcy9kaXJlY3RpdmVzL3NiTG9hZC5qcyIsImFwcC9qcy9kaXJlY3RpdmVzL3R3ZW50eXR3ZW50eS5qcyIsImFwcC9qcy9maWx0ZXJzL2VtYWlsc2hvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGdsb2JhbCBGRkI5MDEgKi9cclxuXHJcbi8qKlxyXG4gKiBTdGVwIDEgLSBNYWtpbmcgb3VyIG93biBtb2R1bGVcclxuICogRGVwZW5kZW5jaWVzIGluIHRoaXMgRGVtb1xyXG4gKiAgUG9pbnR5UG9ueSA6IFRoZSBhbmd1bGFyIG1vZHVsZSBmcm9tIEFkdmFucy4gSXQgY29udGFpbnMgZWxlbWVudHMgdGhhdCB3ZSBjYW4gcmV1c2UuXHJcbiAqIFJlYWQgdGhlIGRvY3MgdG8gbGVhcm4gbW9yZS4gaHR0cDovL2FkdmFucy5oZXJva3VhcHAuY29tLyMvZG9jc1xyXG4gKiAgdWkucm91dGVyICA6IFRoZSBhbmd1bGFyIG1vZG9sZSB0byBoZWxwIG5hdmlnYXRlIGZyb20gcGFnZSB0byBwYWdlLiBcclxuICogbGVhcm4gbW9yZSBvbiBodHRwOi8vYW5ndWxhci11aS5naXRodWIuaW8vdWktcm91dGVyL3NpdGUvIy9hcGkvdWkucm91dGVyXHJcbiAqICBuZ01hdGVyaWFsIDogQW4gQW5ndWxhciBiYXNlZCBmcmFtZXdvcmsgZm9yIHJlbmRlcmluZyBtYXRlcmlhbCBzdHlsZWQgZWxlbWVudHNcclxuICogcmVhZCBtb3JlIG9uICBodHRwczovL21hdGVyaWFsLmFuZ3VsYXJqcy5vcmcvbGF0ZXN0L1xyXG4gKiAgbmdNZEljb25zIDogQW4gQW5ndWxhciBiYXNlZCBmcmFtZXdvcmsgZm9yIHNob3dpbmcgaWNvbnNcclxuKi9cclxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdQcm9nNScsIFtcIlBvaW50eVBvbnlcIiwgXCJuZ01kSWNvbnNcIiwgXCJ1aS5yb3V0ZXJcIiwgIFwibmdNYXRlcmlhbFwiXSk7XHJcblxyXG5cclxuLyoqXHJcbiAqIFN0ZXAgMiAtIFJlZmVyZW5jaW5nIG91ciBvbmxpbmUgY291cnNlXHJcbiAqIFlvdSBjYW4gZmluZCB5b3VyIGNvdXJzZSB0b2tlbiBvbiBhZHZhbnMuaGVyb2t1YXBwLmNvbVxyXG4gKi9cclxuYXBwLmNvbnN0YW50KCdhcHBDb25maWcnLCB7XHJcblx0Ly9SZXBsYWNlIHRoaXMgdG9rZW4gd2l0aCB5b3VyIHRva2VuIGZyb20gdGhlIGNvdXJzZVxyXG5cdGNvdXJzZVRva2VuOiBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5JbEJ5YjJjMUlnLkxiZDVlOXdZb2hmRVBrQS10X0RFNFNKdUlJcnB5S1FCd0hpQTczZHBUWFFcIixcclxufSk7XHJcblxyXG4vL01ha2UgeW91ciBvd24gZWxlbWVudHMsIGluIG91ciBjYXNlIGEgcm91dGluZyBjb25maWcgYW5kIGEgYXBwIGNvbnRyb2xsZXJcclxudmFyIHJvdXRlc0NvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnL3JvdXRlcycpO1xyXG52YXIgYXBwQ3RybCA9IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzL2FwcEN0cmxcIik7XHJcbnZhciBzdWJtaXRDdHJsID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvc3VibWl0Q3RybFwiKTtcclxudmFyIHJldmlld0N0cmwgPSByZXF1aXJlKFwiLi9jb250cm9sbGVycy9yZXZpZXdDdHJsXCIpO1xyXG52YXIgdG93ZXJDdHJsID0gcmVxdWlyZSgnLi9jb250cm9sbGVycy90b3dlckN0cmwnKTtcclxudmFyIHNiTG9hZCA9IHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9zYkxvYWQnKTtcclxudmFyIHR3ZW50eXR3ZW50eSA9IHJlcXVpcmUoJy4vZGlyZWN0aXZlcy90d2VudHl0d2VudHknKTtcclxudmFyIGhvdmVyQ3RybCA9IHJlcXVpcmUoJy4vY29udHJvbGxlcnMvaG92ZXJDdHJsJyk7XHJcblxyXG52YXIgZW1haWxTaG9ydCA9IHJlcXVpcmUoJy4vZmlsdGVycy9lbWFpbHNob3J0Jyk7XHJcblxyXG4vL0FkZCB0aGUgY29udHJvbGxlciBhbmQgY29uZmlnIHRvIHRoZSBtb2R1bGVcclxuYXBwLmNvbnRyb2xsZXIoJ2FwcEN0cmwnLCBhcHBDdHJsKTtcclxuYXBwLmNvbnRyb2xsZXIoJ3Rvd2VyQ3RybCcsIHRvd2VyQ3RybCk7XHJcbmFwcC5jb250cm9sbGVyKCdob3ZlckN0cmwnLCBob3ZlckN0cmwpO1xyXG5hcHAuY29udHJvbGxlcignc3VibWl0Q3RybCcsIHN1Ym1pdEN0cmwpO1xyXG5hcHAuY29udHJvbGxlcigncmV2aWV3Q3RybCcsIHJldmlld0N0cmwpO1xyXG5hcHAuY29udHJvbGxlcignYXNzaWdubWVudEN0cmwnLCByZXF1aXJlKFwiLi9jb250cm9sbGVycy9hc3NpZ25tZW50Q3RybFwiKSk7XHJcblxyXG5hcHAuZGlyZWN0aXZlKCdzYkxvYWQnLCBzYkxvYWQpO1xyXG5hcHAuZGlyZWN0aXZlKCd0d2VudHl0d2VudHknLCB0d2VudHl0d2VudHkpO1xyXG5cclxuYXBwLmZpbHRlcignZW1haWxTaG9ydCcsICBlbWFpbFNob3J0KTtcclxuXHJcbmFwcC5jb25maWcocm91dGVzQ29uZmlnKTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuICAgIC5wcmltYXJ5UGFsZXR0ZSgnYmx1ZScpXHJcbiAgICAuYWNjZW50UGFsZXR0ZSgnYmx1ZScpO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcbiAgXHJcblxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuICAgIFxyXG4gICAgLy9EZWZhdWx0IHJvdXRlXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCdob21lJyk7XHJcbiAgICBcclxuICAgIC8vTWV0aG9kZSB2b29yIHRvZXZvZWdlbiBzdGF0ZSwgXHJcbiAgICAvL1N0YXRlIGlzIGluIGNhbWVsQ2FzZVxyXG4gICAgZnVuY3Rpb24gYWRkU3RhdGUoc3RhdGUpe1xyXG4gICAgICAgICB2YXIgdXJsID0gc3RhdGUucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLyQyJykudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoc3RhdGUsIHt1cmw6ICcvJyArIHVybCwgdGVtcGxhdGVVcmwgOiAnb25kZXJ3ZXJwLycgKyB1cmwgKyAnLmh0bWwnIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL1JlZ2lzdGVyIGFsbCB0aGUgcm91dGVzXHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vRGVmYXVsdCBwYWdlc1xyXG4gICAgICAgIC5zdGF0ZSgnaG9tZScsIHsgdXJsOiAnL2hvbWUnLCAgdGVtcGxhdGVVcmw6J2RlZmF1bHQvaG9tZS5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbGVhZGVyYm9hcmRzJywgeyB1cmw6ICcvbGVhZGVyYm9hcmRzJywgIHRlbXBsYXRlVXJsOidkZWZhdWx0L2xlYWRlcmJvYXJkcy5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgncHJvZmlsZScsIHsgdXJsOiAnL3Byb2ZpbGUnLCAgdGVtcGxhdGVVcmw6J2RlZmF1bHQvcHJvZmlsZS5odG1sJyB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjEnLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWsxJywgdGVtcGxhdGVVcmw6J29wZHJhY2h0ZW4vd2VlazEuaHRtbCcgfSApXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuMicsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazInLCB0ZW1wbGF0ZVVybDonb3BkcmFjaHRlbi93ZWVrMi5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW4zJywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrMycsIHRlbXBsYXRlVXJsOidvcGRyYWNodGVuL3dlZWszLmh0bWwnIH0gKVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjQnLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWs0JywgdGVtcGxhdGVVcmw6J29wZHJhY2h0ZW4vd2VlazQuaHRtbCcgfSApXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuNScsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazUnLCB0ZW1wbGF0ZVVybDonb3BkcmFjaHRlbi93ZWVrNS5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW42JywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrNicsIHRlbXBsYXRlVXJsOidvcGRyYWNodGVuL3dlZWs2Lmh0bWwnIH0gKVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbk92ZXJ2aWV3JywgeyB1cmw6ICcvb3BkcmFjaHRlbi9vdmVydmlldycsIHRlbXBsYXRlVXJsOidvcGRyYWNodGVuL292ZXJ2aWV3Lmh0bWwnIH0gKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9Db250ZW50XHJcbiAgICAgICAgLy9uZXRcclxuICAgICAgICBhZGRTdGF0ZSgnbmV0SW50cm9kdWN0aWUnKTtcclxuICAgICAgICBhZGRTdGF0ZSgnbmV0VmlzdWFsc3R1ZGlvJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ25ldEFzc2VtYmxpZXMnKTtcclxuICAgICAgICAvL2NzaGFycFxyXG4gICAgICAgIGFkZFN0YXRlKCdjc2hhcnBJbnRyb2R1Y3RpZScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdjc2hhcnBQcm9wZXJ0aWVzJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ2NzaGFycExhbWJkYScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdjc2hhcnBMaW5xJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ2NzaGFycEd1aWRlbGluZXMnKTtcclxuICAgICAgICAvL3dwZlxyXG4gICAgICAgIGFkZFN0YXRlKCd3cGZJbnRyb2R1Y3RpZScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCd3cGZYYW1sJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ3dwZkNvbXBvbmVudGVuJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ3dwZkJpbmRpbmcnKTtcclxuICAgICAgICBhZGRTdGF0ZSgnd3BmQ29tbWFuZCcpO1xyXG4gICAgICAgIGFkZFN0YXRlKCd3cGZDb252ZXJ0Jyk7XHJcbiAgICAgICAgLy9tdnZtXHJcbiAgICAgICAgYWRkU3RhdGUoJ212dm1JbnRyb2R1Y3RpZScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdtdnZtQXJjaGl0ZWN0dXVyJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ212dm1GcmFtZXdvcmtzJyk7XHJcbiAgICAgICAgLy9NdmNcclxuICAgICAgICBhZGRTdGF0ZSgnZWZJbnRyb2R1Y3RpZScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdlZkRhdGFiYXNlJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ2VmRW50aXR5ZnJhbWV3b3JrJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ2VmRGF0YWJhc2VmaXJzdCcpO1xyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkc2NvcGUsICR0aW1lb3V0LCAkbWREaWFsb2csIHBwQXV0aFNlcnZpY2UsICRtZFNpZGVuYXYsICRtZE1lZGlhLCAkbG9nLCAkcm9vdFNjb3BlLCAkbG9jYXRpb24sICRhbmNob3JTY3JvbGwsICRkb2N1bWVudCkge1xyXG5cclxuICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZGF0YSwgdHdvKXtcclxuXHRcdCQoJy5zY3JvbGxXaWR0aCcpLmNzcygndG9wJywgICQodGhpcykuc2Nyb2xsVG9wKCkgKyBcInB4XCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFx0XHQkKCcuc2Nyb2xsV2l0aCcpLmFuaW1hdGUoe1xyXG4gICAgICAgIC8vICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKCcgKyAkKHRoaXMpLnNjcm9sbFRvcCgpICsgXCJweFwiICsnKSdcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICBcclxuXHR9KTtcclxuICAgIFxyXG4gICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24oZSwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xyXG4gICAgICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5jbG9zZSgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IDA7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJHNjb3BlLnRvZ2dsZUxlZnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAkbWRTaWRlbmF2KCdsZWZ0JykudG9nZ2xlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgICRzY29wZS5jbG9zZUxlZnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgJG1kU2lkZW5hdignbGVmdCcpLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgJHNjb3BlLnNjcm9sbFRvID0gZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICB2YXIgb2xkID0gJGxvY2F0aW9uLmhhc2goKTtcclxuICAgICAgICAkbG9jYXRpb24uaGFzaChpZCk7XHJcbiAgICAgICAgJGFuY2hvclNjcm9sbCgpO1xyXG4gICAgICAgICRsb2NhdGlvbi5oYXNoKG9sZCk7XHJcbiAgIH1cclxuXHJcbiAgIHBwQXV0aFNlcnZpY2UuZ2V0VXNlcihmdW5jdGlvbih1c2VyKXtcclxuXHRcdGlmKHVzZXIuZXJyb3IpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHQkcm9vdFNjb3BlLnVzZXIgPSB1c2VyO1xyXG4gICAgfSk7XHJcbiAgIFxyXG4gICAkcm9vdFNjb3BlLnNob3dEaWFsb2cgPSBmdW5jdGlvbihkaWFsb2dOYW1lLCBldiwgcGFyYW1zKXtcclxuICAgICAgICB2YXIgdXNlRnVsbFNjcmVlbiA9ICgkbWRNZWRpYSgnc20nKSB8fCAkbWRNZWRpYSgneHMnKSkgICYmICRzY29wZS5jdXN0b21GdWxsc2NyZWVuO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRtZERpYWxvZy5zaG93KHtcclxuICAgICAgICAgICAgY29udHJvbGxlcjogZGlhbG9nTmFtZSArICdDdHJsJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvZGlhbG9ncy8nICArIGRpYWxvZ05hbWUgKycuaHRtbCcsXHJcbiAgICAgICAgICAgIGxvY2FsczogcGFyYW1zLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcclxuICAgICAgICAgICAgdGFyZ2V0RXZlbnQ6IGV2LFxyXG4gICAgICAgICAgICBjbGlja091dHNpZGVUb0Nsb3NlOnRydWUsXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IHVzZUZ1bGxTY3JlZW5cclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgICAgIGlmKHBhcmFtcy5jYil7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMuY2IocmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICB9XHJcbiAgIFxyXG4gIFxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHNjb3BlLCAkbWREaWFsb2csICRtZFRvYXN0LCBwcEFzc2lnbm1lbnRTZXJ2aWNlLCBwcFJldmlld1NlcnZpY2Upe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHNjb3BlLmFzc2lnbm1lbnRzID0gW107XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwcEFzc2lnbm1lbnRTZXJ2aWNlLmdldEFzc2lnbm1lbnRzKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuYXNzaWdubWVudHMgPSBwcEFzc2lnbm1lbnRTZXJ2aWNlLmFzc2lnbm1lbnRzO1xyXG4gICAgICAgICAgICB9KVxyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkc2NvcGUpe1xyXG5cdHZhciBzZWxmID0gJHNjb3BlO1xyXG5cdFxyXG5cclxuXHRzZWxmLmlzU2hvd2luZyA9IHRydWU7XHJcblxyXG5cdHNlbGYudG9nZ2xlID0gZnVuY3Rpb24oKXtcclxuXHRcdHNlbGYuaXNTaG93aW5nID0gIXNlbGYuaXNTaG93aW5nO1xyXG5cdH1cclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHNjb3BlLCAkbWREaWFsb2csICRtZFRvYXN0LCBwcEFzc2lnbm1lbnRTZXJ2aWNlLCBwcFJldmlld1NlcnZpY2UsIGFzc2lnbm1lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgLy9NYXliZSB0aGVyZSBhbHJlYWR5IGlzIGEgcmV2aWV3IG9wZW5cclxuICAgICRzY29wZS5yZXZpZXcgPSBhc3NpZ25tZW50Lm15UmV2aWV3O1xyXG4gICAgXHJcbiAgICBcclxuICAgICRzY29wZS5yZXF1ZXN0U3VibWlzc2lvbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcHBSZXZpZXdTZXJ2aWNlLmdldFN1Ym1pc3Npb24oYXNzaWdubWVudC5faWQsIGZ1bmN0aW9uKHJldmlldyl7XHJcbiAgICAgICAgICAgIGlmKHJldmlldy5lcnJvciA9PSA1MDMpe1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJFciB6aWpuIG9wIGRpdCBtb21lbnQgaGVsYWFzIGdlZW4gc3VibWlzc2lvbnMgb20gdGUgcmV2aWV3ZW4uIFByb2JlZXIgaGV0IGxhdGVyIG5vZyBlZW5zIVwiKTtcclxuICAgICAgICAgICAgICAgICRtZERpYWxvZy5jYW5jZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkc2NvcGUucmV2aWV3ID0gcmV2aWV3O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAkc2NvcGUuY2FuY2VsRGlhbG9nID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYXNzaWdubWVudC5yZXZpZXcgPSAkc2NvcGUucmV2aWV3O1xyXG4gICAgICAgIHBwQXNzaWdubWVudFNlcnZpY2UuYXNzaWdubWVudERpY1thc3NpZ25tZW50Lm5hbWVdID0gYXNzaWdubWVudDsgIFxyXG4gICAgICAgICRtZERpYWxvZy5jYW5jZWwoKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgICRzY29wZS5zdWJtaXRSZXZpZXcgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHBwUmV2aWV3U2VydmljZS5zdWJtaXRSZXZpZXcoJHNjb3BlLnJldmlldywgZnVuY3Rpb24ocmV2aWV3KXtcclxuICAgICAgICAgICAgYXNzaWdubWVudC5yZXZpZXcgPSByZXZpZXc7XHJcbiAgICAgICAgICAgIHBwQXNzaWdubWVudFNlcnZpY2UuYXNzaWdubWVudERpY1thc3NpZ25tZW50Lm5hbWVdID0gYXNzaWdubWVudDtcclxuICAgICAgICAgICAgJG1kRGlhbG9nLmhpZGUoKTtcclxuICAgICAgICAgICAgJG1kVG9hc3Quc2hvdyh7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJzxtZC10b2FzdCBjbGFzcz1cIm1kLXRvYXN0IHN1Y2Nlc3NcIj48c3BhbiBmbGV4PlJldmlldyBzdWJtaXR0ZWQhIDwvc3Bhbj48L21kLXRvYXN0PicsXHJcbiAgICAgICAgICAgICAgICBoaWRlRGVsYXk6IDMwMDAsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnQgOiAkZG9jdW1lbnRbMF0ucXVlcnlTZWxlY3RvcignI3RvYXN0Qm91bmRzJyksXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3RvcCByaWdodCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHNjb3BlLCAkbWREaWFsb2csICRtZFRvYXN0LCBwcEFzc2lnbm1lbnRTZXJ2aWNlLCAkZG9jdW1lbnQsIGFzc2lnbm1lbnQpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAkc2NvcGUuc3VibWlzc2lvbiA9IGFzc2lnbm1lbnQubXlTdWJtaXNzaW9uO1xyXG4gICAgXHJcbiAgICAkc2NvcGUuc3VibWl0QXNzaWdubWVudCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcHBBc3NpZ25tZW50U2VydmljZS5zdWJtaXRBc3NpZ25tZW50KGFzc2lnbm1lbnQuX2lkLCAkc2NvcGUuc3VibWlzc2lvbiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJG1kRGlhbG9nLmhpZGUoKTtcclxuICAgICAgICAgICAgc2hvd1N1Y2Nlc3MoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAkc2NvcGUuY2FuY2VsRGlhbG9nID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJG1kRGlhbG9nLmNhbmNlbCgpO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gc2hvd1N1Y2Nlc3MoKXtcclxuICAgICAgICAkbWRUb2FzdC5zaG93KHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnPG1kLXRvYXN0IGNsYXNzPVwibWQtdG9hc3Qgc3VjY2Vzc1wiPjxzcGFuIGZsZXg+QXNzaWdubWVudCBzdWJtaXR0ZWQhIDwvc3Bhbj48L21kLXRvYXN0PicsXHJcbiAgICAgICAgICAgICAgICBoaWRlRGVsYXk6IDMwMDAsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnQgOiAkZG9jdW1lbnRbMF0ucXVlcnlTZWxlY3RvcignI3RvYXN0Qm91bmRzJyksXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3RvcCByaWdodCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJHJvb3RTY29wZSwgJHEpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcblx0dmFyIHJhdGlvID0gMS43NDM7XHJcblxyXG5cdHNlbGYuaW1hZ2VMb2NhdGlvbnMgPSBbXHJcblx0XHR7IHNyYzogXCJkZWZhdWx0L2ltZy9CYWNrZ3JvdW5kX21lZGl1bS5wbmdcIiwgb2Zmc2V0OiAwLjQgfSxcclxuXHRcdHsgc3JjOiBcImRlZmF1bHQvaW1nL3dvbGsxX21lZGl1bS5wbmdcIiwgb2Zmc2V0OiAwLjUsIGNsYXNzZXM6XCJjbG91ZFwiIH0sXHJcblx0XHR7IHNyYzogXCJkZWZhdWx0L2ltZy9NVkNfbWVkaXVtLnBuZ1wiLCBvZmZzZXQ6IDAgfSxcclxuXHRcdHsgc3JjOiBcImRlZmF1bHQvaW1nL1dDRl9tZWRpdW0ucG5nXCIsIG9mZnNldDogMS4yIH0sXHJcblx0XHR7IHNyYzogXCJkZWZhdWx0L2ltZy9FRi5wbmdcIiwgb2Zmc2V0OiAxLjQgfSxcclxuXHRcdHsgc3JjOiBcImRlZmF1bHQvaW1nL1dQRi5wbmdcIiwgb2Zmc2V0OiAxLjYgfSxcclxuXHRcdHsgc3JjOiBcImRlZmF1bHQvaW1nL3dvbGsyX21lZGl1bS5wbmdcIiwgb2Zmc2V0OiAwLCBjbGFzc2VzOlwiY2xvdWQgcmVldmVyc2VcIiB9LFxyXG5cdF07XHJcblxyXG5cdHZhciBjYW52YXNXaWR0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKS5vZmZzZXRXaWR0aDtcclxuXHR2YXIgY2FudmFzSGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpLm9mZnNldEhlaWdodDtcclxuXHRcclxuXHQkc2NvcGUucmVhZHkgPSBmYWxzZTtcclxuXHQkc2NvcGUucmVhbEhlaWdodCA9IChjYW52YXNXaWR0aCAqIHJhdGlvIC0gY2FudmFzSGVpZ2h0KTtcclxuXHJcblx0JHNjb3BlLnRvTGV2ZWwgPSBmdW5jdGlvbihuZXdMZXZlbCl7XHJcblx0XHQkc2NvcGUubGV2ZWwgPSAkc2NvcGUucmVhbEhlaWdodCAvIDEwMCAqIG5ld0xldmVsO1xyXG5cdH1cclxuXHRcclxuXHQkc2NvcGUuaXNOZWFyID0gZnVuY3Rpb24odmFsdWUpe1xyXG5cdFx0aWYoISRzY29wZS5yZWFkeSlcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcclxuXHRcdHZhbHVlID0gICRzY29wZS5yZWFsSGVpZ2h0IC8gMTAwICogdmFsdWU7XHJcblx0XHRyZXR1cm4gJHNjb3BlLmxldmVsIDwgKHZhbHVlICsgMTAwKSAmJiAkc2NvcGUubGV2ZWwgPiAodmFsdWUgLSAxMDApO1xyXG5cdH07XHJcblx0XHJcblx0JHNjb3BlLmdldFNyY3NldCA9IGZ1bmN0aW9uKGltZyl7XHJcblx0XHRcclxuXHRcdHZhciByb290ID0gXCJkZWZhdWx0L2ltZy9cIjtcclxuXHRcdHJldHVybiByb290ICsgaW1nICsgXCJfc21hbGwucG5nIDYwMHcsIFwiICsgcm9vdCArIGltZyArIFwiX21lZGl1bS5wbmcgOTAwdywgXCIgKyByb290ICsgaW1nICsgXCJfbGFyZ2UucG5nIDEyMDB3XCI7XHJcblx0fVxyXG5cclxuXHR2YXIgcHJlbG9hZEltYWdlcyA9IGZ1bmN0aW9uKGltYWdlcyl7XHJcblx0XHQgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcblx0XHQgIHZhciBjb3VudCA9IDA7XHJcblxyXG5cdFx0ICBpbWFnZXMuZm9yRWFjaChmdW5jdGlvbihpbWcpe1xyXG5cdFx0XHQkKCc8aW1nPicpLmF0dHIoeyBzcmM6IGltZy5zcmMgfSkubG9hZChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRjb3VudCsrO1xyXG5cdFx0XHRcdGlmKGNvdW50ID09IGltYWdlcy5sZW5ndGgpe1xyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHQgIH0pO1xyXG5cdFx0IFxyXG5cdFx0ICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuXHR9XHJcblxyXG5cdHByZWxvYWRJbWFnZXMoc2VsZi5pbWFnZUxvY2F0aW9ucykudGhlbihmdW5jdGlvbigpe1xyXG5cdFx0JCgnI2xvYWRlcicpLmhlaWdodCgwKTtcclxuXHRcdCRzY29wZS5yZWFkeSA9IHRydWU7XHJcblx0XHQkc2NvcGUudG9MZXZlbCgxMDApO1xyXG5cdH0pO1xyXG5cdFxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gWyckcGFyc2UnLCBmdW5jdGlvbiAoJHBhcnNlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICBzY29wZToge1xyXG4gICAgICAgIG9uc29ydDogJz0nXHJcbiAgICAgIH0sXHJcbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMpIHtcclxuICAgICAgICBcclxuICAgICAgICAvL3N1YnNjcmliZVxyXG4gICAgICAgIGlmKCFzY29wZS4kcGFyZW50LmVsZW1lbnRzVG9Mb2FkKXtcclxuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuZWxlbWVudHNUb0xvYWQgPSAwO1xyXG4gICAgICAgICAgc2NvcGUuJHBhcmVudC5lbGVtZW50c0xvYWRlZCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNjb3BlLiRwYXJlbnQuZWxlbWVudHNUb0xvYWQrKztcclxuXHJcbiAgICAgICAgZWxlbS5vbignbG9hZCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBzY29wZS4kcGFyZW50LmVsZW1lbnRzTG9hZGVkKys7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHNjb3BlLiRwYXJlbnQuZWxlbWVudHNMb2FkZWQgPT0gc2NvcGUuJHBhcmVudC5lbGVtZW50c1RvTG9hZCl7XHJcbiAgICAgICAgICAgICAgICBpZihzY29wZS4kcGFyZW50LmxvYWRpbmdDb21wbGV0ZSlcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kcGFyZW50LmxvYWRpbmdDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfV07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4ge1xyXG5cdHRyYW5zY2x1ZGU6IHRydWUsXHJcblx0dGVtcGxhdGU6IFwiPGRpdiBjbGFzcz0ncm93Jz48ZGl2IGNsYXNzPSdjb2wtbWQtMSc+PC9kaXY+PGRpdiBjbGFzcz0nY29sLW1kLTEwJz48bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+PC9kaXY+PGRpdiBjbGFzcz0nY29sLW1kLTEnPjwvZGl2PjwvZGl2PlwiLFxyXG4gICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpe1xyXG5cdFx0XHJcblx0XHQvL01vZXQgbWV0IHRpbWVvdXQgZGFua3ppaiBib290c3RyYXBcclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoZWxlbWVudCkuZmluZCgnLndyYXBwZXInKS50d2VudHl0d2VudHkoKTtcclxuXHRcdH0sIDMwMCk7XHJcblx0XHRcclxuXHRcdFx0XHJcblx0fVxyXG4gIH07XHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbihpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBpbnB1dCA/IGlucHV0LnNwbGl0KCdAJylbMF0gOiBcIlwiO1xyXG4gIH1cclxufSJdfQ==
