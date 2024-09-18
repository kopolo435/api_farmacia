import log4js from "log4js";

const logToFile = log4js.getLogger("file");
const logToConsole = log4js.getLogger("console");
const logError = log4js.getLogger("error");

export { logToFile, logToConsole, logError };
