/* eslint-disable*/
(function () {
  var dfdMusic = $.Deferred();
  $.when(dfdMusic).done(function () {
    start(1);
  });


  /*sounds*/

  var BGMList = ["battle8.mp3", "lone-wolf-short.wav"];

  function BufferLoader(context, urlList, callback) {
      this.context = context;
      this.urlList = urlList;
      this.onload = callback;
      this.bufferList = new Array();
      this.loadCount = 0;
  }

  BufferLoader.prototype.loadBuffer = function(url, index) {
      // Load buffer asynchronously
      var request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "arraybuffer";

      var loader = this;

      request.onload = function() {
          // Asynchronously decode the audio file data in request.response
          loader.context.decodeAudioData(
              request.response,
              function(buffer) {
                  if (!buffer) {
                      alert('error decoding file data: ' + url);
                      return;
                  }
                  loader.bufferList[index] = buffer;
                  if (++loader.loadCount == loader.urlList.length)
                      loader.onload(loader.bufferList);
              },
              function(error) {
                  console.error('decodeAudioData error', error);
              }
          );
      }

      request.onerror = function() {

      }

      request.send();
  };

  BufferLoader.prototype.load = function() {
      for (var i = 0; i < this.urlList.length; ++i)
          this.loadBuffer(this.urlList[i], i);
  };

  function BGM(context) {
      this.ctx = context;
      var aSounds = [];
      for (var i = 0; i < BGMList.length; i++) {
        aSounds.push("./bgm/" + BGMList[i]);
      }

      var ctx = this;
      var BGMLoader = new BufferLoader(context, aSounds, onLoaded);

      function onLoaded(buffers) {
          ctx.BGMBuffers = buffers;
          dfdMusic.resolve();
      };

      BGMLoader.load();
  }
  BGM.prototype.play = function(idx) {
      var context = this.ctx;
      var source = context.createBufferSource(); // creates a sound source

      source.buffer = this.BGMBuffers[idx];                    // tell the source which sound to play
      source.connect(context.destination);       // connect the source to the context's destination (the speakers)
      source.loop = true;
      if (source.start) {
				source.start(0);
			} else if (source.play) {
				source.play(0);
			} else if (source.noteOn) {
				source.noteOn(0);
			}
      this.playingSource = source;
  }
  BGM.prototype.stop = function() {
      var source = this.playingSource;

      if (source.stop) {
  				source.stop(0);
  			}else if (source.noteOff) {
  				source.noteOff(0);
  			}
  }

  window.AudioContext = window.AudioContext ||
  window.webkitAudioContext;
  var context, oBGM;

  function cheerPlay() {
      // if (soundtype != 2) {
      //     var nowAudio = new Audio;
      //     nowAudio.src = "cheer.mp3";
      //     nowAudio.play()
      // }
  }
  function playBGM(idx){
    if (oBGM) {
      oBGM.play(idx);
    }
  }

  function stopBGM(){
    if (oBGM) {
      oBGM.stop();
    }
  }



  /*game*/
  var updateInterval = false;
  var serviceRoot = "https://game.weiplus5.com/";
  window.requestAnimationFrame = function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
          window.setTimeout(callback, 1E3 / 60)
      }
  }();
  // showLoading();



  //initial
  var COL_NUM = 5;
  var ROW_NUM = 5;
  var oTexture = new Image();
  oTexture.src = "./images/texture.jpg";

  var oScreenSize;
  var props;
  var iniLoad = true;

  var colors = ["#111", "rgba(232,21,16, 1)", "rgba(31,73,125, 1)", "rgba(30,135,214, 1)", "rgba(126,208,45, 1)"];


  var canvas, context, tilesArray, clickedTiles;
  var normalSpeed = 5;
  var speed = 0;
  var tempspeed;
  var LineY = 0;
  var errorTile;
  var keyListener = false;
  var nowScore;
  var nowMode = 0;
  var nowTime = 0;
  var clickedNew = false;
  var clickedEver = 0;
  var lastCheckClickedEver = 0;
  var isStart = false,
      lastIsStart = false,
      isPause = false,
      oOriTriggerTimer = false;
  var startTileY;

  var life = 0, reviveCount = 0, intLifeCountDown = 0, nLifeCountDown;
  var iX;
  var aPopupStack=[];
  var bReviving = false;

  var colorful = true;
  var played = parseInt(localStorage["played"]) || 0;
  var nCanvasWidth;
  var nCanvasHeight;
  var nTileWidth;
  var nTileHeight;



  function fnGetPropList(){
    return $.ajax({
      dataType: "json",
      url: serviceRoot + "index.php?m=game&f=index&v=getPropList",
      xhrFields: { withCredentials: true },
      success: function (data) {
        var status = parseInt(data.status, 10);
        if ( status === -238) {

          $(".loginByPhoneButton,.loginByWechatButton").show();
          $(".GgameTools").hide();
          $("#startGameButton").hide();
        }else if (status >= 0 ) {
          props = data.rows;
          $("#magicpopup .count").html(data.rows.speed0[0].price);
          $(".revivePrice").html(data.rows.revive0[0].price);
          $("#coins .count").html(parseInt(data.money,10));
          $("#topup .count").html(data.rows.strength0[0].price);
          $("#nickName").val(data.nick);
          $("#avatarImage").attr("src", data.photo);

          if (data.isbindwx) {
            $("#settingPopup .wechat").hide();
          }else {
            $("#settingPopup .wechat").show();
          }

          $(".loginByPhoneButton,.loginByWechatButton").hide();
          $("#startGameButton").show();
        }else {
          alert(data.reason);
        }
      }
    });
  };
  fnGetPropList();

  function fnGetLive(){
    return $.ajax({
      dataType: "json",
      url: serviceRoot + "index.php?m=game&v=getActionPoint",
      xhrFields: { withCredentials: true },
      success: function (data) {
        var status = parseInt(data.status, 10);
        if ( status === -238) {
          // showLogin();
        }else if (status >= 0 ) {
          life = parseInt(data.data, 10);
          intLifeCountDown = parseInt(data.oversec, 10);
          updateLife();
        }else {
          alert(data.reason);
        }
      }
    });
  }
  fnGetLive();

  function start(mode, bRevive) {
      bReviving = bRevive;
      resizeGame();
      // menu.classList.add("open");
      played++;
      localStorage["played"] = played;
      // if (played == 6 && chrome && !chrome.app.isInstalled) showPopup("installpopup");
      // else if (played == 11) showPopup("sharepopup");
      // else if (played == 31)
      //     if (chrome && chrome.app.isInstalled) showPopup("ratepopup");
      //     else showPopup("installpopup");

      isStart = false;
      lastIsStart = false;
      // greenTileY = -nTileHeight * 31;
      startTileY = oScreenSize.h/ROW_NUM * (ROW_NUM - 1);
      nowTime = 0;
      if (!bRevive) {
        clickedEver = 0;
      }

      nowMode = mode;
      modeStart(bRevive);
      speed = 0;
      updateInterval = true;
      LineY = 0;
      keyListener = true;
      errorTile = false;
      canvas = document.getElementById("game");
      context = canvas.getContext("2d");
      context.textAlign = "center";
      context.font = "700 30px 'Source Sans Pro',sans-serif";
      tilesArray = [];//tile [col index, y axis, anieffect num]
      clickedTiles = [];
      for (var i = 0; i < ROW_NUM + 2; i++)
          if (colorful) tilesArray[i] = genRandomTile(i * nTileHeight - startTileY, true);
          else tilesArray[i] = genRandomTile(i * nTileHeight - startTileY);

      // document.addEventListener("keydown", handleTap, false);
      // canvas.addEventListener("mousedown", mouseListener, false);
      canvas.addEventListener("touchstart", mouseListener,
          false);
      requestAnimationFrame(update);
      // document.getElementById("revivePopup").style.display = "none";
      // document.getElementById("revivePopupwin").style.display = "none";
      // showHelp(mode);
  }
function update() {
      if (!errorTile && isStart) nowTime += 16.666;
      context.clearRect(0, 0, nCanvasWidth + 2, nCanvasHeight + 2);
      if (isStart && !lastIsStart) {
          modeStart();
          lastIsStart = true
      }
      // console.log(tilesArray[tilesArray.length - 1][1]);
      if (tilesArray[tilesArray.length - 1][1] >= nCanvasHeight - 2) {
          speed = -25;
          errorTile = [tilesArray[tilesArray.length - 1][0], tilesArray[tilesArray.length - 1][1], 0, 1];
          keyListener = false;
          //Error sound
          setTimeout(stopGame, 500)
      }
      if (isStart && !isPause) updateGameProcess();
      if (clickedTiles[0] && clickedTiles[0][1] > 1E3) clickedTiles.shift();
      LineY += speed;
      // greenTileY += speed;
      if (startTileY < nCanvasHeight) {
          context.fillStyle =
              "rgba(249,231,23, 0.5)";
          context.fillRect(0, startTileY, oScreenSize.w, nTileHeight);
          startTileY += speed
      }
      drawCells();
      drawBlocks();
      if (clickedEver == 0) {
          context.fillStyle = "rgb(255,255,255)";
          context.fillText("开始", tilesArray[tilesArray.length - 1][0] * nTileWidth + nTileWidth/2, nTileHeight * 2.7)
      }
      // var NPC, TNPC;
      // if (nowMode == 0 || nowMode == 4) {
      //     if (nowMode == 0) var PRclickedEver = clickedEver;
      //     else var PRclickedEver = clickedEver % 30;
      //     if (PRclickedEver <= 15) NPC = getColorAnimation([251, 62, 56], [248, 252, 17], PRclickedEver, 15);
      //     else NPC = getColorAnimation([248, 252, 17], [83, 215, 105], PRclickedEver -
      //         15, 15);
      //     context.fillStyle = "rgba(150,150,150,0.4)";
      //     context.fillRect(0, 0, PRclickedEver / 30 * (nCanvasWidth - 2), 4);
      //     context.fillStyle = "rgb(" + NPC[0] + "," + NPC[1] + "," + NPC[2] + ")";
      //     context.fillRect(0, 0, PRclickedEver / 30 * (nCanvasWidth - 2), 3)
      // }
      // if (nowMode == 0 && greenTileY > -nCanvasHeight) {
      //     context.fillStyle = "rgb(83,215,105)";
      //     context.fillRect(0, greenTileY, nCanvasWidth, nCanvasHeight)
      // }
      // if (nowMode == 4)
      //     if (nowTime <= 5E3) TNPC = getColorAnimation([83, 215, 105], [248, 252, 17], nowTime, 5E3);
      //     else TNPC = getColorAnimation([248, 252, 17], [251, 62, 56], nowTime - 5E3, 5E3);
      // context.fillStyle = "rgba(150,150,150,0.5)";
      // context.fillText(nowScore, nCanvasWidth/2, 80);
      // if (nowMode == 4) context.fillStyle = "rgb(" + TNPC[0] + "," + TNPC[1] + "," + TNPC[2] + ")";
      // else
      context.fillStyle = "rgb(251,62,56)";
      context.fillText(nowScore, nCanvasWidth/2, 80);
      clickedNew = false;
      // console.log(updateInterval);
      if (updateInterval) requestAnimationFrame(update)
  }
  handleTap = function(colIndex) {
      if (keyListener) {
          if (tilesArray[tilesArray.length - 1][0] === colIndex) {
              if (!isStart && !bReviving) {
                $("#toolbar").hide();
                playBGM(Math.round(Math.random()));
                $.ajax({
                  dataType: "json",
                  url: serviceRoot + "index.php?m=game&v=startgame",
                  xhrFields: { withCredentials: true },
                  success: function (data) {
                    var status = parseInt(data.status, 10);
                    if ( status === -238) {
                      showLogin();
                    }else if (status >= 0 ) {
                      fnGetLive();
                    }else if( status === -227){
                      //no life
                      showPopup("topup");
                    }else {
                      alert(data.reason);
                    }
                  }
                });
              }

              isStart = true;
              // hideHelp();

              clickedEver++;
              clickedTiles.push(tilesArray[tilesArray.length - 1]);
              clickedTiles[clickedTiles.length - 1].push(0);
              if (colorful) tilesArray.unshift(genRandomTile(tilesArray[0][1] - nTileHeight, true));
              else tilesArray.unshift(genRandomTile(tilesArray[0][1] - nTileHeight));
              tilesArray.pop();
              clickedNew = true;

              navigator.vibrate(50);
              //Click sound
          } else if (isStart && colIndex != -1) {
              speed = 0;
              errorTile = [colIndex, tilesArray[tilesArray.length - 1][1], 0, 0];
              keyListener = false;
              //Error sound
              setTimeout(stopGame, 500)
          }
      }
  };
  mouseListener = function(e) {
    if (life > 0 || isStart) {
      var x,y;
      if (e.touches && e.touches[0]) {
        x = e.touches[0].pageX - e.touches[0].target.offsetLeft;;
        y = e.touches[0].pageY - e.touches[0].target.offsetTop;
      }else {
        if (e.offsetX) {
              x = e.offsetX;
              y = e.offsetY;
          }
          else if (e.layerX) {
              x = e.layerX;
              y = e.layerY;
          }
      }

      var LastTileY = tilesArray[tilesArray.length - 1][1];
      if (y < LastTileY + nTileHeight && y > LastTileY) {
        handleTap(parseInt((x + 1) / nTileWidth))
      }
    }else if (life <= 0) {
      showPopup("topup");
    }
    e.preventDefault();
  };
  function updateLife() {
    var nApple = life;
    var nAddLife = 0;
    $("#life .apple > div").removeClass("filled");
    if (nLifeCountDown) {
      clearInterval(nLifeCountDown);
    }
    if (life >= 5) {
      nApple = 5;
      nAddLife = life - 5;
      $("#life .count").html(nAddLife == 0 ? "00:00" : nAddLife);
    }else {
      nLifeCountDown = window.setInterval(function () {
        intLifeCountDown--;
        if (intLifeCountDown < 0) {
          clearInterval(nLifeCountDown);
          fnGetLive();
        }else {
          nAddLife = new Date(intLifeCountDown * 1000).toISOString().substr(14, 5);
          $("#life .count").html(nAddLife);
        }
      }, 1000);
    }
    $("#life .apple > div:nth-child(-n+" + nApple + ")").addClass("filled");

  }
  function drawBlocks() {
      context.save();
      for (var i = 0; i < tilesArray.length; i++) {
          var nowTile = tilesArray[i];
          nowTile[1] += speed;
          context.fillStyle = colors[nowTile[2]];
          context.shadowColor = 'black';
          context.shadowBlur = 5;
          context.shadowOffsetX = 3;
          context.shadowOffsetY = 3;
          var nBlockWidth =  nTileWidth - 1;
          var nBlockHeight = nTileHeight - 1;
          // context.fillRect(nowTile[0] * nTileWidth, nowTile[1] + 1, nTileWidth - 1, nTileHeight - 1);
          context.drawImage(oTexture, Math.floor(Math.random() * (oTexture.width - nTileWidth)), Math.floor(Math.random() * (oTexture.height - nTileHeight)), nBlockWidth, nBlockHeight, nowTile[0] * nTileWidth, nowTile[1] + 1, nBlockWidth, nBlockHeight);

          // if (showletters)
          //     if (!(clickedEver == 0 && i == 5)) {
          //         context.fillStyle = "#fff";
          //         context.fillText(AlphaKeys[nowTile[0]], nowTile[0] * nTileWidth + 47, nowTile[1] + 85)
          //     } else {
          //         context.fillStyle = "#fff";
          //         context.fillText(AlphaKeys[nowTile[0]], nowTile[0] * nTileWidth + 47, nowTile[1] + 55)
          //     }
      }
      context.shadowColor=null;

      context.restore();
      for (var j = 0; j < clickedTiles.length; j++) {
          var nowTile = clickedTiles[j];
          clickedTiles[j][1] += speed;
          clickedTiles[j][3] += 10;
          var clickedNowWidth = getAnimation(nTileWidth, nowTile[3], nTileWidth);
          var clickedNowHeight = getAnimation(nTileHeight, nowTile[3], nTileHeight);
          context.fillStyle = colors[nowTile[2]];
          // context.fillRect(nowTile[0] * nTileWidth, nowTile[1] + 1, nTileWidth - 1, nTileHeight - 1 );

          var nBlockWidth =  nTileWidth - 1;
          var nBlockHeight = nTileHeight - 1;
          // context.drawImage(oTexture, Math.floor(Math.random() * (oTexture.width - nTileWidth)), Math.floor(Math.random() * (oTexture.height - nTileHeight)), nBlockWidth, nBlockHeight, nowTile[0] * nTileWidth, nowTile[1] + 1, nBlockWidth, nBlockHeight);
          context.drawImage(oTexture, Math.floor(Math.random() * (oTexture.width - nTileWidth)), Math.floor(Math.random() * (oTexture.height - nTileHeight)), nBlockWidth, nBlockHeight, nowTile[0] * nTileWidth + clickedNowWidth * .5, nowTile[1] + 1 + clickedNowHeight * .5, nBlockWidth - clickedNowWidth - 1, nBlockHeight - clickedNowHeight - 1);
          // context.fillStyle = "rgba(255,255,255,1)";
          console.log(clickedNowWidth);
          // context.fillRect(nowTile[0] * nTileWidth + (nTileWidth/2 - clickedNowWidth * .5), nowTile[1] + 1 + (nTileHeight/2 - clickedNowHeight * .5), clickedNowWidth - 1, clickedNowHeight - 1);

      }
      if (errorTile) {
          var nowcolorA = .3 + getAnimation(.7, Math.abs(errorTile[2] % nTileHeight*2 - nTileHeight), nTileHeight*2);
          errorTile[1] += speed;
          if (errorTile[1] <= nTileHeight*2 && speed < 0) speed = 0;
          errorTile[2] += 10;
          if (errorTile[3] == 0) context.fillStyle = "rgba(251,62,56," + nowcolorA + ")";
          else context.fillStyle = "rgba(166,166,166," + nowcolorA + ")";
          context.fillRect(errorTile[0] * nTileWidth, errorTile[1] + 1, nTileWidth, nTileHeight)
      }
  }

  function drawCells() {
      if (LineY >= nCanvasHeight) LineY = LineY - nCanvasHeight;
      if (LineY < 0) LineY = LineY + nCanvasHeight;
      context.beginPath();
      for (var i = 0; i < 10; i++) {
          context.lineWidth = 1;
          context.strokeStyle = "#000";
          context.moveTo(0, LineY + i * nTileHeight - nCanvasHeight);
          context.lineTo(nCanvasWidth + 2, LineY + i * nTileHeight - nCanvasHeight);
      }
      for (var f = 1; f < COL_NUM; f++) {
          context.moveTo(f * nTileWidth - .5, LineY - nCanvasHeight + 2);
          context.lineTo(f * nTileWidth - .5, LineY + nCanvasHeight + 2)
      }
      context.stroke();
      context.closePath();

  }

  function stopGame() {
      hidePopup("magicpopup");
      isPause = false;
      keyListener = false;
      updateInterval = false;

      if (reviveCount < 3) {
        showPopup("revivePopup");
      }else {
        againHandler(null, false);
      }

      $("#toolbar").show();

      navigator.vibrate([100, 100, 100]);


  }

  function modeStart(bRevive) {
      if (!bRevive) {
        nowScore = 0;
      }

      speed = normalSpeed;
  }

  function updateGameProcess() {
      nowScore = clickedEver * 10;
      if (!errorTile) speed += .003;
  }



  function getAnimation(number, time, endtime) {
      return Math.min(number * (time / endtime), number)
  }

  function getColorAnimation(c1, c2, p, e) {
      var pe = p / e;
      return [Math.floor((c2[0] - c1[0]) * pe + c1[0]), Math.floor((c2[1] - c1[1]) * pe + c1[1]), Math.floor((c2[2] - c1[2]) * pe + c1[2])]
  }

  function genRandomTile(yAxis, special) {
      return [Math.round(Math.random() * 4), yAxis, special ? parseInt(Math.random() * 4) + 1 : 0];
  }

  function showEndGame() {
      updateInterval = false;
      errorTile = [0, 0, 0, 1];//[col index, y axis, anieffect num, invalid click 0 or missed 1]
      keyListener = false;
      //End sound
      stopGame();
  }
  function showLogin() {
    showPopup("loginButtonPopup");
    $("#loginButtonPopup .loginByPhoneButton,#loginButtonPopup .loginByWechatButton").show();
  }
  function showPopup(id) {
      var $oPopup = $("#" + id);
      var $opopupOverlay = $("#popupOverlay");

      if (!$oPopup.is(":visible")) {
        var iLeft = oScreenSize.w / 2 * 0.2 + 'px';

        $opopupOverlay.css({
          width: oScreenSize.w + 'px',
          height: oScreenSize.h + 'px'
        }).show();
        $oPopup.show();
        setTimeout(function () {
          $oPopup.addClass("show");
          var nHeight = $oPopup.outerHeight();
          var iTop = (oScreenSize.h - nHeight) / 2 + 'px';
          $oPopup.css({
            width: oScreenSize.w * 0.8 + 'px',
            top: iTop,
            left: iLeft
          });
        }, 300);

        aPopupStack.forEach(function (stacked) {
          stacked.hide();
        });
        aPopupStack.push($oPopup);
      }

  }

  function hidePopup(id) {
    var $popUp = $("#" + id);
    if ($popUp.is(":visible")) {
      aPopupStack.pop();

      // iOpenedOverlay--;
      document.getElementById(id).classList.remove("show");
      setTimeout(function () {
        document.getElementById(id).style.display="none";
        if (aPopupStack.length === 0) {
          var popupOverlay = document.getElementById("popupOverlay");
          popupOverlay.style.display = "none";
        }else {
          aPopupStack[aPopupStack.length - 1].show();
        }
      }, 300);
    }

  }

  $(".popup .close").on("click", function (e) {
    hidePopup($(e.target).parent().attr("id"));
  });

  function showLoading() {
    var $loading = $("#loadingAni");
    var iLeft = oScreenSize.w / 2 - 24 + 'px' ;
    var iTop = oScreenSize.h / 2 - 24  + 'px';

    $loading.css({
      top:iTop,
      left:iLeft
    });

    $loading.show();
  }
  function hideLoading() {
    var $loading = $("#loadingAni");
    $loading.hide();
  }
  function newSize() {
    // var widthToHeight = 2 / 3;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    // var newWidth = window.screen.width;
    // var newHeight = window.screen.height;
    // var newWidthToHeight = newWidth / newHeight;
    //
    // if (newWidthToHeight > widthToHeight) {
    //     newWidth = newHeight * widthToHeight;
    // } else {
    //     newHeight = newWidth / widthToHeight;
    // }
    return {w:newWidth, h:newHeight}
  }
  function resizeGame() {
      var gameArea = document.getElementById('main');
      var popups = document.querySelectorAll('.popup');
      oScreenSize = newSize();
      // alert("screenH:" + oScreenSize.h +"\n" + "innerH:" + window.innerHeight);
      gameArea.style.height = oScreenSize.h + 'px';
      gameArea.style.width = oScreenSize.w + 'px';

      gameArea.style.marginTop = (-oScreenSize.h / 2) + 'px';
      gameArea.style.marginLeft = (-oScreenSize.w / 2) + 'px';

      var gameCanvas = document.getElementById('game');
      gameCanvas.width = oScreenSize.w;
      gameCanvas.height = oScreenSize.h;


      nCanvasWidth = oScreenSize.w;
      nCanvasHeight = oScreenSize.h;
      nTileWidth = oScreenSize.w / COL_NUM;//col number
      nTileHeight = oScreenSize.h / ROW_NUM;
      startTileY = nTileHeight * ROW_NUM - 1;
      // greenTileY = -nTileHeight * 31;

      gameArea.style.display = "inline-block";
      $(".againClose").off("click").on("click", againHandler);
  }
  function againHandler(event, bRevive) {
    hidePopup("revivePopup");
    $("#revivePopup .magicButton").show();

    if (!bRevive){
      $(".GstartScreen").show();
      $(".revivePrice").html(props.revive0[0].price);
      bReviving = false;
      reviveCount = 0;
      var scoreNum = parseInt(nowScore, 10);
      $.ajax({
        dataType: "json",
        type: "POST",
        data: {
          score: scoreNum,
        },
        url: serviceRoot + "index.php?m=game&v=addGameScore",
        xhrFields: { withCredentials: true },
        success: function (data) {
          var status = parseInt(data.status, 10);
          if ( status === -238) {
            showPopup("loginButtonPopup");
          }else if (status >= 0 ) {
            $("#gameOverPopup .desc span").html(scoreNum);
            showPopup("gameOverPopup");
          }else {
            alert(data.reason);
          }
        }
      });
      stopBGM();
    }
    // else{
      start(nowMode, bRevive);
    // }

  }
  function openOption() {
    var menu = document.getElementById('menu');
    menu.style.marginTop = -nCanvasHeight + "px"
  }
  function closeOption() {
    var menu = document.getElementById('menu');
    menu.style.marginTop = "1px";
  }


  function useMagic(bUse) {
    if (bUse) {
      $.ajax({
        dataType: "json",
        type: "POST",
        data: {
          propid: props.speed0[0].id,
        },
        url: serviceRoot + "index.php?m=game&v=buyGameProp",
        xhrFields: { withCredentials: true },
        success: function (data) {
          var status = parseInt(data.status, 10);
          if ( status === -238) {
            hidePopup("magicpopup");
            showLogin();
            isPause = false;
          }else if (status >= 0 ) {
            speed = normalSpeed;
            tempspeed = undefined;
            isPause = false;
            $("#coins .count").html(parseInt(data.money,10));
            hidePopup("magicpopup");
          }else if (status === -205) {
              //not enough coins
              showCoinsPopup();
          }
        }
      });
      // if (tilesArray.length > 3) {
      //   tilesArray.splice(tilesArray.length - 3, 3);
      // }
      //   console.log(tilesArray);
    }else {
      speed = tempspeed;
      tempspeed = undefined;
      isPause = false;
    }

  }
  function handleOrientation(event) {
    var x = event.beta;  // In degree in the range [-180,180]
    var y = event.gamma; // In degree in the range [-90,90]


    if (iX == undefined) {
      iX = x;
    }
    if (iX - x > 20) {
      iX = x;
      if (oOriTriggerTimer) {
        clearTimeout(oOriTriggerTimer);
      }
      oOriTriggerTimer = setTimeout(function () {
        if (!isPause && clickedEver > 0 && updateInterval) {
          tempspeed = speed;


          speed = 0;
          isPause = true;
          showPopup("magicpopup");
        }
      }, 100);
    }else if (x - iX > 20) {
      iX = x;
    }
  }
  function revive() {
    $.ajax({
      dataType: "json",
      type: "POST",
      data: {
        propid: props["revive" + reviveCount][0].id,
      },
      url: serviceRoot + "index.php?m=game&v=buyGameProp",
      xhrFields: { withCredentials: true },
      success: function (data) {
        var status = parseInt(data.status, 10);

        if ( status === -238) {
          showLogin();
        }else if (status >= 0 ) {
          $("#coins .count").html(parseInt(data.money,10));
          reviveCount = parseInt(data.reviveCount, 10);
          againHandler(null, true);
          $(".revivePrice").html(props["revive" + reviveCount][0].price);


        }else if (status === -205) {
            //not enough coins
            showCoinsPopup();
        }
      }
    });

  }
  $("#startGameButton, #gameOverPopup .startGameButton").on("click", function (e) {
    hidePopup("gameOverPopup");
    fnGetPropList().done(function (data) {
      var status = parseInt(data.status, 10);
      if ( status === -238) {
        showLogin();
      }else if (status >= 0 ) {
        fnGetLive().done(function () {
          if (life <= 0) {
            showPopup("topup");
          }else{
            $(".GstartScreen").hide();
          }
        });

      }
    });


  });
  $(".reviveButton").on("click", revive);



  $(".buttonGetVer").click(function (e) {
    var $btn = $(e.target);
    var $parent = $btn.parents(".phoneForm");
    var $oPhone = $parent.find(".login_phone");
    var sPhone = $oPhone.val();
    var $oTiming = $parent.find(".timing");
    var nCountDown, nTiming = 30;
    var $oButtonGetVer = $(e.target);
    if ($oPhone[0].validity.valid) {
      $oTiming.show();
      $oButtonGetVer.hide();
      nCountDown = setInterval(function () {
        nTiming--;
        if (nTiming === 0) {
          clearInterval(nCountDown);
          $oTiming.html("");
          $oTiming.hide();
          $oButtonGetVer.show();
        }else{
          $oTiming.html(nTiming + "秒...");
        }
      }, 1000);
      $.ajax({
        type: "POST",
        url: serviceRoot + "index.php?m=sms&f=sms&v=sendsms",
        data: {
          mobile: sPhone,
          type: 3
        },
        success: function (data) {
          if (data.status < 0) {
            showAlert({
              msg: data.reason,
              title: "发送失败",
              type: 'warning'
            });
          }
        },
        dataType: 'json'
      });
    }else {
      alert("请输入合法的手机号！");
    }


  });

  $(".phoneForm").submit(function (e) {
    e.preventDefault();
    var $form = $(e.target);
    var bIsbindingPhone = $form.hasClass("bindPhone");
    var $oVer = $form.find(".login_ver");
    var $oPhone = $form.find(".login_phone");
    var sPhone = $oPhone.val();
    var sVer = $oVer.val();
      if ($oPhone[0].validity.valid && $oVer[0].validity.valid) {
        $.ajax({
          type: "POST",
          url: serviceRoot + "index.php?m=member&f=index&v=public_smslogin",
          data: {
            username: sPhone,
            smscode: sVer
          },
          success: function (data) {
            if (data.status >= 0) {
              hidePopup("loginPopup");
              fnGetPropList();
              fnGetLive();
              if ($(".fakeBG").is(":visible")) {
                $('.GgameTools').show();
              }
            }else {
              showAlert({
                msg: data.reason,
                title: "登录失败",
                type: 'warning'
              });
            }

          },
          dataType: 'json'
        });
      }else {
        alert("请输入手机号,验证码！");
      }
  });

  $("#buttonShare").click(function () {
     Wechat.share({
        message: {
        title: "下载欢乐白块",
        description: "This is description.",
        thumb: "www/images/wechatThumb.png",
        media: {
          type: Wechat.Type.WEBPAGE,
          webpageUrl: "http://47.98.97.163:8011/game/app-release.apk"
        }
      },
      scene: Wechat.Scene.TIMELINE   // share to Timeline
      }, function () {
          showAlert({
            msg: "成功分享到朋友圈，可以和朋友一起玩啦！",
            title: "分享",
            type: 'success'
          });
      }, function (reason) {
        showAlert({
          msg: "分享被取消啦！",
          title: "分享",
          type: 'warning'
        });
      });

  });
  $("#buttonNews").click(function () {
    $.ajax({
      type: "GET",
      url: serviceRoot + "index.php?m=message&f=message&v=getMsglist",
      success: function (data) {
        var status = parseInt(data.status, 10);
        var $oMessageList = $("#messagesPopup ul");
        $oMessageList.html("");
        if ( status === -238) {
          showLogin();
        }else if (status >= 0 ) {
          if (data.rows.length) {
            for (var i = 0; i < data.rows.length; i++) {
              $oMessageList.append(["<li>",data.rows[i].addtime,data.rows[i].content,"</li>"].join(" "));
            }
          }else {
            $oMessageList.append("<li>没有消息！</li>");
          }

          showPopup("messagesPopup");
        }

      },
      dataType: 'json'
    });

  });
  $("#buttonRank").click(function () {
    fnGetRankList("1");
  });
  $("#rankPopup .tab").on("click", "li", function (e) {
    var $tar = $(e.target);
    var nList = $tar.data("list");
    $("#rankPopup .tab li").removeClass("cur");
    $tar.addClass("cur");
    fnGetRankList(nList.toString());
  });
  $("#magicpopup .close").click(function () {
    useMagic(false);
  });
  $("#magicpopup .priceButton").click(function () {
    useMagic(true);
  });
  $(".loginByPhoneButton").click(function () {
    if ($("#loginButtonPopup").is(":visible")) {
      hidePopup("loginButtonPopup");
    }
    showPopup("loginPopup");
  });
  $("#buttonOption").click(function () {
    fnGetPropList().done(function (data) {
      var status = parseInt(data.status, 10);
      if ( status === -238) {
        showLogin();
      }else if (status >= 0 ) {
        showPopup("settingPopup");
      }
    });

  });
  /*
  buy life
   */
  $("#topup .priceButton").click(function () {
    $.ajax({
      dataType: "json",
      type: "POST",
      data: {
        propid: props.strength0[0].id,
      },
      url: serviceRoot + "index.php?m=game&v=buyGameProp",
      xhrFields: { withCredentials: true },
      success: function (data) {
        var status = parseInt(data.status, 10);
        if ( status === -238) {
          hidePopup("topup");
          showLogin();
        }else if (status >= 0 ) {
          $("#coins .count").html(parseInt(data.money,10));
          hidePopup("topup");
          fnGetLive();
          showAlert({
            msg: "您的体力恢复啦，继续挑战吧！",
            title: "恢复体力",
            type: 'success'
          });
        }else if (status === -205) {
            //not enough coins
            showCoinsPopup();
        }
      }
    });
  });
  $("#saveNickName").click(function () {
    var sNick = $("#nickName").val();
    if (sNick) {
      $.ajax({
        type: "POST",
        url: serviceRoot + "index.php?m=member&f=index&v=edit_nick",
        data: {
          nickname: sNick
        },
        success: function (data) {
          var status = parseInt(data.status, 10);
          if ( status === -238) {
            showLogin();
          }else if (status >= 0 ) {
             alert("昵称修改成功");
          }

        },
        dataType: 'json'
      });
    }

  });
  $("#logout").click(function () {
    var bLogout = confirm("确认要退出吗？");
    if (bLogout) {
      $.ajax({
        type: "GET",
        url: serviceRoot + "index.php?m=member&f=index&v=mlogout",
        success: function (data) {
          var status = parseInt(data.status, 10);
          if (status >= 0 ) {
             location.reload();
          }
        },
        dataType: 'json'
      });
    }
  });

  $("#buttonUploadAvatar").click(function () {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        destinationType: Camera.DestinationType.FILE_URI
    });
  });
  $(".loginByWechatButton,.bindWechat").click(function (e) {
    // Wechat.share({
    //     text: "This is just a plain string",
    //     scene: Wechat.Scene.TIMELINE   // share to Timeline
    // }, function () {
    //     alert("Success");
    // }, function (reason) {
    //     alert("Failed: " + reason);
    // });
    var $tar = $(e.target);
    var sType = $tar.hasClass("bindWechat") ? "bind_auth" : "auth";
    var scope = "snsapi_userinfo",
    state = "_" + (+new Date());
    Wechat.auth(scope, state, function (response) {
        // you may use response.code to get the access token.
        if (response.code) {
            $.ajax({
              type: "GET",
              url: serviceRoot + "index.php?m=member&f=index&v=" + sType + "&type=weixin&code=" + response.code,
              success: function (data) {
                var status = parseInt(data.status, 10);
                if (status >= 0 ) {
                   hidePopup("loginPopup");
                   fnGetPropList();
                   fnGetLive();
                   if ($(".fakeBG").is(":visible")) {
                     $('.GgameTools').show();
                   }
                }else {
                  //alert(data.reason);
                }
              },
              dataType: 'json'
            });
        }
    }, function (reason) {
        alert("Failed: " + reason);
    });
  });

  $("#coinsPopup").on("click", ".button01", function (e) {
    var $tar = $(e.target);
    var sId = $tar.data("id");
    var sNum = $tar.data("num");
    $.ajax({
      type: "POST",
      url: serviceRoot + "index.php?m=game&f=pay&v=unifiedOrder",
      data: {
        fid: sId
      },
      success: function (data) {
        // console.log(data);
        if (data.status >= 0) {
          var params = {
              partnerid: data.mch_id, // merchant id
              prepayid: data.prepay_id, // prepay id
              noncestr: data.nonce_str, // nonce
              timestamp: data.timeStamp.toString(), // timestamp
              sign: data.paysign, // signed string
          };

          Wechat.sendPaymentRequest(params, function () {
              $.ajax({
                type: "POST",
                url: serviceRoot + "index.php?m=game&f=pay&v=procssOrder",
                data: {
                  out_trade_no: data.out_trade_no
                },
                success: function (data) {
                  // console.log(data);
                  if (data.status >= 0) {
                    fnGetPropList();
                    hidePopup("coinsPopup");
                    showAlert({
                      msg: "您已成功购买" + sNum + "个金币",
                      title: "购买金币",
                      type: 'success'
                    });
                  }else if ( data.status == -238) {
                    showLogin();
                  }

                },
                dataType: 'json'
              });
          }, function (reason) {
              showAlert({
                msg: reason,
                title: "购买金币",
                type: 'warning'
              });
          });
        }else if ( data.status == -238) {
          showLogin();
        }

      },
      dataType: 'json'
    });
  });
  $(".buyCoins").click(showCoinsPopup);
  $("#life .add").click(function () {
    showPopup("topup");
  });

  function showCoinsPopup() {
    $.ajax({
      type: "GET",
      url: serviceRoot + "index.php?m=game&f=index&v=getCoinlist",
      success: function (data) {
        var status = parseInt(data.status, 10);
        if (status >= 0 ) {
           // console.log(data.rows);
           var $coinList = $("#coinsPopup ul");
           $coinList.html("");
           for (var i = 0; i < data.rows.length; i++) {
             $coinList.append('<li><div class="ico"></div><div class="button01" data-num="' + data.rows[i].num + '" data-id="' + data.rows[i].id + '">￥'+ data.rows[i].price +'</div><div class="number">'+ data.rows[i].num +'</div></li>');
           }
           showPopup("coinsPopup");
        }else if ( data.status == -238) {
          showLogin();
        }
      },
      dataType: 'json'
    });

  }

  function showAlert(msg) {
    var $alert = $("#alert");
    $alert.find("h3").html(msg.title);
    $alert.find(".msg").html(msg.msg);
    switch (msg.type) {
      case 'success':
        $alert.attr('class', 'success');
        break;
      case 'warning':
        $alert.attr('class', 'warning');
        break;
      case 'error':
        $alert.attr('class', 'error');
        break;
      default:

    }
    $alert.show();
    window.setTimeout(function () {
      $alert.hide();
    }, 3000);
  }
  $("#alert").click(function (e) {
    $("#alert").hide();
  });
  // Change image source
  function onSuccess(imageData) {
    // alert(imageData);
    window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function (fs) {
    console.log('file system open: ' + fs.name);
    window.resolveLocalFileSystemURL(imageData, function (fileEntry) {
      fileEntry.file(function (file) {
          var reader = new FileReader();
          reader.onloadend = function() {
              // Create a blob based on the FileReader "result", which we asked to be retrieved as an ArrayBuffer
               var BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
               var aImage = [new Uint8Array(this.result)];

                if(BlobBuilder) {
                    // android
                    var oBuilder = new BlobBuilder();
                    oBuilder.append(aImage[0]);
                    var blob = oBuilder.getBlob("image\/jpg"); // the blob

                } else {
                    // everyone else
                    var blob = new Blob(aImage, { 'type': 'image/jpg' });
                }
              // var blob = new Blob([new Uint8Array(this.result)], { type: "image/jpg" });
              $("#buttonSaveAvatar").off("click.avatar").on("click.avatar",function (e) {
                var $tar = $(e.target);
                var fd = new FormData();
                  // fd.append('file', 'avatar.jpg');
                fd.append('file', blob);
                $.ajax({
                    type: 'POST',
                    url: serviceRoot + "index.php?m=member&f=index&v=avatar2",
                    data: fd,
                    dataType: 'json',
                    processData: false,
                    contentType: false
                }).done(function(data) {
                  if (parseInt(data.status, 10) >= 0) {
                    showAlert({
                      msg: '头像保存成功',
                      title: "设置-头像",
                      type: 'success'
                    });
                    $tar.off("click.avatar");
                  }else {
                    showAlert({
                      msg: '头像保存失败:' + data.reason,
                      title: "设置-头像",
                      type: 'error'
                    });
                  }

                });
              });
          };
          // Read the file as an ArrayBuffer
          reader.readAsArrayBuffer(file);
      }, function (err) {
        console.error('error getting fileentry file!');
        console.error(err);
      });
    }, function (err) {
      console.log(err);
    });
    }, function (err) {
      console.log('error getting persistent fs! ' + err);
      console.log(err);
     });
      var image = document.getElementById('avatarImage');
      image.src = imageData + '?' + Math.random();;
  }

  function onFail(message) {
      //alert('Failed because: ' + message);
  }
  function fnGetRankList(list) {
    showLoading();
    var sListName;
    var $rankList = $("#rankPopup .ranklist");
    switch (list) {
      case "1":
        sListName = "singleScoreRankList";
        break;
      case "2":
        sListName = "weekScoreRankList";
        break;
      case "3":
        sListName = "scoreRankList";
        break;
      default:
    }
    $rankList.html("");
    $.ajax({
      type: "GET",
      url: serviceRoot + "index.php?m=game&v=" + sListName,
      success: function (data) {
        var status = parseInt(data.status, 10);
        hideLoading();
        if ( status === -238) {
          showLogin();
        }else if (status >= 0 ) {
          for (var i = 0; i < data.rows.length; i++) {
            $rankList.append(['<li><div class="ranking">',i > 2 ? i+1 : "",'</div><img src="',data.rows[i].photo,'" class="avatar" /><div class="username">',data.rows[i].nick,'</div><div class="rank_score">',data.rows[i].rscore,'</div></li>'].join(""));
          }
          showPopup("rankPopup");
        }

      },
      dataType: 'json'
    });
  }
  window.addEventListener('deviceorientation', handleOrientation);

  document.addEventListener("deviceready", onDeviceReady, false);
  // document.addEventListener("chcp_updateIsReadyToInstall", onUpdateIsReadyToInstall, false);
  // document.addEventListener("chcp_updateInstalled", onUpdateInstalled, false);

  function onDeviceReady() {
    //StatusBar.show();
    // alert(StatusBar.isVisible);

    navigator.splashscreen.show();
    setTimeout(function() {
        navigator.splashscreen.hide();
    }, 3000);
    if (AudioContext) {
      context = new AudioContext();
      oBGM = new BGM(context);
    }else {
      // start(1);
      dfdMusic.resolve();
    }
  }
  // function onUpdateIsReadyToInstall() {
  //   chcp.installUpdate();
  // }
  // function onUpdateInstalled() {
  //   alert('Update is installed');
  // }
})();
