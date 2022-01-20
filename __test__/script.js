import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';
export const requests = new Counter('http_reqs');


export const options = {
  vus: 100,
  duration: '10s'
};

const getRandomProduct_id = () =>  Math.ceil(Math.random()*1000000);

export default function () {

    const res =  http.get(`http://localhost:3001/reviews/meta?product_id=${getRandomProduct_id}`);
    sleep(1);
    check(res, {
      'is status 200': (r) => r.status === 200,
      'transaction time < 10ms': (r) => r.timings.duration < 10,
      'transaction time < 15ms': (r) => r.timings.duration < 15,
      'transaction time < 18ms': (r) => r.timings.duration < 18,
      'transaction time < 20ms': (r) => r.timings.duration < 20,
      'transaction time < 30ms': (r) => r.timings.duration < 30,
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
      'transaction time < 270ms': (r) => r.timings.duration < 270,
      'transaction time < 300ms': (r) => r.timings.duration < 300,
      'transaction time < 400ms': (r) => r.timings.duration < 400,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 600ms': (r) => r.timings.duration < 600,
      'transaction time < 700ms': (r) => r.timings.duration < 700,
    });
  }
