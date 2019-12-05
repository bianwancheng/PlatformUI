$(function () {

    var total_num = 0;
    default_init();
    run();
    Init();
    submit();


    // 公共方法封装
    jQuery.common = {
        //分页的页码显示
        fenye: function (sum) {
            var sumobj = $('#sum');
            var page_lastobj = $('#page_last');
            //判断分页的逻辑，需要显示多少页，>=5页只显示1，2，3，4，5
            var page_num = sum % 10;  // 取余数
            if (page_num === 0) {
                if (sum <= 10) {
                    page_num = 1;
                } else {
                    page_num = sum / 10;
                }

            } else {
                page_num = Math.floor(sum / 10) + 1
            }
            total_num = page_num;

        },
        pageli: function (list, PageIndex) {
            for (var i = 0; i < list.length; i++) {
                id = list[i]['id'];
                business = list[i]['business'];
                project = list[i]['project'];
                user = list[i]['user'];
                updatetime = list[i]['updatetime'];
                code = list[i]['code'];
                result = list[i]['result'];
                $li = '<tr>\n' +
                    '                                    <td><input type="checkbox"/><input type="text" style="display: none" value="' + code + '"/></td>\n' +
                    '                                    <td>' + parseInt((PageIndex - 1) * 10 + (i + 1)) + '</td>\n' +
                    '                                    <td><a href="#"  id="business">' + business + '</a></td>\n' +
                    '                                    <td id="project">' + project + '</td>\n' +
                    '                                    <td class="am-hide-sm-only">' + user + '</td>\n' +
                    '                                    <td class="am-hide-sm-only">' + updatetime + '</td>\n' +
                    '                                    <td>\n' +
                    '                                        <div class="am-btn-toolbar">\n' +
                    '                                            <div class="am-btn-group am-btn-group-xs">\n' +
                    '                                                <button type="button" id="edit" class="am-btn am-btn-default am-btn-xs am-text-secondary active" data-toggle="modal" data-target="#myForm' + i + '"><span\n' +
                    '                                                        class="am-icon-pencil-square-o"></span> 编辑\n' +
                    '                                                </button>\n' +
                    '                                                <button id="copy" type="button" class="am-btn am-btn-default am-btn-xs "><span\n' +
                    '                                                        class="am-icon-copy"></span> 复制\n' +
                    '                                                </button>\n' +
                    '                                                <button type="button" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only active">\n' +
                    '                                                    <span class="am-icon-trash-o"></span> 删除\n' +
                    '                                                </button>\n' +
                    '                                               <button type="button" class="am-btn am-btn-default am-btn-xs am-text-success am-hide-sm-only active" id="run_btn">\n' +
                    '                                                    <span class="glyphicon glyphicon-triangle-right"></span> 运行\n' +
                    '                                               </button>\n' +
                    '                                               <!-- 模态框（Modal） -->\n' +
                    '                                               <div id="myForm' + i + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n' +
                    '                                                   <div class="modal-dialog" style="width: 1200px">\n' +
                    '                                                       <div class="modal-content">\n' +
                    '                                                           <div class="modal-header">\n' +
                    '                                                               <button id="edit_chahao" type="button" class="close" data-dismiss="modal" aria-hidden="true">\n' +
                    '                                                                   &times;\n' +
                    '                                                               </button>\n' +
                    '                                                               <h4 class="modal-title" id="myModalLabel">\n' +
                    '                                                                   编辑业务信息 \n' +
                    '                                                               </h4>\n' +
                    '                                                           </div>\n' +
                    '                                                           <div id="business_form" class="modal-body">\n' +
                    '                                                               <table class="table table-hover">\n' +
                    '                                                                   <caption>项目名称</caption>\n' +
                    '                                                                   <thead>\n' +
                    '                                                                   <tr>\n' +
                    '                                                                       <th>业务名称</th>\n' +
                    '                                                                       <th>登录地址</th>\n' +
                    '                                                                       <th>操作方式</th>\n' +
                    '                                                                       <th>获取方式</th>\n' +
                    '                                                                       <th>元素取值</th>\n' +
                    '                                                                       <th>输入内容</th>\n' +
                    '                                                                       <th>等待时间</th>\n' +
                    '                                                                       <th>操作说明</th>\n' +
                    '                                                                   </tr>\n' +
                    '                                                                   </thead>\n' +
                    '                                                                   <tbody id="edit_form" >\n' +
                    '                                                                   <tr>\n' +
                    '                                                                       <td>\n' +
                    '                                                                           <input type="text" class="form-control" name="business" placeholder="">\n' +
                    '                                                                       </td>\n' +
                    '                                                                       <td>\n' +
                    '                                                                           <input type="text" class="form-control" name="url" placeholder="">\n' +
                    '                                                                       </td>\n' +
                    '                                                                       <td>\n' +
                    '                                                                               <select class="form-control">' +
                    '                                                                                   <option value="option1"></option>' +
                    '                                                                                   <option value="option2">click</option>' +
                    '                                                                                   <option value="option3">send_keys</option>' +
                    '                                                                                   <option value="option4">switch_iframe</option>' +
                    '                                                                                   <option value="option5">switch_default</option>' +
                    '                                                                                   <option value="option6">check_text</option>' +
                    '                                                                                   <option value="option7">check_notNone</option>' +
                    '                                                                               </select>' +
                    '                                                                       </td>\n' +
                    '                                                                       <td>\n' +
                    '                                                                               <select class="form-control">\n' +
                    '                                                                                   <option value="option1"></option>\n' +
                    '                                                                                   <option value="option2">xpath</option>\n' +
                    '                                                                                   <option value="option3">id</option>\n' +
                    '                                                                                   <option value="option4">classname</option>\n' +
                    '                                                                                   <option value="option5">linktext</option>\n' +
                    '                                                                               </select>\n' +
                    '                                                                       </td>\n' +
                    '                                                                       <td>\n' +
                    '                                                                           <input type="text" class="form-control" name="element" placeholder="">\n' +
                    '                                                                       </td>\n' +
                    '                                                                       <td>\n' +
                    '                                                                           <input type="text" class="form-control" name="content" placeholder="">\n' +
                    '                                                                       </td>\n' +
                    '                                                                       <td>\n' +
                    '                                                                           <input type="text" class="form-control" name="wait_time" placeholder="">\n' +
                    '                                                                       </td>\n' +
                    '                                                                       <td>\n' +
                    '                                                                           <input type="text" class="form-control" name="operate_info" placeholder="">\n' +
                    '                                                                       </td>\n' +
                    '                                                                   </tr>\n' +
                    '                                                                   </tbody>\n' +
                    '                                                               </table>\n' +
                    '                                                           </div>\n' +
                    '                                                           <div class="modal-footer">\n' +
                    '                                                               <button id="edit_close" type="button" class="btn btn-default" data-dismiss="modal">关闭\n' +
                    '                                                               </button>\n' +
                    '                                                               <button id="edit_paste" type="button" class="btn btn-info" style="background-color: #31b0d5; border-color: #269abc;;color: #fff" name="submit" data-toggle="button" >粘贴\n' +
                    '                                                               </button>\n' +
                    '                                                               <button id="submit_edit" data-dismiss="modal" type="button" style="background-color: #337ab7; border-color: #2e6da4;color: #fff" name="submit" data-toggle="button" class="btn btn-default">\n' +
                    '                                                                   提交\n' +
                    '                                                               </button>\n' +
                    '                                                           </div>\n' +
                    '                                                       </div><!-- /.modal-content -->\n' +
                    '                                                   </div><!-- /.modal -->\n' +
                    '                                               </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                    </td>\n' +
                    '                                    <td id="result">' + result + '</td>\n' +
                    '                                </tr>';
                $('#tbody').append($li)
            }

        },
        method3: function (sum) {

        }
    };

    // 添加业务信息里的关闭按钮
    $('.close').click(function () {
        //关闭之后移除所有form（不包括第一个form，第一个form数据清空）
        $('#business_form').find('form').slice(0).find('input').val('');
        $('#business_form').find('form').slice(0).find('select').each(function () {
            $(this).find('option').eq(0).prop("selected", true);
        });
        $('#business_form').find('form').slice(1).each(function () {
            $(this).remove();
        });
    });


    //添加添加业务信息的添加按钮，点击添加一条form标签标签
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
});

//提交业务流数
function submit() {

    $('#submit').click(function () {
        console.log('submit');
        var formData = $('#business_form form');
        var arr = [];
        for (var i = 0; i < formData.length; i++) {
            business = $(formData[i]).find("input[name='business']").val();
            url = $(formData[i]).find("input[name='url']").val();
            operate = $(formData[i]).find("select[name='operate']").find("option:selected").text();
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
                'element': element.replace(new RegExp('"', "gm"), '\"'), //(new RegExp(key,'g'),"b");
                'content': content1,
                'wait_time': wait_time,
                'operate_info': operate_info
            };
            arr.push(dict);

        }
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
                //第一页
                $.common.pageli(list, 1);

                window.location.reload(); //刷新当前页面

            }
        });
        //提交之后移除所有form
        $('#business_form').find('form').slice(0).find('input').val('');
        $('#business_form').find('form').slice(0).find('select').each(function () {
            $(this).find('option').eq(0).prop("selected", true);
        });
        $('#business_form').find('form').each(function () {
            $(this).remove();
        });

    });
}

// 默认加载列表
function default_init() {
    var pageIndex = parseInt($("#PageIndex").val());
    page = {
        'pageIndex': pageIndex,
    };
    $.ajax({
        type: 'POST',
        url: '/table_complete/get',
        data: JSON.stringify(page),//将对象打包成json的字符串发送，对应下面也要将字符串解码成字典
        contentType: 'application/json;charset=UTF-8',//编码格式
        dataType: 'json',
        success: function (form_data) {
            list = form_data['list'];
            count = form_data['data_count'];
            $.common.fenye(count);
            //第一页
            //默认进来的时候会不会有问题？

            $.common.pageli(list, parseInt($("#PageIndex").val()));
            run();
            edit();
            copy();
            //给执行结果加颜色
            $('td:contains("Fail")').css('color', 'red');
            $('td:contains("Success")').css('color', 'red');
        }
    });


}


//    运行按钮
function run() {

    $('[id=run_btn]').each(function () {
        $(this).click(function () {
            $(this).parents('tr').find('td').filter('#result').css('color', 'black');
            $(this).parents('tr').find('td').filter('#result').text('loading');
            // var business = $(this).parents("tr").find("a").filter("#business").text();
            // console.log(business);
            // var project = $(this).parents("tr").find("td").filter("#project").text();
            code1 = $(this).parents('tr').find('td').first().find('input').eq(1).val();
            console.log(code1);
            data_run = {
                'code': code1,
            };
            $.ajax({
                type: 'POST',
                url: '/run',
                data: JSON.stringify(data_run),//将对象打包成json的字符串发送，对应下面也要将字符串解码成字典
                contentType: 'application/json;charset=UTF-8',//编码格式
                dataType: 'json',
                success: function (data) {
                    // 这里加一些返回结果，成功怎么显示，失败怎么显示。可以再页面加一个运行进行时loading（点击运行就会出现loading），直到成功success或者失败fail改变状态
                    bool = data['result'];
                    if (bool === true) {
                        $("td:contains('loading')").text('Success');
                        $("td:contains('Success')").css('color', 'green');
                    } else {
                        $("td:contains('loading')").text('Fail');
                        $("td:contains('Fail')").css('color', 'red');
                    }
                    console.log(data['result'])

                }
            });
        })
    });
}

//分页
function Init() {

    $.ajax({
        type: 'POST',
        url: '/table_complete/get',
        data: JSON.stringify(page),//将对象打包成json的字符串发送，对应下面也要将字符串解码成字典
        contentType: 'application/json;charset=UTF-8',//编码格式
        dataType: 'json',
        success: function (form_data) {
            var list = form_data['list'];
            var sum = form_data['data_count'];

            //下面的3个值理论上应该从服务获取更新
            // var PageSize = parseInt($("#PageSize").val());
            // var PageIndex = parseInt($("#PageIndex").val());

            var PageIndex = parseInt($("#PageIndex").val());
            console.log('fenye', PageIndex);
            var PageSize = 10;
            var TotalCount = sum;


            $("#PagerContainer7").sdpagination({
                totalCount: TotalCount,            //总条数
                pageSize: PageSize,                //每页显示
                pageIndex: PageIndex,              //当前页数
                showFirstLast: true,              //是否显示首页末页按钮,如果不显示，将始终显示数字1和总页数按钮
                showPreNext: true,                 //是否显示上一页下一页按钮
                showGoInput: true,                 //是否显示快速跳转输入框
                loop: false,                         //不循环
                onPageIndexChange: function (pageIndex, pageSize) { //回调，点击按钮时或者输入页数时，激发onPageIndexChange事件，回调参数为 新页数、PageSize
                    //页数变化了，该干点啥，
                    $("#PageIndex").val(pageIndex);
                    //$("#searchForm").submit();
                    pageIndex = {pageIndex: pageIndex};
                    Init();
                    $.ajax({
                        type: 'POST',
                        url: '/page',
                        data: JSON.stringify(pageIndex),//将对象打包成json的字符串发送，对应下面也要将字符串解码成字典
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
                            $.common.pageli(list, pageIndex['pageIndex']);
                            run();
                            edit();
                            copy();
                            //给执行结果加颜色
                            $('td:contains("Fail")').css('color', 'red');
                            $('td:contains("Success")').css('color', 'red');

                        }
                    })
                },
                onPageIndexOutOfRange: function () {
                    //
                    alert('PageIndex out of range');
                }

            });
        }
    });

}

//编辑按钮
function edit() {

    //点击编辑
    $('[id=edit]').each(function () {
        var tr_tbody;
        $(this).click(function () {
            code1 = $(this).parents('tr').find('td').first().find('input').eq(1).val();
            code = {'code': code1};
            console.log('code', code);
            tr_tbody = $(this).parent().find('tbody');
            console.log('tr_tbody', tr_tbody);
            //根据code查询business_detail数据
            $.ajax({
                type: 'POST',
                url: '/edit',
                data: JSON.stringify(code),//将对象打包成json的字符串发送，对应后面也要将字符串解码成字典
                contentType: 'application/json;charset=UTF-8',//编码格式
                dataType: 'json',
                success: function (data) {
                    var list = data['list'];

                    $tr = '<tr>\n' +
                        '                                                                       <td>\n' +
                        '                                                                           <input type="text" class="form-control" name="business" placeholder="">\n' +
                        '                                                                       </td>\n' +
                        '                                                                       <td>\n' +
                        '                                                                           <input type="text" class="form-control" name="url" placeholder="">\n' +
                        '                                                                       </td>\n' +
                        '                                                                       <td>\n' +
                        '                                                                               <select class="form-control" name="operate">\n' +
                        '                                                                                   <option value="option1"></option>\n' +
                        '                                                                                   <option value="option2">click</option>\n' +
                        '                                                                                   <option value="option3">send_keys</option>\n' +
                        '                                                                                   <option value="option4">switch_iframe</option>\n' +
                        '                                                                                   <option value="option5">switch_default</option>\n' +
                        '                                                                                   <option value="option6">check_text</option>\n' +
                        '                                                                                   <option value="option7">check_notNone</option>\n' +
                        '                                                                               </select>\n' +
                        '                                                                       </td>\n' +
                        '                                                                       <td>\n' +
                        '                                                                               <select class="form-control" name="find_type">\n' +
                        '                                                                                   <option value="option1"></option>\n' +
                        '                                                                                   <option value="option2">xpath</option>\n' +
                        '                                                                                   <option value="option3">id</option>\n' +
                        '                                                                                   <option value="option4">classname</option>\n' +
                        '                                                                                   <option value="option5">linktext</option>\n' +
                        '                                                                               </select>\n' +
                        '                                                                       </td>\n' +
                        '                                                                       <td>\n' +
                        '                                                                           <input type="text" class="form-control" name="element" placeholder="">\n' +
                        '                                                                       </td>\n' +
                        '                                                                       <td>\n' +
                        '                                                                           <input type="text" class="form-control" name="content" placeholder="">\n' +
                        '                                                                       </td>\n' +
                        '                                                                       <td>\n' +
                        '                                                                           <input type="text" class="form-control" name="wait_time" placeholder="">\n' +
                        '                                                                       </td>\n' +
                        '                                                                       <td>\n' +
                        '                                                                           <input type="text" class="form-control" name="operate_info" placeholder="">\n' +
                        '                                                                       </td>\n' +
                        '                                                                   </tr>';
                    //默认会加载一个tr
                    tr_tbody.find('tr').remove();
                    // var tr_tbody = $(this).parent().find('tbody');
                    //为每个tr赋值
                    console.log('list', list);
                    for (var i = 0; i < list.length; i++) {
                        console.log(list[i]["operate"], i);
                        // console.log($(tr_tbody).find('input[name="business"]'));
                        tr_tbody.append($tr);
                        tr_tbody.find('input[name="business"]').eq(i).val(list[i]['business']);
                        tr_tbody.find('input[name="url"]').eq(i).val(list[i]['url']);
                        tr_tbody.find('input[name="element"]').eq(i).val(list[i]['element']);
                        tr_tbody.find('input[name="content"]').eq(i).val(list[i]['content']);
                        tr_tbody.find('input[name="wait_time"]').eq(i).val(list[i]['wait_time']);
                        tr_tbody.find('input[name="operate_info"]').eq(i).val(list[i]['operate_info']);
                        $('.modal.fade.in tbody').find('select[name="operate"]').eq(i).find('option').filter(function () {
                            return $(this).text() === list[i]["operate"];
                        }).attr("selected", true);
                        $('.modal.fade.in tbody').find('select[name="find_type"]').eq(i).find('option').filter(function () {
                            return $(this).text() === list[i]["find_type"];
                        }).attr("selected", true);

                    }


                }

            });
            //编辑之后提交
            // console.log('test', tr_tbody.parents('div').filter('.modal-content').find('.modal-footer').find('#submit_edit'))
            $(tr_tbody).parents('div').filter('.modal-content').find('.modal-footer').find('#submit_edit').click(function () {

                var formData = $(tr_tbody).find('tr');
                var arr = [];

                for (var i = 0; i < formData.length; i++) {
                    business = $(formData[i]).find("input[name='business']").val();
                    url = $(formData[i]).find("input[name='url']").val();
                    operate = $(formData[i]).find("select[name='operate']").find("option:selected").text();
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
                page_now = parseInt($("#PageIndex").val());
                //要发送的字典，在JavaScript里被定义为对象
                mdffilepath = {
                    'business_detail': arr,
                    'code': code1,
                    'page_now': page_now

                }; //传输数据
                $.ajax({
                    type: 'POST',
                    url: '/edit_update',
                    data: JSON.stringify(mdffilepath),//将对象打包成json的字符串发送，对应下面也要将字符串解码成字典
                    contentType: 'application/json;charset=UTF-8',//编码格式
                    dataType: 'json',
                    success: function (data) {
                        console.log('submit');
                        //返回business的信息
                        var list = data['list'];

                        //获取数据总数
                        sum = list.length;
                        $.common.fenye(sum);
                        //当前页
                        console.log(page_now);
                        // trs = $('#tbody').find('tr');
                        $('#tbody').find('tr').remove();
                        // $('#tbody').removeChild(trs);
                        $.common.pageli(list, page_now);

                        window.location.reload(); //刷新当前页面

                    }
                });
                //提交之后移除所有form
                $('#business_form').find('form').slice(0).find('input').val('');
                $('#business_form').find('form').slice(0).find('select').each(function () {
                    $(this).find('option').eq(0).prop("selected", true);
                });
                $('#business_form').find('form').each(function () {
                    $(this).remove();
                });

            });


        });


    });
    //编辑页面的关闭按钮
    $('#edit_close').click(function () {
        var tr_tbody = $(this).parent().find('tbody');
        $(tr_tbody).find('tr').each(function () {
            $(this).remove();
        });
    });
    //叉号按钮
    $('#edit_chahao').click(function () {
        var tr_tbody = $(this).parent().find('tbody');
        $(tr_tbody).find('tr').each(function () {
            $(this).remove();
        });
    });

}

//复制按钮
function copy() {

    $('[id=copy]').each(function () {
        var tr_tbody;
        var list;
        $(this).click(function () {

            console.log('copy');
            code1 = $(this).parents('tr').find('td').first().find('input').eq(1).val();
            code = {'code': code1};
            tr_tbody = $(this).parent().find('tbody');
            console.log('tr_tbody', tr_tbody);
            $.ajax({
                type: 'POST',
                async: false,  //改成同步就可以把ajax获取的值赋值给外部变量
                url: '/edit',   //与edit相同都是得到对应code的success_detail
                data: JSON.stringify(code),//将对象打包成json的字符串发送，对应后面也要将字符串解码成字典
                contentType: 'application/json;charset=UTF-8',//编码格式
                dataType: 'json',
                success: function (data) {
                    list = data['list'];


                }

            });
            console.log(list);
            $('[id=edit_paste]').each(function () {
                $tr = '<tr>\n' +
                    '                                                                       <td>\n' +
                    '                                                                           <input type="text" class="form-control" name="business" placeholder="">\n' +
                    '                                                                       </td>\n' +
                    '                                                                       <td>\n' +
                    '                                                                           <input type="text" class="form-control" name="url" placeholder="">\n' +
                    '                                                                       </td>\n' +
                    '                                                                       <td>\n' +
                    '                                                                               <select class="form-control" name="operate">\n' +
                    '                                                                                   <option value="option1"></option>\n' +
                    '                                                                                   <option value="option2">xpath</option>\n' +
                    '                                                                                   <option value="option3">id</option>\n' +
                    '                                                                                   <option value="option4">classname</option>\n' +
                    '                                                                                   <option value="option5">linktext</option>\n' +

                    '                                                                               </select>\n' +
                    '                                                                       </td>\n' +
                    '                                                                       <td>\n' +
                    '                                                                               <select class="form-control" name="find_type">\n' +
                    '                                                                                   <option value="option1"></option>\n' +
                    '                                                                                   <option value="option2">click</option>\n' +
                    '                                                                                   <option value="option3">send_keys</option>\n' +
                    '                                                                                   <option value="option4">switch_iframe</option>\n' +
                    '                                                                                   <option value="option5">switch_default</option>\n' +
                    '                                                                                   <option value="option6">check_text</option>\n' +
                    '                                                                                   <option value="option7">check_notNone</option>\n' +
                    '                                                                               </select>\n' +
                    '                                                                       </td>\n' +
                    '                                                                       <td>\n' +
                    '                                                                           <input type="text" class="form-control" name="element" placeholder="">\n' +
                    '                                                                       </td>\n' +
                    '                                                                       <td>\n' +
                    '                                                                           <input type="text" class="form-control" name="content" placeholder="">\n' +
                    '                                                                       </td>\n' +
                    '                                                                       <td>\n' +
                    '                                                                           <input type="text" class="form-control" name="wait_time" placeholder="">\n' +
                    '                                                                       </td>\n' +
                    '                                                                       <td>\n' +
                    '                                                                           <input type="text" class="form-control" name="operate_info" placeholder="">\n' +
                    '                                                                       </td>\n' +
                    '                                                                   </tr>';
                // var tr_tbody = $(this).parent().find('tbody');
                //追加tr在后面,并为每个tr赋值
                $(this).click(function () {
                    previous_tr = $('.modal.fade.in tbody').find('tr').length;
                    for (var i = 0; i < list.length; i++) {
                        //获取显示的模态框modal
                        $('.modal.fade.in tbody').append($tr);
                        $('.modal.fade.in tbody').find('input[name="business"]').eq(i + previous_tr).val(list[i]['business']);
                        $('.modal.fade.in tbody').find('input[name="url"]').eq(i + previous_tr).val(list[i]['url']);
                        $('.modal.fade.in tbody').find('input[name="element"]').eq(i + previous_tr).val(list[i]['element']);
                        $('.modal.fade.in tbody').find('input[name="content"]').eq(i + previous_tr).val(list[i]['content']);
                        $('.modal.fade.in tbody').find('input[name="wait_time"]').eq(i + previous_tr).val(list[i]['wait_time']);
                        $('.modal.fade.in tbody').find('input[name="operate_info"]').eq(i + previous_tr).val(list[i]['operate_info']);
                        $('.modal.fade.in tbody').find('select[name="operate"]').eq(i + previous_tr).find('option').filter(function () {
                            return $(this).text() === list[i]['operate'];
                        }).attr("selected", true);
                        $('.modal.fade.in tbody').find('select[name="find_type"]').eq(i + previous_tr).find('option').filter(function () {
                            return $(this).text() === list[i]['find_type'];
                        }).attr("selected", true);

                    }
                })

            })

        })

    });

}


