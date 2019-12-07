#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time : 2019/12/6 15:17
# @Author : Wancheng.b
# @File : UnittestCase.py
# @Software: PyCharm
import json
import os
import time
import unittest
from HTMLTestRunner import HTMLTestRunner

from public.BaseOperate import BaseOperate

projectpath = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
with open(projectpath + '/testData.txt', 'r', encoding='utf8')as f:
    data_list = f.readlines()
    data_list = eval(data_list[0])
    print(type(data_list))
    print(data_list)


class UnittestCase(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        print('开始执行案例')

    def test_case(self):
        print('进入test_case')
        BaseOperate().operate(data_list)

    def main_run(self):
        report_path = ''
        try:
            title = data_list[0]['business']
            suite = unittest.TestSuite()
            suite.addTest(UnittestCase('test_case'))
            title_time = title + time.strftime('%Y%m%d%H%M%S')
            fp = open(projectpath + '\\report\\' + title_time + '.html', "wb")
            runner = HTMLTestRunner(stream=fp, title='测试报告-添加商品综合业务流', description='-添加商品综合业务流')
            runner.run(suite)
            fp.close()
            report_path = 'http://localhost:63342/PlatformUI/report/'+title_time+ '.html'
            print(report_path)
            return report_path, True
        except:
            print(report_path)
            return report_path, False


if __name__ == '__main__':
    print(projectpath)
    # unittest.main()
    UnittestCase().main_run()
