
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