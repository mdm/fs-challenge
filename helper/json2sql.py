#!/usr/bin/python3

import json
import re
import decimal

def write_records(sql_file, records):
    head = """INSERT INTO items
(id, city, start_date, end_date, price, status, color)
VALUES
"""
    sql_file.write(head)
    for record in records[:-1]:
        sql_file.write('({}, {}, {}, {}, {}, {}, {}),\n'.format(*record))
    sql_file.write('({}, {}, {}, {}, {}, {}, {});\n'.format(*records[-1]))

def read_and_convert_records(json_file):
    records = []
    data = json.load(json_file)
    for record in data:
        records.append([
            record['id'],
            wrap(record['city']),
            convert_date(record['start_date']),
            convert_date(record['end_date']),
            decimal.Decimal(record['price']) * 100,
            wrap(record['status']),
            wrap(record['color']),
        ])
    return records

def convert_date(date):
    match = re.match('(\d{1,2})\/(\d{1,2})\/(\d{4})', date)
    return wrap(match.group(3) + '-' + match.group(1) + '-' + match.group(2))

def wrap(value):
    return "'" + value.replace("'", "\\'") + "'"


### main program

with open('data.json') as json_file:
    records = read_and_convert_records(json_file)
with open('initdb/20data.sql', 'w') as sql_file:
    write_records(sql_file, records)

