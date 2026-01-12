/**
 * Logger utility implementing Strategy Pattern
 * Follows Single Responsibility and Open/Closed Principles
 */

/**
 * Log levels enumeration
 */
const LogLevel = Object.freeze({
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3,
    TRACE: 4
});

/**
 * Abstract log formatter
 */
class LogFormatter {
    format(level, message, meta) {
        throw new Error('format method must be implemented');
    }
}

/**
 * JSON log formatter
 */
class JsonFormatter extends LogFormatter {
    format(level, message, meta) {
        return JSON.stringify({
            timestamp: new Date().toISOString(),
            level: Object.keys(LogLevel)[level],
            message,
            ...meta
        });
    }
}

/**
 * Simple text formatter
 */
class TextFormatter extends LogFormatter {
    format(level, message, meta) {
        const timestamp = new Date().toISOString();
        const levelName = Object.keys(LogLevel)[level];
        const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
        return `[${timestamp}] ${levelName}: ${message}${metaStr}`;
    }
}

/**
 * Abstract log transport
 */
class LogTransport {
    constructor(formatter = new TextFormatter()) {
        this.formatter = formatter;
    }

    log(level, message, meta) {
        throw new Error('log method must be implemented');
    }
}

/**
 * Console transport
 */
class ConsoleTransport extends LogTransport {
    log(level, message, meta) {
        const formattedMessage = this.formatter.format(level, message, meta);
        
        switch (level) {
            case LogLevel.ERROR:
                console.error(formattedMessage);
                break;
            case LogLevel.WARN:
                console.warn(formattedMessage);
                break;
            case LogLevel.DEBUG:
            case LogLevel.TRACE:
                console.debug(formattedMessage);
                break;
            default:
                console.log(formattedMessage);
        }
    }
}

/**
 * File transport (simplified for browser/Node.js compatibility)
 */
class FileTransport extends LogTransport {
    constructor(formatter = new JsonFormatter()) {
        super(formatter);
        this.logs = [];
    }

    log(level, message, meta) {
        const formattedMessage = this.formatter.format(level, message, meta);
        this.logs.push(formattedMessage);
        
        // In a real implementation, this would write to a file
        // For now, we'll just store in memory
    }

    getLogs() {
        return [...this.logs];
    }

    clearLogs() {
        this.logs = [];
    }
}

/**
 * Main Logger class implementing Singleton Pattern
 */
class Logger {
    constructor() {
        if (Logger.instance) {
            return Logger.instance;
        }

        this.level = LogLevel.INFO;
        this.transports = [new ConsoleTransport()];
        Logger.instance = this;
    }

    /**
     * Set log level
     * @param {number} level - Log level
     */
    setLevel(level) {
        if (typeof level !== 'number' || level < 0 || level > 4) {
            throw new Error('Invalid log level');
        }
        this.level = level;
    }

    /**
     * Add transport
     * @param {LogTransport} transport - Log transport
     */
    addTransport(transport) {
        if (!(transport instanceof LogTransport)) {
            throw new Error('Transport must be an instance of LogTransport');
        }
        this.transports.push(transport);
    }

    /**
     * Remove all transports
     */
    clearTransports() {
        this.transports = [];
    }

    /**
     * Log message with specified level
     * @param {number} level - Log level
     * @param {string} message - Log message
     * @param {Object} meta - Additional metadata
     */
    log(level, message, meta = {}) {
        if (level <= this.level) {
            this.transports.forEach(transport => {
                try {
                    transport.log(level, message, meta);
                } catch (error) {
                    console.error('Transport error:', error);
                }
            });
        }
    }

    /**
     * Log error message
     * @param {string} message - Error message
     * @param {Object} meta - Additional metadata
     */
    error(message, meta = {}) {
        this.log(LogLevel.ERROR, message, meta);
    }

    /**
     * Log warning message
     * @param {string} message - Warning message
     * @param {Object} meta - Additional metadata
     */
    warn(message, meta = {}) {
        this.log(LogLevel.WARN, message, meta);
    }

    /**
     * Log info message
     * @param {string} message - Info message
     * @param {Object} meta - Additional metadata
     */
    info(message, meta = {}) {
        this.log(LogLevel.INFO, message, meta);
    }

    /**
     * Log debug message
     * @param {string} message - Debug message
     * @param {Object} meta - Additional metadata
     */
    debug(message, meta = {}) {
        this.log(LogLevel.DEBUG, message, meta);
    }

    /**
     * Log trace message
     * @param {string} message - Trace message
     * @param {Object} meta - Additional metadata
     */
    trace(message, meta = {}) {
        this.log(LogLevel.TRACE, message, meta);
    }

    /**
     * Create child logger with context
     * @param {Object} context - Context to add to all logs
     * @returns {Object} Child logger
     */
    child(context = {}) {
        const parentLogger = this;
        
        return {
            error: (message, meta = {}) => parentLogger.error(message, { ...context, ...meta }),
            warn: (message, meta = {}) => parentLogger.warn(message, { ...context, ...meta }),
            info: (message, meta = {}) => parentLogger.info(message, { ...context, ...meta }),
            debug: (message, meta = {}) => parentLogger.debug(message, { ...context, ...meta }),
            trace: (message, meta = {}) => parentLogger.trace(message, { ...context, ...meta })
        };
    }
}

// Export classes and singleton instance
export { 
    Logger, 
    LogLevel, 
    LogFormatter, 
    JsonFormatter, 
    TextFormatter, 
    LogTransport, 
    ConsoleTransport, 
    FileTransport 
};

export default new Logger();