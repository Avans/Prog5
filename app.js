(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var routesConfig = require('./config/routes');
var overviewCtrl = require("./controllers/overviewCtrl");
var twentytwenty = require('./directives/twentytwenty');
var hoverCtrl= require('./controllers/hoverCtrl');
var slideCtrl = require("./controllers/slideCtrl");

var app = angular.module('Prog5', ["PointyPony", "ui.router", "ngAnimate"]);

app.constant('appConfig', {
	courseToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IlByb2c1Ig.Lbd5e9wYohfEPkA-t_DE4SJuIIrpyKQBwHiA73dpTXQ",
});

app.controller('hoverCtrl', hoverCtrl);
app.controller('overviewCtrl', overviewCtrl);
app.controller('slideCtrl', slideCtrl);
app.directive('twentytwenty', twentytwenty);
app.config(routesConfig);

//Initialize angular material styling with bootstrap
$.material.init();
},{"./config/routes":2,"./controllers/hoverCtrl":3,"./controllers/overviewCtrl":4,"./controllers/slideCtrl":5,"./directives/twentytwenty":6}],2:[function(require,module,exports){
module.exports = function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('home');
    
    $stateProvider
        
        .state('home', { url: '/home?section',  templateUrl:'default/home.html' })
        .state('profile', { url: '/profile',  templateUrl:'default/profile.html' })
        .state('leaderboards', { url: '/leaderboards',  templateUrl:'default/leaderboards.html' })
        .state('pullrequest', { url: '/pullrequest',  templateUrl:'default/pullrequest.html' })
        .state('punten', { url: '/Avanspunten',  templateUrl:'default/Avanspunten.html' })
                
        .state('week1', { url: '/week1?section',  templateUrl:'week1/informatie.html' })
        .state('week1Opdrachten', { url: '/week1/opdrachten',  templateUrl:'week1/opdrachten.html' })
        
        .state('week2', { url: '/week2',  templateUrl:'week2/informatie.html' })
        .state('week2Opdrachten', { url: '/week2/opdrachten',  templateUrl:'week2/opdrachten.html' })
        
        .state('week3a', { url: '/week3/introductie',  templateUrl:'week3/informatie_intro.html' })
        .state('week3b', { url: '/week3/wpfbasics',  templateUrl:'week3/informatie_basics.html' })
        .state('week3Opdrachten', { url: '/week3/opdrachten',  templateUrl:'week3/opdrachten.html' })
        
        .state('week4', { url: '/week4',  templateUrl:'week4/informatie.html' })
        .state('week4Opdrachten', { url: '/week4/opdrachten',  templateUrl:'week4/opdrachten.html' })
        
        .state('week5', { url: '/week5',  templateUrl:'week5/informatie.html' })
        .state('week5Opdrachten', { url: '/week5/opdrachten',  templateUrl:'week5/opdrachten.html' })
        
        .state('week6', { url: '/week6',  templateUrl:'week6/informatie.html' })
        .state('week6Opdrachten', { url: '/week6/opdrachten',  templateUrl:'week6/opdrachten.html' });
        
        

};
},{}],3:[function(require,module,exports){
module.exports = function($scope){
	var self = $scope;
	
	var enable = false;
	self.isShowing = false;
	
	
	self.show = function(){
		if(!enable);
		self.isShowing = true;
	}
	
	self.hide = function(){
		if(!enable)
		self.isShowing = false;
	}
	
	self.toggle = function(){
		enable = !enable;
		self.isShowing = enable;
	}
}
},{}],4:[function(require,module,exports){
module.exports = function($scope){
	var self = $scope;
	
	$(window).on('scroll', function(data, two){
		$('#overview').css('top',  $(this).scrollTop() + "px");
	});
	
	self.scrollTo = function(elementId){
		
		localStorage.setItem('subMenuOpen',  elementId);
		var element = document.getElementById(elementId);
		
		if(element){
			
		
		    $('html, body').animate({
		        scrollTop: $(element).offset().top + -150
		    }, 1000);
		}
		
	};
	
	self.goTo = function(elementId){
		
		var element = document.getElementById(elementId);
		
		if(element){

		    $('html, body').animate({
		        scrollTop: $(element).offset().top + -150
		    }, 100);
		}
	}
	
	
	var lastOpenId = localStorage.getItem('subMenuOpen');
	self.goTo(lastOpenId);

}
},{}],5:[function(require,module,exports){
module.exports = function($scope){

  /** under construction */
    
}
  

},{}],6:[function(require,module,exports){
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIiwiYXBwL2NvbmZpZy9yb3V0ZXMuanMiLCJhcHAvY29udHJvbGxlcnMvaG92ZXJDdHJsLmpzIiwiYXBwL2NvbnRyb2xsZXJzL292ZXJ2aWV3Q3RybC5qcyIsImFwcC9jb250cm9sbGVycy9zbGlkZUN0cmwuanMiLCJhcHAvZGlyZWN0aXZlcy90d2VudHl0d2VudHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXHJcbnZhciByb3V0ZXNDb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZy9yb3V0ZXMnKTtcclxudmFyIG92ZXJ2aWV3Q3RybCA9IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzL292ZXJ2aWV3Q3RybFwiKTtcclxudmFyIHR3ZW50eXR3ZW50eSA9IHJlcXVpcmUoJy4vZGlyZWN0aXZlcy90d2VudHl0d2VudHknKTtcclxudmFyIGhvdmVyQ3RybD0gcmVxdWlyZSgnLi9jb250cm9sbGVycy9ob3ZlckN0cmwnKTtcclxudmFyIHNsaWRlQ3RybCA9IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzL3NsaWRlQ3RybFwiKTtcclxuXHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnUHJvZzUnLCBbXCJQb2ludHlQb255XCIsIFwidWkucm91dGVyXCIsIFwibmdBbmltYXRlXCJdKTtcclxuXHJcbmFwcC5jb25zdGFudCgnYXBwQ29uZmlnJywge1xyXG5cdGNvdXJzZVRva2VuOiBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5JbEJ5YjJjMUlnLkxiZDVlOXdZb2hmRVBrQS10X0RFNFNKdUlJcnB5S1FCd0hpQTczZHBUWFFcIixcclxufSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignaG92ZXJDdHJsJywgaG92ZXJDdHJsKTtcclxuYXBwLmNvbnRyb2xsZXIoJ292ZXJ2aWV3Q3RybCcsIG92ZXJ2aWV3Q3RybCk7XHJcbmFwcC5jb250cm9sbGVyKCdzbGlkZUN0cmwnLCBzbGlkZUN0cmwpO1xyXG5hcHAuZGlyZWN0aXZlKCd0d2VudHl0d2VudHknLCB0d2VudHl0d2VudHkpO1xyXG5hcHAuY29uZmlnKHJvdXRlc0NvbmZpZyk7XHJcblxyXG4vL0luaXRpYWxpemUgYW5ndWxhciBtYXRlcmlhbCBzdHlsaW5nIHdpdGggYm9vdHN0cmFwXHJcbiQubWF0ZXJpYWwuaW5pdCgpOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xyXG4gICAgXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCdob21lJyk7XHJcbiAgICBcclxuICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgXHJcbiAgICAgICAgLnN0YXRlKCdob21lJywgeyB1cmw6ICcvaG9tZT9zZWN0aW9uJywgIHRlbXBsYXRlVXJsOidkZWZhdWx0L2hvbWUuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ3Byb2ZpbGUnLCB7IHVybDogJy9wcm9maWxlJywgIHRlbXBsYXRlVXJsOidkZWZhdWx0L3Byb2ZpbGUuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ2xlYWRlcmJvYXJkcycsIHsgdXJsOiAnL2xlYWRlcmJvYXJkcycsICB0ZW1wbGF0ZVVybDonZGVmYXVsdC9sZWFkZXJib2FyZHMuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ3B1bGxyZXF1ZXN0JywgeyB1cmw6ICcvcHVsbHJlcXVlc3QnLCAgdGVtcGxhdGVVcmw6J2RlZmF1bHQvcHVsbHJlcXVlc3QuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ3B1bnRlbicsIHsgdXJsOiAnL0F2YW5zcHVudGVuJywgIHRlbXBsYXRlVXJsOidkZWZhdWx0L0F2YW5zcHVudGVuLmh0bWwnIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAuc3RhdGUoJ3dlZWsxJywgeyB1cmw6ICcvd2VlazE/c2VjdGlvbicsICB0ZW1wbGF0ZVVybDond2VlazEvaW5mb3JtYXRpZS5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgnd2VlazFPcGRyYWNodGVuJywgeyB1cmw6ICcvd2VlazEvb3BkcmFjaHRlbicsICB0ZW1wbGF0ZVVybDond2VlazEvb3BkcmFjaHRlbi5odG1sJyB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIC5zdGF0ZSgnd2VlazInLCB7IHVybDogJy93ZWVrMicsICB0ZW1wbGF0ZVVybDond2VlazIvaW5mb3JtYXRpZS5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgnd2VlazJPcGRyYWNodGVuJywgeyB1cmw6ICcvd2VlazIvb3BkcmFjaHRlbicsICB0ZW1wbGF0ZVVybDond2VlazIvb3BkcmFjaHRlbi5odG1sJyB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIC5zdGF0ZSgnd2VlazNhJywgeyB1cmw6ICcvd2VlazMvaW50cm9kdWN0aWUnLCAgdGVtcGxhdGVVcmw6J3dlZWszL2luZm9ybWF0aWVfaW50cm8uaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ3dlZWszYicsIHsgdXJsOiAnL3dlZWszL3dwZmJhc2ljcycsICB0ZW1wbGF0ZVVybDond2VlazMvaW5mb3JtYXRpZV9iYXNpY3MuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ3dlZWszT3BkcmFjaHRlbicsIHsgdXJsOiAnL3dlZWszL29wZHJhY2h0ZW4nLCAgdGVtcGxhdGVVcmw6J3dlZWszL29wZHJhY2h0ZW4uaHRtbCcgfSlcclxuICAgICAgICBcclxuICAgICAgICAuc3RhdGUoJ3dlZWs0JywgeyB1cmw6ICcvd2VlazQnLCAgdGVtcGxhdGVVcmw6J3dlZWs0L2luZm9ybWF0aWUuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ3dlZWs0T3BkcmFjaHRlbicsIHsgdXJsOiAnL3dlZWs0L29wZHJhY2h0ZW4nLCAgdGVtcGxhdGVVcmw6J3dlZWs0L29wZHJhY2h0ZW4uaHRtbCcgfSlcclxuICAgICAgICBcclxuICAgICAgICAuc3RhdGUoJ3dlZWs1JywgeyB1cmw6ICcvd2VlazUnLCAgdGVtcGxhdGVVcmw6J3dlZWs1L2luZm9ybWF0aWUuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ3dlZWs1T3BkcmFjaHRlbicsIHsgdXJsOiAnL3dlZWs1L29wZHJhY2h0ZW4nLCAgdGVtcGxhdGVVcmw6J3dlZWs1L29wZHJhY2h0ZW4uaHRtbCcgfSlcclxuICAgICAgICBcclxuICAgICAgICAuc3RhdGUoJ3dlZWs2JywgeyB1cmw6ICcvd2VlazYnLCAgdGVtcGxhdGVVcmw6J3dlZWs2L2luZm9ybWF0aWUuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ3dlZWs2T3BkcmFjaHRlbicsIHsgdXJsOiAnL3dlZWs2L29wZHJhY2h0ZW4nLCAgdGVtcGxhdGVVcmw6J3dlZWs2L29wZHJhY2h0ZW4uaHRtbCcgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHNjb3BlKXtcclxuXHR2YXIgc2VsZiA9ICRzY29wZTtcclxuXHRcclxuXHR2YXIgZW5hYmxlID0gZmFsc2U7XHJcblx0c2VsZi5pc1Nob3dpbmcgPSBmYWxzZTtcclxuXHRcclxuXHRcclxuXHRzZWxmLnNob3cgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYoIWVuYWJsZSk7XHJcblx0XHRzZWxmLmlzU2hvd2luZyA9IHRydWU7XHJcblx0fVxyXG5cdFxyXG5cdHNlbGYuaGlkZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZighZW5hYmxlKVxyXG5cdFx0c2VsZi5pc1Nob3dpbmcgPSBmYWxzZTtcclxuXHR9XHJcblx0XHJcblx0c2VsZi50b2dnbGUgPSBmdW5jdGlvbigpe1xyXG5cdFx0ZW5hYmxlID0gIWVuYWJsZTtcclxuXHRcdHNlbGYuaXNTaG93aW5nID0gZW5hYmxlO1xyXG5cdH1cclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHNjb3BlKXtcclxuXHR2YXIgc2VsZiA9ICRzY29wZTtcclxuXHRcclxuXHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKGRhdGEsIHR3byl7XHJcblx0XHQkKCcjb3ZlcnZpZXcnKS5jc3MoJ3RvcCcsICAkKHRoaXMpLnNjcm9sbFRvcCgpICsgXCJweFwiKTtcclxuXHR9KTtcclxuXHRcclxuXHRzZWxmLnNjcm9sbFRvID0gZnVuY3Rpb24oZWxlbWVudElkKXtcclxuXHRcdFxyXG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N1Yk1lbnVPcGVuJywgIGVsZW1lbnRJZCk7XHJcblx0XHR2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XHJcblx0XHRcclxuXHRcdGlmKGVsZW1lbnQpe1xyXG5cdFx0XHRcclxuXHRcdFxyXG5cdFx0ICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuXHRcdCAgICAgICAgc2Nyb2xsVG9wOiAkKGVsZW1lbnQpLm9mZnNldCgpLnRvcCArIC0xNTBcclxuXHRcdCAgICB9LCAxMDAwKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdH07XHJcblx0XHJcblx0c2VsZi5nb1RvID0gZnVuY3Rpb24oZWxlbWVudElkKXtcclxuXHRcdFxyXG5cdFx0dmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xyXG5cdFx0XHJcblx0XHRpZihlbGVtZW50KXtcclxuXHJcblx0XHQgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG5cdFx0ICAgICAgICBzY3JvbGxUb3A6ICQoZWxlbWVudCkub2Zmc2V0KCkudG9wICsgLTE1MFxyXG5cdFx0ICAgIH0sIDEwMCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cdHZhciBsYXN0T3BlbklkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N1Yk1lbnVPcGVuJyk7XHJcblx0c2VsZi5nb1RvKGxhc3RPcGVuSWQpO1xyXG5cclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHNjb3BlKXtcclxuXHJcbiAgLyoqIHVuZGVyIGNvbnN0cnVjdGlvbiAqL1xyXG4gICAgXHJcbn1cclxuICBcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4ge1xyXG5cdHRyYW5zY2x1ZGU6IHRydWUsXHJcblx0dGVtcGxhdGU6IFwiPGRpdiBjbGFzcz0ncm93Jz48ZGl2IGNsYXNzPSdjb2wtbWQtMSc+PC9kaXY+PGRpdiBjbGFzcz0nY29sLW1kLTEwJz48bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+PC9kaXY+PGRpdiBjbGFzcz0nY29sLW1kLTEnPjwvZGl2PjwvZGl2PlwiLFxyXG4gICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpe1xyXG5cdFx0XHJcblx0XHQvL01vZXQgbWV0IHRpbWVvdXQgZGFua3ppaiBib290c3RyYXBcclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoZWxlbWVudCkuZmluZCgnLndyYXBwZXInKS50d2VudHl0d2VudHkoKTtcclxuXHRcdH0sIDMwMCk7XHJcblx0XHRcclxuXHRcdFx0XHJcblx0fVxyXG4gIH07XHJcbn07Il19
