window.onload = function () {
        //css纵向排列照片墙.实现瀑布流布局
        fulls("main","box");
        //2.动态加载图片
    window.onscroll = function () {
        if(checkwilllodeimage()){
            //2.1造数据
            var dataArr = [
                {"src":"img02.jpg"},
                {"src":"img04.jpg"},
                {"src":"img06.jpg"},
                {"src":"img08.jpg"},
                {"src":"img10.jpg"},
                {"src":"img12.jpg"},
                {"src":"img14.jpg"},
                {"src":"img16.jpg"},
                {"src":"img18.jpg"},
                {"src":"img20.jpg"},
                {"src":"img22.jpg"}
            ];
            //2.2创建元素
            for(var i = 0;i<dataArr.length;i++)
            {
                var  newbox = document.createElement("div");
                newbox.className = 'box';
                zf('main').appendChild(newbox);

                var  newpic = document.createElement("div");
                newpic.className = 'pic';
                newbox.appendChild(newpic);

                var  newimg = document.createElement("img");
                newimg.src = "下/" + dataArr[i].src;// *
                newpic.appendChild(newimg);
                //重新瀑布流布局
                fulls("main","box");
            }
        }
    }
};
function fulls(parent,child) {
    //css纵向排列照片墙.父盒子居中
    //css纵向排列照片墙.1获取所有的盒子
    var allbox = zf(parent).getElementsByClassName(child);
    //css纵向排列照片墙.2获取盒子的宽度
    var boxwidth = allbox[0].offsetWidth;
    //css纵向排列照片墙.3获取屏幕的宽度
    var screenW = document.documentElement.clientWidth;
    //css纵向排列照片墙.4计算列数
    var list = parseInt(screenW/boxwidth);
    //css纵向排列照片墙.5父盒子居中
    zf(parent).style.width = boxwidth * list + "px";
    zf(parent).style.margin = "0 auto";

    //2、盒子定位
    //2.1定义高度数组
    var heightArr = [],boxheight = 0,minboxheight = 0,minboxIndex = 0;
    //2.2遍历盒子
    for(var i =0;i<allbox.length;i++) {
        boxheight = allbox[i].offsetHeight;
        //2.3取出第一行盒子的高度
        if (i <list ) {//第一行
            heightArr.push(boxheight)
        }else{//剩余行
            //取出最矮的盒子高度
            // minboxheight = Math.min.apply(this.heightArr);了解apply
            // Underscore库
            minboxheight = _.min(heightArr);
            //求出最矮盒子对应的索引
            minboxIndex = MinBoxIndex(heightArr,minboxheight)

            // 3、子盒子定位
            allbox[i].style.position = "absolute";
            allbox[i].style.left = minboxIndex * boxwidth+"px";
            allbox[i].style.top = minboxheight +"px";

            //4.更新数组中的高度
            heightArr[minboxIndex] += boxheight;
        }
    }
}
/**
 * 获取第一行数组中最矮盒子的索引
 * @param arr
 * @param value
 * @returns {number}
 * @constructor
 */
function MinBoxIndex(arr,value) {
    for(var j=0;j<arr.length;j++ ){
        if(arr[j] === value){
            return j;
        }
    }
}
/**
 * 获取id
 * @param id
 * @returns {any}
 */
function  zf(id) {
        return typeof id ==='string'?document.getElementById(id):null;
}

/**
 * 判断是否具备加载图片的条件
 */
function checkwilllodeimage() {
    //获取最后一个盒子
    var allbox = document.getElementsByClassName("box");
    var lastbox = allbox[allbox.length-1];

    //求出最后一个盒子自身的一半 + offsetTop
    var lastboxhalf = lastbox.offsetHeight * 0.5 + lastbox.offsetTop;
    //求出屏幕的高度
    var screenw = document.documentElement.clientHeight || document.body.clientHeight;
    //求出页面偏离游览器的高度
    var scrollTop = scroll().top;
    return lastboxhalf <= screenw + scrollTop;
}
