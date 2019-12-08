#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time : 2019/11/20 13:54
# @Author : Wancheng.b
# @File : run.py
# @Software: PyCharm
import ast
import decimal
import json
import time

from flask import Flask, render_template, request, redirect, url_for
from public.BaseOperate import BaseOperate
from public.Db import Db
from public.UnittestCase import UnittestCase

app = Flask(__name__)


# Object of type Decimal is not JSON serializable 解决办法
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return float(o)
        super(DecimalEncoder, self).default(o)


@app.route('/table_complete')
def table_complete():
    return render_template('table_complete.html')


# 默认加载列表
@app.route('/table_complete/get', methods=['POST'])
def table_complete_get():
    a = request.get_data()  # 得到JavaScript发送的字符串流
    pageno = (int(json.loads(a)['pageIndex']) - 1) * 10
    db = Db(host='localhost', port=3306, user='root', password='root', db='platform_db')
    data_count = db.read_one("select count(id) as count from business")['count']
    # 总数大于10只返回最新的10条数据，否则有多少返回多少
    if data_count > 10:
        list = db.read_many("select * from business order by id desc limit " + str(pageno) + ",10")
    else:
        list = db.read_many("select * from business order by id desc")

    db.close()
    return {'list': list, 'data_count': data_count}  # AJAX接收字典


@app.route('/')
def init():
    return render_template('index.html')


@app.route('/get')
def init_get():
    db = Db(host='localhost', port=3306, user='root', password='root', db='platform_db')
    list = db.read_many(
        "select sum(result='Fail') as Fail, sum(result='Success') as Success, sum(result='未执行')as Pending, SUBSTRING(updatetime, 1, 10) as updatetime from business GROUP BY SUBSTRING(updatetime, 1, 10) order by updatetime desc")
    return json.dumps(list, cls=DecimalEncoder)  # Object of type Decimal is not JSON serializable 解决办法


@app.route('/table_complete_add/ajax', methods=['POST'])
def table_complete_add():
    # time获取当前时间戳
    now = int(time.time())  # 1533952277
    timeArray = time.localtime(now)
    otherStyleTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArray)
    # global str
    a = request.get_data()  # 得到JavaScript发送的字符串流
    # print(a.decode())
    # print(type(a.decode()))
    form_data = json.loads(a)['form_data']

    db = Db(host='localhost', port=3306, user='root', password='root', db='platform_db')

    print(
        'INSERT into business (code, user, business, updatetime, project, business_detail, result) VALUES("{}", "从页面获取用户", "{}", "{}", "{}", "{}", "未执行")'.format(
            now, form_data[0]["business"], otherStyleTime, "以后会加二级菜单做项目分类直接获取",
            a.decode()[13: -1].replace('"', "'").replace(r"\'", r'\"'), '未执行'))
    db.insert(
        'INSERT into business (code, user, business, updatetime, project, business_detail, result) VALUES("{}", "从页面获取用户", "{}", "{}", "{}", "{}", "未执行")'.format(
            now, form_data[0]["business"], otherStyleTime, "以后会加二级菜单做项目分类直接获取",
            a.decode()[13: -1].replace('"', "'").replace(r"\'", r'\"'), '未执行'))
    list = db.read_many("select * from business order by id desc")
    db.close()
    return {'list': list}  # AJAX接收字典


# 分页跳转查询数据
@app.route('/page', methods=['POST'])
def page():
    a = request.get_data()  # 得到JavaScript发送的字符串流
    pageno = (int(json.loads(a)['pageIndex']) - 1) * 10
    db = Db(host='localhost', port=3306, user='root', password='root', db='platform_db')
    list = db.read_many("select * from business order by id desc limit " + str(pageno) + ",10")
    db.close()
    return {'list': list}  # AJAX接收字典


# 运行
@app.route('/run', methods=['POST'])
def run():
    # time获取当前时间戳
    now = int(time.time())  # 1533952277
    timeArray = time.localtime(now)
    otherStyleTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArray)
    a = request.get_data()  # 得到JavaScript发送的字符串流
    form_data = json.loads(a)  # 将bytes变成dict
    db = Db(host='localhost', port=3306, user='root', password='root', db='platform_db')
    sqlform_data = db.read_one(
        "select * from business where code='{}'".format(form_data['code']))
    db.update('update business set updatetime="{}" where code="{}"'.format(otherStyleTime, form_data['code']))
    data_list = ast.literal_eval(sqlform_data['business_detail'])
    with open('testData.txt', 'w', encoding='utf8') as f:
        f.write(str(data_list))
    # bool = BaseOperate().operate(data_list)
    result = UnittestCase().main_run()  #返回report地址和bool
    if result[1] == True:
        db.update("update business set result='{}', report='{}' where code='{}'".format('Success', result[0], form_data['code']))
    else:
        db.update("update business set result='{}', report='{}' where code='{}'".format('Fail', result[0], form_data['code']))
    db.close()
    return {'result': result[1], 'report_path': result[0]}

@app.route('/report/<url>')
def report(url):
    return render_template('/report/'+url)


# 编辑提交
@app.route('/edit_update', methods=['POST'])
def edit():
    a = request.get_data()  # 得到JavaScript发送的字符串流
    form_data = json.loads(a)  # 将bytes变成dict
    byte_data = bytes(str(form_data['form_data']), encoding='utf8')
    db = Db(host='localhost', port=3306, user='root', password='root', db='platform_db')
    print('update business set business="{}", business_detail="{}" WHERE code="{}"'.format(
        form_data['form_data'][0]['business'], byte_data.decode().replace('"', r'\"'), form_data['code']))
    db.update(
        'update business set business="{}", business_detail="{}" WHERE code="{}"'.format(
            form_data['form_data'][0]['business'], byte_data.decode().replace('"', r'\"'), form_data['code']))
    pageno = (int(form_data['page_now']) - 1) * 10  # 将bytes变成dict,计算第pageno页显示的索引
    list = db.read_many("select * from business order by id desc limit " + str(pageno) + ",10")
    db.close()
    return {'list': list}  # AJAX接收字典


# 编辑
@app.route('/edit', methods=['POST'])
def edit_sub():
    a = request.get_data()  # 得到JavaScript发送的字符串流
    form_data = json.loads(a)  # 将bytes变成dict
    db = Db(host='localhost', port=3306, user='root', password='root', db='platform_db')
    list = db.read_one(
        "select * from business where code='{}'".format(form_data['code']))
    db.close()
    print(list['business_detail'])
    print(list['business_detail'].replace('\\', ''))
    return {'list': eval(list['business_detail'].replace('\\', ''))}


@app.route('/index')
def index():
    return redirect(url_for('init'))


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
