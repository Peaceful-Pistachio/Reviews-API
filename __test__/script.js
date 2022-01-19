import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';
export const requests = new Counter('http_reqs');


export const options = {
  vus: 100,
  duration: '10s'
};

export default function () {
    const res =  http.get(`http://localhost:3001/reviews/meta?product_id=${Math.ceil(Math.random()*1000000)}`);
    sleep(1);
    check(res, {
      'is status 200': (r) => r.status === 200,
      'transaction time < 25ms': (r) => r.timings.duration < 25,
      'transaction time < 50ms': (r) => r.timings.duration < 50,
      'transaction time < 75ms': (r) => r.timings.duration < 75,
      'transaction time < 85ms': (r) => r.timings.duration < 85,
      'transaction time < 100ms': (r) => r.timings.duration < 100,
      'transaction time < 125ms': (r) => r.timings.duration < 125,
      'transaction time < 150ms': (r) => r.timings.duration < 150,
      'transaction time < 170ms': (r) => r.timings.duration < 170,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 210ms': (r) => r.timings.duration < 210,
      'transaction time < 220ms': (r) => r.timings.duration < 220,
      'transaction time < 250ms': (r) => r.timings.duration < 250,
    });
  }
