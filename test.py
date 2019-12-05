#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time : 2019/11/21 18:31
# @Author : Wancheng.b
# @File : test.py
# @Software: PyCharm
from flask import Flask, render_template
from wtforms import StringField, validators, SubmitField, IntegerField
from wtforms.validators import Required

app = Flask(__name__)


@app.route('/')
def login():
    return render_template("base.html")

@app.route("/login",methods=['GET','POST'])
def MockController():
    print('login')

    user_email = StringField("email address", [validators.Email()])
    submit = SubmitField("Submit")
    alias = StringField("alias for api")
    print(user_email, submit)
    return render_template("index.html")
if __name__ == '__main__':
    # app.run(debug=True)
    str = 'asdf'
    print(str[1:-1])
