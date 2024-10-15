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


export const expect_response_time = {
    async expectResponseTime(method, url, status = 200, responseTime = 1000, headers={}) {
        try {
            const method1 = method.toUpperCase();
            const specRequest = spec()
                .withMethod(method1)
                .withPath(url)
                .withHeaders({
                    'Accept': "application/json",
                    ...headers
                })
                // .expectHeaderContains('content-type', "application/json")
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
                .expectResponseTime(responseTime);

            const specResponse = await specRequest;

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)} and response time is within ${chalk.yellowBright(responseTime)} ms`));

            return specResponse;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(`Error in request ${method.toUpperCase()} ${url}: ${error}`);
            assert.fail(`Error in request ${method.toUpperCase()} ${url}: ${error}`);
        }
    },


    async expectResponseTimeWithBearerToken(method, url, token, status = 200, responseTime = 1000, headers={}) {
        try {
            if (!token) {
                throw new Error('Token is required');
            }

            const method1 = method.toUpperCase();
            const specRequest = spec()
                .withMethod(method1)
                .withPath(url)
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Accept': "application/json",
                    ...headers
                })
                // .expectHeaderContains('content-type', "application/json")
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
                .expectResponseTime(responseTime);

            const specResponse = await specRequest;

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)} and response time is within ${chalk.yellowBright(responseTime)} ms`));

            return specResponse;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(`Error in request ${method.toUpperCase()} ${url}: ${error}`);
            assert.fail(`Error in request ${method.toUpperCase()} ${url}: ${error}`);
        }
    },

    async expectResponseTimeWithBaicAuth(method, url, username, password, status = 200, responseTime = 1000, headers={}) {
        try {
            if (!username || !password) {
                throw new Error('username and password must be provided');
            }

            const method1 = method.toUpperCase();
            const specRequest = spec()
                .withMethod(method1)
                .withPath(url)
                .withAuth(username, password)
                .withHeaders({
                    'Accept': "application/json",
                    ...headers
                })
                // .expectHeaderContains('content-type', "application/json")
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
                .expectResponseTime(responseTime);

            const specResponse = await specRequest;

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)} and response time is within ${chalk.yellowBright(responseTime)} ms`));

            return specResponse;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(`Error in request ${method.toUpperCase()} ${url}: ${error}`);
            assert.fail(`Error in request ${method.toUpperCase()} ${url}: ${error}`);
        }
    },

    async expectResponseTimeWithJsonBody(method, url, json_body, status, responseTime = 1000, headers={}) {
        try {
            const method1 =  method.toUpperCase();
            const specResponse = await spec()
                .withMethod(method1)
                .withPath(url)
                .withHeaders({
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    ...headers
                })
                .withJson(json_body)
                // .expectHeaderContains('content-type', "application/json")
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
                .expectResponseTime(responseTime);


            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)} and response time is within ${chalk.yellowBright(responseTime)} ms`));
            return specResponse;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(`Error in request ${method.toUpperCase()} ${url}: ${error}`);
            assert.fail(`Error in request ${method.toUpperCase()} ${url}: ${error}`);
        }
    },

    async expectResponseTimeWithJsonBodyWithToken(method, url, token, json_body, status, responseTime = 1000, headers={}) {
        try {
            if (!token) {
                throw new Error('Token is required');
            }

            const method1 = method.toUpperCase();

            const specResponse = await spec()
                .withMethod(method1)
                .withPath(url)
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    ...headers
                })
                .withJson(json_body)
                // .expectHeaderContains('content-type', "application/json")
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
                .expectResponseTime(responseTime);


            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)} and response time is within ${chalk.yellowBright(responseTime)} ms`));
            return specResponse;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(`Error in request ${method.toUpperCase()} ${url}: ${error}`);
            assert.fail(`Error in request ${method.toUpperCase()} ${url}: ${error}`);
        }
    },

    async expectResponseTimeWithJsonBodyWithBasicAuth(method, url, username, password, json_body, status, responseTime = 1000, headers={}) {
        try {
            if (!username || !password) {
                throw new Error('username and password must be provided');
            }

            const method1 = method.toUpperCase();

            const specResponse = await spec()
                .withMethod(method1)
                .withPath(url)
                .withAuth(username, password)
                .withHeaders({
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    ...headers
                })
                .withJson(json_body)
                // .expectHeaderContains('content-type', "application/json")
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
                .expectResponseTime(responseTime);


            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)} and response time is within ${chalk.yellowBright(responseTime)} ms`));
            return specResponse;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(`Error in request ${method.toUpperCase()} ${url}: ${error}`);
            assert.fail(`Error in request ${method.toUpperCase()} ${url}: ${error}`);
        }
    },
}