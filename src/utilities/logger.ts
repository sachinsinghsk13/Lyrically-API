import { createLogger, format, transports } from "winston"
import { addColors } from "winston/lib/winston/config";
import path from 'path';
import util from 'util';
import dateformat from 'dateformat';

let myFomatter = format.printf((options) => {
    return `[${options.level}]\t[${options.label}]\t${dateformat(new Date(options.timestamp))}\t${options.message}`;
});


const createModuleLogger = (moduleName) => {
    let colors = { error: 'red', warn: 'yellow', info: 'cyan', debug: 'green' };
    addColors(colors);
    const logger = createLogger({
        transports: [
            new transports.Console({
                level: 'debug',
                format: format.combine(
                    format.timestamp(),
                    format.label({ label: moduleName }),
                    format.prettyPrint(),
                    format.splat(),
                    format.simple(),
                    myFomatter
                )
            }),
            new transports.File({
                filename: path.join('./', process.env.LOGGER_DIR, 'server.log'),
                format: format.combine(
                    format.timestamp(),
                    format.label({ label: moduleName }),
                    myFomatter,
                )
            })
        ]
    });
    return logger;
}

export default createModuleLogger;