var myBarChart = echarts.init($('.box1')[0]);
var myPieChart = echarts.init($('.box2')[0]);
var endData;
getData("./data.txt");
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,//当前请求的路径
        success: function (data) {
            var data = JSON.parse(data);//将字符串变为data类型
            //将data中每一位按照num属性进行排序
            endData = data.sort(compare("num")); //这个参数为一个属性值  比如说按照num进行比较   如果换age的话  直接就将num换为age
            //sort会改变原数组
            getBer(data);

        },
        error: function () {
            alert("error");
        }
    })
};
//比较函数
function compare(pro) {//根据数组中每一位的传入的属性进行排序
    return function (a, b) {  //传入两个对象   分别代表数组中的每一位(对象)
        return a[pro] - b[pro];//根据对象里面的num属性进行排序
    }
}
//实现柱形图
function getBer(data) {
    // console.log(data);
    //根据每一年的总数num进行排序的数据
    var option = {
        title: {
            text: "2016~2018",
            subtext: "果之源水果"
        },
        legend: {
            data: ['销量']
        },
        yAxis: {

        },
        xAxis: {
            data: []
        },
        series: [{
            data: [],
            type: 'bar'
        }]

    };
    data.forEach(function (ele, index) {
        option.xAxis.data[index] = ele.name;
        option.series[0].data[index] = ele.num;
    });
    myBarChart.setOption(option);
    myBarChart.on('click', function (param) {//这里的function中的param返回echarts的所有信息  
        //通过这个可以获取点击的数据的index  还有数据的参数
        console.log(param);
        getPie(param);
    })

};
function getPie(param) {
    var option = {
        title: {
            text: "2016~2018",
            subtext: "果之源水果",
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: []
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    var data = endData[param.dataIndex].year;//拿到数组中的year数组  这里的dataindex是param里面的属性：索引值
    data.forEach(function (ele, index) {//遍历year数组
        var obj = {};
        obj.value = ele.num;
        obj.name = ele.y
        option.legend.data.push(ele.y);
        option.series[0].data.push(obj);
    });
    myPieChart.setOption(option);
}

