import { assert } from "chai";
import envConfig from 'konfig';
import chalk from "chalk";
import pkg from 'pactum';
import { logger } from "../../../logError/logfile.js";
import dotenv from "dotenv";
import { errorMessageEconnrefused } from "../error_handle.js";

// Load environment variables from .env file
dotenv.config({ path: ".env" });

// Initialize configuration from config folder
const global = new envConfig({ path: "./config" });
const base_url = global.config.baseUrl || "";
// console.log(global.config.baseUrl);

// Set base URL for Pactum requests
const { spec, request } = pkg;
request.setBaseUrl(base_url);

export const expect_error = {

        /**
     * Makes an API request and asserts that an error message matches the expected one.
     * 
     * @param {string} method - HTTP method (GET, POST, etc.).
     * @param {string} url - The endpoint URL for the request.
     * @param {*} error_message - The expected error message.
     * @param {Object} headers - Optional headers to add to the request.
     * @returns {Promise<Object>} - The response of the API call.
     */
    async expectError(method, url, error_message, headers = {}){
        try {

            var upperCaseMethod = method.toUpperCase();

            const specRequest = spec()
                .withMethod(upperCaseMethod)
                .withPath(url)
                .withHeaders({
                    'Accept': "application/json",
                    ...headers
                })
                .expectError(error_message).withCore({rejectUnauthorized: false})
            
            const specResponse = await specRequest;

            console.log(chalk.greenBright(`For this URL ${url}, Actual error matches expected error: \n${chalk.blueBright(JSON.stringify(error_message, null, 2))}`));
            return specResponse;
        } catch (error) {
            logger.error(`Error in request ${upperCaseMethod} ${url}: ${error}`);
            assert.fail(chalk.red(`Error in request ${chalk.yellow(upperCaseMethod)} ${chalk.cyan(url)}: ${error}`));
        }
    },


        /**
     * Makes an API request with a JSON body and asserts that an error message matches the expected one.
     * 
     * @param {string} method - HTTP method (GET, POST, etc.).
     * @param {string} url - The endpoint URL for the request.
     * @param {Object|string} jsonObjectOrPath - The JSON body as an object to send with the request, or a path to a JSON file.
     * @param {*} error_message - The expected error message.
     * @param {Object} headers - Optional headers to add to the request.
     * @returns {Promise<Object>} - The response of the API call.
     */
    async expectErrorWithJsonBody(method, url, jsonObjectOrPath, error_message, headers = {}){
        try {

            var upperCaseMethod = method.toUpperCase();

            const specRequest = spec()
                .withMethod(upperCaseMethod)
                .withPath(url)
                .withHeaders({
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    ...headers
                })
                .withJson(jsonObjectOrPath)
                .expectError(error_message)
            
            const specResponse = await specRequest;

            console.log(chalk.greenBright(`For this URL ${url}, Actual error matches expected error: \n${chalk.blueBright(JSON.stringify(error_message, null, 2))}`));
            return specResponse;
        } catch (error) {
            logger.error(`Error in request ${upperCaseMethod} ${url}: ${error}`);
            assert.fail(chalk.red(`Error in request ${chalk.yellow(upperCaseMethod)} ${chalk.cyan(url)}: ${error}`));
        }
    },

}

