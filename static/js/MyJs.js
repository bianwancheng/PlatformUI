

$(function () {
    run();
    var total_num = 0;
    //    公共方法封装
    jQuery.common = {
        //分页的页码显示
        fenye: function (sum) {
            var sumobj = $('#sum');
            var page_lastobj = $('#page_last');
            //判断分页的逻辑，需要显示多少页，>=5页只显示1，2，3，4，5
            $(sumobj).text('共' + sum + '条记录');
            var page_num = sum % 15;  // 取余数
            if (page_num === 0) {
                if (sum <= 15) {
                    page_num = 1;
                } else {
                    page_num = sum / 15;
                }

            } else {
                page_num = Math.floor(sum / 15) + 1
            }
            total_num = page_num;

            for (var i = 1; i < page_num + 1; i++) {
                //只显示5页，1、总页数<=5；2、总页数大于5只显示5页
                if (page_num <= 5) {
                    if (i === 1) {
                        $('<li class="am-active pagenum"><a href="#"' + i + '</a>' + i + '</li>').insertBefore($(page_lastobj));
                    } else {
                        $('<li class="pagenum"><a href="#"' + i + '</a>' + i + '</li>').insertBefore($(page_lastobj));
                    }
                } else {
                    if (i > 5) {
                        break
                    } else {
                        if (i === 1) {
                            $('<li class="am-active pagenum"><a href="#"' + i + '</a>' + i + '</li>').insertBefore($(page_lastobj));
                        } else {
                            $('<li class="pagenum"><a href="#"' + i + '</a>' + i + '</li>').insertBefore($(page_lastobj));
                        }
                    }
                }

            }
        },
        pageli: function (list) {
            for (var i = 0; i < list.length; i++) {
                id = list[i]['id'];
                business = list[i]['business'];
                project = list[i]['project'];
                user = list[i]['user'];
                updatetime = list[i]['updatetime'];
                $li = '<tr>\n' +
                    '                                    <td><input type="checkbox"/></td>\n' +
                    '                                    <td>' + (i + 1) + '</td>\n' +
                    '                                    <td><a href="#"  id="business">' + business + '</a></td>\n' +
                    '                                    <td id="project">' + project + '</td>\n' +
                    '                                    <td class="am-hide-sm-only">' + user + '</td>\n' +
                    '                                    <td class="am-hide-sm-only">' + updatetime + '</td>\n' +
                    '                                    <td>\n' +
                    '                                        <div class="am-btn-toolbar">\n' +
                    '                                            <div class="am-btn-group am-btn-group-xs">\n' +
                    '                                                <button type="button" class="am-btn am-btn-default am-btn-xs am-text-secondary active"><span\n' +
                    '                                                        class="am-icon-pencil-square-o"></span> 编辑\n' +
                    '                                                </button>\n' +
                    '                                                <button class="am-btn am-btn-default am-btn-xs am-hide-sm-only"><span\n' +
                    '                                                        class="am-icon-copy"></span> 复制\n' +
                    '                                                </button>\n' +
                    '                                                <button type="button" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only active">\n' +
                    '                                                    <span class="am-icon-trash-o"></span> 删除\n' +
                    '                                                </button>\n' +
                    '                                               <button type="button" class="am-btn am-btn-default am-btn-xs am-text-success am-hide-sm-only active" id="run_btn">\n' +
                    '                                                    <span class="glyphicon glyphicon-triangle-right"></span> 运行\n' +
                    '                                               </button>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                    </td>\n' +
                    '                                </tr>';
                $('#tbody').append($li)
            }

        },
        method3: function (sum) {

        }
    };

    //默认加载列表
    // $.get("/table_complete/get", function (form_data) {
    //     //返回的是字典，business_detail里面也是字典
    //     list = form_data['list'];
    //     count = form_data['data_count'];
    //     // console.log(count);
    //     // console.log(list);
    //     $.common.fenye(count);
    //
    //
    //
    //     //任务列表li显示
    //     for (var i = 0; i < list.length; i++) {
    //         id = list[i]['id'];
    //         business = list[i]['business'];
    //         project = list[i]['project'];
    //         user = list[i]['user'];
    //         updatetime = list[i]['updatetime'];
    //         $li = '<tr>\n' +
    //             '                                    <td><input type="checkbox"/></td>\n' +
    //             '                                    <td>' + (i + 1) + '</td>\n' +
    //             '                                    <td><a href="#"  id="business">' + business + '</a></td>\n' +
    //             '                                    <td id="project">' + project + '</td>\n' +
    //             '                                    <td class="am-hide-sm-only">' + user + '</td>\n' +
    //             '                                    <td class="am-hide-sm-only">' + updatetime + '</td>\n' +
    //             '                                    <td>\n' +
    //             '                                        <div class="am-btn-toolbar">\n' +
    //             '                                            <div class="am-btn-group am-btn-group-xs">\n' +
    //             '                                                <button type="button" class="am-btn am-btn-default am-btn-xs am-text-secondary active"><span\n' +
    //             '                                                        class="am-icon-pencil-square-o"></span> 编辑\n' +
    //             '                                                </button>\n' +
    //             '                                                <button class="am-btn am-btn-default am-btn-xs am-hide-sm-only"><span\n' +
    //             '                                                        class="am-icon-copy"></span> 复制\n' +
    //             '                                                </button>\n' +
    //             '                                                <button type="button" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only active">\n' +
    //             '                                                    <span class="am-icon-trash-o"></span> 删除\n' +
    //             '                                                </button>\n' +
    //             '                                               <button type="button" class="am-btn am-btn-default am-btn-xs am-text-success am-hide-sm-only active" id="run_btn">\n' +
    //             '                                                    <span class="glyphicon glyphicon-triangle-right"></span> 运行\n' +
    //             '                                               </button>\n' +
    //             '                                            </div>\n' +
    //             '                                        </div>\n' +
    //             '                                    </td>\n' +
    //             '                                </tr>';
    //         $('#tbody').append($li)
    //     }
    //
    //     run();
    //     //页面跳转
    //     jump_page()
    //
    // });

    //添加新增标签
    $('#add').bind('click', function () {
        var $form = '<form class="form-horizontal" role="form">\n' +
            '                                                        <div class="row">\n' +
            '                                                            <div class="col-md-6" style="padding-right: 0">\n' +
            '                                                                <div class="col-md-3"\n' +
            '                                                                     style="padding-right: 0; padding-left: 3px">\n' +
            '                                                                    <div class="form-group">\n' +
            '                                                                        <label for="firstname"\n' +
            '                                                                               class="control-label col-md-5"\n' +
            '                                                                               style="padding: 0; padding-top: 7px">业务名称</label>\n' +
            '                                                                        <div class="col-md-7">\n' +
            '                                                                            <input type="text" class="form-control"\n' +
            '                                                                                   id="business" name="business" placeholder="">\n' +
            '                                                                        </div>\n' +
            '                                                                    </div>\n' +
            '                                                                </div>\n' +
            '                                                                <div class="col-md-3"\n' +
            '                                                                     style="padding-right: 0; padding-left: 3px">\n' +
            '                                                                    <div class="form-group">\n' +
            '                                                                        <label for="firstname"\n' +
            '                                                                               class="control-label col-md-5"\n' +
            '                                                                               style="padding: 0; padding-top: 7px">登录地址</label>\n' +
            '                                                                        <div class="col-md-7">\n' +
            '                                                                            <input type="text" class="form-control"\n' +
            '                                                                                   id="url" name="url" placeholder="">\n' +
            '                                                                        </div>\n' +
            '                                                                    </div>\n' +
            '                                                                </div>\n' +
            '                                                                <div class="col-md-3"\n' +
            '                                                                     style="padding-right: 0; padding-left: 3px">\n' +
            '                                                                    <div class="form-group">\n' +
            '                                                                        <label for="firstname"\n' +
            '                                                                               class="control-label col-md-5"\n' +
            '                                                                               style="padding: 0; padding-top: 7px">操作方式</label>\n' +
            '                                                                        <div class="col-md-7">\n' +
            '                                                                            <select id="doc-select-1" class=" form-control" style="max-width:100%" name="operate">\n' +
            '                                                                                <option value="option1"></option>\n' +
            '                                                                                <option value="option2">click</option>\n' +
            '                                                                                <option value="option3">send_keys</option>\n' +
            '                                                                                <option value="option4">switch_iframe</option>\n' +
            '                                                                                <option value="option5">switch_default</option>\n' +
            '                                                                                <option value="option6">check_text</option>\n' +
            '                                                                                <option value="option7">check_notNone</option>\n' +
            '                                                                            </select>\n' +
            '                                                                        </div>\n' +
            '                                                                    </div>\n' +
            '                                                                </div>\n' +
            '                                                                <div class="col-md-3"\n' +
            '                                                                     style="padding-right: 0; padding-left: 3px">\n' +
            '                                                                    <div class="form-group">\n' +
            '                                                                        <label for="firstname"\n' +
            '                                                                               class="control-label col-md-5"\n' +
            '                                                                               style="padding: 0; padding-top: 7px">获取方式</label>\n' +
            '                                                                        <select id="doc-select-1" class="am-u-md-7 form-control" style="max-width:40%" name="find_type">\n' +
            '                                                                            <option value="option1"></option>\n' +
            '                                                                            <option value="option2">xpath</option>\n' +
            '                                                                            <option value="option3">id</option>\n' +
            '                                                                            <option value="option4">classname</option>\n' +
            '                                                                            <option value="option5">linktext</option>\n' +
            '                                                                        </select>\n' +
            '                                                                    </div>\n' +
            '                                                                </div>\n' +
            '                                                            </div>\n' +
            '                                                            <div class="col-md-6"\n' +
            '                                                                 style="padding-right: 0; padding-left: 0px">\n' +
            '                                                                <div class="col-md-3"\n' +
            '                                                                     style="padding-right: 0; padding-left: 3px">\n' +
            '                                                                    <div class="form-group">\n' +
            '                                                                        <label for="firstname"\n' +
            '                                                                               class="control-label col-md-5"\n' +
            '                                                                               style="padding: 0; padding-top: 7px">元素取值</label>\n' +
            '                                                                        <div class="col-md-7">\n' +
            '                                                                            <input type="text" class="form-control"\n' +
            '                                                                                   id="element" name="element" placeholder="">\n' +
            '                                                                        </div>\n' +
            '                                                                    </div>\n' +
            '                                                                </div>\n' +
            '                                                                <div class="col-md-3"\n' +
            '                                                                     style="padding-right: 0; padding-left: 3px">\n' +
            '                                                                    <div class="form-group">\n' +
            '                                                                        <label for="firstname"\n' +
            '                                                                               class="control-label col-md-5"\n' +
            '                                                                               style="padding: 0; padding-top: 7px">输入内容</label>\n' +
            '                                                                        <div class="col-md-7">\n' +
            '                                                                            <input type="text" class="form-control"\n' +
            '                                                                                   id="content" name="content" placeholder="">\n' +
            '                                                                        </div>\n' +
            '                                                                    </div>\n' +
            '                                                                </div>\n' +
            '                                                                <div class="col-md-3"\n' +
            '                                                                     style="padding-right: 0; padding-left: 3px">\n' +
            '                                                                    <div class="form-group">\n' +
            '                                                                        <label for="firstname"\n' +
            '                                                                               class="control-label col-md-5"\n' +
            '                                                                               style="padding: 0; padding-top: 7px">等待时间</label>\n' +
            '                                                                        <div class="col-md-7">\n' +
            '                                                                            <input type="text" class="form-control"\n' +
            '                                                                                   id="wait_time" name="wait_time" placeholder="">\n' +
            '                                                                        </div>\n' +
            '                                                                    </div>\n' +
            '                                                                </div>\n' +
            '                                                                <div class="col-md-3"\n' +
            '                                                                     style="padding-right: 0; padding-left: 3px">\n' +
            '                                                                    <div class="form-group">\n' +
            '                                                                        <label for="firstname"\n' +
            '                                                                               class="control-label col-md-5"\n' +
            '                                                                               style="padding: 0; padding-top: 7px">操作说明</label>\n' +
            '                                                                        <div class="col-md-7">\n' +
            '                                                                            <input type="text" class="form-control"\n' +
            '                                                                                   id="operate_info" name="operate_info" placeholder="">\n' +
            '                                                                        </div>\n' +
            '                                                                    </div>\n' +
            '                                                                </div>\n' +
            '                                                            </div>\n' +
            '                                                        </div>\n' +
            '                                                    </form>'
        $('#business_form').append($form)

    });


//提交业务流数据

    $('#submit').click(function () {
        var formData = $('#business_form form');
        // console.log(formData.length);
        var arr = [];
        for (var i = 0; i < formData.length; i++) {
            // console.log(formData[i]);
            business = $(formData[i]).find("input[name='business']").val();
            url = $(formData[i]).find("input[name='url']").val();
            operate = $(formData[i]).find("select[name='operate']").find("option:selected").text();
            // console.log(operate);
            find_type = $(formData[i]).find("select[name='find_type']").find("option:selected").text();
            element = $(formData[i]).find("input[name='element']").val();
            content1 = $(formData[i]).find("input[name='content']").val();
            wait_time = $(formData[i]).find("input[name='wait_time']").val();
            operate_info = $(formData[i]).find("input[name='operate_info']").val();
            dict = {
                'business': business,
                'url': url,
                'operate': operate,
                'find_type': find_type,
                'element': element,
                'content': content1,
                'wait_time': wait_time,
                'operate_info': operate_info
            };
            arr.push(dict);

        }
        // console.log(arr);
        mdffilepath = {
            'form_data': arr//要发送的字典，在JavaScript里被定义为对象
        }; //传输数据
        $.ajax({
            type: 'POST',
            url: '/table_complete_add/ajax',
            data: JSON.stringify(mdffilepath),//将对象打包成json的字符串发送，对应下面也要将字符串解码成字典
            contentType: 'application/json;charset=UTF-8',//编码格式
            dataType: 'json',
            success: function (data) {
                //返回business的信息
                var list = data['list'];

                //获取数据总数
                sum = list.length;
                // var sumobj = $('#sum');
                // var page_lastobj = $('#page_last');
                $.common.fenye(sum);

                for (var i = 0; i < list.length; i++) {
                    id = list[i]['id'];
                    business = list[i]['business'];
                    project = list[i]['project'];
                    user = list[i]['user'];
                    updatetime = list[i]['updatetime'];
                    $li = '<tr>\n' +
                        '                                    <td><input type="checkbox"/></td>\n' +
                        '                                    <td>' + (i + 1) + '</td>\n' +
                        '                                    <td><a href="#" id="business">' + business + '</a></td>\n' +
                        '                                    <td id="project">' + project + '</td>\n' +
                        '                                    <td class="am-hide-sm-only">' + user + '</td>\n' +
                        '                                    <td class="am-hide-sm-only">' + updatetime + '</td>\n' +
                        '                                    <td>\n' +
                        '                                        <div class="am-btn-toolbar">\n' +
                        '                                            <div class="am-btn-group am-btn-group-xs">\n' +
                        '                                                <button type="button" class="am-btn am-btn-default am-btn-xs am-text-secondary active"><span\n' +
                        '                                                        class="am-icon-pencil-square-o"></span> 编辑\n' +
                        '                                                </button>\n' +
                        '                                                <button type="button" class="am-btn am-btn-default am-btn-xs am-hide-sm-only active"><span\n' +
                        '                                                        class="am-icon-copy"></span> 复制\n' +
                        '                                                </button>\n' +
                        '                                                <button type="button" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only active">\n' +
                        '                                                    <span class="am-icon-trash-o"></span> 删除\n' +
                        '                                                </button>\n' +
                        '                                               <button  type="button" class="am-btn am-btn-default am-btn-xs am-text-success am-hide-sm-only active">\n' +
                        '                                                    <span class="glyphicon glyphicon-triangle-right"></span> 运行\n' +
                        '                                               </button>\n' +
                        '                                            </div>\n' +
                        '                                        </div>\n' +
                        '                                    </td>\n' +
                        '                                </tr>'
                    $('#tbody').append($li);  //拼接li显示
                }

                // console.log(list);
                window.location.reload(); //刷新当前页面

            }
        })
    });


//    运行按钮
    function run() {

        $('[id=run_btn]').each(function () {
            $(this).click(function () {
                var business = $(this).parents("tr").find("a").filter("#business").text();
                console.log(business);
                var project = $(this).parents("tr").find("td").filter("#project").text();
                data_run = {
                    'business': business,
                    'project': project
                };
                $.ajax({
                    type: 'POST',
                    url: '/run',
                    data: JSON.stringify(data_run),//将对象打包成json的字符串发送，对应下面也要将字符串解码成字典
                    contentType: 'application/json;charset=UTF-8',//编码格式
                    dataType: 'json',
                    success: function (data) {
                        // 这里加一些返回结果，成功怎么显示，失败怎么显示。可以再页面加一个运行进行时loading（点击运行就会出现loading），直到成功success或者失败fail改变状态
                        console.log(data)

                    }
                });
            })
        });
    }


//跳转page页
    function jump_page() {
        //显示的页面按钮跳转
        var li_list = $('#page').find('li').filter('.pagenum');   //获取页码的数组对象不包括上一页和下一页
        var up = $('#page').find('li').first();
        var down = $('#page').find('li').last();
        var down_calss = $('#page').find('li').last().attr('class');

        //下一页事件
        $(down).click(function () {
            //当前页码
            var now_page = $('#page').find('li').filter('.am-active').text();
            console.log(now_page + typeof (parseInt(now_page) + 1));
            if (total_num === parseInt(now_page) + 1) {
                $('#page_last').css('display', 'none');
            }
            $('#page').find('li').filter('.am-active').next().filter('.pagenum').addClass('am-active');
            $('#page').find('li').filter('.am-active').filter('.pagenum').eq(0).removeClass('am-active');
            console.log(parseInt(now_page));
            now_page = {'pageno': parseInt(now_page) + 1};
            $.ajax({
                type: 'POST',
                url: '/page',
                data: JSON.stringify(now_page),//将对象打包成json的字符串发送，对应下面也要将字符串解码成字典
                contentType: 'application/json;charset=UTF-8',//编码格式
                dataType: 'json',
                success: function (data) {
                    //返回business的信息
                    var list = data['list'];
                    //获取数据总数
                    sum = list.length;
                    $('tbody').find('tr').each(function () {
                        $(this).remove();
                    });
                    $.common.pageli(list);
                    run()

                }
            })

        });

        //页码事件
        $(li_list).each(function () {
            $(this).click(function () {

                var now_page = $('#page').find('li').filter('.am-active').text();
                console.log(now_page + typeof (parseInt(now_page) + 1));
                if (total_num === parseInt(now_page) + 1) {
                    $('#page_last').css('display', 'none');
                }

                var pageno = $(this).find('a').text();
                if (pageno !== '1') {
                    //上一页状态设置
                    $('#page').find('li').first().removeClass('am-disabled');

                } else {
                    $('#page').find('li').first().addClass('am-disabled');
                }
                // 下一页状态设置
                if (parseInt(pageno) === li_list.length) {
                    $('#page').find('li').last().addClass('am-disabled');
                } else {
                    $('#page').find('li').last().removeClass('am-disabled');
                }
                pageno = {'pageno': pageno};

                $(li_list).each(function () {
                    $(this).removeClass('am-active');
                });

                $(this).addClass('am-active');
                $.ajax({
                    type: 'POST',
                    url: '/page',
                    data: JSON.stringify(pageno),//将对象打包成json的字符串发送，对应下面也要将字符串解码成字典
                    contentType: 'application/json;charset=UTF-8',//编码格式
                    dataType: 'json',
                    success: function (data) {
                        //返回business的信息
                        var list = data['list'];
                        //获取数据总数
                        sum = list.length;
                        $('tbody').find('tr').each(function () {
                            $(this).remove();
                        });
                        $.common.pageli(list);
                        run()

                    }
                })
            })
        });


    }




});

