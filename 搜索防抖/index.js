var oInp = document.getElementById('inp');
// var timer;
// // 绑定事件
// oInp.oninput = event;
// //执行函数
// function event(){
//     var self = this;//解决this指向的问题
//     clearTimeout(timer);//清除延时器
//     timer = setTimeout(function () {
//         console.log(self.value);
//     },1000);
// }

//封装防抖函数  debounce()
 function debounce(handle,delay) {  //delay 延迟时间  handle  防抖的具体功能函数
     var timer;
    return function () {            //等同于上面的event函数
        var self = this;
        var arg = arguments;        //传入一个形参
        clearTimeout(timer);
        timer = setTimeout(function () {
            handle.apply(self,arg);     //改变this的指向  这里传入一个形参的原因是用apply是必须要传一个形参 发放在数组里  没有实际的用处
        },delay)
    }

     // Function.apply(obj,args)方法能接收两个参数
     // obj：这个对象将代替Function类里this对象
     // args：这个是数组，它将作为参数传给Function（args-->arguments）
     //
     //     call:和apply的意思一样,只不过是参数列表不一样.
     //
     //     Function.call(obj,[param1[,param2[,…[,paramN]]]])

 }
 function event() {
     console.log(this.value);
 }
oInp.oninput = debounce(event,1000);