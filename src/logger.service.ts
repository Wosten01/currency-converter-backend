import { LoggerService } from '@nestjs/common';

export class CustomLogger implements LoggerService {
  log(message: string) {
    const logMessage = `[LOG] ${new Date().toISOString()} - ${message}`;
    console.log(logMessage);
  }

  error(message: string, trace: string) {
    const errorMessage = `[ERROR] ${new Date().toISOString()} - ${message}\nTrace: ${trace}`;
    console.error(errorMessage);
  }

  warn(message: string) {
    const warnMessage = `[WARN] ${new Date().toISOString()} - ${message}`;
    console.warn(warnMessage);
  }

  debug(message: string) {
    const debugMessage = `[DEBUG] ${new Date().toISOString()} - ${message}`;
    console.debug(debugMessage);
  }

  verbose(message: string) {
    const verboseMessage = `[VERBOSE] ${new Date().toISOString()} - ${message}`;
    console.log(verboseMessage);
  }
}
