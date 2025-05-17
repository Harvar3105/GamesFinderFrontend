import winston from 'winston';
import path from 'path';

const logger = winston.createLogger({
    level: 'info', // levels    : error, warn, info, http, verbose, debug, silly
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.printf(({ level, message, timestamp, ...meta }) => {
            let extra = '';

            if (typeof message === 'object') {
                message = JSON.stringify(message);
            }

            if (Object.keys(meta).length > 0) {
                extra = ' | ' + JSON.stringify(meta);
            }

            return `[${timestamp}] ${level.toUpperCase()}: ${message}${extra}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // вывод в консоль
        new winston.transports.File({ filename: path.join('logs', 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join('logs', 'combined.log') }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
        level: 'debug',
    }));
}

export default logger;