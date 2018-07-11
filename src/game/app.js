/* eslint-disable*/
var serverURL = "./";
window.requestAnimFrame = (function(callback) { // shim
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();
window.cancelAnimFrame = window.cancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.webkitCancelAnimationFrame;
var app = {
  // Application Constructor
  initialize: function () {
    this.bindEvents();
  },
  bindEvents: function () {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  onDeviceReady: function () {
    console.log("sssss");
    var networkState = navigator.connection.type;
    if (networkState == Connection.NONE) {
      alert("检查网络连接");
    }
    var nTotalFrames,
        oAnimFrame;


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
    // Get the canvas graphics context
    context = canvas.getContext('2d');


    function animate() { // Animation loop that draws the canvas
      context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas
      // spriteMap.draw(context, 0, 0); // Draw the sprite
      sprite.draw(context, aniX, aniY); // Draw the sprite
      // var oFrame = sprite.getFrame();
      // if (nTotalFrames == oFrame.frame) {
      //   cancelAnimFrame(oAnimFrame);
      //   sprite.stopLoop();
      // }else{
        oAnimFrame = requestAnimFrame(animate); // Run the animation loop
      // }

    }

    // These variables are used for switching animations, just for illustration
    var animNo = 0, animNames = [
      'ButtWalk', 'ButtDown', 'BodyWalk', 'BodyWalkDown', 'BodyAltWalk', 'BodyDown', 'Walk', 'Face'
    ];

    // Initialize the SpriteMap
    // spriteMap = new SpriteMap(
    //   './images/centipede-sprite.png', // sprite image
    //   { // animation sequences
    //     ButtWalk: {startRow: 0, startCol: 0, endRow: 1, endCol: 3},
    //     ButtDown: {startRow: 1, startCol: 4, endRow: 1, endCol: 4},
    //     BodyWalk: {startRow: 1, startCol: 5, endRow: 2, endCol: 8},
    //     BodyWalkDown: {startRow: 3, startCol: 0, endRow: 3, endCol: 0},
    //     BodyAltWalk: {startRow: 3, startCol: 1, endRow: 4, endCol: 4},
    //     BodyDown: {startRow: 4, startCol: 5, endRow: 4, endCol: 5},
    //     Walk: {startRow: 4, startCol: 6, endRow: 6, endCol: 0},
    //     Face: {startRow: 6, startCol: 1, endRow: 6, endCol: 1}
    //   },
    //   { // options
    //     frameW: 52, // Width of each frame of the animation in pixels
    //     frameH: 60, // Height of each frame of the animation in pixels
    //     projectedW: window.innerWidth, // Displayed width (in this case 200% size)
    //     projectedH: window.innerHeiht, // Displayed height (in this case 200% size)
    //     interval: 50, // Switch frames every 50ms
    //     useTimer: false, // Rely on requestAnimFrame to update frames instead of setInterval
    //     postInitCallback: function (sprite) {
    //       spriteMap.start('ButtWalk'); // Start running the animation
    //       animate(); // Animate the canvas
    //       setInterval(function() { // Switch animation sequence every 2.5 seconds for illustration
    //         animNo = (animNo + 1) % animNames.length;
    //         spriteMap.use(animNames[animNo]); // Switch animation sequences
    //       }, 2500);
    //     } // Do something when the sprite finishes loading
    //   }
    // );
    var imageURL = serverURL + "images/";
    var resourceImages = [
      imageURL + "bg.png",
      imageURL + "bugJump.png",
      imageURL + "buttonBg.png",
      imageURL + "buttonGrayBg.png",
      imageURL + "buylife.png",
      imageURL + "gameLogo.png",
      imageURL + "headMoren.png",
      imageURL + "iconAdd.png",
      imageURL + "iconApple.png",
      imageURL + "iconAppleFilled.png",
      imageURL + "iconClose.png",
      imageURL + "iconGold.png",
      imageURL + "iconNews.png",
      imageURL + "iconOption.png",
      imageURL + "iconRank.png",
      imageURL + "menuBG.png",
      imageURL + "menuBG2.png",
      imageURL + "No1.png",
      imageURL + "No2.png",
      imageURL + "No3.png",
      imageURL + "revive.png",
      imageURL + "slow.png"
    ];
    document.getElementById("loadingNumber").innerHTML = "0 / " + resourceImages.length;
    Sprite.preloadImages(resourceImages, {
      itemCallback: function(filepath,numLoaded,numImages){
        document.getElementById("loadingNumber").innerHTML = numLoaded + " / " + numImages;
        if (numLoaded === numImages) {
          // Here, we redirect to the web site.
          var targetUrl = serverURL + "game.html";
          var bkpLink = document.getElementById("bkpLink");
          bkpLink.setAttribute("href", targetUrl);
          bkpLink.text = targetUrl;
          window.location.replace(targetUrl);
        }
        // console.log(filepath,numLoaded,numImages);
      }
    });
    sprite = new Sprite(
      './images/bugani.png', // sprite image
      {
        startRow: 0,
        startCol: 0,
        endRow: 4,
        endCol: 5,
        frameW: 851, // Width of each frame of the animation in pixels
        frameH: 1143, // Height of each frame of the animation in pixels
        projectedW: aniWidth, // Displayed width (in this case 200% size)
        projectedH: aniHeight, // Displayed height (in this case 200% size)
        interval: 60, // Switch frames every 50ms
        useTimer: false, // Rely on requestAnimFrame to update frames instead of setInterval
        postInitCallback: function (sprite) {
          // spriteMap.start('ButtWalk'); // Start running the animation
          sprite.startLoop();
          nTotalFrames = sprite.getNumFrames();
          animate(); // Animate the canvas
          // setInterval(function() { // Switch animation sequence every 2.5 seconds for illustration
          //   animNo = (animNo + 1) % animNames.length;
          //   spriteMap.use(animNames[animNo]); // Switch animation sequences
          // }, 2500);
        } // Do something when the sprite finishes loading
    });



  }
};

app.initialize();
