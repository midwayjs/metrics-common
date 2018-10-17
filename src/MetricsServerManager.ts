import {
  ICounter, IFastCompass,
  IHistogram,
  IMeter,
  IMetricsRegistry,
  ITimer,
  Metric,
  MetricFilter,
  MetricName,
  MetricsManager,
  MetricsRegistry,
  MetricType,
} from './index';

export class MetricsServerManager implements MetricsManager {

  allMetricsRegistry: IMetricsRegistry = this.getNewMetricRegistry();

  metricRegistryMap: Map<string, IMetricsRegistry> = new Map();

  clientId: string = Math.random().toString(35).substr(2, 10);

  logger = <any>console;

  enabled = true;

  getMetric(name: MetricName): Metric {
    return this.allMetricsRegistry.getMetric(name);
  }

  getAllMetricsRegistry() {
    return this.allMetricsRegistry;
  }

  register(group: string, name: MetricName | string, metric: Metric) {
    if (!this.enabled) {
      return;
    }

    let newName;
    if (typeof name === 'string') {
      newName = MetricName.build(name);
    } else {
      newName = name;
    }

    // register to all first
    this.allMetricsRegistry.register(newName, metric);

    // register to name second
    const metricRegistry: IMetricsRegistry = this.getMetricRegistryByGroup(group);
    metricRegistry.register(newName, metric);
  }

  getMetricRegistryByGroup(group: string): IMetricsRegistry {
    if (!this.metricRegistryMap.has(group)) {
      this.metricRegistryMap.set(group, this.getNewMetricRegistry());
    }
    return this.metricRegistryMap.get(group);
  }

  hasMetricRegistryByGroup(group: string): boolean {
    return this.metricRegistryMap.has(group);
  }

  getGauges(group: string, filter: MetricFilter = MetricFilter.ALL) {
    let metricRegistry: IMetricsRegistry = this.getMetricRegistryByGroup(group);
    return metricRegistry.getGauges(filter);
  }

  getCounters(group: string, filter: MetricFilter = MetricFilter.ALL) {
    let metricRegistry: IMetricsRegistry = this.getMetricRegistryByGroup(group);
    return metricRegistry.getCounters(filter);
  }

  getHistograms(group: string, filter: MetricFilter = MetricFilter.ALL) {
    let metricRegistry: IMetricsRegistry = this.getMetricRegistryByGroup(group);
    return metricRegistry.getHistograms(filter);
  }

  getMeters(group: string, filter: MetricFilter = MetricFilter.ALL) {
    let metricRegistry: IMetricsRegistry = this.getMetricRegistryByGroup(group);
    return metricRegistry.getMeters(filter);
  }

  getTimers(group: string, filter: MetricFilter = MetricFilter.ALL) {
    let metricRegistry: IMetricsRegistry = this.getMetricRegistryByGroup(group);
    return metricRegistry.getTimers(filter);
  }

  getFastCompasses(group: string, filter?: MetricFilter): Map<string, IFastCompass> {
    let metricRegistry: IMetricsRegistry = this.getMetricRegistryByGroup(group);
    return metricRegistry.getFastCompasses(filter);
  }

  getMetrics(group: string): Map<string, Metric> {
    let metricRegistry: IMetricsRegistry = this.metricRegistryMap.get(group);
    if (metricRegistry) {
      return metricRegistry.getMetrics();
    }
    return new Map();
  }

  getCategoryMetrics(group: string, filter: MetricFilter = MetricFilter.ALL): Map<string, Map<string, Metric>> {
    const metricRegistry = this.metricRegistryMap.get(group);
    const result: Map<string, Map<string, Metric>> = new Map();

    result.set(MetricType.GAUGE, metricRegistry.getGauges(filter));
    result.set(MetricType.COUNTER, metricRegistry.getCounters(filter));
    result.set(MetricType.HISTOGRAM, metricRegistry.getHistograms(filter));
    result.set(MetricType.METER, metricRegistry.getMeters(filter));
    result.set(MetricType.TIMER, metricRegistry.getTimers(filter));

    return result;
  }

  getAllCategoryMetrics(filter: MetricFilter = MetricFilter.ALL): Map<string, Map<string, Metric>> {
    const result: Map<string, Map<string, Metric>> = new Map();
    const allMetricsRegistry = this.getAllMetricsRegistry();

    result.set(MetricType.GAUGE, allMetricsRegistry.getGauges(filter));
    result.set(MetricType.COUNTER, allMetricsRegistry.getCounters(filter));
    result.set(MetricType.HISTOGRAM, allMetricsRegistry.getHistograms(filter));
    result.set(MetricType.METER, allMetricsRegistry.getMeters(filter));
    result.set(MetricType.TIMER, allMetricsRegistry.getTimers(filter));

    return result;
  }

  listMetricGroups() {
    return Array.from(this.metricRegistryMap.keys());
  }

  isEnabled() {
    return !!this.enabled;
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  setLogger(logger) {
    this.logger = logger;
  }

  listMetricNamesByGroup() {
    if (!this.enabled) {
      return new Map();
    }

    let result = new Map();

    for (let [ group, metricRegistry ] of this.metricRegistryMap.entries()) {
      result.set(group, metricRegistry.getMetricNames());
    }
    return result;
  }

  getMeter(group: string, name: MetricName): IMeter {
    const meter = this.getMetricRegistryByGroup(group).meter(name);
    this.allMetricsRegistry.register(name, meter);
    return meter;
  }

  getCounter(group: string, name: MetricName): ICounter {
    const counter = this.getMetricRegistryByGroup(group).counter(name);
    this.allMetricsRegistry.register(name, counter);
    return counter;
  }

  getHistogram(group: string, name: MetricName): IHistogram {
    const histogram = this.getMetricRegistryByGroup(group).histogram(name);
    this.allMetricsRegistry.register(name, histogram);
    return histogram;
  }

  getTimer(group: string, name: MetricName): ITimer {
    const timer = this.getMetricRegistryByGroup(group).timer(name);
    this.allMetricsRegistry.register(name, timer);
    return timer;
  }

  getFastCompass(group: string, name: MetricName): IFastCompass {
    const compass = this.getMetricRegistryByGroup(group).fastCompass(name);
    this.allMetricsRegistry.register(name, compass);
    return compass;
  }

  getNewMetricRegistry(): IMetricsRegistry {
    return new MetricsRegistry();
  }

}
