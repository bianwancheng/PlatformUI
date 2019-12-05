近期将原有的生成分页导航的function整理成了一个独立的jQuery插件，使用更简单更方便了，使用插件时可以简单的传入一些参数来启用功能或者修改显示效果。效果如下图所示。插件结构是典型jQuery插件结构，有助于学习jQuery插件开发。兼容IE7及以上浏览器，兼容火狐、谷歌、360、猎豹等主流浏览器。基于Sass/Scss重写css，新增四种颜色的皮肤。
插件演示：http://www.nllive.cn/sdpagination/
![输入图片说明](http://git.oschina.net/uploads/images/2017/0209/230639_a167980c_576197.png "在这里输入图片标题")

 **输入参数**
 **参数表**
![输入图片说明](http://git.oschina.net/uploads/images/2017/0210/211928_d7c027e2_576197.png "在这里输入图片标题")
 **回调表**
![输入图片说明](http://git.oschina.net/uploads/images/2017/0108/154643_8a0a1999_576197.png "在这里输入图片标题") 
```
//最简单的调用 #PagerContainer1 为页面里的div
$("#PagerContainer1").sdpagination({
        totalCount: 500,                                  //总条数
        pageSize: 20,                                     //每页显示
        pageIndex: 1,                                     //当前页数
        onPageIndexChange: function (pageIndex, pageSize) { //回调，点击按钮时或者输入页数时，激发onPageIndexChange事件，回调参数为 新页数、PageSize
            //页数变化了，该干点啥，
            $("#PageIndex").val(pageIndex);
            $("#searchForm").submit();
        }
});
```
```
//复杂调用 #PagerContainer3 为页面里的div
 $("#PagerContainer3").sdpagination({
        boxClass: "sdpagination",                         //生成的容器的class，再后面的追加sdpagination-large、sdpagination-small改变大小，sdpagination-blue、sdpagination-green、sdpagination-orange、sdpagination-red加载皮肤
        totalCount: 500,                                  //总条数
        pageSize: 20,                                     //每页显示
        pageIndex: 1,                                     //当前页数
        preText: '上页',                                  //上一页按钮显示的字符
        nextText: '下页',                                 //下一页按钮显示的字符
        firstText: '首页',                                //首页按钮显示的字符
        lastText: '末页',                                 //末页按钮显示的字符
        showNearby: 3,                                    //当前按钮前后按钮数
        infoTemplet: '每页{pageSize} 共{totalCount} 当前{pageIndex}/{pageCount}',//自定义信息模板
        pageList: [5, 10, 20],                              //设置PageSize下拉框的选择项，
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
```