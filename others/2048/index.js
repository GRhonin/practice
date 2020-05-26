// 按钮初始化
let startBtn = document.querySelector('.restart');
startBtn.onclick = function(){
    // 鼠标按下和弹起时的样式变化
    startBtn.onmousedown = function (){
        startBtn.style.background = "#ffffff";
    };
    startBtn.onmouseup = function(){
        startBtn.style.background = "#cccccc";
    };
    // 清空屏幕并重新渲染页面
    setEmpty();
    getEmptyCol();
    getEmptyCol();
}
// 键盘事件
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==37){ 
        countRows('left');
        // 屏蔽按键默认事件
        return false; 
    }
    if(e && e.keyCode==38){
        countCols('up');
        return false;
    }            
    if(e && e.keyCode==39){
        countRows('right');
        return false;
    }
    if(e && e.keyCode==40){
        countCols('down');
        return false;
    }
    return;
};
// 横向移动计算
function countRows(direct){
    let rows = document.getElementsByClassName('rows');
    let temp = []; // 存放整个页面cols的二维数组，
    let numList = []; // 存放整个页面数字的二维数组
    for(let i=0;i<rows.length;i++){
        let childCols = [];
        let childNums = [];
        for(let j=0;j<rows[i].children.length;j++){
            childCols.push(rows[i].children[j])
            if(rows[i].children[j].children && rows[i].children[j].children.length){
                let number = rows[i].children[j].children[0].innerHTML * 1;
                childNums.push(number);
            }
        }
        temp.push(childCols);
        numList.push(childNums);
    }
    let res = move(numList, direct);
    // res是结果数组
    // 根据结果数组重新渲染页面
    rendering(direct,temp,res);
};
// 纵向移动计算
function countCols (direct){
    let rows = document.getElementsByClassName('rows');
    let temp = [[],[],[],[]];
    let tempDom = [];
    for(let i=0;i<rows.length;i++){
        let childCols = [];
        for(let j=0;j<rows[i].children.length;j++){
            childCols.push(rows[i].children[j]);
            if(rows[i].children[j].children && rows[i].children[j].children.length){
                temp[j][i] = rows[i].children[j].children[0].innerHTML * 1;
            }
        }
        tempDom.push(childCols);
    }
    let numList = [];
    for(let i=0;i<temp.length;i++){
        let arr = [];
        if(temp[i].length){
            for(let j=0;j<temp[i].length;j++){
                if(temp[i][j]){
                    arr.push(temp[i][j]);
                }
            }
        }
        numList[i] = arr;
    }
    let res = move(numList,direct);
    rendering(direct,tempDom,res);
}
function rendering(direct,temp,res){
    setEmpty();
    if(direct == 'right'){
        for(let i=0;i<res.length;i++){
            if(res[i] && res[i].length){
                for(let j=0;j<res[i].length;j++){
                    let num = res[i][res[i].length-1-j];
                    let block = document.createElement('div');
                    block.innerHTML = num;
                    block.setAttribute('class', `block num${num}`);
                    temp[i][3-j].appendChild(block);
                }
            }
        }
    }
    if(direct == 'left'){
        for(let i=0;i<res.length;i++){
            if(res[i] && res[i].length){
                for(let j=0;j<res[i].length;j++){
                    let num = res[i][j];
                    let block = document.createElement('div');
                    block.innerHTML = num;
                    block.setAttribute('class', `block num${num}`);
                    temp[i][j].appendChild(block);
                }
            }
        }
    }
    if(direct == 'up'){
        for(let i=0;i<res.length;i++){
            if(res[i] && res[i].length){
                for(let j=0;j<res[i].length;j++){
                    let num = res[i][j];
                    let block = document.createElement('div');
                    block.innerHTML = num;
                    block.setAttribute('class', `block num${num}`);
                    temp[j][i].appendChild(block);
                }
            }
        }
    }
    if(direct == 'down'){
        for(let i=0;i<res.length;i++){
            if(res[i] && res[i].length){
                for(let j=0;j<res[i].length;j++){
                    let num = res[i][res[i].length-1-j];
                    let block = document.createElement('div');
                    block.innerHTML = num;
                    block.setAttribute('class', `block num${num}`);
                    temp[3-j][i].appendChild(block);
                }
            }
        }
    }
    // 移动完之后生成新的元素
    getEmptyCol();
};

// 找到空白的cols，随机向里面插入元素
function getEmptyCol(){
    let arr = []; // 存放dom元素的数组
    let temp = document.getElementsByClassName('cols');
    for(let i=0;i<temp.length;i++){
        if(!temp[i].innerHTML){
            arr.push(temp[i]);
        }
    }
    // 判断是否结束游戏
    if(!arr.length){
        alert('游戏结束！');
        return;
    }
    // arr获取完成 生成随机数
    let ranX = Math.floor(Math.random() * arr.length);
    // 生成元素并插入
    let block = document.createElement("div");
    // 生成的元素随机置入数字
    let ranNum = Math.floor(Math.random() * 2) + 1;
    // 根据不同的内容设置不同的颜色
    block.setAttribute('class', `block num${2**ranNum}`)
    block.innerHTML = 2 ** ranNum;
    arr[ranX].appendChild(block);
};
// 清空整个屏幕
function setEmpty(){
    let temp = document.getElementsByClassName('cols');
    for(let i=0;i<temp.length;i++){
        temp[i].innerHTML = '';
    }
};
// 游戏初始化：
setEmpty();
// 先生成两个数字 
getEmptyCol();
getEmptyCol();
function move(arr, direction) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length) {
            let temp = []; // 空数组存放新数组
            let isAdd = false; // 标记temp最后一个数字是否为加起来的
            if (direction == 'left' || direction == 'up') {
                for (let j = 0; j < arr[i].length; j++) {
                    if (!temp.length || (temp[temp.length - 1] != arr[i][j])) {
                        temp.push(arr[i][j]);
                        isAdd = false;
                    } else {
                        if (isAdd) {
                            temp.push(arr[i][j]);
                            isAdd = false;
                        } else {
                            temp[temp.length - 1] = arr[i][j] * 2;
                            isAdd = true;
                        }
                    }
                }
            } else if (direction == 'right' || direction == 'down') {
                for (let j = arr[i].length - 1; j > -1; j--) {
                    if (!temp.length || (temp[0] != arr[i][j])) {
                        temp.unshift(arr[i][j]);
                        isAdd = false;
                    } else {
                        if (isAdd) {
                            temp.unshift(arr[i][j]);
                            isAdd = false;
                        } else {
                            temp[0] = arr[i][j] * 2;
                            isAdd = true;
                        }
                    }
                }
            }
            arr.splice(i, 1, temp);
        }
    }
    return arr;
}