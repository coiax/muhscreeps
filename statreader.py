#!/usr/bin/env python
from __future__ import division, print_function

import json
import argparse
import operator

def get_values(entry):
    L = []
    for d in entry["values"]:
        L.append(d["used"])
    return L

def mean(L):
    sum = 0
    for i in L:
        sum += i
    return sum / len(L)

def stddev(L):
    avg = mean(L)
    L2 = []
    for i in L:
        L2.append((i - avg)**2)
    avg2 = mean(L2)
    return avg2 ** 0.5

parser = argparse.ArgumentParser()
parser.add_argument('-f', '--statfile', default="stats.json")
args = parser.parse_args()

with open(args.statfile) as f:
    memory = json.load(f)

tasks = memory["cpu"]["tasks"]

stats = []
for task_name, task in tasks.items():
    values = get_values(task)
    avg = mean(values)
    sd = stddev(values)
    stats.append((task_name, avg, sd))

stats.sort(key=operator.itemgetter(1,2),reverse=True)
print(stats)
