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
  //assertion ExceptJson

export const expect_json = {
    async assertExpectJson(method, url, expectedJsonBody, status = 200, partialMatch = true, headers = {}) {
            try {
                let method1 = method.toUpperCase();
        
                let specRequest = spec()
                    .withMethod(method1)
                    .withPath(url)
                    .withHeaders({
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                        ...headers
                    });
        
                if (partialMatch) {
                    specRequest = specRequest.expectJsonLike(expectedJsonBody);
                } else {
                    specRequest = specRequest.expectJson(expectedJsonBody);
                }
        
                // Add Header and status expectation
                // specRequest = specRequest.expectHeaderContains('content-type', "application/json");
                specRequest = specRequest.expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
        
                const response = await specRequest;
        
                console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
                return response;
            } catch (error) {
                errorMessageEconnrefused(error, url)
                logger.error(error);
                assert.fail(error);
            }
    },
         
    async assertExpectJsonWithToken(method, url, expectedJsonBody, status = 200, partialMatch = true, token, headers = {}) {
            try {
                if (!token) {
                    throw new Error("Authorization token is required");
                }
        
                let method1 = method.toUpperCase();
        
                let specRequest = spec()
                    .withMethod(method1)
                    .withPath(url)
                    .withHeaders({
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                        ...headers
                    });
        
                if (partialMatch) {
                    specRequest = specRequest.expectJsonLike(expectedJsonBody);
                } else {
                    specRequest = specRequest.expectJson(expectedJsonBody);
                }
        
                // Add Header and status expectation
                // specRequest = specRequest.expectHeaderContains('content-type', "application/json");
                specRequest = specRequest.expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`);
        
                const response = await specRequest;
        
                console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
                return response;
            } catch (error) {
                errorMessageEconnrefused(error, url)
                logger.error(error);
                assert.fail(error);
            }
    },

    async assertExpectJsonWithBasicAuth(method, url, expectedJsonBody, status = 200, partialMatch = true, username, password, headers = {}) {
            try {
                if (!username || !password) {
                    throw new Error('username and password must be provided');
                }
        
                let method1 = method.toUpperCase();
        
                let specRequest = spec()
                    .withMethod(method1)
                    .withPath(url)
                    .withAuth(username, password)
                    .withHeaders({
                        'Accept': "application/json",
                        ...headers
                    });
        
                if (partialMatch) {
                    specRequest = specRequest.expectJsonLike(expectedJsonBody);
                } else {
                    specRequest = specRequest.expectJson(expectedJsonBody);
                }
        
                // Add Header and status expectation
                // specRequest = specRequest.expectHeaderContains('content-type', "application/json");
                specRequest = specRequest.expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`);
        
                const response = await specRequest;
        
                console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
                return response;
            } catch (error) {
                errorMessageEconnrefused(error, url)
                logger.error(error);
                assert.fail(error);
            }
    },
        
    async assertExpectJsonWithBody(
            method, url, jsonBody, expectedJsonBody, status = 200, partialMatch = true, headers = {}
        ) {
            try {
                let method1 = method.toUpperCase();
                let specRequest = spec()
                    .withMethod(method1)
                    .withPath(url)
                    .withHeaders({
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                        ...headers
                    })
                    .withJson(jsonBody);
        
                // Add JSON expectations
                if (partialMatch) {
                    specRequest = specRequest.expectJsonLike(expectedJsonBody);
                } else {
                    specRequest = specRequest.expectJson(expectedJsonBody);
                }
        
                // Add Header and status expectation
                // specRequest = specRequest.expectHeaderContains('content-type', "application/json");
                specRequest = specRequest.expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`);
        
                // Execute the request and handle the response
                const response = await specRequest;
        
                console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
                return response;
            } catch (error) {
                errorMessageEconnrefused(error, url)
                logger.error(error);
                assert.fail(error);
            }
    },
        
    async assertExpectJsonWithBodyAndToken(
            method, url, jsonBody, expectedJsonBody, status = 200, partialMatch = true, token, headers = {}
        ) {
            try {
                if (!token) {
                    throw new Error("Authorization token is required");
                }
        
                let method1 = method.toUpperCase();
                let specRequest = spec()
                    .withMethod(method1)
                    .withPath(url)
                    .withHeaders({
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                        ...headers
                    })
                    .withJson(jsonBody);
        
                // Add JSON expectations
                if (partialMatch) {
                    specRequest = specRequest.expectJsonLike(expectedJsonBody);
                } else {
                    specRequest = specRequest.expectJson(expectedJsonBody);
                }
        
                // Add Header and status expectation
                // specRequest = specRequest.expectHeaderContains('content-type', "application/json");
                specRequest = specRequest.expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`);
        
                // Execute the request and handle the response
                const response = await specRequest;
        
                console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
                return response;
            } catch (error) {
                errorMessageEconnrefused(error, url)
                logger.error(error);
                assert.fail(error);
            }
    },

    async assertExpectJsonWithBodyAndBasicAuth(
            method, url, jsonBody, expectedJsonBody, status = 200, partialMatch = true, username, password, headers = {}
        ) {
            try {
                if (!username || !password) {
                    throw new Error('username and password must be provided');
                }
        
                let method1 = method.toUpperCase();
                let specRequest = spec()
                    .withMethod(method1)
                    .withPath(url)
                    .withAuth(username, password)
                    .withHeaders({
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                        ...headers
                    })
                    .withJson(jsonBody);
        
                // Add JSON expectations
                if (partialMatch) {
                    specRequest = specRequest.expectJsonLike(expectedJsonBody);
                } else {
                    specRequest = specRequest.expectJson(expectedJsonBody);
                }
        
                // Add Header and status expectation
                // specRequest = specRequest.expectHeaderContains('content-type', "application/json");
                specRequest = specRequest.expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`);
        
                // Execute the request and handle the response
                const response = await specRequest;
        
                console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
                return response;
            } catch (error) {
                errorMessageEconnrefused(error, url)
                logger.error(error);
                assert.fail(error);
            }
    }    
}