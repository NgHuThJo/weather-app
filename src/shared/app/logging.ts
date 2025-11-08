type LoggerLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

class Logger {
  #level: LoggerLevel;

  constructor() {
    this.#level = "DEBUG";
  }

  public setLevel(level: LoggerLevel) {
    this.#level = level;
  }

  public log(...args: any[]) {
    switch (this.#level) {
      case "DEBUG": {
        console.trace(...args);
        break;
      }
      case "INFO": {
        console.info(...args);
        break;
      }
      case "WARN": {
        console.warn(...args);
        break;
      }
      case "ERROR": {
        console.error(...args);
        break;
      }
    }
  }
}

export const logger = new Logger();
