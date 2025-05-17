import winston from 'winston';
import path from 'path';
import util from 'util';

const logger = winston.createLogger({
    level: 'info', // levels    : error, warn, info, http, verbose, debug, silly
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.printf(({ level, message, timestamp, ...meta  }) => {
            let formattedMessage;

            if (typeof message === 'object') {
                formattedMessage = util.inspect(message, { depth: null, colors: false });
            } else {
                formattedMessage = message;
            }

            let metaString = '';
            if (Object.keys(meta).length > 0) {
                try {
                    metaString = ' | ' + util.inspect(meta, { depth: null, colors: false });
                } catch (e) {
                    metaString = ' | [Unserializable meta]';
                }
            }

            return `[${timestamp}] ${level.toUpperCase()}: ${formattedMessage}${metaString}`;
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