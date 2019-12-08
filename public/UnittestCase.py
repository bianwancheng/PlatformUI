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




class UnittestCase(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        print('开始执行案例')

    def test_case(self):
        print('进入test_case')
        with open(projectpath + '/testData.txt', 'r', encoding='utf8')as f:
            data_list = f.readlines()
            data_list = eval(data_list[0])
            print(type(data_list))
            print(data_list)
        BaseOperate().operate(data_list)

    def main_run(self):
        report_path = ''
        try:
            with open(projectpath + '/testData.txt', 'r', encoding='utf8')as f:
                data_list = f.readlines()
                data_list = eval(data_list[0])

            title = data_list[0]['business']
            suite = unittest.TestSuite()
            suite.addTest(UnittestCase('test_case'))
            title_time = title + time.strftime('%Y%m%d%H%M%S')
            fp = open(projectpath + '\\templates\\report\\' + title_time + '.html', "wb")
            runner = HTMLTestRunner(stream=fp, title='测试报告-添加商品综合业务流', description='-添加商品综合业务流')
            ret = runner.run(suite)
            fp.close()
            report_path = title_time + '.html'
            print(report_path)
            # BaseOperate().operate(data_list)报异常的时候捕获不到异常不知道为什么暂时用ret.error_count, ret.failure_count作为返回依据
            if ret.error_count==0 and ret.failure_count==0:
                return report_path, True
            else:
                return report_path, False
        except:
            print(report_path)
            return report_path, False


if __name__ == '__main__':
    print(projectpath)
    # unittest.main()
    ret = UnittestCase().main_run()
    print(ret)
