/*请在该区域内声明或者获取所要使用的全局变量*/
/********************************************begin************************************/

/*Global Variable Area */
let leftArrow = document.querySelector(".arrow_left");
let rightArrow = document.querySelector(".arrow_right");
let picBox = document.querySelector("div.wrap");
let picHover = document.querySelector("div.container");
let picIndexArr = document.querySelector("div.buttons").children;
let currentIndex = document.querySelector(".on");
let picKey = 1;
let leftMove = function () {
    if (picKey === 0) {
        picKey = 4;
        picBox.style.left = "-2400px";
        currentIndex.className = "";
        currentIndex = picIndexArr[3];
        picIndexArr[3].className = "on";
    } else {
        picKey--;
        picBox.style.left = (-picKey * 600) + "px";
        currentIndex.className = "";
        if (currentIndex.innerHTML == 1) {
            currentIndex = picIndexArr[4];
            currentIndex.className = "on";
        } else {
            currentIndex = picIndexArr[currentIndex.innerHTML - 2];
            currentIndex.className = "on";
        }
    }
};
let rightMove = function () {
    if (picKey === 6) {
        picKey = 2;
        picBox.style.left = "-1200px";
        currentIndex.className = "";
        currentIndex = picIndexArr[1];
        picIndexArr[1].className = "on";
    } else {
        picKey++;
        picBox.style.left = (-picKey * 600) + "px";
        currentIndex.className = "";
        if (currentIndex.innerHTML == 5) {
            currentIndex = picIndexArr[0];
            currentIndex.className = "on";
        } else {
            currentIndex = picIndexArr[currentIndex.innerHTML];
            currentIndex.className = "on";
        }
    }
};
let clock = setInterval(rightMove, 2000);
let editInput = document.createElement("input");
/*********************************************end*************************************/


/* 任务一
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①点击左箭头prev和右箭头next的时候，可以切换到前一张图片和下一张图片。（左右箭头为html中的a标签）
 * ②每切换一张图片，右下角的数字标记对应变化。
 *      如：一开始，第1张图片显示出来，右下角的1-5的数值中，数值1位红色，2-4为绿色，表示当前显示第1张图片。
 *      点击next箭头，图片切换到第2张，同时，右下角红色数值从1切换为2，数值1,3,4,5为绿色。
 * ③当当前图片为第1张时，点击prev箭头，切换到第5张图片，且数值5置为红色。
 * 当当前图片为第5张时，点击next箭头，切换到第1张图片，且数值1置为红色。
 * ④切换图片的过程不要求，可直接切换，也可动画切换，但要求保证一定的切换动画合理性，不能出去明显的衔接不当。
 * ⑤本部分只能使用原生JS。
 */
/********************************************begin************************************/

/*Code Here*/
leftArrow.addEventListener("click", leftMove, false);
rightArrow.addEventListener("click", rightMove, false);

/*********************************************end*************************************/


/* 任务二
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①轮播可以自动播放，切换图片间隔为2s，每一次切换的效果与点击next箭头的效果一致。
 * ②当鼠标移入轮播区域内时，停止自动播放。
 * ③当鼠标不在轮播区域内时，开始自动播放。
 * ④页面刚加载完成时，如果鼠标不在轮播区域内，自动开始自动播放；否则，等待直到鼠标移出轮播区域，再进行自动播放。
 * ⑤本部分只能使用原生JS。
 */
/********************************************begin************************************/

/*Code Here*/
picHover.addEventListener("mouseover", function () {
    clearInterval(clock);
});
picHover.addEventListener("mouseout", function () {
    clock = setInterval(rightMove, 2000);
});


/*********************************************end*************************************/


/* 任务三
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①点击右下角的任意一个数值，能够切换到对应图片，且相应数值变为红色。
 * ②进行①操作过后，是否自动播放，其规则与上一个任务一致。
 * ③本部分只能使用原生JS。
 */
/********************************************begin************************************/

/*Code Here*/
for (let i = 0; i < 5; i++) {
    picIndexArr[i].style.cursor = "pointer";
    picIndexArr[i].addEventListener("click", function () {
        currentIndex.className = "";
        picIndexArr[i].className = "on";
        picKey = i + 1;
        currentIndex = picIndexArr[i];
        picBox.style.left = (-picKey * 600) + "px";
    }, false);
}

/*********************************************end*************************************/


/*任务四
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①点击某一非表头的单元格，可以编辑其内容，编辑完毕后点击其他部位，可以在界面上显示修改后的内容。
 * ②点击单元格后，光标自动定位于单元格的首个字符或者汉字前。
 * ③本部分可以使用jQuery，也可以使用原生JS。
 */
/********************************************begin************************************/

/*Code Here*/

//更改样式
$("table").css({"border-radius": "10px", "margin": "50px auto"});
$("td").css({"width": "200px"});
$("h3").css({"margin": "10px auto", "width": "230px"});
editInput.className = "editInput";
//编辑
let x = true;
$("tr:nth-child(n+2) td").click(function () {
    if (x) {
        let tdContent = this.innerHTML;
        this.innerHTML = "";
        $(this).append(editInput);
        $(this).children("input").focus();
        $(this).children("input").val(tdContent);
        editInput.selectionStart = 0;
        editInput.selectionEnd = 0;
        x = false;
        $(".editInput").css({"width": "98%", "height": "1.0em", "font-size": "1.0em"});
    }
});
editInput.addEventListener("blur",function () {
    this.parentElement.innerHTML = this.value;
    this.remove();
    x = true;
},false);


/*********************************************end*************************************/