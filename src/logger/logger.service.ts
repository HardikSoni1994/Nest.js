import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
    log(message: string): void {
        const timestemp = new Date().toISOString();
        console.log(`[${timestemp}] ${message}`);
    }

    error(message: string): void {
        const timestemp = new Date().toISOString();
        console.error(`[${timestemp}] ERROR: ${message}`);
    }
}
