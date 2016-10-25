
function redirectToMeetUp() {
    window.location.href = "https://secure.meetup.com/oauth2/authorize?client_id=ejmd7jeh2q0f6no4iutmhijrui&response_type=code&redirect_uri=http://rxdesign.io";
}

// Tableau video pour gallery page 2 DEBUT
(function() {
  var objectVideo = [
    {
    name : "video1",
    url : "https://player.vimeo.com/video/149018045"

  },

    {
    name : "video2",
    url : "https://player.vimeo.com/video/148980690"

  },

    {
      name : "video3",
      url : "https://player.vimeo.com/video/148937346"

  },

    {
    name : "video4",
    url : "https://player.vimeo.com/video/148952462"

  },

    {
    name : "video5",
    url : "https://player.vimeo.com/video/148979295"

  },

    {
    name : "video6",
    url : "https://player.vimeo.com/video/149589036"

  },

    {
    name : "video7",
    url : "https://player.vimeo.com/video/149590795"

  },

    {
    name : "video8",
    url : "https://player.vimeo.com/video/149590816"

  },

    {
    name : "video9",
    url : "https://player.vimeo.com/video/156534528"

  },

    {
    name : "video10",
    url : "https://player.vimeo.com/video/156587566"

  },

    {
    name : "video11",
    url : "https://player.vimeo.com/video/156617042"

  }
  ];
  var app = angular.module('TechInChartres', []);
  
  app.directive('footerCss', function () {              return {restrict: 'EA',templateUrl: 'css/footer.css'};});

  app.controller('mainController', function($sce){
    this.video = objectVideo;
    this.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }
  });
  app.directive('navbar', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/navbar.html',
      link: function (scope, element, attrs) {
        angular.getTestability(element).whenStable(function() {
          // Ici on passe deux DIV avec l'ID "countDown" et l'ID "countDown_navbar" a la fonction "countdown"
        	// Ici on utilise un Plugin jQuery, le plugin "countdown".
        	// On défini la date du compte à rebours dans la fonction countdown (La date viendra de l'API Meetup)
          $('#countDown_navbar').countdown({
              date: "September 29, 2017 19:00:00"
          });
        });
      }
    };
  });
  // JS IMPORT (dans le JS on a du HTML et un appel a une fonction js)
  app.directive("countDownJs", function () {return {restrict: 'EA',templateUrl: 'js/jquery.countdown.js'};});
  // END JS IMPORT
  app.directive("footer", function (){
    return {
      restrict: 'EA', templateUrl: "templates/pages/footer.html"
    };
  });

})();
