// worker.js
import { parentPort } from "worker_threads";

// Simulación de proceso intensivo
let total = 0;
for (let i = 0; i < 20_000_000; i++) {
    total++;
}

// Envía el resultado de vuelta al proceso principal
parentPort.postMessage(total);

