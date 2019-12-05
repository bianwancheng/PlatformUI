/********************************************************************************
 * Copyright (C) Corporation. All rights reserved.
 *
 * Author      :  lihaitao
 * Email        : lhtzbj12@126.com
 * Create Date  : 2017-01-19
 * Description  : 分页导航插件
 * Version      : V1.4
 *
 * Revision History:
 *      Date         Author               Description
 *      2017-01-19   lihaitao               增加了loop属性，上一页下一页无限循环，页数为0时不显示导航，页数为1时不显示首末页上下一页
 *      2016-12-29   lihaitao               重新整理调整结构和样式
 *      2016-12-26   lihaitao               增加了是否显示首页末页、上一页下一页、快速跳转
 *      2016-12-25   lihaitao               独立出来，成为一个完整的插件
 *      2016-06-20   lihaitao               为了与boostrap metro 简单兼容
 *      2015-09-16   lihaitao               create
 *
 *********************************************************************************
 //分页导航插件
 //调用实例 #PagerContainer3 为页面里的div
 $("#PagerContainer3").sdpagination({
        boxClass: "sdpagination",                         //生成的容器的class，再后面的追加sdpagination-large、sdpagination-small、sdpagination-mini
        totalCount: parseInt('@ViewBag.TotalCount'),      //总条数
        pageSize: parseInt('@ViewBag.PageSize'),          //每页显示
        pageIndex: parseInt('@ViewBag.PageIndex'),        //当前页数
        preText: '上页',                                  //上一页按钮显示的字符
        nextText: '下页',                                 //下一页按钮显示的字符
        firstText: '首页',                                //首页按钮显示的字符
        lastText: '末页',                                 //末页按钮显示的字符
        showNearby: 3,                                    //当前按钮前后按钮数
        infoTemplet: '每页{pageSize} 共{totalCount} 当前{pageIndex}/{pageCount}',//自定义信息模板
        pageList: [5, 10, 20],                            //设置PageSize下拉框的选择项，
        loop:true,                                        //上一页下一页是否循环
        onPageIndexChange: function (pageIndex, pageSize) { //回调，点击按钮时或者输入页时调用，回调参数为 新页数、PageSize
            //页数变化了，该干点啥，
            $("#PageIndex").val(pageIndex);
            $("#searchForm").submit();
        },
        onPageSizeChange: function (pageSize) {         //回调，当在PageSize下拉框里选择时调用，回调参数为 新PageSize
            //pageSize变化了，该干点啥，                //注意，分页信息里要显示PageSize的值，同时设置了onPageSizeChange回调时，才会出现PageSize下拉框
            $("#PageIndex").val(1);
            $("#PageSize").val(pageSize);
            $("#searchForm").submit();
        },
        onPageIndexOutOfRange:function(pageIndex,pageCount){//回调，当pageIndex>pageCount或者pageCount>0&&pageIndex=0时调用，回调参数为 pageIndex、pageCount
            //pageIndex越界
            alert('PageIndex out of Range')
        }
    });
 */
(function ($) {
    var getPageSizeSelect = function (setttings) {
        var select = '<select class="pageSize">';
        //遍历添加的同时，判断新传入的PageSize是否在pageList里不在则添加
        var exists = 0;
        for (var i = 0; i < setttings.pageList.length; i++) {
            select += '<option value="' + setttings.pageList[i] + '">' + setttings.pageList[i] + '</option>';
            if (setttings.pageList[i] === setttings.pageSize)
                exists = 1;
        }
        if (exists === 0) {
            select += '<option value="' + setttings.pageSize + '">' + setttings.pageSize + '</option>';
        }
        select += '</select>';
        return select;
    };
    ///拼接 信息显示区的代码
    var getInfoHtml = function (settings) {
        var pageSizeObj = settings.pageSize;
        //如果传入了onPageSizeChange回调
        if (typeof (settings.onPageSizeChange) !== 'undefined') {
            pageSizeObj = getPageSizeSelect(settings);
        }
        //拼接信息显示
        return settings.infoTemplet.replace('{pageSize}', pageSizeObj).replace('{totalCount}', settings.totalCount).replace('{pageIndex}', settings.pageIndex).replace('{pageCount}', settings.pageCount);
    }
    ///拼接 首页、上一页的代码
    var getFirstPreHtml = function (settings) {
        var html = '';
        if (settings.pageIndex > 1) {
            //如果设置显示首页末页
            if (settings.showFirstLast && settings.pageCount > 1) {
                html += '<li><a data-pageNum="1" >' + settings.firstText + '</a></li>';
            }
            //如果设置显示上一页、下一页
            if (settings.showPreNext && settings.pageCount > 1) {
                html += '<li><a data-pageNum="' + (settings.pageIndex - 1) + '" >' + settings.preText + '</a></li>';
            }
            //如果设置不显示首页末页，且pageCount>0,则显示数字1
            if (!settings.showFirstLast && settings.pageCount > 0) {
                html += '<li><a data-pageNum="1" >1</a></li>';
            }
        } else {
            //如果设置显示首页末页
            if (settings.showFirstLast && settings.pageCount > 1)
                html += '<li class="disabled"><a>' + settings.firstText + '</a></li>';
            //如果设置显示上一页、下一页
            if (settings.showPreNext && settings.pageCount > 1) {
                if (settings.loop == true) {
                    html += '<li><a data-pageNum="' + settings.pageCount + '">' + settings.preText + '</a></li>';
                } else {
                    html += '<li class="disabled"><a>' + settings.preText + '</a></li>';
                }
            }
            //如果设置不显示首页末页，且pageCount>0 则显示数字1，特例pageCount==1，而pageIndex=0时不显示
            if (!settings.showFirstLast && settings.pageCount > 0 && !(settings.pageCount === 1 && settings.pageIndex === 0)) {
                html += '<li class="';
                //并判断pageIndex是否就是数字1,如果当前是1，则class=active
                if (settings.pageIndex === 1) {
                    html += 'active';
                } else {
                    html += 'disabled';
                }
                html += '"><a>1</a></li>';
            }
        }
        return html;
    }
    //拼接中间数字按钮 ...2 3 4 5 6....
    var getAButtonsHtml = function (settings) {
        var html = '';
        //省略号只显示一次，这里声明两个标识
        var preFlag = false;
        var nextFlag = false;
        //如果不显示首页末页按钮，则1和pageCount是始终显示的，因此遍历的范围为2~pageCount - 1
        //如果显示了首页末页按钮，则1和pageCount是根据情况显示，因此遍历的范围为1~pageCount
        var start = 2;
        var end = settings.pageCount - 1;
        if (settings.showFirstLast) {
            start = 1;
            end = settings.pageCount;
        }
        for (var i = start; i <= end; i++) {
            //如果前面的按钮页数与当前差大于showNearby，则显示...
            if (settings.pageIndex - i > settings.showNearby && settings.pageIndex - i > 0) {
                if (!preFlag) {
                    html += '<li class="disabled"><a>...</a></li>';
                    preFlag = true;
                }
            } else if (i - settings.pageIndex > settings.showNearby && i - settings.pageIndex > 0) {
                //如果后面的按钮页数与当前差大于showNearby，则显示...
                if (!nextFlag) {
                    html += '<li class="disabled"><a>...</a></li>';
                    nextFlag = true;
                }
            } else {
                if (i !== settings.pageIndex)
                    html += '<li><a data-pageNum="' + i + '" >' + i + '</a></li>';
                else {
                    html += '<li class="active"><a>' + i + '</a></li>';
                }
            }
        }
        return html;
    }
    ///拼接 下一页，末页的代码
    var getNextLastHtml = function (settings) {
        var html = '';
        if (settings.pageIndex < settings.pageCount) {
            //如果设置不显示首页末页且pageCount>0,则显示总页数
            if (!settings.showFirstLast && settings.pageCount > 0) {
                html += '<li><a data-pageNum="' + settings.pageCount + '" >' + settings.pageCount + '</a></li>';
            }
            //如果设置显示上一页、下一页
            if (settings.showPreNext && settings.pageCount > 1) {
                html += '<li><a data-pageNum="' + (settings.pageIndex + 1) + '" >' + settings.nextText + '</a></li>';
            }
            //如果设置显示首页末页
            if (settings.showFirstLast && settings.pageCount > 1) {
                html += '<li><a data-pageNum="' + settings.pageCount + '" >' + settings.lastText + '</a></li>';
            }
        } else {
            //如果设置不显示首页末页且总页数大于1，则显示总页数,并判断pageIndex是否就是总页数
            if (!settings.showFirstLast && settings.pageCount > 1) {
                html += '<li class="';
                if (settings.pageIndex > settings.pageCount) {
                    html += 'disabled';
                } else {
                    html += 'active';
                }
                html += '"><a>' + settings.pageCount + '</a></li>';
            }
            //如果设置显示上一页、下一页
            if (settings.showPreNext && settings.pageCount > 1) {
                if (settings.loop == true) {
                    html += '<li><a data-pageNum="1">' + settings.nextText + '</a></li>';
                } else {
                    html += '<li class="disabled"><a>' + settings.nextText + '</a></li>';
                }
            }
            //如果设置显示首页末页
            if (settings.showFirstLast && settings.pageCount > 1) {
                html += '<li class="disabled"><a>' + settings.lastText + '</a></li>';
            }
        }
        return html;
    }
    ///拼接整个控件的html代码
    var getTotalHtml = function (selector, settings) {
        //拼接BOX
        var html = '<div class=" ' + settings.boxClass + '">';
        html += '<div class=" info">' + getInfoHtml(settings) + '</div><!-- info end  -->';
        //拼接分页导航
        html += '<ul>';
        //拼接首页上一页
        html += getFirstPreHtml(settings);
        //拼接中间数字按钮
        html += getAButtonsHtml(settings);
        //拼接首页上一页
        html += getNextLastHtml(settings);
        //如果设置显示快速跳转输入框且pageCount>1
        if (settings.showGoInput && settings.pageCount > 1) {
            html += '<li><span><input type="text"/></span></li>';
        }
        html += '</ul>';
        //清除浮动
        html += '<div style="clear:both;"></div>';
        html += '</div><!-- sdpagination end  -->';
        return html;
    };
    ///设置pageSize下拉里的值，并绑定事件
    var pageSizeInit = function (obj, settings) {
        //设置pageSize下拦里的值
        var pageSize = obj.find(".pageSize");
        if (pageSize.length > 0) {
            pageSize.find('option[value="' + settings.pageSize + '"]').attr("selected", "selected");
            //添加PageSize事件
            pageSize.on('change', function () {
                var value = $(this).val();
                //下拉变化后，修改settings.pageSize ,这个值是可以在其他方法里用的
                settings.pageSize = value;
                if (settings.onPageSizeChange) {
                    settings.onPageSizeChange(value);
                }
            });
        }
    }
    ///给每个数字按钮绑定事件
    var aBtnInit = function (obj, settings) {
        obj.find("a").each(function (i, e) {
            var pageIndex = $.trim($(e).attr("data-pageNum"));
            if (typeof (pageIndex) !== "undefined" && pageIndex.length > 0) {
                $(e).on('click', function () {
                    if (settings.onPageIndexChange) {
                        settings.onPageIndexChange(pageIndex, settings.pageSize);
                    }
                });
            }
        });
    }
    ///给GoPage绑定事件
    var goPageInit = function (obj, settings) {
        var goPage = obj.find('input');
        if (goPage.length === 0) {
            return;
        }
        goPage.on('change', function () {
            var value = $(this).val();
            if (value.length > 0 && /^[1-9]\d*$/.test(value) === true && parseInt(value) <= parseInt(settings.pageCount) && settings.onPageIndexChange) {
                settings.onPageIndexChange(value, settings.pageSize);
            } else {
                $(this).val("");
            }
        });
        goPage.on('focus', function () {
            $(this).closest('span').addClass('focus');
        });
        goPage.on('blur', function () {
            $(this).closest('span').removeClass('focus');
        });
    }
    ///插件最外的函数集合，本插件只有一个
    var methods = {
        init: function (options) {
            // 在每个元素上执行方法
            return this.each(function () {
                var $this = $(this);
                //默认的传入参数
                var defaults = {
                    boxClass: "sdpagination",                               //生成的容器的class，再后面的追加sdpagination-large、sdpagination-small、sdpagination-mini
                    totalCount: 0,                                          //总数据条数
                    pageSize: 10,                                           //每页显示多少条
                    pageList: [5, 10, 20, 100, 200],                        //PageSize下拉可选
                    pageIndex: 1,                                           //当前第几页
                    showNearby: 4,                                          //显示前页数附近页数时的差，比如 ShowNearby=4，当当前页数是7，那么显示 ...3 4 5 6 7 8 9 10 11...
                    preText: '&lt;',                                        //默认的上一页
                    nextText: '&gt;',                                       //默认的下一页
                    firstText: '&lt;&lt;',                                  //默认的第一页
                    lastText: '&gt;&gt;',                                   //默认的最后一页
                    infoTemplet: '共{totalCount}条 当前{pageIndex}/{pageCount}页 每页显示{pageSize}条',//信息显示的模板
                    showFirstLast: false,                                   //是否显示首页末页按钮,如果不显示，将始终显示数字1和总页数按钮
                    showPreNext: true,                                      //是否显示上一页下一页按钮
                    showGoInput: true,                                      //是否显示快速跳转输入框
                    loop: true                                              //上一页下一页是否无限循环
                };
                //将默认值与传入参数合并
                var settings = $.extend({}, defaults, options);
                //如果传入的pageSize值<1则，附值为10
                if (typeof (settings.pageSize) === 'undefined' || settings.pageSize < 1) {
                    settings.pageSize = 10;
                }
                //如果传入的pageIndex值<0,则附值为1
                if (typeof (settings.pageIndex) === 'undefined' || settings.pageIndex < 0) {
                    settings.pageIndex = 1;
                }
                //将值都转成int型，避免传的入值格式不正确
                settings.pageIndex = parseInt(settings.pageIndex);
                settings.pageSize = parseInt(settings.pageSize);
                //计算pageCount
                settings.pageCount = parseInt((settings.totalCount + settings.pageSize - 1) / settings.pageSize);
                //如果pageCount=0,则将pageIndex附值为0
                if (settings.pageCount === 0) {
                    settings.pageIndex = 0;
                }
                // 将代码添加到DOM中
                $this.html(getTotalHtml($this, settings));
                //统一设置a的href属性
                $this.find('a').prop('href', 'javascript:;');
                //如果pageIndex>pageCount或者pageCount>0而pageIndex==0，则触发pageIndex越界事件
                if ((settings.pageIndex > settings.pageCount || (settings.pageCount > 0 && settings.pageIndex === 0)) && settings.onPageIndexOutOfRange) {
                    settings.onPageIndexOutOfRange(settings.pageIndex, settings.pageCount);
                }
                ///设置pageSize下拉里的值，并绑定事件
                pageSizeInit($this, settings);
                //给每个a将点击事件
                aBtnInit($this, settings);
                ///给GoPage绑定事件
                goPageInit($this, settings);
            });
        }
    };
    $.fn.sdpagination = function () {
        var method = arguments[0];
        var args = arguments;
        if (methods[method]) {
            method = methods[method];
            args = Array.prototype.slice.call(arguments, 1);
        } else if (typeof (method) === 'object' || !method) {
            method = methods.init;
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.sdpagination');
            return this;
        }
        return method.apply(this, args);
    };
})(jQuery);
