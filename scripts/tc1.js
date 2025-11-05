// 1. Inicialização
import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/latest/dist/bundle.js'

// 2. Configuração
export const options = {
    vus: 100,
    duration: '1m',
    thresholds: {
        checks: ['rate > 0.05']
    }
}

// 3. Execução // Código VU
export default function(){
    const BASE_URL = 'https://fakerestapi.azurewebsites.net/api/v1/Authors';
    const res = http.get(BASE_URL);
    check(res, {
        'status code 200': (r) => r.status === 200
    });
    sleep(1);
}

// 4. Desmontagem // Fase opcional
export function handleSummary(data) {
  return {
    'index.html': htmlReport(data),
  }
}