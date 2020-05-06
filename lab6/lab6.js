/*
1.
背景：
    每隔五秒运行一次函数直到某一整分钟停止，比如从20:55:45运行到20:56:00停止；
    或者运行10次，先到的为准。从1开始每过五秒，输入框内数值翻倍。初始值为1。
注意：
    你可以在函数 timeTest内部 和 timeTest外部 写代码使得该功能实现。
要求：
    ①要求使用JS闭包的方式使得计数实现局部私有，不可以在全局区域声明计数变量。
    ②使用console.log打印计数即可，到达一分钟提前停止也需要console.log相应的提示语句。
*/

function testTime(){
    let countNum = 0;
    let output = 1;
    //先输出一次
    console.log(output);
    return function () {
        if(countNum<10){
            countNum++;
            output*=2;
            console.log(output);
            if(output ==1024){
                //全部终止，防止再有输出
                clearInterval(setStopper);
                clearInterval(setRunner);
            }
        }
    }
}
function stopTime(){
    let judge = false;
    return function () {
        //防止在上来就是0秒时的终止，先判断59秒，再判断0秒
        if(new Date().getSeconds() == 59){
            judge = true;
        }
        if(judge&&new Date().getSeconds()==0){
            //达到整数分钟后全部终止
            clearInterval(setRunner);
            console.log("整数分钟到了，提前停止");
            clearInterval(setStopper);
        }
    }
}
let runner = new testTime();
let stopper = new stopTime();
let setRunner = setInterval(runner,5000);
let setStopper = setInterval(stopper,1000);


/*
2.
要求：
    ①能够对传入的、移动手机电话（11位）、邮箱字符串（上网查找其要求）进行正则判定。
    ②使用console.log打印即可，例如，电话不符合要求但是邮箱符合要求，则console.log("The telephone is right and the mail is wrong!")。
    ③邮箱字符串的正则匹配的理解需写入lab文档。
    ④telephone与mail均是字符串。
*/
function testMail(telephone,mail) {
    let judgeT = false;
    let judgeM = false;
    //手机电话
    if(/^1[3456789]\d{9}$/.test(telephone)){
        judgeT = true;
    }
    //邮箱
    if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(mail)){
        judgeM = true;
    }
    if(judgeT&&judgeM){
        console.log("Both are right.");
    }else if(judgeT&&!judgeM){
        console.log("The telephone is right and the mail is wrong.");
    }else if(!judgeT&&judgeM){
        console.log("The mail is right and the telephone is wrong.");
    }else{
        console.log("Both are wrong.");
    }
}

/*
3.
要求：
    ①输入一段全英文语句，要求使用正则表达式找到相邻的重复单词放入一个Set，如果集合中元素超过10个，则按照首字母顺序取前10个于集合。
    ②使用console.log打印即可，将该集合打印出来。
    ③例如：输入"Is is the iS is cost of of gasoline going up up"，输出：Set { 'Is is', 'iS is', 'of of', 'up up' }。
    ④对该函数中用的正则匹配的理解需写入lab文档。
    ⑤str为字符串。
*/
function testRedundancy(str) {
    let set = new Set();
    let words = str.split(/ /);
    //用split分割，依次往后比较，最后一个不用比较，x到数组长度-2停止即可
    for(let x= 0;x<words.length-1;x++){
        if(words[x].toLowerCase() === words[x+1].toLowerCase()){
            set.add(words[x]+" "+words[x+1])
        }
    }
    //用数组sort方法来完成排序
    let u = Array.from(set).sort();
    //若超过10个，那么删除最后的几个
    while(u.length>10){
        u.pop();
    }
    //赋值给新的set
    let set2 = new Set();
    for(let x of u){
        set2.add(x);
    }
    console.log(set2);
}


/*
4.
背景：
    旧键盘上坏了几个键，于是在敲一段文字的时候，对应的字符就不会出现。
    现在给出应该输入的一段文字、以及实际被输入的文字，请你使用Set列出肯定坏掉的那些键。
    例如：输入7_This_is_a_test和_hs_s_a_es    输出：Set { '7', 'T', 'I' }
要求：
    ①需要使用Set。
    ②只能使用一次循环。
    ③使用console.log打印即可，将该集合打印出来。
    ④wantInput和actualInput为字符串。
注意：
    ①注意联系生活，并注意观察我给的上述例子。
*/
function testKeyBoard(wantInput, actualInput) {
    let original = new Set(wantInput.toUpperCase().split(""));
    let actual = new Set(actualInput.toUpperCase().split(""));
    for(let letter of original){
        if(actual.has(letter)){
            original.delete(letter);
        }
    }
    console.log(original);
}


/*
5.
背景：
    给定一个输入英文语句字符串，反转该语句。例如the sky is blue变成blue is sky the。
要求：
    ①如果输入的字符串前后有空格，输出中应该去除前后空格。如果输入字符串中间出现连续的两个空格，输出应该变为一个。
    比如输入是“  hello  world!  ”，输出应该是“world! hello”。
    ②请使用Array。
    ③使用console.log打印即可，将该数组打印出来。
    ④只能显式使用一次循环。
    ⑤str为字符串。
*/
function testSpecialReverse(str) {
    let array = str.split(/\s+/);
    let outArray = new Array(array.length);
    for (let x = 0;x<array.length;x++){
        outArray[x] = array[array.length-1-x];
    }
    //考虑首尾为空字符的情况，若为空格将两种情况的数组边界元素去除
    if(outArray[0] === ""){
        outArray.shift();
    }
    if(outArray[outArray.length-1] ===""){
        outArray.pop();
    }
    console.log("["+outArray.toString()+"]");
}



/*
6.
背景：
    给定一个整数数组和一个值，找出相加为该值的两个元素下标并保存在一个数组中。
    例如给定 [2, 7, 11, 15]和9,
    打印结果为[0,1]
要求：
    ①使用Map。
    ②只能显式使用一次循环。
    ③使用console.log打印即可，将满足条件的数组打印出来。
    ④nums为数字数组，如[1,2,3,4],target为数字,如5，那么输出为
    [ 0, 3 ]
    [ 1, 2 ]
*/

function twoSum(nums, target) {
    let map = new Map();
    for(let i = 0;i<nums.length;i++){
        let couple = target -nums[i];
        if(map.has(couple)){
            console.log("["+map.get(couple)+","+i+"]");
        }
        map.set(nums[i],i);
    }
}



/*
7.
背景：
    打印最长的包含不同字符串的子字符串长度。
要求：
    ①使用Map。
    ②例如：输入"abbbbb",输出2，输入"bbbbb",输出1；
    ③只能显式使用一次循环。
    ④使用console.log打印即可。
    ⑤str为字符串。
*/
function lengthOfLongestSubstring(str) {
    let map = new Map();
    let maxSubLength = 1;
    let start = 0;
    for(let examinedKey = 0;examinedKey<str.length;examinedKey++){
        let currentLetter = str.charAt(examinedKey);
        //出线了新字母，或者旧字母已经不在现在考察的序列中
        if(!map.has(currentLetter)||map.get(currentLetter)<start){
            //不重置起始点，有效的增加了长度，并更新map对应的值
            map.set(currentLetter,examinedKey);
            maxSubLength=Math.max(maxSubLength,examinedKey+1-start);
        }else{
            //并未增加长度，需要将重制点从原出现字符后移一个
            start = map.get(currentLetter)+1;
            map.set(currentLetter,examinedKey);
        }
    }
    console.log(maxSubLength);
}


/*
8.
背景：
    该部分只是为了让你们自己动动手更好地感受不同继承方式。
要求：
    ①借助构造函数、原型链、和Object.create分别编写DevelopingCountry、PoorCountry、DevelopedCountry以实现对Country的继承，
    并在三者分别添加sayHi、saySad、sayHappy函数分别打印"Hi,i am a developing country."、"I am a sad poor country."、"I am a Happy developed country."
    ②请调用他们并打印相关语句即可。
*/
function Country() {
    this.name = "国家";
}
//构造函数call
function DevelopingCountry() {
    Country.call(this);
}
DevelopingCountry.prototype.sayHi = function () {
    return "Hi,I am a developing country.";
};
//原型链继承
function PoorCountry() {
}
PoorCountry.prototype = new Country();
PoorCountry.prototype.saySad = function () {
    return "I am a sad poor country";
};
//create方法继承
function DevelopedCountry() {
}
DevelopedCountry.prototype = Object.create(new Country(),{
});
DevelopedCountry.prototype.sayHappy = function(){
    return "I am a happy developed country."
};

let developingCountry = new DevelopingCountry();
let poorCountry = new PoorCountry();
let developedCountry = new DevelopedCountry();
console.log(developingCountry.sayHi());
console.log(poorCountry.saySad());
console.log(developedCountry.sayHappy());
