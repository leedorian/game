/* eslint-disable*/
var updateInterval = false;
window.requestAnimationFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1E3 / 60)
    }
}();
showLoading();
//initial
var props;
$.ajax({
  dataType: "json",
  url: "http://game.weiplus5.com/index.php?m=game&f=index&v=getPropList",
  xhrFields: { withCredentials: true },
  success: function (data) {
    var status = parseInt(data.status, 10);
    if ( status === -238) {
      window.location.href = "./index.html#/Login";
    }else if (status >= 0 ) {
      props = data.rows;
      $("#magicpopup .count").html(data.rows.speed[0].price);
      $(".revivePrice").html(data.rows.revive[0].price);
      hideLoading();

    }else {
      alert(data.reason);
    }
  }
});


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
var life = 0;
var iX;
var iOpenedOverlay = 0;

// var showletters = localStorage["showletters"] == "false" ? false : true;
var showletters = false;
var colorful = localStorage["colorful"] == "true" ? true : false;
var played = parseInt(localStorage["played"]) || 0;
var nCanvasWidth = 400;
var nCanvasHeight = 600;
var nTileWidth = 100;
var nTileHeight = 150;
start = function(mode, bRevive) {
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
        else tilesArray[i] = [getRandomTile(), i * nTileHeight - yellowTileY - 1, 0];

    document.addEventListener("keydown", keyboardListener, false);
    // canvas.addEventListener("mousedown", mouseListener, false);
    canvas.addEventListener("touchstart", mouseListener,
        false);
    requestAnimationFrame(update);
    document.getElementById("gameoverBlock").style.display = "none";
    // document.getElementById("gameoverBlockwin").style.display = "none";
    showHelp(mode);

    $.ajax({
      dataType: "json",
      url: "http://game.weiplus5.com/index.php?m=game&v=getActionPoint",
      xhrFields: { withCredentials: true },
      success: function (data) {
        var status = parseInt(data.status, 10);
        if ( status === -238) {
          window.location.href = "./index.html#/Login";
        }else if (status >= 0 ) {
          life = parseInt(data.data, 10);
          updateLife();
        }else {
          alert(data.reason);
        }
      }
    });
};
update = function() {
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
};
keyboardListener = function(e) {
    if (keyListener) {
        var keyIndex = keysArray.indexOf(e.keyCode);
        if (tilesArray[tilesArray.length - 1][0] === keyIndex) {
            if (!isStart) {
              $.ajax({
                dataType: "json",
                url: "http://game.weiplus5.com/index.php?m=game&v=startgame",
                xhrFields: { withCredentials: true },
                success: function (data) {
                  var status = parseInt(data.status, 10);
                  if ( status === -238) {
                    window.location.href = "./index.html#/Login";
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
  }else if (life == 0) {
    showPopup("topup");
  }
  e.preventDefault();
};
function updateLife() {
  $("#life .count").html(life);
}
function drawTile() {
    for (var i = 0; i < tilesArray.length; i++) {
        var nowTile = tilesArray[i];
        nowTile[1] += speedY;
        context.fillStyle = colors[nowTile[2]];
        context.fillRect(nowTile[0] * nTileWidth, nowTile[1] + 2, nTileWidth - 1, nTileHeight - 1);
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
        var clickedNowWidth = getAnimation(nTileWidth - 1, nowTile[3], nTileWidth);
        var clickedNowHeight = getAnimation(nTileHeight - 1, nowTile[3], nTileHeight);
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
    keyListener = false;
    updateInterval = false;
    // var gameoverBlockS = document.getElementById("gameoverBlock").style;
    var bestp = document.getElementById("best");
    if (nowMode == 4 || nowMode == 2) nowScore = clickedEver;
    var bestEver = localStorage["best_" + nowMode];
    if (nowMode != 0 && parseFloat(nowScore) > parseFloat(bestEver)) {
        localStorage["best_" + nowMode] = nowScore;
        bestp.innerHTML = "新纪录";
        cheerPlay()
    } else if (bestEver) bestp.innerHTML = "新纪录 " + parseInt(bestEver, 10);
    else if (nowMode != 0) {
        bestp.innerHTML = "新纪录";
        localStorage["best_" +
            nowMode] = nowScore;
        cheerPlay()
    } else bestp.innerHTML = "";
    document.getElementById("score").innerHTML = nowMode == 0 ? "失败!" : parseInt(nowScore, 10);
    // document.getElementById("mode").innerHTML = gameModesNames[nowMode] + "";
    if (life === 0) {
      $("#again").hide();
      $("#buyLife").show();
      $("#gameoverBlock .magicButton").hide();
    }else {
      $("#again").show();
      $("#buyLife").hide();
      $("#gameoverBlock .magicButton").show();
    }
    $.ajax({
      dataType: "json",
      type: "POST",
      data: {
        score: parseInt(nowScore, 10),
      },
      url: "http://game.weiplus5.com/index.php?m=game&v=addGameScore",
      xhrFields: { withCredentials: true },
      success: function (data) {
        var status = parseInt(data.status, 10);
        if ( status === -238) {
          window.location.href = "./index.html#/Login";
        }else if (status >= 0 ) {

        }else {
          alert(data.reason);
        }
      }
    });
    $("#toolbar").show();
    showPopup("gameoverBlock");
    // gameoverBlockS.transition = "";
    // gameoverBlockS.opacity = .9;
    // gameoverBlockS.display = "block";
    // gameoverBlockS.backgroundColor = errorTile[3] == 0 ? "rgb(251,62,56)" : "rgb(166,166,166)";
    // gameoverBlockS.left = errorTile[0] * 100 + "px";
    // gameoverBlockS.top = errorTile[1] + 2 + "px";
    // gameoverBlockS.width = "98px";
    // gameoverBlockS.height = "148px";
    // document.getElementById("gameoverBlock").classList.remove("show");
    // gameoverBlockS.transition = "all ease 500ms";
    // setTimeout(function() {
    //     var gameoverBlockS = document.getElementById("gameoverBlock").style;
    //     gameoverBlockS.opacity = 1;
    //     gameoverBlockS.left = 0;
    //     gameoverBlockS.top = 0;
    //     gameoverBlockS.width = nCanvasWidth + "px";
    //     gameoverBlockS.height = nCanvasHeight + "px";
    //     document.getElementById("gameoverBlock").classList.add("show")
    // }, 40)
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

            speedY = 3.83;
            break;
        case gameModes.ZED:
            nowScore = '30.000"';
            speedY = 0;
            break;
        case gameModes.RUSH:
            nowScore = "0.000/s";
            speedY = 3.83;
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


// function getScoreScreen() {
//     keyListener = false;
//     speedY = 17;
//     if (greenTileY >= -12) {
//         updateInterval = false;
//         var gameoverBlockSW = document.getElementById("gameoverBlockwin").style;
//         var gbestp = document.getElementById("gbest");
//         var bestEver = localStorage["best_" + nowMode];
//         if (parseFloat(nowScore) < parseFloat(bestEver)) {
//             localStorage["best_" + nowMode] = nowScore;
//             gbestp.innerHTML = "新纪录";
//             cheerPlay()
//         } else if (bestEver) gbestp.innerHTML = "新纪录 " + bestEver;
//         else {
//             localStorage["best_" + nowMode] = nowScore;
//             gbestp.innerHTML = "新纪录";
//             cheerPlay()
//         }
//         document.getElementById("gscore").innerHTML =
//             nowScore;
//         gameoverBlockSW.transition = "";
//         gameoverBlockSW.opacity = .001;
//         gameoverBlockSW.display = "block";
//         gameoverBlockSW.transition = "opacity ease 500ms";
//         gameoverBlockSW.width = "98px";
//         gameoverBlockSW.height = "148px";
//         setTimeout(function() {
//             var gameoverBlockSW = document.getElementById("gameoverBlockwin").style;
//             gameoverBlockSW.opacity = 1;
//             gameoverBlockSW.width = nCanvasWidth + "px";
//             gameoverBlockSW.height = nCanvasHeight + "px";
//         }, 40)
//     }
// }

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

function showHelp(mode) {
    if (mode == 0) {
        if (!localStorage["help_0"]) {
            document.getElementById("helpDetails").innerHTML = "从最下面黑块开始，<br/>以最快速度达到30个黑块。";
            showPopup("help");
            localStorage["help_0"] = true
        }
    } else if (mode == 1) {
        if (!localStorage["help_1"]) {
            document.getElementById("helpDetails").innerHTML = "从最下面黑块开始，<br/>不要错过一个。";
            showPopup("help");
            localStorage["help_1"] = true
        }
    } else if (mode ==
        2) {
        if (!localStorage["help_2"]) {
            document.getElementById("helpDetails").innerHTML = "30秒内尽可能多的点击黑块。";
            showPopup("help");
            localStorage["help_2"] = true
        }
    } else if (mode == 3) {
        if (!localStorage["help_3"]) {
            document.getElementById("helpDetails").innerHTML = "从最下面黑块开始，<br/>不要错过一个。";
            showPopup("help");
            localStorage["help_3"] = true
        }
    } else if (mode == 4)
        if (!localStorage["help_4"]) {
            document.getElementById("helpDetails").innerHTML =
                '从最下面黑块开始，<br/>在10秒内点击50个黑块，<br/>然后获得新的10秒...';
            showPopup("help");
            localStorage["help_4"] = true
        }
}

function showEndGame() {
    updateInterval = false;
    errorTile = [0, 0, 0, 1];
    keyListener = false;
    pianoPlay("A", 1);
    stopGame();
}

function showPopup(id) {
    var oSize = newSize();
    var popup = document.getElementById(id);
    var popupOverlay = document.getElementById("popupOverlay");
    var iLeft = oSize.w / 2 * 0.2 + 'px' ;
    var iTop = oSize.h / 2 * 0.2 + 'px';
    popup.style.width = oSize.w * 0.8 + 'px';
    popup.style.height = oSize.h * 0.8 + 'px';
    popup.style.top = iTop;
    popup.style.left = iLeft;

    popupOverlay.style.width = oSize.w + 'px';
    popupOverlay.style.height = oSize.h + 'px';

    popup.style.display = "block";
    popupOverlay.style.display = "block";
    setTimeout('document.getElementById("' + id + '").classList.add("show");', 10);
    iOpenedOverlay++;
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
  var widthToHeight = 2 / 3;
  var newWidth = window.innerWidth;
  var newHeight = window.innerHeight;
  var newWidthToHeight = newWidth / newHeight;

  if (newWidthToHeight > widthToHeight) {
      newWidth = newHeight * widthToHeight;
  } else {
      newHeight = newWidth / widthToHeight;
  }
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
      popups[i].style.width = oSize.w + 'px';
      popups[i].style.height = oSize.h + 'px';
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
        propid: props.speed[0].id,
      },
      url: "http://game.weiplus5.com/index.php?m=game&v=buyGameProp",
      xhrFields: { withCredentials: true },
      success: function (data) {
        var status = parseInt(data.status, 10);
        if ( status === -238) {
          window.location.href = "./index.html#/Login";
        }else if (status >= 0 ) {
          speedY = 1;
          tempSpeedY = undefined;

        }else if (status === -205) {
            //not enough coins
            alert("todo not enough coins");
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
  }
  isPause = false;
  hidePopup("magicpopup");
}
function handleOrientation(event) {
  var x = event.beta;  // In degree in the range [-180,180]
  var y = event.gamma; // In degree in the range [-90,90]


  if (iX == undefined) {
    iX = x;
  }
  if (iX - x > 20) {
    iX = x;
    console.log(iX);
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
      propid: props.revive[0].id,
    },
    url: "http://game.weiplus5.com/index.php?m=game&v=buyGameProp",
    xhrFields: { withCredentials: true },
    success: function (data) {
      var status = parseInt(data.status, 10);
      if ( status === -238) {
        window.location.href = "./index.html#/Login";
      }else if (status >= 0 ) {
        againHandler(null, true);
      }else if (status === -205) {
          //not enough coins
          alert("todo not enough coins");
      }
    }
  });
}

window.addEventListener('deviceorientation', handleOrientation);
// document.addEventListener("DOMContentLoaded", DomLoaded, false);
window.addEventListener('resize', resizeGame, false);
// window.addEventListener('load', resizeGame, false);
window.addEventListener('orientationchange', resizeGame, false);
