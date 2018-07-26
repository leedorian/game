/* eslint-disable*/
(function () {
  var dfdSound = $.Deferred();
  dfdSound.done(function(){
    start(1);
  });

  /*sounds*/
  var pianoSheets = ["QPQPQNPOMHJMNJLNOJQPQPQNPOMHJMNJONMNOPQLRQPKQPOJPONNJQQQQPQPQNPOMHJMNJLNOJQPQPQNPOMHJMNJONMORQQPPRTSRQPONMMLMNOPPQRMOPNOPQSPNOPQSPNQQQQQP", "JJKLLKJIHHIJJIIJJKLLKJIHHIJIHHIIJHIJKJHIJKJIHIEJJKLLKJIHHIJIHH", "QPOPQSSSSTSTUVVVVVVUTSTTSSSQPOQRQPPQPPQPPPOOOOPOOTUVVVVVVUTSSSQPOVVVVWWWVWXXWVVVVVWWSSXWVVVVVWWWWVUVTTUTUVVVWVWXXWXV", "LOQSONQSSTUVTSQPOOOQPOOOPQPOMPQPLOQSONQSSTUVTSPOOOQPOOOPQPMNOPOQSQPOSNMNMNMLQSQPOSNMNOOOPQPLOQSONQSSTUVTSQPOOOQPOOOPQPMNOPO", "OOJLOOJLJJLOOMMKPPLMLKJIJLMLKJIJHLMOJLQPOLMJLMOJLQPOLMOLJLMLOOLJLMLOOLMOOLMPPLMQQLMQPO",
      "EHJJJJIJIHEHJHJLKJILKJJIHIJLKFFEGHIJIHLHJJJIJIHEHJJJLKJILKJJIHIJLKKFFEGIJIH", "FHIJLLJHIFHIJLLMIJJLMLMONMLMJHIJLHFHIJMLJMMLKJIJLFHIHIJLLMONMLJM", "LJIHIGFENMNLMKJLIJLIJKJIHLGIFHEFHECEFHIFHELOMLJLIIJGFEFHICHFEFHEJLGIFHECECEFGIFEFHILJIJIHFECHFHFECEFHEJLIJIHGFE", "QPQPQNPOMHJMNJLNOJQPQPQNPOMHJMNJONMNOPQLRQPKQPOJPONNJQQQQPQPQNPOMHJMNJLNOJQPQPQNPOMHJMNJONMORQQPPRTSRQPONMMLMNOPPQRMOPNOPQSPNOPQSPNQQQQQP", "HHHHGHIHIIIIHIJIHJMLJJMLJJJJJJMLKJIJKHIIIIIILKJIHLNMLKJNPONMLJJJJMLKJIJKHIIIIIILKJIHFGHIIJHHHHGHIHIIIIHIJIHJMLJJMLJOOOONNNNMNJIHGFMLJMMLJMJIHGHHLJMMLJMJIHGFLM",
      "LLQOPONOMKKNMLLLQONOPQRMMNONMNOLLMLMLRQPQOMNNMNMNOPRQPOSQSRQPRQONOPLJLJMLMLOLOLRPRPSSOPQRQPSQOPPQLMNOOPQRSQSQSSQSQRQPSRPRPRRQPRQSOLOQONOPQRMNMLMNPONO", "KKKKKKKKOPQRSTUTXWUTSSSSTUVWXYXTZYXWXVTZYXYZWVZXWVUVWXUSTVUVWXSSOTSRQPQRSRTOQRUTOTSSRRQPOO", "MLKJKJIKJFGFMLKNMKLMLKLKJJKLMNOPQQQPQRSTQRSRQPQQQPQRSTSTUOTMLKJKJIJKFGFMLKNMKLMLKLKJJKLMNOPQQQPQRSTQRSRQPQQQPQRSTSTUOTQQQQSQQQQSQQQQSQSQSQSQOOOUOPOONOPOPOPOPOQQPOMNLMNNMLMNOOPOONMLKLMMMKLMNNNNOQQRSSTVUTUVTMLKJKJIJKFGFMLKKMKLMLKLKJKLMNOPQQQPQRSTQRSRQPQQQPQRSTRQSRQPQQQPQRSTOPQRP",
      "JIHKJIJIHGHIJIHKJIJIHGHIJKLMMMMMNNNNMMMMNNNNMNMNMNMNMNNNNOOOONNNNOOOONONONONONMNOPONMNOPQRQPQMNOPONMNOPQRQPQQRSTSRQPONMLKJIHGFGHIHGFGHIJKJIJMNOPONMNOPQRQPQTSRQPONMLKJIHGEFFFFF", "QPQPQNPOMHJMNJLNOJQPQPQNPOMHJMNJONMNOPQLRQPKQPOJPONNJQQQQPQPQNPOMHJMNJLNOJQPQPQNPOMHJMNJONMORQQPPRTSRQPONMMLMNOPPQRMOPNOPQSPNOPQSPNQQQQQP", "EIIJIHHJKMOMMLLMGGMLHHJJIJIJIJIEIIJIHHJKMOMMLLMGGMLHHJJIJIJIHQOMLLIJKJIHQOMLKLMNPOOQOMLLIJKJIHQOMLKLMNOLNLOLNLOLNLOLNLOOOOEOPRQPSSSTQRPPPRQPOHNMLKJIOOPRQPSSSTQRPPPRQPOSPQO", "HHHHHHJIHGFEFGHIECBCCBCCBCBACBCCBCCBCFEECDFEECDFEECBGBFEEEFEDCCBCCBCBACBCCBCCBCFEECDJICIHGFEDCBAHHHGHHGHHGHKFHGHHGHHGHJEEEDDFFEEHGGFEDFFEDCEDDFFEEHGGEFHEEEFHGGHGGHGGGGJCBCCBCCBCBACBCCBCCBCFEECDFEEBCFEECBGBFEEEFEDCCBCCBCBACBCCBCCBCFEECDJICIHGFEDCBAHHH",
      "ELELLKJIHGFIFIEFGHIJELELLKJIHGGJGJGIJKGHHKKJIIHCCIHCCIHDDKKJIIHCCCDEFGHIJKMKKKJIIHCCIHCCIHDDKKJIIHCEEFGHJEHHOHOOONMLJILILHIJKLMHOHOOOMMLJILILJHIJJK", "IHDKKIHDKKIHDKBKAJJIHAJJIHAJJIHAJBJDKKIHMKKIHMKKIHMHOHPJJIHPJJIHPJJIHPHMHKMKKLMOOKLMOOKLMOOOPOMLKIIMLKIIMLKIIHIK", "EHHJJHEEEEIHGFEEHHJJHEHGFGHFEEGGHGFGHEHGGGKIGHHFFFHHEEEEEEIGHHFFFHHEEEEEIGHEHEHJHJHGHEEEEEEIHGFGFEEHEHJHJHGHEEEGFGHFDEEFEEGGGHGHHGHEHGGGKIGHHHHHFFFFHHHGHEEEEEEIJGHHHHHFFFFHHHGHEEEEEEIGIHCFFHHFCCCIHGFGCCCFFHHFCCCGFGHFCCCCGGHGHFCHGGIGHFCCCCDCBDCCFFEBCDCCDCBDCCFFGFC",
      "MOMJMJHJHFCFIGHGHGGHIGHFMOMJMJHJHFHGHHGHMHHGJKJJKJOJJIFHFEFIFEFKJIJHGFHGHGF", "QPQPQNPOMHJMNJLNOJQPQPQNPOMHJMNJONMNOPQLRQPKQPOJPONNJQQQQPQPQNPOMHJMNJLNOJQPQPQNPOMHJMNJONMORQQPPRTSRQPONMMLMNOPPQRMOPNOPQSPNOPQSPNQQQQQP"
  ];
  var pianoAlph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var pianoAudio = {};
  var soundtype = localStorage["soundtype"] || 0;


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


  function Piano(context) {
      this.ctx = context;
      var aPianoSounds = [];
      for (var i = 0; i < pianoAlph.length; i++) {
        aPianoSounds.push("./piano/sound" + pianoAlph[i] + ".mp3");
      }

      var ctx = this;
      var chordLoader = new BufferLoader(context, aPianoSounds, onChordLoaded);

      function onChordLoaded(buffers) {
          ctx.chordBuffers = buffers;
          // start(1);
          dfdSound.resolve();
      };

      chordLoader.load();
  }
  Piano.prototype.play = function(chord) {
      var context = this.ctx;
      var source = context.createBufferSource(); // creates a sound source
      source.buffer = this.chordBuffers[pianoAlph.indexOf(chord)];                    // tell the source which sound to play
      source.connect(context.destination);       // connect the source to the context's destination (the speakers)
      if (source.start) {
  				source.start(0);
  			} else if (source.play) {
  				source.play(0);
  			} else if (source.noteOn) {
  				source.noteOn(0);
  			}
  }

  window.AudioContext = window.AudioContext ||
  window.webkitAudioContext;
  var context;
  var oPinao;
  if (AudioContext) {
    context = new AudioContext();
    oPinao = new Piano(context);
  }else {
    // start(1);
    dfdSound.resolve();
  }

  function randomPlay() {
    if (oPinao) {
      oPinao.play(pianoAlph[parseInt(Math.random() * 26)]);
    }
  }

  function pianoPlay(a, e) {
    if (oPinao) {
      if (soundtype == 0) {
            oPinao.play(a);
      } else if (soundtype == 1) {
          // var nowAudio = new Audio;
          // if (e == 1) nowAudio.src = "error.mp3";
          // else nowAudio.src = "touch.mp3";
          // nowAudio.play()
      }
      // if (soundtype != 2) nowAudio.onpause = function() {
      //     nowAudio = null
      // }
    }
  }

  function cheerPlay() {
      // if (soundtype != 2) {
      //     var nowAudio = new Audio;
      //     nowAudio.src = "cheer.mp3";
      //     nowAudio.play()
      // }
  }


  function changeSoundType(t) {
      if (soundtype == 0) soundtype = 1;
      else if (soundtype == 1) soundtype = 2;
      else if (soundtype == 2) soundtype = 0;
      localStorage["soundtype"] = soundtype;
      randomPlay();
      t.innerHTML = "声音: " + ["钢琴", "默认", "关"][soundtype]
  };

  /*game*/
  var updateInterval = false;
  var serviceRoot = "http://game.weiplus5.com/";
  window.requestAnimationFrame = function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
          window.setTimeout(callback, 1E3 / 60)
      }
  }();
  // showLoading();



  //initial
  var props;
  var iniLoad = true;
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
          $("#nickName").val(data.nick);
          $("#avatarImage").attr("src", data.photo);

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
          // showPopup("loginButtonPopup");
        }else if (status >= 0 ) {
          life = parseInt(data.data, 10);
          updateLife();
        }else {
          alert(data.reason);
        }
      }
    });
  }
  fnGetLive();
  var gameModes = {
      CLASSIC: 0,
      ARCADE: 1,
      ZED: 2,
      RUSH: 3,
      RELAY: 4
  };
  var gameModesNames = ["经典", "街机", "计时", "冲刺", "接力"];
  var colors = ["#111", "#00cc1f", "#00bba3", "#ff7000", "#ff294d"];
  var canvas, context, tilesArray, clickedTiles;
  var normalSpeed = 5;
  var speedY = 0;
  var tempSpeedY;
  var LineY = 0;
  var keysArray = [65, 83, 68, 70];
  var AlphaKeys = ["A", "S", "D", "F"];
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
  var yellowTileY = 450;
  var greenTileY = 0;
  var nowSheet;
  var nowPianoKey = 0;
  var life = 0, reviveCount = 0;
  var iX;
  var iOpenedOverlay = 0;
  var bReviving = false;

  // var showletters = localStorage["showletters"] == "false" ? false : true;
  var showletters = false;
  var colorful = localStorage["colorful"] == "true" ? true : false;
  var played = parseInt(localStorage["played"]) || 0;
  var nCanvasWidth = 400;
  var nCanvasHeight = 600;
  var nTileWidth = 100;
  var nTileHeight = 150;
  function start(mode, bRevive) {
      bReviving = bRevive;
      resizeGame();
      var oSize = newSize();
      // menu.classList.add("open");
      played++;
      localStorage["played"] = played;
      // if (played == 6 && chrome && !chrome.app.isInstalled) showPopup("installpopup");
      // else if (played == 11) showPopup("sharepopup");
      // else if (played == 31)
      //     if (chrome && chrome.app.isInstalled) showPopup("ratepopup");
      //     else showPopup("installpopup");
      nowPianoKey = 0;
      nowSheet = pianoSheets[parseInt(Math.random() * 19)];
      randomPlay();
      isStart = false;
      lastIsStart = false;
      greenTileY = -nTileHeight * 31;
      yellowTileY = oSize.h/4 * 3;
      nowTime = 0;
      if (!bRevive) {
        clickedEver = 0;
      }

      nowMode = mode;
      modeStart(bRevive);
      speedY = 0;
      updateInterval = true;
      LineY = 0;
      keyListener = true;
      errorTile = false;
      canvas = document.getElementById("game");
      context = canvas.getContext("2d");
      context.textAlign = "center";
      context.font = "700 30px 'Source Sans Pro',sans-serif";
      tilesArray = [];
      clickedTiles = [];
      for (var i = 0; i < 6; i++)
          if (colorful) tilesArray[i] = [getRandomTile(), i * nTileHeight - yellowTileY - 1, parseInt(Math.random() * 4) + 1];
          else tilesArray[i] = [getRandomTile(), i * nTileHeight - yellowTileY, 0];

      document.addEventListener("keydown", keyboardListener, false);
      // canvas.addEventListener("mousedown", mouseListener, false);
      canvas.addEventListener("touchstart", mouseListener,
          false);
      requestAnimationFrame(update);
      document.getElementById("gameoverBlock").style.display = "none";
      // document.getElementById("gameoverBlockwin").style.display = "none";
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
          speedY = -25;
          errorTile = [tilesArray[tilesArray.length - 1][0], tilesArray[tilesArray.length - 1][1], 0, 1];
          keyListener = false;
          pianoPlay("A", 1);
          setTimeout(stopGame, 500)
      }
      if (isStart && !isPause) customModesUpdate();
      if (clickedTiles[0] && clickedTiles[0][1] > 1E3) clickedTiles.shift();
      LineY += speedY;
      greenTileY += speedY;
      if (yellowTileY < nCanvasHeight) {
          context.fillStyle =
              "rgb(249,231,23)";
          context.fillRect(0, yellowTileY, 498, nTileHeight);
          yellowTileY += speedY
      }
      drawBorders();
      drawTile();
      if (clickedEver == 0) {
          context.fillStyle = "rgb(255,255,255)";
          context.fillText("开始", tilesArray[tilesArray.length - 1][0] * nTileWidth + nTileWidth/2, nTileHeight * 2.7)
      }
      var NPC, TNPC;
      if (nowMode == 0 || nowMode == 4) {
          if (nowMode == 0) var PRclickedEver = clickedEver;
          else var PRclickedEver = clickedEver % 30;
          if (PRclickedEver <= 15) NPC = getColorAnimation([251, 62, 56], [248, 252, 17], PRclickedEver, 15);
          else NPC = getColorAnimation([248, 252, 17], [83, 215, 105], PRclickedEver -
              15, 15);
          context.fillStyle = "rgba(150,150,150,0.4)";
          context.fillRect(0, 0, PRclickedEver / 30 * (nCanvasWidth - 2), 4);
          context.fillStyle = "rgb(" + NPC[0] + "," + NPC[1] + "," + NPC[2] + ")";
          context.fillRect(0, 0, PRclickedEver / 30 * (nCanvasWidth - 2), 3)
      }
      if (nowMode == 0 && greenTileY > -nCanvasHeight) {
          context.fillStyle = "rgb(83,215,105)";
          context.fillRect(0, greenTileY, nCanvasWidth, nCanvasHeight)
      }
      if (nowMode == 4)
          if (nowTime <= 5E3) TNPC = getColorAnimation([83, 215, 105], [248, 252, 17], nowTime, 5E3);
          else TNPC = getColorAnimation([248, 252, 17], [251, 62, 56], nowTime - 5E3, 5E3);
      context.fillStyle = "rgba(150,150,150,0.5)";
      context.fillText(nowScore, nCanvasWidth/2, 80);
      if (nowMode == 4) context.fillStyle = "rgb(" + TNPC[0] + "," + TNPC[1] + "," + TNPC[2] + ")";
      else context.fillStyle = "rgb(251,62,56)";
      context.fillText(nowScore, nCanvasWidth/2, 80);
      clickedNew = false;
      if (updateInterval) requestAnimationFrame(update)
  }
  keyboardListener = function(e) {
      if (keyListener) {
          var keyIndex = keysArray.indexOf(e.keyCode);
          if (tilesArray[tilesArray.length - 1][0] === keyIndex) {
              if (!isStart && !bReviving) {
                $.ajax({
                  dataType: "json",
                  url: serviceRoot + "index.php?m=game&v=startgame",
                  xhrFields: { withCredentials: true },
                  success: function (data) {
                    var status = parseInt(data.status, 10);
                    if ( status === -238) {
                      showPopup("loginButtonPopup");
                    }else if (status >= 0 ) {
                      life--;
                      updateLife();
                    }else if( status === -227){
                      //no life
                      alert("todo no life");
                    }else {
                      alert(data.reason);
                    }
                  }
                });
              }

              isStart = true;
              hideHelp();
              $("#toolbar").hide();
              clickedEver++;
              clickedTiles.push(tilesArray[tilesArray.length - 1]);
              clickedTiles[clickedTiles.length - 1].push(0);
              if (colorful) tilesArray.unshift([getRandomTile(), tilesArray[0][1] - nTileHeight, parseInt(Math.random() * 4) + 1]);
              else tilesArray.unshift([getRandomTile(), tilesArray[0][1] - nTileHeight, 0]);
              tilesArray.pop();
              clickedNew = true;
              if (nowPianoKey == nowSheet.length) {
                  nowSheet =
                      pianoSheets[parseInt(Math.random() * 19)];
                  nowPianoKey = 0
              }
              pianoPlay(nowSheet[nowPianoKey]);
              nowPianoKey++
          } else if (isStart && keyIndex != -1) {
              hideHelp();
              speedY = 0;
              errorTile = [keyIndex, tilesArray[tilesArray.length - 1][1], 0, 0];
              keyListener = false;
              pianoPlay("A", 1);
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
      if (y < LastTileY + nTileHeight && y > LastTileY) keyboardListener({
          keyCode: keysArray[parseInt((x + 1) / nTileWidth)]
      })
    }else if (life <= 0) {
      showPopup("topup");
    }
    e.preventDefault();
  };
  function updateLife() {
    var nApple = life;
    var nAddLife = 0;
    $("#life .apple > div").removeClass("filled");
    if (life > 5) {
      nApple = 5;
      nAddLife = life - 5;
    }
    $("#life .apple > div:nth-child(-n+" + nApple + ")").addClass("filled");
    $("#life .count").html();
  }
  function drawTile() {
      for (var i = 0; i < tilesArray.length; i++) {
          var nowTile = tilesArray[i];
          nowTile[1] += speedY;
          context.fillStyle = colors[nowTile[2]];
          context.fillRect(nowTile[0] * nTileWidth, nowTile[1] + 1, nTileWidth - 1, nTileHeight - 1);
          if (showletters)
              if (!(clickedEver == 0 && i == 5)) {
                  context.fillStyle = "#fff";
                  context.fillText(AlphaKeys[nowTile[0]], nowTile[0] * nTileWidth + 47, nowTile[1] + 85)
              } else {
                  context.fillStyle = "#fff";
                  context.fillText(AlphaKeys[nowTile[0]], nowTile[0] * nTileWidth + 47, nowTile[1] + 55)
              }
      }
      for (var j = 0; j < clickedTiles.length; j++) {
          var nowTile = clickedTiles[j];
          clickedTiles[j][1] += speedY;
          clickedTiles[j][3] += 10;
          var clickedNowWidth = getAnimation(nTileWidth, nowTile[3], nTileWidth);
          var clickedNowHeight = getAnimation(nTileHeight, nowTile[3], nTileHeight);
          context.fillStyle = colors[nowTile[2]];
          context.fillRect(nowTile[0] * nTileWidth + 1, nowTile[1] + 2, nTileWidth , nTileHeight );
          context.fillStyle = "rgba(255,255,255,1)";
          context.fillRect(nowTile[0] * nTileWidth + (nTileWidth/2 - clickedNowWidth * .5), nowTile[1] + 1 + (nTileHeight/2 - clickedNowHeight * .5), clickedNowWidth, clickedNowHeight)
      }
      if (errorTile) {
          var nowcolorA = .3 + getAnimation(.7, Math.abs(errorTile[2] % nTileHeight*2 - nTileHeight), nTileHeight*2);
          errorTile[1] +=
              speedY;
          if (errorTile[1] <= nTileHeight*2 && speedY < 0) speedY = 0;
          errorTile[2] += 10;
          if (errorTile[3] == 0) context.fillStyle = "rgba(251,62,56," + nowcolorA + ")";
          else context.fillStyle = "rgba(166,166,166," + nowcolorA + ")";
          context.fillRect(errorTile[0] * nTileWidth, errorTile[1] + 2, nTileWidth, nTileHeight)
      }
  }

  function drawBorders() {
      if (LineY >= nCanvasHeight) LineY = LineY - nCanvasHeight;
      if (LineY < 0) LineY = LineY + nCanvasHeight;
      context.beginPath();
      for (var i = 0; i < 10; i++) {
          context.lineWidth = 1;
          context.strokeStyle = "#000";
          context.moveTo(0, LineY + i * nTileHeight - nCanvasHeight);
          context.lineTo(nCanvasWidth + 2, LineY + i * nTileHeight - nCanvasHeight)
      }
      for (var f = 1; f < 4; f++) {
          context.moveTo(f * nTileWidth - .5, LineY - nCanvasHeight + 2);
          context.lineTo(f * nTileWidth - .5, LineY + nCanvasHeight + 2)
      }
      context.stroke();
      context.closePath()
  }

  function stopGame() {
      hidePopup("magicpopup");
      isPause = false;
      keyListener = false;
      updateInterval = false;
      // var gameoverBlockS = document.getElementById("gameoverBlock").style;
      // var bestp = document.getElementById("best");
      // if (nowMode == 4 || nowMode == 2) nowScore = clickedEver;
      // var bestEver = localStorage["best_" + nowMode];
      // if (nowMode != 0 && parseFloat(nowScore) > parseFloat(bestEver)) {
      //     localStorage["best_" + nowMode] = nowScore;
      //     bestp.innerHTML = "新纪录";
      //     cheerPlay()
      // } else if (bestEver) bestp.innerHTML = "新纪录 " + parseInt(bestEver, 10);
      // else if (nowMode != 0) {
      //     bestp.innerHTML = "新纪录";
      //     localStorage["best_" +
      //         nowMode] = nowScore;
      //     cheerPlay()
      // } else bestp.innerHTML = "";
      // document.getElementById("score").innerHTML = nowMode == 0 ? "失败!" : parseInt(nowScore, 10);
      // // document.getElementById("mode").innerHTML = gameModesNames[nowMode] + "";
      //
      // if (life === 0) {
      //   $("#again").hide();
      //   $("#buyLife").show();
      //   $("#gameoverBlock .magicButton").hide();
      // }else {
      //   $("#again").show();
      //   $("#buyLife").hide();
      //   $("#gameoverBlock .magicButton").show();
      // }
      // if (reviveCount == 3) {
      //   $("#gameoverBlock .magicButton").hide();
      // }

      $("#toolbar").show();
      showPopup("gameoverBlock");

  }

  function modeStart(bRevive) {
      switch (nowMode) {
          case gameModes.CLASSIC:
              nowScore = '0.000"';
              speedY = 0;
              break;
          case gameModes.ARCADE:
              if (!bRevive) {
                nowScore = 0;
              }

              speedY = normalSpeed;
              break;
          case gameModes.ZED:
              nowScore = '30.000"';
              speedY = 0;
              break;
          case gameModes.RUSH:
              nowScore = "0.000/s";
              speedY = normalSpeed;
              break;
          case gameModes.RELAY:
              nowScore = '10.000"';
              speedY = 0;
              break
      }
  }

  function customModesUpdate() {
      var triggerHeight = nTileHeight * 3 - 2;
      switch (nowMode) {
          case gameModes.CLASSIC:
              if (clickedEver == 30) {
                  getScoreScreen();
                  return
              }
              if (!errorTile && isStart) nowScore = (nowTime / 1E3).toFixed(2) + "" + parseInt(Math.random() * 10) + '"';
              if (clickedNew) speedY = nTileHeight/10;
              if (speedY != 0 && !clickedNew)
                  if (clickedTiles[clickedTiles.length - 1][1] >= triggerHeight) speedY = 0;
              break;
          case gameModes.ARCADE:
              nowScore = clickedEver * 10;
              if (!errorTile) speedY += .003;
              break;
          case gameModes.ZED:
              if (3E4 - nowTime <= 0) showEndGame();
              if (!errorTile && isStart) nowScore =
                  ((3E4 - nowTime) / 1E3).toFixed(2) + "" + parseInt(Math.random() * 10) + '"';
              if (3E4 - nowTime <= 0) nowScore = '0.000"';
              if (clickedNew) speedY = 10;
              if (speedY != 0 && !clickedNew)
                  if (clickedTiles[clickedTiles.length - 1][1] >= triggerHeight) speedY = 0;
              break;
          case gameModes.RUSH:
              if (!errorTile) nowScore = (speedY * 60 / nTileHeight).toFixed(3) + "/s";
              if (!errorTile) speedY += .003;
              break;
          case gameModes.RELAY:
              if (1E4 - nowTime <= 0) showEndGame();
              if (clickedEver % 30 == 0 && lastCheckClickedEver != clickedEver) nowTime = 0;
              lastCheckClickedEver = clickedEver;
              if (!errorTile && isStart) nowScore =
                  ((1E4 - nowTime) / 1E3).toFixed(2) + "" + parseInt(Math.random() * 10) + '"';
              if (1E4 - nowTime <= 0) nowScore = '0.000"';
              if (clickedNew) speedY = nTileHeight/10;
              if (speedY != 0 && !clickedNew)
                  if (clickedTiles[clickedTiles.length - 1][1] >= triggerHeight) speedY = 0;
              break
      }
  }



  function getAnimation(number, time, endtime) {
      return Math.min(number * (time / endtime), number)
  }

  function getColorAnimation(c1, c2, p, e) {
      var pe = p / e;
      return [Math.floor((c2[0] - c1[0]) * pe + c1[0]), Math.floor((c2[1] - c1[1]) * pe + c1[1]), Math.floor((c2[2] - c1[2]) * pe + c1[2])]
  }

  function getRandomTile() {
      return Math.round(Math.random() * 3)
  }

  function changeLetters(t) {
      showletters = !showletters;
      t.innerHTML = showletters ? "显示字母: 开" : "显示字母: 关";
      localStorage["showletters"] = showletters;
      randomPlay()
  }


  function changeColorful(t) {
      colorful = !colorful;
      t.innerHTML = colorful ? "颜色: 开" : "颜色: 关";
      localStorage["colorful"] = colorful;
      randomPlay()
  }

  function hideHelp() {
      hidePopup("help");
  }

  // function showHelp(mode) {
  //     if (mode == 0) {
  //         if (!localStorage["help_0"]) {
  //             document.getElementById("helpDetails").innerHTML = "从最下面黑块开始，<br/>以最快速度达到30个黑块。";
  //             showPopup("help");
  //             localStorage["help_0"] = true
  //         }
  //     } else if (mode == 1) {
  //         if (!localStorage["help_1"]) {
  //             document.getElementById("helpDetails").innerHTML = "从最下面黑块开始，<br/>不要错过一个。";
  //             showPopup("help");
  //             localStorage["help_1"] = true
  //         }
  //     } else if (mode ==
  //         2) {
  //         if (!localStorage["help_2"]) {
  //             document.getElementById("helpDetails").innerHTML = "30秒内尽可能多的点击黑块。";
  //             showPopup("help");
  //             localStorage["help_2"] = true
  //         }
  //     } else if (mode == 3) {
  //         if (!localStorage["help_3"]) {
  //             document.getElementById("helpDetails").innerHTML = "从最下面黑块开始，<br/>不要错过一个。";
  //             showPopup("help");
  //             localStorage["help_3"] = true
  //         }
  //     } else if (mode == 4)
  //         if (!localStorage["help_4"]) {
  //             document.getElementById("helpDetails").innerHTML =
  //                 '从最下面黑块开始，<br/>在10秒内点击50个黑块，<br/>然后获得新的10秒...';
  //             showPopup("help");
  //             localStorage["help_4"] = true
  //         }
  // }

  function showEndGame() {
      updateInterval = false;
      errorTile = [0, 0, 0, 1];
      keyListener = false;
      pianoPlay("A", 1);
      stopGame();
  }

  function showPopup(id) {
      var oSize = newSize();
      var $oPopup = $("#" + id);
      var $opopupOverlay = $("#popupOverlay");

      if (!$oPopup.is(":visible")) {
        var iLeft = oSize.w / 2 * 0.2 + 'px';

        $opopupOverlay.css({
          width: oSize.w + 'px',
          height: oSize.h + 'px'
        }).show();
        $oPopup.show();
        setTimeout(function () {
          $oPopup.addClass("show");
          var nHeight = $oPopup.outerHeight();
          var iTop = (oSize.h - nHeight) / 2 + 'px';
          $oPopup.css({
            width: oSize.w * 0.8 + 'px',
            top: iTop,
            left: iLeft
          });
        }, 300);
        iOpenedOverlay++;
      }
      // var popup = document.getElementById(id);
      // var popupOverlay = document.getElementById("popupOverlay");
      //
      // popup.style.width = oSize.w * 0.8 + 'px';
      // popup.style.height = oSize.h * 0.6 + 'px';
      // popup.style.top = iTop;
      // popup.style.left = iLeft;
      //
      // popupOverlay.style.width = oSize.w + 'px';
      // popupOverlay.style.height = oSize.h + 'px';
      //
      // popup.style.display = "block";
      // popupOverlay.style.display = "block";
      // setTimeout('document.getElementById("' + id + '").classList.add("show");', 10);
      // iOpenedOverlay++;
  }

  function hidePopup(id) {
    if ($("#" + id).is(":visible")) {
      iOpenedOverlay--;
      document.getElementById(id).classList.remove("show");
      setTimeout(function () {
        document.getElementById(id).style.display="none";
        if (iOpenedOverlay === 0) {
          var popupOverlay = document.getElementById("popupOverlay");
          popupOverlay.style.display = "none";
        }
      }, 300);
    }

  }

  $(".popup .close").on("click", function (e) {
    hidePopup($(e.target).parent().attr("id"));
  });

  function showLoading() {
    var oSize = newSize();
    var $loading = $("#loadingAni");
    var $loadingOverlay = $("#loadingOverlay");
    var iLeft = oSize.w / 2 - 24 + 'px' ;
    var iTop = oSize.h / 2 - 24  + 'px';

    $loading.css({
      top:iTop,
      left:iLeft
    });

    $loadingOverlay.css({
      width: oSize.w + 'px',
      height:oSize.h + 'px'
    })
    $loading.show();
    $loadingOverlay.show();
  }
  function hideLoading() {
    var $loading = $("#loadingAni");
    var $loadingOverlay = $("#loadingOverlay");
    $loading.hide();
    $loadingOverlay.hide();
  }
  function newSize() {
    // var widthToHeight = 2 / 3;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
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
      // var menu = document.getElementById('menu');
      // var menuTiles = document.querySelectorAll('#menu .tile');
      // var footer = document.querySelectorAll('.footer');
      // var score = document.querySelectorAll('.score');
      // var mode = document.querySelectorAll('.mode');
      var help = document.querySelector('#help');
      var popups = document.querySelectorAll('.popup');
      var oSize = newSize();
      gameArea.style.height = oSize.h + 'px';
      gameArea.style.width = oSize.w + 'px';

      gameArea.style.marginTop = (-oSize.h / 2) + 'px';
      gameArea.style.marginLeft = (-oSize.w / 2) + 'px';
      help.style.width = oSize.w + 'px';
      help.style.height = oSize.h + 'px';
      var gameCanvas = document.getElementById('game');
      gameCanvas.width = oSize.w;
      gameCanvas.height = oSize.h;


      // menu.style.height = oSize.h + 'px';

      nCanvasWidth = oSize.w;
      nCanvasHeight = oSize.h;
      nTileWidth = oSize.w / 4;
      nTileHeight = oSize.h / 4;
      yellowTileY = nTileHeight * 3;
      greenTileY = -nTileHeight * 31;
      for (var i = 0; i < popups.length; i++) {
        // popups[i].style.width = oSize.w + 'px';
        // popups[i].style.height = oSize.h + 'px';
      }
      // for (var i = 0; i < menuTiles.length; i++) {
      //   menuTiles[i].style.lineHeight = nCanvasHeight/3 + "px";
      // }
      // for (var i = 0; i < footer.length; i++) {
      //   footer[i].style.marginTop = nCanvasHeight * 0.1 + "px";
      // }
      // for (var i = 0; i < score.length; i++) {
      //   score[i].style.marginTop = nCanvasHeight * 0.1 + "px";
      // }
      // for (var i = 0; i < mode.length; i++) {
      //   mode[i].style.marginTop = nCanvasHeight * 0.1 + "px";
      // }
      gameArea.style.display = "inline-block";
      $(".againLink,.againClose").off("click").on("click", againHandler);
      // document.getElementById("again").removeEventListener("click", againHandler);
      // document.getElementById("gagain").removeEventListener("click", againHandler);
      // document.getElementById("again").addEventListener("click", againHandler);
      // document.getElementById("gagain").addEventListener("click", againHandler);
  }
  function againHandler(event, bRevive) {
    hidePopup("gameoverBlock");
    $("#gameoverBlock .magicButton").show();

    if (!bRevive){
      $(".GstartScreen").show();
      $(".revivePrice").html(props.revive0[0].price);
      bReviving = false;
      reviveCount = 0;
      $.ajax({
        dataType: "json",
        type: "POST",
        data: {
          score: parseInt(nowScore, 10),
        },
        url: serviceRoot + "index.php?m=game&v=addGameScore",
        xhrFields: { withCredentials: true },
        success: function (data) {
          var status = parseInt(data.status, 10);
          if ( status === -238) {
            showPopup("loginButtonPopup");
          }else if (status >= 0 ) {

          }else {
            alert(data.reason);
          }
        }
      });
    }
    start(nowMode, bRevive);
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
            showPopup("loginButtonPopup");
            isPause = false;
          }else if (status >= 0 ) {
            speedY = normalSpeed;
            tempSpeedY = undefined;
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
      speedY = tempSpeedY;
      tempSpeedY = undefined;
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
          tempSpeedY = speedY;


          speedY = 0;
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
          showPopup("loginButtonPopup");
        }else if (status >= 0 ) {
          $("#coins .count").html(parseInt(data.money,10));
          reviveCount = parseInt(data.reviveCount, 10);
          if (reviveCount < 3) {
            $(".revivePrice").html(props["revive" + reviveCount][0].price);
          }

          againHandler(null, true);
        }else if (status === -205) {
            //not enough coins
            showCoinsPopup();
        }
      }
    });
  }
  $("#startGameButton").on("click", function () {
    fnGetPropList().done(function (data) {
      var status = parseInt(data.status, 10);
      if ( status === -238) {
        showPopup("loginButtonPopup");
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



  $("#buttonGetVer").click(function (e) {
    var $oPhone = $("#login_phone");
    var sPhone = $oPhone.val();
    var $oTiming = $("#loginPopup .timing");
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
        success: function () {

        },
        dataType: 'json'
      });
    }else {
      alert("请输入合法的手机号！");
    }


  });

  $("#loginPopup form").submit(function (e) {
    e.preventDefault();
    var $oVer = $("#login_ver");
    var $oPhone = $("#login_phone");
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
          success: function () {
            hidePopup("loginPopup");
            fnGetPropList();
            fnGetLive();
            if ($(".fakeBG").is(":visible")) {
              $('.GgameTools').show();
            }
          },
          dataType: 'json'
        });
      }else {
        alert("请输入手机号,验证码！");
      }
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
          showPopup("loginButtonPopup");
        }else if (status >= 0 ) {

          for (var i = 0; i < data.rows.length; i++) {
            $oMessageList.append(["<li>",data.rows[i].addtime,data.rows[i].content,"</li>"].join(" "));
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
        showPopup("loginButtonPopup");
      }else if (status >= 0 ) {
        showPopup("settingPopup");
      }
    });

  });
  $("#topup .priceButton").click(function () {
    $.ajax({
      type: "GET",
      url: serviceRoot + "index.php?m=message&f=message&v=getMsglist",
      success: function (data) {
        var status = parseInt(data.status, 10);
        if ( status === -238) {
          showPopup("loginButtonPopup");
        }else if (status >= 0 ) {
            fnGetLive();
        }

      },
      dataType: 'json'
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
            showPopup("loginButtonPopup");
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
  $(".loginByWechatButton,.bindWechat").click(function () {
    // Wechat.share({
    //     text: "This is just a plain string",
    //     scene: Wechat.Scene.TIMELINE   // share to Timeline
    // }, function () {
    //     alert("Success");
    // }, function (reason) {
    //     alert("Failed: " + reason);
    // });
    var scope = "snsapi_userinfo",
    state = "_" + (+new Date());
    Wechat.auth(scope, state, function (response) {
        // you may use response.code to get the access token.
        if (response.code) {
            $.ajax({
              type: "GET",
              url: serviceRoot + "index.php?m=member&f=index&v=auth&type=weixin&code=" + response.code,
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
                  alert(data.reason);
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
                      msg: "购买成功",
                      title: "您已成功购买" + sNum + "个金币",
                      type: 'success'
                    });
                  }else if ( data.status == -238) {
                    showPopup("loginButtonPopup");
                  }

                },
                dataType: 'json'
              });
          }, function (reason) {
              showAlert({
                msg: reason,
                title: "支付失败",
                type: 'warning'
              });
          });
        }else if ( data.status == -238) {
          showPopup("loginButtonPopup");
        }

      },
      dataType: 'json'
    });
  });
  $(".buyCoins").click(showCoinsPopup);

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
          showPopup("loginButtonPopup");
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
    }, 5000);
  }
  $("#alert .close").click(function (e) {
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
                      msg: "设置-头像",
                      title: '头像保存成功',
                      type: 'success'
                    });
                    $tar.off("click.avatar");
                  }else {
                    showAlert({
                      msg: "设置-头像",
                      title: '头像保存失败:' + data.reason,
                      type: 'error'
                    });
                  }

                });
              });

              // var oReq = new XMLHttpRequest();
              // oReq.open("POST", serviceRoot + "index.php?m=member&f=index&v=avatar2", true);
              // oReq.setRequestHeader('Content-Type', 'image/jpg');
              // oReq.onload = function (oEvent) {
              //     alert('success uploaded');
              //     // all done!
              // };
              // // Pass the blob in to XHR's send method
              // oReq.send(blob);
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
    // fs.root.getFile(imageData, { create: true, exclusive: false }, function (fileEntry) {
    //         fileEntry.file(function (file) {
    //             var reader = new FileReader();
    //             reader.onloadend = function() {
    //                 // Create a blob based on the FileReader "result", which we asked to be retrieved as an ArrayBuffer
    //                 var blob = new Blob([new Uint8Array(this.result)], { type: "image/png" });
    //                 var oReq = new XMLHttpRequest();
    //                 oReq.open("POST", "index.php?m=member&f=index&v=avatar2", true);
    //                 oReq.onload = function (oEvent) {
    //                     alert('success uploaded');
    //                     // all done!
    //                 };
    //                 // Pass the blob in to XHR's send method
    //                 oReq.send(blob);
    //             };
    //             // Read the file as an ArrayBuffer
    //             reader.readAsArrayBuffer(file);
    //         }, function (err) {
    //           console.error('error getting fileentry file!');
    //           console.error(err);
    //         });
    //     }, function (err) {
    //       console.error('error getting file! ' );
    //       console.error(err);
    //     });
    }, function (err) {
      console.log('error getting persistent fs! ' + err);
      console.log(err);
     });
      var image = document.getElementById('avatarImage');
      image.src = imageData + '?' + Math.random();;
  }

  function onFail(message) {
      alert('Failed because: ' + message);
  }
  function fnGetRankList(list) {
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

        if ( status === -238) {
          showPopup("loginButtonPopup");
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
  // document.addEventListener("DOMContentLoaded", DomLoaded, false);
  // window.addEventListener('resize', resizeGame, false);
  // window.addEventListener('load', resizeGame, false);
  // window.addEventListener('orientationchange', resizeGame, false);
  // showPopup("coinsPopup");
  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {
    // alert("hot7");
  }
})();
