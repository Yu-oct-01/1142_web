let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
const gridLength = 100;

//initial
$(function(){
    // 0 : available, 1 : Mountain, 2 : Final Stop, 3 : Enemy, 4 : Tomato
    mapArray = [
        [0, 0, 1, 0, 0, 0, 1, 4],
        [1, 0, 0, 0, 1, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1],
        [3, 0, 1, 1, 1, 1, 0, 2]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");

    currentImgMain = {
        x:0,
        y:0
    };

    const sources = {
        main: "images/spriteSheet.png",
        mountain: "images/material.png",
        enemy: "images/Enemy.png"
    };

    loadImages(sources, function(images) {
        imgMain = images.main;
        imgMountain = images.mountain;
        imgEnemy = images.enemy;

        for (let x = 0; x < mapArray.length; x++) {
            for (let y = 0; y < mapArray[x].length; y++) {
                if (mapArray[x][y] == 1) {
                    ctx.drawImage(imgMountain, 32, 65, 32, 32, y*gridLength, x*gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 2) {
                    // Final stop: 不放置障礙，維持開放格；僅以訊息表示抵達終點
                } else if (mapArray[x][y] == 3) {
                    ctx.drawImage(imgEnemy, 7, 40, 104, 135, y*gridLength, x*gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 4) {
                    // Tomato from material.png (按需求)
                    // 來源 image material.png 內的番茄位置在第3列第1欄 (32x32 格)
                    ctx.drawImage(imgMountain, 0, 64, 32, 32, y*gridLength, x*gridLength, gridLength, gridLength);
                }
            }
        }

        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    });
});

function loadImages(sources, callback) {
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for(var src in sources) {
          numImages++;
        }
        for(var src in sources) {
          images[src] = new Image();
          images[src].onload = function() {
            if(++loadedImages >= numImages) {
              callback(images);
            }
          };
          images[src].src = sources[src];
        }
}

var sources = {
        Enemy: '/Users/yuqilai/1142_web/images/Enemy.png',
        grasses68: '/Users/yuqilai/1142_web/images/grass.png',
        material: '/Users/yuqilai/1142_web/images/material.png',
        spriteSheet: '/Users/yuqilai/1142_web/images/spriteSheet.png',
};

//Click Event
$(document).on("keydown", function(event){
    console.log(event.code);
    let targetImg, targetBlock, cutImagePositionX;
    targetImg = {
        x:-1,
        y:-1
    };
    targetBlock = {
        x:-1,
        y:-1
    };
    event.preventDefault();
    switch(event.code){
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355;
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }

    if(targetImg.x <= 700 && targetImg.x >=0 && targetImg.y <= 500 && targetImg.y >=0){
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    if(targetBlock.x != -1 && targetBlock.y != -1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0:
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1:
                $("#talkBox").text("有山");
                break;
            case 2: // Final Stop
                $("#talkBox").text("抵達終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3: // Enemy
                $("#talkBox").text("哈摟");
                break;
            case 4: // Tomato
                $("#talkBox").text("吃到番茄");
                mapArray[targetBlock.x][targetBlock.y] = 0;
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
        }
    }else{
        $("#talkBox").text("邊界");
    }

    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);

});