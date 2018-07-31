/* eslint-disable*/
var spriteImg = new Image();
var app = {
  // Application Constructor
  initialize: function () {
    this.bindEvents();
  },
  bindEvents: function () {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  onDeviceReady: function () {

    spriteImg.onload = app.playAni;
    spriteImg.src = "./images/bugani.png";
  },
  playAni: function () {

    var canvas = document.getElementById('canvas');
    var logo = document.getElementById('logo');
    var wWidth = window.innerWidth;
    var wHeight = window.innerHeight;
    var aniRadioW = 851/900;
    var aniRadioH = 1143/1400;
    var aniWidth = wWidth * aniRadioW;
    var aniHeight = wHeight * aniRadioH;

    var aniX = (wWidth - aniWidth) / 2;
    var aniY = (wHeight - aniHeight) / 2;
    // alert(aniHeight)
    var ratio = aniWidth / aniHeight;
    var splashWidth = 301;
    var splashHeight = 400;
    // if (splashHeight > wHeight) {
    //   splashHeight = wHeight;
    //   splashWidth = splashHeight * ratio;
    // }else {
    //   canvas.style.marginTop = (wHeight - splashHeight) / 2 + "px";
    // }
   var logWidth = wWidth * 0.6;
    canvas.width = wWidth;
    canvas.height = wHeight;
    logo.style.width = logWidth + "px";
    logo.style.left = (wWidth - logWidth) / 2 + "px";
    logo.style.top = "100px";
    var stage = new createjs.Stage("canvas");
    var data = {
        images: [spriteImg],
        frames: {width:851, height:1143},
        animations: {
            stand:0,
            // framerate: 60,
            // faint:33,
            run:[0 , 33, false]
        }
    };
    var spriteSheet = new createjs.SpriteSheet(data);
    var animation = new createjs.Sprite(spriteSheet, "run");
    animation.scaleX = aniWidth/851;
    animation.scaleY = aniHeight/1143;

    stage.addChild(animation);
    stage.update();
    // createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.framerate = 12;
		createjs.Ticker.addEventListener("tick", tick);
    function tick(event) {
  		stage.update(event);
  	}
  }
};

app.initialize();
