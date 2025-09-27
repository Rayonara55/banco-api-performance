import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
 
  stages: [
     {duration: '10s', target:10},
     {duration: '20s', target:10},
     {duration: '10s', target:30},
     {duration: '20s', target:30},

  ],


  thresholds:{
      
      http_req_duration: ['p(90)<3000', 'max<5000'],
      //http_req_failed: ['rate<0.01']

  }
};

export default function () {
  const url = 'http://localhost:8000/snap/informacoes/cpf';

  const payload = JSON.stringify({
    cpf: '10091128480',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);
 //o check n é p definir se o teste passou ou falhou, check são apenas p saber funcionamente sua api ta ok
  check(res, {
    'Validar que o status é 202': (r) => r.status === 202,
  });

  sleep(1);
}
