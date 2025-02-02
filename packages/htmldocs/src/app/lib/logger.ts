type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

class Logger {
  private static instance: Logger;
  private currentLevel: LogLevel;

  private constructor() {
    // Default to 'info' if not set
    this.currentLevel = (process.env.LOG_LEVEL as LogLevel) || 'info';
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public setLevel(level: LogLevel): void {
    this.currentLevel = level;
  }

  public getLevel(): LogLevel {
    return this.currentLevel;
  }

  private shouldLog(level: LogLevel): boolean {
    // Only log if the message's level is >= current level
    return LOG_LEVELS[level] >= LOG_LEVELS[this.currentLevel];
  }

  public debug(...args: any[]): void {
    if (!this.shouldLog('debug')) {
      return;
    }
    console.debug(...args);
  }

  public info(...args: any[]): void {
    if (!this.shouldLog('info')) {
      return;
    }
    console.info(...args);
  }

  public warn(...args: any[]): void {
    if (!this.shouldLog('warn')) {
      return;
    }
    console.warn(...args);
  }

  public error(...args: any[]): void {
    if (!this.shouldLog('error')) {
      return;
    }
    console.error(...args);
  }
}

// Export a singleton instance
const logger = Logger.getInstance();
export default logger;

