var person = [
    { name: '刘小华', src: '1.jpg', sex: 'male', des: '漂亮的女孩子' },
    { name: '王花', src: '2.jpg', sex: 'male', des: '漂亮的程序猿' },
    { name: '陈军', src: '3.jpg', sex: 'female', des: '我是一个学霸' },
    { name: '王华', src: '4.jpg', sex: 'female', des: '我喜欢游泳' },
    { name: '陈思思', src: '5.jpg', sex: 'male', des: '我喜欢看电影' },
    { name: '陈学习', src: '6.jpg', sex: 'female', des: '我爸我妈爱学习' },
    { name: '王美丽', src: '7.jpg', sex: 'male', des: '我妈是美丽得妈妈' }
];

//封装防抖函数  debounce()
function debounce(handle,delay) {  //delay 延迟时间  handle  防抖的具体功能函数
    var timer;
    return function () {            //等同于上面的event函数
        var self = this;
        var arg = arguments;        //传入一个形参
        clearTimeout(timer);
        timer = setTimeout(function () {
            handle.apply(self,arg);     //改变this的指向
        },delay)
    }
}

    var listUL = document.getElementById("list");
    var input = document.getElementById("inp");
    var sul = document.getElementById("sex");
render(person);
//渲染dom结构
// forEach  遍历数组
//for in  遍历对象
//渲染提交list架构

// forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。
// 注意: forEach() 对于空数组是不会执行回调函数的。
//可以有三个参数(当前的元素(必须存在的)，index当前元素的索引值，arr当前元素所属的数组对象)
function render(list) {
    var str = '';
    list.forEach(function (ele,index) { //ele 数组中的每个对象
        str += '<li><img src= "img/'+ele.src+'"alt="">\
        <span class="name">'+ele.name+'</span>\
        <span class="des">'+ele.des+'</span></li>';
    });
    listUL.innerHTML = str;
}

//将数据库中的所有数据展示在这
 input.oninput = debounce(event,1000);
     function event() {
    state.text = this.value;
 //   oninput事件  为input绑定事件 然后获取input中的值  oninput 事件在用户输入时触发。
 //     render(filterText(text,person));  //根据input中获取的值进行筛选
        render(addFn(filterFn,person));//接受lastArr  显示出来
};
//filter也是一个常用的操作，它用于把Array的某些元素过滤掉，然后返回剩img的元素
// 和map()类似，Array的filter()也接收一个函数。和map()不同的是，filter()把传入的函数依次作用于每个元素，
// 然后根据返回值是true还是false决定保留还是丢弃该元素。

// map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
// map() 方法按照原始数组元素顺序依次处理元素。
// 注意： map() 不会对空数组进行检测。
// 注意： map() 不会改变原始数组。

 function filterText(val,arr) {//接受的值是谁  然后在那里进行筛选
     var fArr = arr.filter(function (ele,index) {
     //filter()  js中的过滤器
         if(ele.name.indexOf(val)!== -1 ){
             return true;
         }
     });
     return fArr;
     //拿到fArr的结果后在调用render
 }

// indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置

//addEventListener() 方法用于向指定元素添加事件句柄 。能够为指定的对象注册事件处理函数。
sul.addEventListener('click',function (e) {//事件委托
    if(e.target.tagName == 'LI'){//tagName 获取到当前是事件对象的标签名
        state.sex = e.target.getAttribute('sex'); //获取到当前标签的属性
        document.getElementsByClassName("active")[0].className ='';//排他思想   把有的设置为空
        e.target.className = 'active';
        // render(filterSex(sex,person))  //筛选性别的函数   根据上面的点击获取到标签的特性   调用筛选性别的函数
        render(addFn(filterFn,person));//接受lastArr  显示出来
    }
});
//根据上面传的标签的特性 进行判断
function filterSex(sex,arr) {
    if(sex == 'all'){
        return arr;
    }
    else {
       return arr.filter(function (ele,index)
        {
            if(sex == ele.sex)
            {
                return true;
            }
        });
    }
}

// 组合筛选
//思路  筛选过后得出的数组   在点击性别之后  在进行筛选
//lastArr 上一次筛选返回的数组   lastArr的初始值应该是person
//筛选条件：实现筛选条件的函数名
var filterFn ={
    text: filterText,//上面筛选name的函数名
    sex: filterSex//上面筛选性别的函数名
};
//筛选条件：筛选值的属性名  state.text   state.sex
var state = {
    text : '',//上面传img来的name
    sex : 'all'//传img来的性别   默认是all
};

//for in  遍历对象
// for...in循环的是对象的属性；所以便利数组得到的是索引而不是值；所以要遍历数组，可以采用img标循环。
// for...in对Array的循环得到的是String而不是Number。


function addFn(obj,arr) {//  筛选的条件和筛选的数组
    var lastArr = arr;  //这里的arr是形参  总数组传过来
    for(var prop in obj){ //属性名     这里是用prop将obj中的值一次表示出来  同样state中的属性名也可以通过prop传递进去
        lastArr = obj[prop](state[prop],lastArr)   //将上面的函数名拿过来  在这里调用   obj[prop]  拿到obj中的函数名
    }
    return lastArr;
}
//总结  在本次的作业中 我们用到很多知识，用到好多方法，这让我对以前学习的方法又有了一个更新的认识，同时也把没记住的方法重新过了一次
//img来多加练习  不然总是记不住！！