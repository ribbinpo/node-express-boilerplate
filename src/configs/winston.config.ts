import { createLogger, format, transports } from "winston";

// const levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6,
// };

const logger = createLogger({
  level: "info", // log only if level is less than or equal to this level
  format: format.combine(
    // format.colorize(),
    format.label({ label: "right meow!" }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.prettyPrint()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

export default logger;