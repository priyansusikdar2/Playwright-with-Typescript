/**
 * Logger: Lightweight structured test logger utility
 */
export class Logger {
  static info(message: string, context?: any): void {
    const timestamp = new Date().toISOString();
    console.log(`[INFO]  [${timestamp}] ${message}`, context !== undefined ? context : '');
  }

  static warn(message: string, context?: any): void {
    const timestamp = new Date().toISOString();
    console.warn(`[WARN]  [${timestamp}] ${message}`, context !== undefined ? context : '');
  }

  static error(message: string, context?: any): void {
    const timestamp = new Date().toISOString();
    console.error(`[ERROR] [${timestamp}] ${message}`, context !== undefined ? context : '');
  }

  static step(stepNumber: number, description: string): void {
    console.log(`\n🔹 STEP ${stepNumber}: ${description}`);
  }
}
