#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time : 2019/11/22 15:33
# @Author : Wancheng.b
# @File : Db.py
# @Software: PyCharm
import pymysql


class Db(object):
    def __init__(self, host, port, user, password, db=''):
        self.host = host
        self.port = port
        self.user = user
        self.password = password
        self.dbname = db
        self.charset = 'utf8'
        # 链接数据库
        self.connect()

    def connect(self):
        # 链接数据库和获取游标
        self.db = pymysql.connect(host=self.host, port=self.port, user=self.user, password=self.password,
                                  db=self.dbname, charset=self.charset)
        self.cursor = self.db.cursor(cursor=pymysql.cursors.DictCursor)

    def run(self, sql):
        ret = None
        try:
            ret = self.cursor.execute(sql)
            self.db.commit()
        except Exception as e:
            print(repr(e))
            self.db.rollback()
        # finally:
        #     self.close()
        return ret

    def close(self):
        self.cursor.close()
        self.db.close()

    def insert(self, sql):
        return self.run(sql)

    def update(self, sql):
        return self.run(sql)

    def delete(self, sql):
        return self.run(sql)

    def read_one(self, sql):
        ret = None
        try:
            self.cursor.execute(sql)
            # 获取得到数据
            ret = self.cursor.fetchone()
        except Exception as e:
            print('查询失败')
        # finally:
        #     self.close()
        return ret

    def read_many(self, sql):
        ret = None
        try:
            self.cursor.execute(sql)
            # 获取得到数据
            ret = self.cursor.fetchall()
        except Exception as e:
            print('查询失败')
            print(repr(e))
        # finally:
        #     self.close()
        return ret

if __name__ == '__main__':
    print(Db(host='localhost', port=3306, user='root', password='root', db='platform_db').read_one("SELECT * from business WHERE business='qwer' and project='中台'"))
