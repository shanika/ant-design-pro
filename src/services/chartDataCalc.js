/* eslint-disable no-param-reassign */
export function groupBy(xs, key) {
  return xs && xs.length > 0
    ? xs.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {})
    : {};
}

function avg(arr) {
  if (arr && arr.length > 0) {
    return arr.reduce((acc = 0, val) => acc + val) / arr.length;
  }
  return 0;
}

function max(arr) {
  if (arr && arr.length > 0) {
    return arr.reduce((acc = 0, curr) => (acc > curr ? acc : curr));
  }

  return 0;
}

export function calculateMetricCharts(metric) {
  const timestamps = Object.keys(metric)
    .map(t => parseInt(t, 10))
    .sort((i, j) => i - j);

  const groupedBySample = groupBy(timestamps.map(t => metric[`${t}`]).flatMap(d => d), 'label');

  /**
   * Users data series
   * @type {any[][]}
   */
  const users = timestamps.map(t => [t, metric[`${t}`].find(l => l.label === 'All').avUsers]);

  /**
   * Hits data series
   * @type {any[][]}
   */
  const hits = timestamps.map(t => [t, metric[`${t}`].find(l => l.label === 'All').hitsPs]);

  /**
   * Error percentage data series
   * @type {any[][]}
   */
  const errorPer = timestamps.map(t => [t, metric[`${t}`].find(l => l.label === 'All').error]);

  /**
   * Response times All data series
   * @type {any[][]}
   */
  const responseTime = timestamps.map(t => [t, metric[`${t}`].find(l => l.label === 'All').resp]);

  /**
   * Response times multiple data series by Sample
   * @type {{name: string, data: *, type: string}[]}
   */
  const responseTimes = Object.keys(groupedBySample).map(k => ({
    name: k,
    data: groupedBySample[k].map(s => [s.x, Math.round(s.resp * 100) / 100]),
    type: 'line',
  }));

  /**
   * Maximum users
   * @type {any}
   */
  const maximumUsers = max(
    timestamps.map(t => metric[`${t}`].find(l => l.label === 'All').avUsers)
  );

  /**
   * Average hits per second
   * @type {any}
   */
  const avgHitsPerSec = avg(
    timestamps.map(t => metric[`${t}`].find(l => l.label === 'All').hitsPs)
  );

  /**
   * Average error percentage
   * @type {any}
   */
  const avgErrorPer = avg(timestamps.map(t => metric[`${t}`].find(l => l.label === 'All').error));

  /**
   * Average response time
   * @type {any}
   */
  const avgResponseTime = avg(
    timestamps.map(t => metric[`${t}`].find(l => l.label === 'All').resp)
  );

  // TODO Set network usage
  const avgNetworkUsage = 0;

  return {
    users,
    hits,
    errorPer,
    responseTime,
    responseTimes,
    maximumUsers,
    avgHitsPerSec,
    avgErrorPer,
    avgResponseTime,
    avgNetworkUsage,
  };
}

export function calculateUsageCharts(usage) {
  const data = Object.keys(usage).flatMap(k => usage[k]);
  const groupedByNode = groupBy(data, 'node');

  const cpu = Object.keys(groupedByNode).map(k => ({
    name: k,
    data: groupedByNode[k].map(s => [s.timestamp, Math.round(s.cpu * 100) / 100]),
    type: 'line',
  }));

  const memory = Object.keys(groupedByNode).map(k => ({
    name: k,
    data: groupedByNode[k].map(s => [s.timestamp, Math.round(s.memory * 100) / 100]),
    type: 'line',
  }));

  const network = Object.keys(groupedByNode).map(k => ({
    name: k,
    data: groupedByNode[k].map(s => [s.timestamp, s.network * 100]),
    type: 'line',
  }));

  return {
    cpu,
    memory,
    network,
  };
}
