import { MetricsServerManager } from '../../src/MetricsServerManager';
import { expect } from 'chai';
import { BaseCounter, BaseGauge, BaseHistogram, BaseMeter, BaseTimer, MetricName } from '../../src';

describe('/test/unit/MetricsServerManager.test.ts', () => {

  let server;

  before((done) => {
    server = new MetricsServerManager();
    setTimeout(done, 100);
  });

  it('test server base method', () => {
    expect(server.isEnabled()).to.be.true;
    server.setEnabled(false);
    expect(server.isEnabled()).to.be.false;
    server.setEnabled(true);
    server.setLogger(console);

    expect(server.getGauges('empty').size).to.equal(0);
    expect(server.getHistograms('empty').size).to.equal(0);
    expect(server.getCounters('empty').size).to.equal(0);
    expect(server.getTimers('empty').size).to.equal(0);
    expect(server.getMeters('empty').size).to.equal(0);
  });


  it('register counter metric', (done) => {
    let counter = new BaseCounter();
    let name = MetricName.build('test.qps.count');
    server.register('test', name, counter);
    counter.inc(5);
    counter.inc(5);
    counter.inc(5);
    counter.inc(5);

    setTimeout(() => {
      expect((<BaseCounter>server.getMetric(name)).getCount()).to.equal(20);
      done();
    }, 10);
  });

  it('register gauge metric', (done) => {
    let name = MetricName.build('test.qps.gauge.value');
    server.register('test', name, <BaseGauge<number>> {
      getValue() {
        return 100;
      }
    });

    setTimeout(async () => {
      let result = await (<BaseGauge<any>>server.getMetric(name)).getValue();
      expect(result).to.equal(100);
      done();
    }, 10);
  });

  it('register other metric', () => {
    let timer = new BaseTimer();
    server.register('test_extra', MetricName.build('test.qps.timer'), timer);

    let histogram = new BaseHistogram();
    server.register('test_extra', MetricName.build('test.qps.histogram'), histogram);

    let meter = new BaseMeter();
    server.register('test_extra', MetricName.build('test.qps.meter'), meter);
  });


  it('register metric from server and client', (done) => {
    server.register('test1', MetricName.build('reporter.register.client.uv'), new BaseCounter());
    server.register('test2', MetricName.build('reporter.register.client.cpu'), <BaseGauge<number>> {
      getValue() {
        return 100;
      }
    });

    server.register('test1', MetricName.build('reporter.register.pv'), new BaseCounter());
    server.register('test2', MetricName.build('reporter.register.mem'), <BaseGauge<number>> {
      getValue() {
        return 1;
      }
    });

    setTimeout(() => {
      expect(server.listMetricGroups().length > 2).to.be.true;
      expect(server.getCounters('test1').size).to.equal(2);
      done();
    }, 10);
  });

  it('test get metric method', () => {
    const counter = server.getCounter('middleware', MetricName.build('reporter.test.counter'));
    expect(counter).to.be.an.instanceof(BaseCounter);

    const histogram = server.getHistogram('middleware', MetricName.build('reporter.test.histogram'));
    expect(histogram).to.be.an.instanceof(BaseHistogram);

    const timer = server.getTimer('middleware', MetricName.build('reporter.test.timer'));
    expect(timer).to.be.an.instanceof(BaseTimer);

    const meter = server.getMeter('middleware', MetricName.build('reporter.test.meter'));
    expect(meter).to.be.an.instanceof(BaseMeter);

    expect(server.listMetricNamesByGroup().size > 0).to.be.true;
    expect(server.listMetricNamesByGroup().get('middleware').length).to.equal(4);
    expect(server.getAllCategoryMetrics().size).to.equal(5);
  });


});
