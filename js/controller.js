/**
 *  backgroundColor: 'rgba(2, 8, 19, 0.8)',
    plotBackgroundColor: 'rgba(2,9,10,0.8)',
    height: $('.sellContent .col-md-6').width()*0.9
    0.28
 */

var bgColor = 'rgba(2, 8, 19, 0.8)';
var plotBgColor = 'rgba(2,9,10,0.2)';
 var vm = new Vue({
     el: "#main",
     data: {
        "salesmanNum":{
            "title": "业务员销售台数TOP5",
            "name": ["陈雪梅", "李娜", "吴水婷", "苏国志", "周秋平"],
            "series": [365, 331, 255, 214, 123]
        }
     }
 })

//分公司销售台数TOP5
    var filiale = bar('filiale',{
    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
    stops: [
        [0, 'rgba(17,183,139,0)'],
        [1, 'rgb(17,183,139)']
    ]
  });
  //业务员销售台数TOP5
  var salesmanNum = bar('salesmanNum',{
    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
    stops: [
        [0, 'rgba(237,187,47,0)'],
        [1, 'rgb(237,187,47)']
    ]
  });
  //销售部销售台数排名TOP5
  var departments = bar('departments',{
    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
    stops: [
        [0, 'rgba(237,84,72,0)'],
        [1, 'rgb(237,84,72)']
    ]
  });
  //业务员业绩金额排名TOP5
  var salesmanPerformance = bar('salesmanPerformance',{
    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
    stops: [
        [0, 'rgba(39,170,225,0)'],
        [1, 'rgb(39,170,225)']
    ]
  });
  //条形图
  function bar(name,colour){
    var chart =  new Highcharts.Chart(name, {// 图表初始化函数，其中 container 为图表的容器 div               
        chart: {
            type: 'bar',                           //指定图表的类型，默认是折线图（line）
            backgroundColor: bgColor,
            plotBackgroundColor: plotBgColor,
            height: 208,
            //height: $('.sellContent .col-md-6').width()*0.9,
            spacing: [0,0,0,0]
        },
        title: null,
        series: [{                                 //指定数据列
            data: [365, 331, 255, 214, 123],                        //数据
            color: colour
        }],
        xAxis: {
            categories: ["陈雪梅", "李娜", "吴水婷", "苏国志", "周秋平"],   //指定x轴分组
            tickWidth: 0,
            lineWidth: 0,
            labels: {
                style: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            title: {
                text: null                //指定y轴的标题
            },
            labels: {
                enabled: false,
            },
            gridLineWidth: 0
        },
        legend: {
            enabled: false
         },
        plotOptions: {
            series: {
                borderWidth: 0, 
                shadow: false
            },
            bar: {
                dataLabels: {
                    enabled: true,
                    // verticalAlign: 'top', // 竖直对齐方式，默认是 center
                    inside: true
                }
            }
        },
        credits:{
            enabled:false // 禁用版权信息
       }
    });
    return chart;
}
  
//饼图
var brandSell = new Highcharts.Chart('brandSell',{
    chart: {
        type: 'pie',
        backgroundColor: bgColor,
        plotBackgroundColor: plotBgColor,
        height: 370,
        margin: [0,0,0,0],
        spacing: [0,0,0,0]
    },
    title: {
        floating:true,
        text: '本年品牌总数',
        style: {
            fontSize: '12px',
            color: '#fff'
        }
    }, 
    plotOptions: {
        pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    formatter:function(){
                        return this.point.name+'<br>'+this.point.percentage.toFixed(2)+"%";
                      },
                }
            }
    },
    series: [{
        name: '销售台数',
        size: '100%',
        innerSize: '50%',
        cursor: 'pointer',
        events: {
            click: function (event) {
                var arr = [
                    [event.point.name,event.point.y],
                    ['其他',event.point.total-event.point.y]
                ]
                brandSell.series[1].setData(arr);
                var arr1 = [
                    [event.point.name,event.point.y],
                    ['其他',vm.data.brand.total-event.point.y]
                ]
                sellNum.series[0].setData(arr1);
                var arr2 = [
                    [event.point.name,vm.data.brand.data[event.point.index][2]],
                    ['其他',vm.data.brand.totalMoney-vm.data.brand.data[event.point.index][2]]
                ];
                moneyNum.series[0].setData(arr2);
            }
        },
        data: [
            ["上海通用雪弗兰", 854, 35000],
            ["上海通用别克", 723, 25000],
            ["东风标致", 561, 45000],
            ["东风风神", 426, 15000],
            ["东南汽车", 408, 35000]
        ]
    },{
        name: '百分比',
        size: '35%',
        innerSize: '75%',
        data: [
            ['上海通用雪弗兰', 854],
            ['其他', 723]
        ],
        dataLabels: {
            enabled: false
        },
        startAngle: -120,
        endAngle: 120  
    }],
    credits:{  
        enabled:false // 禁用版权信息  
   }  
}, function(c) {
    // 环形图圆心
    var centerY = c.series[0].center[1],
        titleHeight = parseInt(c.title.styles.fontSize);
    c.setTitle({
        y:centerY + titleHeight/2
    });
    chart = c;
});

var sellNum = new Highcharts.Chart('sellNum',{
    chart: {
        type: 'pie',
        backgroundColor: bgColor,
        plotBackgroundColor: plotBgColor,
        margin: [0,0,0,0],
        spacing: [0,0,0,0],
        height: $('#brandSell').height()*0.5
    },
    title: {
        floating:true,
        text: '销售总台数',
        style: {
            fontSize: '12px',
            color: '#fff'
        }
    }, 
    plotOptions: {
        pie: {
                dataLabels: {
                    enabled: false
                }
            }
    },
    series: [{
        name: '销售台数',
        size: '100%',
        innerSize: '70%',
        data: [
            ["上海通用雪弗兰", 854, 35000],
            ["其他", 723, 25000]
        ],
        startAngle: -120,
        endAngle: 120
    }],
    credits:{  
        enabled:false // 禁用版权信息  
   }  
}, function(c) {
    // 环形图圆心
    var centerY = c.series[0].center[1],
        titleHeight = parseInt(c.title.styles.fontSize);
    c.setTitle({
        y:centerY + titleHeight/2
    });
    chart = c;
});


var moneyNum = new Highcharts.Chart('moneyNum',{
    chart: {
        type: 'pie',
        backgroundColor: bgColor,
        plotBackgroundColor: plotBgColor,
        margin: [0,0,0,0],
        spacing: [0,0,0,0],
        height: $('#brandSell').height()*0.5
    },
    title: {
        floating:true,
        text: '业绩总金额',
        style: {
            fontSize: '12px',
            color: '#fff'
        }
    }, 
    plotOptions: {
        pie: {
                dataLabels: {
                    enabled: false
                }
            }
    },
    series: [{
        name: '销售金额',
        size: '100%',
        innerSize: '70%',
        data: [
            ["东风风神", 426, 15000],
            ["其他", 408, 35000]
        ],
        startAngle: -120,
        endAngle: 120
    }],
    credits:{  
        enabled:false // 禁用版权信息  
   }  
}, function(c) {
    // 环形图圆心
    var centerY = c.series[0].center[1],
        titleHeight = parseInt(c.title.styles.fontSize);
    c.setTitle({
        y:centerY + titleHeight/2
    });
    chart = c;
});

//中间折线图
var lineCharts = new Highcharts.Chart('carTypeTrend',{
    chart: {
        zoomType: 'x',
        backgroundColor: bgColor,
        plotBackgroundColor: plotBgColor,
        height: 208,
        //height: $('#salesmanNum').height(),
        spacing: [0,0,0,0]
    },
    title: {
        text: null
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%m-%d',
            week: '%m-%d',
            month: '%Y-%m',
            year: '%Y'
        }
    },
    tooltip: {
        dateTimeLabelFormats: {
            millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%Y-%m-%d',
            week: '%m-%d',
            month: '%Y-%m',
            year: '%Y'
        }
    },
    yAxis: {
        title: {
            text: null                //指定y轴的标题
        },
        labels: {
            enabled: false,
        },
        gridLineWidth: 0
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            color: '#e8377a',
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, '#e8377a'],
                    [1, 'rgba(232,55,122,0)']
                ]
            },
            marker: {
                symbol: 'circle',
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: null 
        }
    },
    series: [{
        type: 'areaspline',
        name: '车型销售趋势',
        data: [337,337,337,225,226,442,551,77,668,123],
        
    }],
    credits:{
        enabled:false // 禁用版权信息
   }
});

var weekSellNumTrend = splineCharts('weekSellNumTrend',208,'rgb(39,170,220)');
var sellNumTrend = splineCharts('sellNumTrend',155,'rgb(17,183,139)');
var performanceTrend = splineCharts('performanceTrend',155,'rgb(237,187,47)');
//折线图
function splineCharts(id,heightMath,color){
    var splineCharts = new Highcharts.Chart(id, {
        chart: {
            type: 'spline',
            backgroundColor: bgColor,
            plotBackgroundColor: plotBgColor,
            height: heightMath,
            spacing: [0,0,0,0]
        },
        title: {
            text: null
        },
        xAxis: {
            tickWidth: 0,
            lineWidth: 0,
            labels: {
                style: {
                    color: '#fff'
                }
            },
            categories: ['Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun', 'Mon']
        },
        yAxis: {
            title: {
                text: null                //指定y轴的标题
            },
            labels: {
                enabled: false,
            },
            gridLineWidth: 0
        },
        plotOptions: {
            spline: {
                    dataLabels: {
                        enabled: true,
                        color: '#fff'
                    }
                }
        },
        legend: {
            enabled:false
        },
        series: [{
            name: '销售台数',
            data: [377,524,266,337,541,222,111],
            color: color
        }],
        credits:{
            enabled:false // 禁用版权信息
       }
    });
    return splineCharts;
}

// 柱状图
var weekActivity = col('weekActivity');
var monthActivity = col('monthActivity');
function col(id){
    var col = Highcharts.chart(id, {
        chart: {
            type: 'column',
            backgroundColor: bgColor,
            plotBackgroundColor: plotBgColor,
            height: 190,
            //height: $('.sellContent .col-md-6').width()*0.9,
            spacing: [0,0,0,0]
        },
        title: null,
        legend: {
            enabled: false
         },
        xAxis: {
            categories: ['发帖数量','客户回访','微信点击量'],
            tickWidth: 0,
            lineWidth: 0,
            labels: {
                style: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            title: {
                text: null                //指定y轴的标题
            },
            labels: {
                enabled: false,
            },
            gridLineWidth: 0
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true,
                    // verticalAlign: 'top', // 竖直对齐方式，默认是 center
                    inside: true,
                    color: '#fff'
                }
            }
        },
        series: [{
            borderWidth: 0, 
            shadow: false,
            data: [29.9, 71.5, 106.4],
            color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, 'rgba(237,84,72,0)'],
                    [1, 'rgb(237,84,72)']
                ]
              }
        }],
        credits:{
            enabled:false // 禁用版权信息
       }
    });
    return col;
}
var weekCustome = funnel('weekCustome');
var monthCustome = funnel('monthCustome');
function funnel(id){
    var funnel = new Highcharts.Chart(id,{
        chart: {
            type: 'funnel',
            backgroundColor: bgColor,
            plotBackgroundColor: plotBgColor,
            height: 270,
            spacing: [0,0,0,0],
            marginRight: 70
        },
        title: {
            text: null
        },
        plotOptions: {
            series: {
                dataLabels: {
                    connectorWidth: 0,
                    distance: 0,
                    enabled: true,
                    format: '<b>{point.name}</b> ({point.y:,.0f})',
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                    softConnector: true
                },
                neckWidth: '0%',//漏斗图设置成倒金字塔
                neckHeight: '0%'//漏斗图设置成倒金字塔
            }
        },
        legend: {
            // layout: 'horizontal', // default
            itemDistance: 50
        },
        series: [{
            name: '当周营销分类',
            data: [
                ['意向客户',       3064],
                ['客户上门量', 1987],
                ['订单量',    976],
                ['成交量（周）',    846]
            ]
        }],
        credits:{
            enabled:false // 禁用版权信息
       }
    });
    return funnel;
}

var modelTrend = Highcharts.chart('modelTrend', {
    chart: {
        type: 'column',
        backgroundColor: bgColor,
        plotBackgroundColor: plotBgColor,
        height: 245,
        spacing: [0,0,0,0]
    },
    title: null,
    legend: {
        enabled: false
     },
    xAxis: {
        categories: ['8月第一周'],
        tickWidth: 0,
        lineWidth: 0,
        labels: {
            style: {
                color: '#fff'
            }
        }
    },
    yAxis: {
        title: {
            text: null                //指定y轴的标题
        },
        labels: {
            enabled: false,
        },
        gridLineWidth: 0
    },
    plotOptions: {
        series: {
            allowPointSelect: true,
            borderWidth: 0, 
            shadow: false
        },
        column: {
            dataLabels: {
                enabled: true,
                verticalAlign: 'top', // 竖直对齐方式，默认是 center
                inside: true
            }
        }
    },
    series: [{
        data: [64.313],
        color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
                [0, 'rgba(39,170,225,0)'],
                [1, 'rgb(39,170,225)']
            ]
          }
    }],
    credits:{
        enabled:false // 禁用版权信息
   }
});

postData();


function postData(bool){
    $.ajax({
        url: 'data.json',
        type: 'post',
        cache: false,
        success: function(d){
            vm.data = d;
            filiale.update({                
                xAxis: {
                    categories: vm.data.filiale.name,   //指定x轴分组
                },
                series: [{                                 //指定数据列
                    data: vm.data.filiale.series
                }]
            });
            salesmanNum.update({        
                xAxis: {
                    categories: vm.data.salesmanNum.name,   //指定x轴分组
                },
                series: [{                                 //指定数据列
                    data: vm.data.salesmanNum.series
                }]
            })
            departments.update({
                xAxis: {
                    categories: vm.data.salesmanNum.name,   //指定x轴分组
                },
                series: [{                                 //指定数据列
                    data: vm.data.salesmanNum.series
                }]
            })
            salesmanPerformance.update({
                xAxis: {
                    categories: vm.data.salesmanNum.name,   //指定x轴分组
                },
                series: [{                                 //指定数据列
                    data: vm.data.salesmanNum.series
                }]
            })
            brandSell.update({
                series: [{
                    data: vm.data.brand.data
                }]
            })
            sellNum.update({
                series: [{
                    data: [
                        vm.data.brand.data[0],
                        ['其他', vm.data.brand.total-vm.data.brand.data[0][1]]
                    ]
                }]
            })
            moneyNum.update({
                series: [{
                    data: [
                        [vm.data.brand.data[0][0],vm.data.brand.data[0][2]],
                        ['其他', vm.data.brand.totalMoney-vm.data.brand.data[0][2]]
                    ]
                }]
            })
            setTimeout(postData,1000);
        },
        error: function(e){
            //console.log(e);
            console.log("error");
        }
    });
}