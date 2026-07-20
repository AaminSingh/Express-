import {createLogger, format, transports} from "winston";
//             Winston

//                |
//      ------------------------
//      |            |          |
//  createLogger    format    transports
//      |             |          |
//  creates         styles     decides where
//  logger          logs       logs go
const {combine, timestamp, json, colorize} = format;

// Custom format for console logging with colors
const consoleLogFormat = format.combine(     // This decides: How should the console display the logs?
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    return `${level}: ${message}`;
  })
);

// Create a Winston logger
const logger = createLogger({
  level: "info",               // Print messages whose importance is INFO or MORE IMPORTANT.
  format: combine(colorize(), timestamp(), json()),          //Before saving or displaying my logs, what information should I include?
    transports: [
      new transports.Console({           //Show it in my terminal.
        format: consoleLogFormat,
      }),
      new transports.File({ filename: "app.log" }),            //Save it in a file called app.log
    ],
});

export default logger;   //default is for exporting a single value from a module. It can be imported with any name in another file.

//Keeping track of everything
//         ↓
//       Logging
//         ↓
// Information
// Errors
// Warnings
// Success Messages
//         ↓
// Store them properly
//         ↓
// Console + Log Files