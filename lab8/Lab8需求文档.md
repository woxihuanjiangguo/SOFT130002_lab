# Lab08设计文档
## 基本信息
姓名：李臻欣  
学号：19302010007  
github地址：https://github.com/woxihuanjiangguo/SOFT130002_lab  
## 设计思路
### 问题一
主要是给左右两个箭头增加点击事件。其中事件函数先做出判断，是否为边缘的图片，如果是则直接给左边距赋上移动后的对应值，同时改变数字下标的 ".on"类，从而改变其css样式
。如果不是边缘的图片，则对图片的序号进行加一或者减一即可。由于图片的容器内有七张图片，数字下标有五个，所以需要分别考虑。
```javascript
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
```
### 问题二
给图片的容器增加了两个事件，一个为mouseover,另一个为mouseout。前者触发一个清除计时器的clearInterval函数，后者则给计时器setInterval。计时器中的函数与右箭头相同。
```javascript
picHover.addEventListener("mouseover", function () {
    clearInterval(clock);
});
picHover.addEventListener("mouseout", function () {
    clock = setInterval(rightMove, 2000);
});
```
### 问题三
先设置了数字下标hover时的样式，改为pointer。再给每个数字下标增加点击事件，触发函数为更改".on"类的下标与左侧边距，以调出新的图片。
```javascript
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
```
### 问题四
1.先设置了表格的样式，使之居中。用到了jQuery，选择器为"tr:nth-child(n+2) td",定位非表头的单元格。给其设置一个点击事件，将全局变量input输入框增加为单元格的子节点，同时先获取单元格的innerHTML再清除，以赋给input框的value值。  
2.随后为定位光标问题，先使用了focus(),再用输入框的selectionStart与selectionEnd属性以将光标置于开始位置。
3.其中布尔值x设定了点击只能点击一次，避免在修改时由于点击造成更改。  
4.然后给输入框增加了blur事件，将x更新为true，移除输入框，给单元格重新赋值。
```javascript
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
```