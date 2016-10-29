$.fn.animateRotate = function(angle, duration, easing, complete) {
  var args = $.speed(duration, easing, complete);
  var step = args.step;
  return this.each(function(i, e) {
    args.complete = $.proxy(args.complete, e);
    args.step = function(now) {
      $.style(e, 'transform', 'rotate(' + now + 'deg)');
      if (step) return step.apply(e, arguments);
    };

    $({deg: 0}).animate({deg: angle}, args);
  });
};


(function() {
  var countInterview = undefined;

  var app = angular.module('TechInChartres', []);
  app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

  app.controller('mainController', function($scope, $http) {
    $scope.data = undefined;
    $scope.aucunResultat = false;

    // Moteur de recherche qui prend la valeur du champ de
    // recherche et qui affiche les interviews correspondants
    $scope.searchEngine = function(index) {

      var searchValue = $('#search_value').val();
      var interviewName = $scope.data.interviews[index].title;

      if(searchValue.length > 0) {
        var pattern = new RegExp(searchValue, "gi");
        if(pattern.test(interviewName))
          return true;
        else
          return false;
      }
      else
        return true;

    };

    $http.get('js/interviewExample.json').success(function (data) {
      $scope.data = data;
      countInterview = data.interviews.length; // Ici on attribut le nombre d'interview a cette variable

      // ici on parse les Questions, en se servant de la balise [Q]
      for(var interview in data.interviews) {
        var questionsReponses = data.interviews[interview].content;
        questionsReponses = questionsReponses.replace( /\[Q\](.+?)\[\/Q]/gi, "<h1 class='interviewQuestion'>$1</h1>" );
        data.interviews[interview].content = questionsReponses;
      }

    });
  });

  app.directive('footerCss', function () {return {restrict: 'EA',templateUrl: 'css/footer.css'};});

  app.directive('navbar', function () {
    return {
      restrict: 'EA',
      templateUrl: 'templates/pages/navbar.html',
      link: function (scope, element, attrs) {
        angular.getTestability(element).whenStable(function() {
          $('#countDown_navbar').countdown({
              date: "September 29, 2017 19:00:00"
          });
        });
      }
    };
  });

  app.directive('footer', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/footer.html'
    }
  });

  $(document).ready(function() {
    $('#search_value').on('input', function() {
      // Ici on regarde si le nombre de bloc caché (bloc qui ne correspondent pas a la recherche)
      // est le même que le nombre total de bloc. SI oui, alors c'est qu'on a aucun résultat
      // Donc on montre le bloc qui le dit
      if(countInterview === $('div.ng-hide').length) {
        $('.noresult').removeClass('hideBloc');
      }
      else {
        $('.noresult').addClass('hideBloc');
      }
    });

  });
  // On écoute le moindre click. On ne peut utiliser la fonctionc click puisque les éléments
  // ne sont pas encore présents
  $(document).on("click", ".arrow", function(){
    const durationAnimation = 200;

    var $currentInterview = $(this).parent().parent().parent().parent().parent().parent().parent().parent();
    var $currentArrow = $(this);

    if($('.arrowActive').length > 0) {
      // Si on clique sur l'élément qui est ouvert
      if($(this).hasClass('arrowActive')) {
        console.log('aa');
        $(this).removeClass('arrowActive').animateRotate(0, {
          duration: durationAnimation,
          easing: 'linear',
          complete: function() {
            $currentInterview.css('height', '250px');
          },
          step: function() {}
        });
      }
      else {
        $('.arrow').removeClass('arrowActive').animateRotate(0, {
          duration: durationAnimation,
          easing: 'linear',
          complete: function() {

            $currentArrow.addClass('arrowActive').animateRotate(180, {
              duration: durationAnimation,
              easing: 'linear',
              complete: function () {
                $('.interview').css('height', '250px');
                $currentInterview.css('height', 'inherit');
              },
              step: function () {}
            });

          },
          step: function() {}
        });
      }
    }
    else {
      // Tout est fermé

      $(this).addClass('arrowActive').animateRotate(180, {
        duration: durationAnimation,
        easing: 'linear',
        complete: function () {
          $currentInterview.css('height', 'inherit');
        },
        step: function () {}
      });
    }
  })
  .on("click", "#sortBloc", function(){
    if($(this).hasClass('desc')) {
      $(this).attr('class', 'asc').children('img').css({
        'transform': 'rotate(180deg)'
      });
      $(this).children('font').text('Les moins récents');
    }
    else {
      $(this).attr('class', 'desc').children('img').css({
        'transform': 'rotate(0deg)'
      });
      $(this).children('font').text('Les plus récents');
    }
    console.log('test')
  });

})();
