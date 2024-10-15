
import { assert } from "chai";
import { logger } from "../../logError/logfile.js";
import chalk from "chalk";

function errorMessageEconnrefused(error, url){
    if (error.code === 'ECONNREFUSED') {
        logger.error(`Connection refused: Unable to connect to ${url}`);
        assert.fail(chalk.redBright(`Error: Connection refused to ${chalk.cyan(url)}. Check if the server is running.`));
    }
}


export {errorMessageEconnrefused}