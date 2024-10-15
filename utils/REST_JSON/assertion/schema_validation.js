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

export const schema_validation = {
    async validateJsonSchema(method, url, status, schema, headers = {}) {
        try {
            const response = await spec()
                .withMethod(method.toUpperCase())
                .withPath(url)
                .withHeaders({
                    'Accept': "application/json",
                    ...headers
                })
                // .expectHeaderContains('content-type', "application/json")
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
                .expectJsonSchema(schema);

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            console.log(chalk.blueBright('JSON schema validation passed'));

            return response;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },

    async validateJsonSchemaWithToken(method, url, status, schema, token, headers = {}) {
        try {
            if (!token) {
                throw new Error("Authorization token is required");
            }
    
            const response = await spec()
                .withMethod(method.toUpperCase())
                .withPath(url)
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Accept': "application/json",
                    ...headers
                })
                // .expectHeaderContains('content-type', "application/json") // Validate content-type header
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`) // Validate the response status code
                .expectJsonSchema(schema); // Validate the response JSON schema
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            console.log(chalk.blueBright('JSON schema validation passed'));
    
            return response;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error('Error during validation:', error);
            assert.fail(`Validation failed: ${error}`);
        }
    },

    async validateJsonSchemaWithBasicAuth(method, url, status, schema, username, password, headers = {}) {
        try {
              if (!username || !password) {
                throw new Error('username and password must be provided');
            }
    
            const response = await spec()
                .withMethod(method.toUpperCase())
                .withPath(url)
                .withAuth(username, password)
                .withHeaders({
                    'Accept': "application/json",
                    ...headers
                })
                // .expectHeaderContains('content-type', "application/json") // Validate content-type header
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`) // Validate the response status code
                .expectJsonSchema(schema); // Validate the response JSON schema
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            console.log(chalk.blueBright('JSON schema validation passed'));
    
            return response;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error('Error during validation:', error);
            assert.fail(`Validation failed: ${error}`);
        }
    },
    
    async validateJsonBodySchema(method, url, jsonBody, status, schema, headers = {}) {
        try {
            const response = await spec()
                .withMethod(method.toUpperCase())
                .withPath(url)
                .withHeaders({
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    ...headers
                })
                .withJson(jsonBody) // Include the JSON body in the request
                // .expectHeaderContains('content-type', "application/json")
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`) // Expect the response status code to match
                .expectJsonSchema(schema); // Validate the response JSON schema
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            console.log(chalk.blueBright('JSON schema validation passed'));
    
            return response;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },

    async validateJsonSchemaWithBodyAndToken(method, url, jsonBody, status, schema, token, headers = {}) {
        try {
            if (!token) {
                throw new Error("Authorization token is required");
            }
    
            const response = await spec()
                .withMethod(method.toUpperCase())
                .withPath(url)
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    ...headers
                })
                .withJson(jsonBody) // Include the JSON body in the request
                // .expectHeaderContains('content-type', "application/json")
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`) // Expect the response status code to match
                .expectJsonSchema(schema); // Validate the response JSON schema
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            console.log(chalk.blueBright('JSON schema validation passed'));
    
            return response;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error('Error during validation:', error);
            assert.fail(`Validation failed: ${error.message}`);
        }
    },

    async validateJsonSchemaWithBodyAndBasicAuth(method, url, jsonBody, status, schema, username, password, headers = {}) {
        try {
            if (!username || !password) {
                throw new Error('username and password must be provided');
            }
    
            const response = await spec()
                .withMethod(method.toUpperCase())
                .withPath(url)
                .withHeaders({
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    ...headers
                })
                .withJson(jsonBody) // Include the JSON body in the request
                // .expectHeaderContains('content-type', "application/json")
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`) // Expect the response status code to match
                .expectJsonSchema(schema); // Validate the response JSON schema
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            console.log(chalk.blueBright('JSON schema validation passed'));
    
            return response;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error('Error during validation:', error);
            assert.fail(`Validation failed: ${error.message}`);
        }
    },

}