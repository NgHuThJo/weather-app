type LogLevels = {
  DEBUG: 0;
  INFO: 1;
  WARN: 2;
  ERROR: 3;
};

const LogLevels: LogLevels = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

class Logger {
  #level: (typeof LogLevels)[keyof typeof LogLevels];

  constructor() {
    this.#level =
      process.env.NODE_ENV === "production" ? LogLevels.ERROR : LogLevels.DEBUG;
  }

  public setLevel(level: (typeof LogLevels)[keyof typeof LogLevels]) {
    this.#level = level;
  }

  public log(message: string, ...args: any[]) {
    switch (this.#level) {
      case LogLevels.DEBUG: {
        console.debug(`[DEBUG] ${message}`, ...args);
        break;
      }
      case LogLevels.INFO: {
        console.info(`[INFO] ${message}`, ...args);
        break;
      }
      case LogLevels.WARN: {
        console.warn(`[WARN] ${message}`, ...args);
        break;
      }
      case LogLevels.ERROR: {
        console.error(`[ERROR] ${message}`, ...args);
        break;
      }
    }
  }
}

export const logger = new Logger();
