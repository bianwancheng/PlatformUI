$(function () {

    var chart = null;
// 获取 CSV 数据并初始化图表
    $.getJSON('/get', function (csv) {
        // csv格式：Day,Success（个）,Fail（个）,Loading(个)
        console.log(csv);
        var data = 'Day,'+'Fail,'+'Success,'+'Pending(未执行)'+'\n';
        for(var i=0; i<csv.length; i++){
            // updatetime = csv[i]['updatetime'].split('-');
            // console.log(updatetime)
            // newdate = updatetime[2]+'/'+updatetime[1]+'/'+updatetime[0].substr(2, 3);

            // console.log(csv[i]['updatetime']);
            data += csv[i]['updatetime']+','+csv[i]['Fail']+','+csv[i]['Success']+','+csv[i]['Pending']+'\n'
        }
        console.log(data);
        chart = Highcharts.chart('container', {
            // '3/9/13,5691,4346\n3/10/13,5403,4112\n3/11/13,15574,11356\n3/12/13,16211,11876'
            data: {
                csv: data
            },
            title: {
                text: '执行情况'
            },
            subtitle: {
                text: 'UI自动化测试平台'
            },
            xAxis: {
                tickInterval: 7 * 24 * 3600 * 1000, // 坐标轴刻度间隔为一星期
                tickWidth: 0,
                gridLineWidth: 1,
                labels: {
                    align: 'left',
                    x: 3,
                    y: -3
                },
                // 时间格式化字符
                // 默认会根据当前的刻度间隔取对应的值，即当刻度间隔为一周时，取 week 值
                dateTimeLabelFormats: {
                    week: '%Y-%m-%d'
                }
            },
            yAxis: [{ // 第一个 Y 轴，放置在左边（默认在坐标）
                title: {
                    text: null
                },
                labels: {
                    align: 'left',
                    x: 3,
                    y: 16,
                    format: '{value:.,0f}'
                },
                showFirstLabel: false
            }, {    // 第二个坐标轴，放置在右边
                linkedTo: 0,
                gridLineWidth: 0,
                opposite: true,  // 通过此参数设置坐标轴显示在对立面
                title: {
                    text: null
                },
                labels: {
                    align: 'right',
                    x: -3,
                    y: 16,
                    format: '{value:.,0f}'
                },
                showFirstLabel: false
            }],
            legend: {
                align: 'left',
                verticalAlign: 'top',
                y: 20,
                floating: true,
                borderWidth: 0
            },
            tooltip: {
                shared: true,
                crosshairs: true,
                // 时间格式化字符
                // 默认会根据当前的数据点间隔取对应的值
                // 当前图表中数据点间隔为 1天，所以配置 day 值即可
                dateTimeLabelFormats: {
                    day: '%Y-%m-%d'
                }
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            // 数据点点击事件
                            // 其中 e 变量为事件对象，this 为当前数据点对象
                            click: function (e) {
                                $('.message').html(Highcharts.dateFormat('%Y-%m-%d', this.x) + ':<br/>  访问量：' + this.y);
                            }
                        }
                    },
                    marker: {
                        lineWidth: 1
                    }
                }
            }
        });
    });

});
