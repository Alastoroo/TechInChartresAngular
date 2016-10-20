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

  app.controller('mainController', function($sce){
    this.video = objectVideo;
    this.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }
  });


})();
