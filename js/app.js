
//
(function() {
  var app = angular.module('TechInChartres', []);

  app.service('anchorSmoothScroll', function(){
      this.scrollTo = function(eID) {

          // This scrolling function
          // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

          var startY = currentYPosition();
          var stopY = elmYPosition(eID);
          var distance = stopY > startY ? stopY - startY : startY - stopY;
          if (distance < 100) {
              scrollTo(0, stopY); return;
          }
          var speed = Math.round(distance / 100);
          if (speed >= 20) speed = 20;
          var step = Math.round(distance / 25);
          var leapY = stopY > startY ? startY + step : startY - step;
          var timer = 0;
          if (stopY > startY) {
              for ( var i=startY; i<stopY; i+=step ) {
                  setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                  leapY += step; if (leapY > stopY) leapY = stopY; timer++;
              } return;
          }
          for ( var i=startY; i>stopY; i-=step ) {
              setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
              leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
          }

          function currentYPosition() {
              // Firefox, Chrome, Opera, Safari
              if (self.pageYOffset) return self.pageYOffset;
              // Internet Explorer 6 - standards mode
              if (document.documentElement && document.documentElement.scrollTop)
                  return document.documentElement.scrollTop;
              // Internet Explorer 6, 7 and 8
              if (document.body.scrollTop) return document.body.scrollTop;
              return 0;
          }

          function elmYPosition(eID) {
              var elm = document.getElementById(eID);
              var y = elm.offsetTop;
              var node = elm;
              while (node.offsetParent && node.offsetParent != document.body) {
                  node = node.offsetParent;
                  y += node.offsetTop;
              } return y - 60;
          }

      };
  });

  // Controller principal
  app.controller('mainController', function($scope, $location, anchorSmoothScroll) {
    // Fonction gotoElement sert à descendre a l'élément correspondant avec un animation de scroll
    $scope.gotoElement = function (eID){
      $location.hash(eID);
      anchorSmoothScroll.scrollTo(eID);
    };
  });

  // CSS IMPORT
  app.directive('presentationCss', function () {        return {restrict: 'EA',templateUrl: 'css/presentation.css'};});
  app.directive('newsCss', function () {                return {restrict: 'EA',templateUrl: 'css/news.css'};});
  app.directive('intervenantCss', function () {         return {restrict: 'EA',templateUrl: 'css/intervenant.css'};});
  app.directive('imageCitationCss', function () {       return {restrict: 'EA',templateUrl: 'css/imagecitation.css'};});
  app.directive('statCss', function () {                return {restrict: 'EA',templateUrl: 'css/stat.css'};});
  app.directive('equipeCss', function () {              return {restrict: 'EA',templateUrl: 'css/equipe.css'};});
  app.directive('galleryCss', function () {             return {restrict: 'EA',templateUrl: 'css/gallery.css'};});
  app.directive('contactCss', function () {             return {restrict: 'EA',templateUrl: 'css/contact.css'};});
  app.directive('footerCss', function () {              return {restrict: 'EA',templateUrl: 'css/footer.css'};});
  // END CSS IMPORT

  // JS IMPORT (dans le JS on a du HTML et un appel a une fonction js)
  app.directive("countDownJs", function () {return {restrict: 'EA',templateUrl: 'js/jquery.countdown.js'};});
  // END JS IMPORT

  app.factory('formulaireService', function($http, $q){
    return {
      post(name,email,sujet,message) {
        var deferred = $q.defer();

        var params = $.param({
          name: name,
          email: email,
          topic: sujet,
          message: message
        });

        $http.post('APIMATHURL', params, {
          'Content-Type': 'application/x-www-form-urlencoded'
        }).success((res) => {
            deferred.resolve(true);
        });

        return deferred.promise;
      }
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

  // Controller du formulaire
  app.controller('formController',function($scope, $http, formulaireService){
    // Fonction contact qui envoi les données
    this.contact = function() {
      var name = $scope.name;
      var email = $scope.email;
      var sujet = $scope.sujet;
      var message = $scope.message;

      formulaireService.post(name, email, sujet, message);
    };
  });

  app.directive('navbar', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/navbar.html',
      link: function (scope, element, attrs) {
        angular.getTestability(element).whenStable(function() {

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
                var timeOutAnimation = 0;

                $('.hamburgerItem').each(function() {

                  var $item = $(this);
                  setTimeout(function() {
                    $item.animate({
                      'margin-top': '0px'
                    }, 400);
                  }, timeOutAnimation);
                  timeOutAnimation+=150;

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
        })
      }
    };
  })
  .directive('countdown', ['countDownService', function(countDownService) {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/countdown.html',
      link: function (scope, element, attrs) {
        angular.getTestability(element).whenStable(function() {
          // On utilise le service qui va chercher la date du prochain meetup
          countDownService.get().then((data) => {

            var nextMeetupDate = data.results[0].time;
            // Ici on passe deux DIV avec l'ID "countDown" et l'ID "countDown_navbar" a la fonction "countdown"
          	// Ici on utilise un Plugin jQuery, le plugin "countdown".
          	// On défini la date du compte à rebours dans la fonction countdown (La date viendra de l'API Meetup)
            $('#countDown, #countDown_navbar').countdown({
                date: nextMeetupDate
            });

            // Ici on met le titre de l'accueil en forme avec la date
            var dateObj = new Date(nextMeetupDate);
            var mois = ["janvier", "février", "mars", "avril", "mai", "juin",
                        "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
            var dateFormat = dateObj.getDate()+" "+mois[dateObj.getMonth()];
            $('.dateConference').html('<span class="lineTitle"></span>rendez-vous le '+dateFormat+'<span class="lineTitle"></span>');

            // Ici on met le nom du prochain meetup dans la page d'accueil, titre et bloc news
            $('.titreConference, #news h2.subTitle').html(data.results[0].name);

            // Ici on met le contenu du prochain meetup.
            $('#news p.descriptif').html(data.results[0].description.replace(/<(?:.|\n)*?>/gm, ''))
          });



          $('#topContent, #countDownDisplayTable').css('height', window.innerHeight-70+'px'); // Le 70 c'est pour le margin-top

          var animateArrowDown = function() {
            setInterval(function() {
              $('#arrowDownAnimate').animate({
                'bottom': '40px'
              }, 1000, function() {
                $('#arrowDownAnimate').animate({
                  'bottom': '20px'
                }, 1000);
              });
            }, 2000);
          };
          animateArrowDown();
          // Ici on positionne la fleche exactement au centre
          $('#arrowDownAnimate').css('left', window.innerWidth/2-(parseFloat($('#arrowDownAnimate').css('width'))/2)+'px');


        });
      }
    };
  }])
  .directive('presentation', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/presentation.html'
    };
  })
  .directive('news', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/news.html'
    };
  })
  .directive('intervenant', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/intervenant.html'
    };
  })
  .directive('imageCitation', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/imagecitation.html'
    };
  })
  .directive('stat', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/stat.html'
    };
  })
  .directive('equipe', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/equipe.html'
    };
  })
  .directive('galleryOnePage', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/GalleryOnePage.html'
    };
  })
  .directive('contact', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/contact.html',
      link: function (scope, element, attrs) {
        angular.getTestability(element).whenStable(function() {

        });
      }
    };
  })
  .directive('footer', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/footer.html'
    };
  });

})();
