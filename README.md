# Metrics Common

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/midwayjs/metrics-common/blob/master/LICENSE)
[![GitHub tag](https://img.shields.io/github/tag/midwayjs/metrics-common.svg)]()
[![Build Status](https://travis-ci.org/midwayjs/metrics-common.svg?branch=master)](https://travis-ci.org/midwayjs/metrics-common)
[![Test Coverage](https://img.shields.io/codecov/c/github/midwayjs/metrics-common/master.svg)](https://codecov.io/gh/midwayjs/metrics-common/branch/master)
[![Package Quality](http://npm.packagequality.com/shield/metrics-common.svg)](http://packagequality.com/#?package=metrics-common)
[![Known Vulnerabilities](https://snyk.io/test/npm/metrics-common/badge.svg)](https://snyk.io/test/npm/metrics-common)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/midwayjs/metrics-common/pulls)

## Overview

Metrics 的原意是 **指标**，用于反馈应用的当前状况的数据值，所以 Metrics 最后的结果都是**数字**。

在业界标准的 Metrics 类型中，有几种标准的类型。

- Gauge 瞬时值
- Counter 计数器
- Meter 吞吐率度量器
- Histogram 直方分布度量器

本包扩展出一堆基础 Metrics 指标的实现。

包括常见的 Gauge, Counter, Timer, Histogram, Meter，以及扩展出来的 BucketCounter, FastCompass 等。

## Install

```shell
npm i metrics-common --save
```

## Usage

```js
import { MetricsServerManager } from 'metrics-common';

const manager = new MetricsServerManager();

const app = koa();

app.use(async (ctx) => {
  const counter = manager.getCounter('system', 'test.system.counter');
  const histogram = manager.getHistogram('system', 'test.system.histogram');
  const timer = manager.getTimer('system', 'test.system.timer');
  const meter = manager.getMeter('system', 'test.system.meter');
  const fastcompass = manager.getFastCompass('system', 'test.system.fastcompass');
  counter.inc();
});

```
