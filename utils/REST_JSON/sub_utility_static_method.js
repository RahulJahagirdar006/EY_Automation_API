import { assert } from "chai";
import envConfig from 'konfig';
import chalk from "chalk";
import pkg from 'pactum';
import { logger } from "../../logError/logfile.js";
import dotenv from "dotenv";
import { errorMessageEconnrefused } from "./error_handle.js";

// Load environment variables from .env file
dotenv.config({ path: ".env" });


// Initialize configuration from config folder
const global = new envConfig({ path: "./config" });
const base_url = global.config.baseUrl || "";
// console.log(global.config.baseUrl);

// Set base URL for Pactum requests
const { spec, request } = pkg;
request.setBaseUrl(base_url);

export const sub_BasePage_static = {
    getJsonStatus(url, status, headers={}) {
        try {
            const response = spec()
                .get(url) // Assuming it's a GET request
                .withHeaders({
                    'Accept': "application/json",
                    ...headers
                })
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
                // .expectHeaderContains('content-type', "application/json");

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },
    async getJsonStatusWithBearerToken(url, status, token, headers={}) {
        try {
            if (!token) {
                throw new Error('Token is required');
            }
    
            const response = await spec()
                .get(url) // Assuming it's a GET request
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Accept': "application/json",
                    ...headers
                })
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
                // .expectHeaderContains('content-type', "application/json");
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },
    async getJsonStatusBasicAuth(url, status, username, password, headers={}) {
        try {
            if (!username || !password) {
                throw new Error('username and password must be provided');
            }
    
            const response = await spec()
                .get(url) // Assuming it's a GET request
                .withAuth(username, password)
                .withHeaders({
                    'Accept': "application/json",
                    ...headers
                })
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
                // .expectHeaderContains('content-type', "application/json");
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },
    //------------------------------------------------------------------------------------------------
    async postJsonAndGetStatus(url, body, status, headers={}) {
        try {
            const response = await spec()
                .post(url)
                .withHeaders({
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    ...headers
                })
                .withJson(body)
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
                // .expectHeaderContains('content-type', "application/json");

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },
    async postJsonWithBearerTokenAndGetStatus(url, body, status, token, headers={}) {
        try {
            if (!token) {
                throw new Error('Token is required');
            }
    
            const response = await spec()
                .post(url)
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    ...headers
                })
                .withJson(body)
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
                // .expectHeaderContains('content-type', "application/json");
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },
    async postJsonWithBasicAuthAndGetStatus(url, body, status, username, password, headers={}) {
        try {
            if (!username || !password) {
                throw new Error('username and password must be provided');
            }
    
            const response = await spec()
                .post(url)
                .withAuth(username, password)
                .withHeaders({
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    ...headers
                })
                .withJson(body)
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
                // .expectHeaderContains('content-type', "application/json");
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },
    //----------------------------------------------------------------

    async putJsonAndGetStatus(url, body, status, headers={}) {
        try {
            const response = await spec()
                .put(url)
                .withHeaders({
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    ...headers
                })
                .withJson(body)
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
                // .expectHeaderContains('content-type', "application/json");

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },
    async putJsonWithBearerTokenAndGetStatus(url, body, status, token, headers={}) {
        try {
            if (!token) {
                throw new Error('Token is required');
            }

            const response = await spec()
                .put(url)
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    ...headers
                })
                .withJson(body)
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
                // .expectHeaderContains('content-type', "application/json");

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },
    async putJsonWithBasicAuthAndGetStatus(url, body, status, username, password, headers={}) {
        try {
            if (!username || !password) {
                throw new Error('username and password must be provided');
            }

            const response = await spec()
                .put(url)
                .withAuth(username, password)
                .withHeaders({
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    ...headers
                })
                .withJson(body)
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
                // .expectHeaderContains('content-type', "application/json");

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },
    //----------------------------------------------------------------
    async deleteJsonWithStatus(url, status, headers={}) {
        try {
            const response = await spec()
                .delete(url)
                .withHeaders({
                    'Accept': "application/json",
                    ...headers
                })
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
                // .expectHeaderContains('content-type', "application/json");

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },
    async deleteJsonWithStatusAndToken(url, status, token, headers={}) {
        try {
            if (!token) {
                throw new Error('Token is required');
            }
    
            const response = await spec()
                .delete(url)
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Accept': "application/json",
                    ...headers
                })
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
                // .expectHeaderContains('content-type', "application/json");
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },
    async deleteJsonWithStatusAndBasicAuth(url, status, username, password, headers={}) {
        try {
            if (!username || !password) {
                throw new Error('username and password must be provided');
            }
    
            const response = await spec()
                .delete(url)
                .withAuth(username, password)
                .withHeaders({
                    'Accept': "application/json",
                    ...headers
                })
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
                // .expectHeaderContains('content-type', "application/json");
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    }
}

