
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
  app.factory('countDownService', function($http, $q) {
    return {
      error: null,
      nextMeetupDate: null,
      get() {
        let deferred = $q.defer();
        if(!this.nextMeetupDate) {
          // https://api.meetup.com/2/events?key=65224b6434776b43c3746545c315361&group_urlname=techn-in-chartres&sign=true
          $http.get("js/countdownExample.json").then((res) => {
            this.nextMeetupDate = res.data;
            deferred.resolve(this.nextMeetupDate);
          }, (error) => {
            deferred.error = error;
          });
        }
        else {
          deferred.resolve(this.nextMeetupDate);
        }
        return deferred.promise;
      }
    }
  });
  app.directive('navbar', ['countDownService', function(countDownService) {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/navbar.html',
      link: function (scope, element, attrs) {
        angular.getTestability(element).whenStable(function() {
          // Ici on passe deux DIV avec l'ID "countDown" et l'ID "countDown_navbar" a la fonction "countdown"
        	// Ici on utilise un Plugin jQuery, le plugin "countdown".
        	// On défini la date du compte à rebours dans la fonction countdown (La date viendra de l'API Meetup)

          countDownService.get().then((data) => {
            var nextMeetupDate = data.results[0].time;
            $('#countDown_navbar').countdown({
                date: nextMeetupDate
            });
          });

          var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};

    	    var hamburgers = document.querySelectorAll(".hamburger");
    	    if (hamburgers.length > 0) {
    	      forEach(hamburgers, function(hamburger) {
    	        hamburger.addEventListener("click", function() {
    	          this.classList.toggle("is-active");
    	        }, false);
    	      });
    	    }

          // Click sur menu hbgr
          $('.hamburger').click(function() {

            if($(this).hasClass('is-active')) {

              $('#hamburgerMain').css('display', 'block').animate({
                'opacity': '1'
              }, 300, function() {
                var timeOutAnimation = 200;

                $('.hamburgerItem').each(function() {

                  var $item = $(this);
                  setTimeout(function() {
                    $item.animate({
                      'margin-top': '0px'
                    }, 400);
                  }, timeOutAnimation);
                  timeOutAnimation+=200;

                });

              });

            }
            else {
              // Cache menu
              $('#hamburgerMain').animate({
                'opacity': '0'
              }, 500, function() {
                $(this).css('display', 'none');
                $('.hamburgerItem').css('margin-top', '1000px');
              });

            }
          });

        });
      }
    };
  }]);
  // JS IMPORT (dans le JS on a du HTML et un appel a une fonction js)
  app.directive("countDownJs", function () {return {restrict: 'EA',templateUrl: 'js/jquery.countdown.js'};});
  // END JS IMPORT
  app.directive("footer", function (){
    return {
      restrict: 'EA', templateUrl: "templates/pages/footer.html"
    };
  });

})();
