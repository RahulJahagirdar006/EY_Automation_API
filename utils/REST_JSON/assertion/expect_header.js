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

export const expect_header = {
    async expectHeader(method, url, status, acceptResponse = "application/json", partialMatch = true, headers={}) {
        try {
            // Convert the method to uppercase for consistency
            var upperCaseMethod = method.toUpperCase();

            // Build the initial request with method, URL, and headers
            let specRequest = await spec()
                .withMethod(upperCaseMethod)
                .withPath(url)
                .withHeaders({
                    'Accept': acceptResponse,
                    ...headers
                });

            // Expect header based on whether partial matching is allowed
            if (partialMatch) {
                specRequest = specRequest.expectHeaderContains('content-type', acceptResponse);
            } else {
                specRequest = specRequest.expectHeader('content-type', acceptResponse);
            }

            // Expect the specified status code
            specRequest = specRequest.expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`);

            // Send the request and get the response
            const specResponse = await specRequest;

            // Log the success message
            console.log(chalk.greenBright(`For this URL: ${url}, Status code is ${chalk.yellowBright(status)}, and response header is valid.`));

            return specResponse;
        } catch (error) {
            // Log the error and fail the test case
            errorMessageEconnrefused(error, url)
            logger.error(`Error in request ${upperCaseMethod} ${url}: ${error}`);
            assert.fail(`Error in request ${upperCaseMethod} ${url}: ${error}`);
        }
    },

    async expectHeaderWithBearerToken(method, url, status, token, acceptResponse = "application/json", partialMatch = true, headers={}) {
        try {
            if (!token) {
                throw new Error('Token is required');
            }

            var upperCaseMethod = method.toUpperCase();

            // Build the request with method, URL, headers including Bearer token
            let specRequest = spec()
                .withMethod(upperCaseMethod)
                .withPath(url)
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Accept': acceptResponse,
                    ...headers
                });

            // Expect header based on whether partial matching is allowed
            if (partialMatch) {
                specRequest = specRequest.expectHeaderContains('content-type', acceptResponse);
            } else {
                specRequest = specRequest.expectHeader('content-type', acceptResponse);
            }

            // Expect the specified status code
            specRequest = specRequest.expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`);

            // Send the request and get the response
            const specResponse = await specRequest;

            // Log the success message
            console.log(chalk.greenBright(`For this URL: ${url}, Status code is ${chalk.yellowBright(status)}, and response header is valid.`));

            return specResponse;
        } catch (error) {
            // Log the error and fail the test case
            errorMessageEconnrefused(error, url)
            logger.error(`Error in request ${upperCaseMethod} ${url}: ${error}`);
            assert.fail(`Error in request ${upperCaseMethod} ${url}: ${error}`);
        }
    },

    async expectHeaderWithBasicAuth(method, url, status, username, password, acceptResponse = "application/json", partialMatch = true, headers={}) {
        try {
            if (!username || !password) {
                throw new Error('username and password must be provided');
            }

            var upperCaseMethod = method.toUpperCase();

            // Build the request with method, URL, headers including Bearer token
            let specRequest = spec()
                .withMethod(upperCaseMethod)
                .withPath(url)
                .withAuth(username, password)
                .withHeaders({
                    'Accept': acceptResponse,
                    ...headers
                });

            // Expect header based on whether partial matching is allowed
            if (partialMatch) {
                specRequest = specRequest.expectHeaderContains('content-type', acceptResponse);
            } else {
                specRequest = specRequest.expectHeader('content-type', acceptResponse);
            }

            // Expect the specified status code
            specRequest = specRequest.expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`);

            // Send the request and get the response
            const specResponse = await specRequest;

            // Log the success message
            console.log(chalk.greenBright(`For this URL: ${url}, Status code is ${chalk.yellowBright(status)}, and response header is valid.`));

            return specResponse;
        } catch (error) {
            // Log the error and fail the test case
            errorMessageEconnrefused(error, url)
            logger.error(`Error in request ${upperCaseMethod} ${url}: ${error}`);
            assert.fail(`Error in request ${upperCaseMethod} ${url}: ${error}`);
        }
    },

    async expectHeaderWithJsonBody(method, url, json_body, status, acceptResponse = "application/json", partialMatch = true, headers={}) {
        try {
            var upperCaseMethod = method.toUpperCase();

            // Build the request with method, URL, headers, and JSON body
            let specRequest = spec()
                .withMethod(upperCaseMethod)
                .withPath(url)
                .withHeaders({
                    'Content-Type': "application/json",
                    'Accept': acceptResponse,
                    ...headers
                })
                .withBody(json_body);  // Adding the JSON body to the request

            // Expect header based on whether partial matching is allowed
            if (partialMatch) {
                specRequest = specRequest.expectHeaderContains('content-type', acceptResponse);
            } else {
                specRequest = specRequest.expectHeader('content-type', acceptResponse);
            }

            // Expect the specified status code
            specRequest = specRequest.expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`);

            // Send the request and get the response
            const specResponse = await specRequest;

            // Log the success message
            console.log(chalk.greenBright(`For this URL: ${url}, Status code is ${chalk.yellowBright(status)}, and response header is valid.`));

            return specResponse;
        } catch (error) {
            // Log the error and fail the test case
            errorMessageEconnrefused(error, url)
            logger.error(`Error in request ${upperCaseMethod} ${url}: ${error}`);
            assert.fail(`Error in request ${upperCaseMethod} ${url}: ${error}`);
        }
    },


    async expectHeaderWithJsonBodyToken(method, url, json_body, status, token, acceptResponse = "application/json", partialMatch = true, headers={}) {
        try {
            if (!token) {
                throw new Error('Token is required');
            }

            var upperCaseMethod = method.toUpperCase();

            // Build the request with method, URL, headers, and JSON body
            let specRequest = spec()
                .withMethod(upperCaseMethod)
                .withPath(url)
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json",
                    'Accept': acceptResponse,
                    ...headers
                })
                .withJson(json_body);

            // Expect header based on whether partial matching is allowed
            if (partialMatch) {
                specRequest = specRequest.expectHeaderContains('content-type', acceptResponse);
            } else {
                specRequest = specRequest.expectHeader('content-type', acceptResponse);
            }

            // Expect the specified status code
            specRequest = specRequest.expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`);

            // Send the request and get the response
            const specResponse = await specRequest;

            // Log the success message
            console.log(chalk.greenBright(`For this URL: ${url}, Status code is ${chalk.yellowBright(status)}, and response header is valid.`));

            return specResponse;
        } catch (error) {
            // Log the error and fail the test case
            errorMessageEconnrefused(error, url)
            logger.error(`Error in request ${upperCaseMethod} ${url}: ${error}`);
            assert.fail(`Error in request ${upperCaseMethod} ${url}: ${error}`);
        }
    },

    async expectHeaderWithJsonBodyWithAuth(method, url, json_body, status, username, password, acceptResponse = "application/json", partialMatch = true, headers={}) {
        try {
            if (!username || !password) {
                throw new Error('username and password must be provided');
            }

            var upperCaseMethod = method.toUpperCase();

            // Build the request with method, URL, headers, and JSON body
            let specRequest = spec()
                .withMethod(upperCaseMethod)
                .withPath(url)
                .withAuth(username, password)
                .withHeaders({
                    'Content-Type': "application/json",
                    'Accept': acceptResponse,
                    ...headers
                })
                .withJson(json_body);

            // Expect header based on whether partial matching is allowed
            if (partialMatch) {
                specRequest = specRequest.expectHeaderContains('content-type', acceptResponse);
            } else {
                specRequest = specRequest.expectHeader('content-type', acceptResponse);
            }

            // Expect the specified status code
            specRequest = specRequest.expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`);

            // Send the request and get the response
            const specResponse = await specRequest;

            // Log the success message
            console.log(chalk.greenBright(`For this URL: ${url}, Status code is ${chalk.yellowBright(status)}, and response header is valid.`));

            return specResponse;
        } catch (error) {
            // Log the error and fail the test case
            errorMessageEconnrefused(error, url)
            logger.error(`Error in request ${upperCaseMethod} ${url}: ${error}`);
            assert.fail(`Error in request ${upperCaseMethod} ${url}: ${error}`);
        }
    },
}