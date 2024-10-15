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


export const sub_BasePage_dynamic = {
    
    async requestJsonStatus(method, url, status, headers={}) {
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
                .expectStatus(status);
    
            const specResponse = await specRequest;
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return specResponse;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },

    async requestJsonStatusWithBearerToken(method, url, status, token, headers={}) {
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
    
            const specResponse = await specRequest;
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return specResponse;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },
    
    async requestJsonStatusWithBasicAuth(method, url, status, username, password, headers={}) {
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
    
            const specResponse = await specRequest;
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return specResponse;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },
    
    
    async requestJsonWithBodyStatus(method, url, json_body, status, headers={}) {
        try {
            const method1 = method.toUpperCase();
            const specRequest = spec()
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
    
            const specResponse = await specRequest;
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return specResponse;
        } catch (error) {
         errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },

    async requestJsonWithBodyTokenStatus(method, url, json_body, status, token, headers={}) {
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
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    ...headers
                })
                .withJson(json_body)
                // .expectHeaderContains('content-type', "application/json")
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
    
            const specResponse = await specRequest;
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return specResponse;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },

    async requestJsonWithBodyWithBasicAuth(method, url, json_body, status, username, password, headers={}) {
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
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    ...headers
                })
                .withJson(json_body)
                // .expectHeaderContains('content-type', "application/json")
                .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)
    
            const specResponse = await specRequest;
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return specResponse;
        } catch (error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

    async value(url, param){
        return new Promise((resolve, reject) => {
            const arr = [];
            const arr1 = {};
            url.split("/").forEach((val) => {
                if (val.startsWith("{") && val.endsWith("}")) {
                    arr.push(val.substring(1, val.length - 1));
                }
                for (var i=0; i<arr.length; i++){
                    if(param[i] === Number){
                        const str = String(param[i]);
                        arr1[arr[i]] = str;
                    }
                    arr1[arr[i]] = param[i]
                }
            });
            resolve(arr1);
        });
    },

    async requestJsonStatusWithPathParams(method, url, param=[], status, headers={}){
        try{
            
            const method1 = method.toUpperCase();
            
            const result = await spec()
                    .withMethod(method1)
                    .withPath(url)
                    .withPathParams(await this.value(url, param))
                    .withHeaders({
                        'Accept': "application/json",
                        ...headers
                    })
                    .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return await result;
        }catch(error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },

    async requestJsonStatusWithPathParamsAndToken(method, url, param=[], token, status, headers={}){
        try{

            if (!token) {
                throw new Error('Token is required');
            }
            
            const method1 = method.toUpperCase();
            
            const result = await spec()
                    .withMethod(method1)
                    .withPath(url)
                    .withPathParams(await this.value(url, param))
                    .withHeaders({
                        'Authorization': `Bearer ${token}`,
                        'Accept': "application/json",
                        ...headers
                    })
                    .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return await result;
        }catch(error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },

    async requestJsonStatusWithPathParamsAndBasicAuth(method, url, param=[], username, password, status, headers={}){
        try{

            if (!username || !password) {
                throw new Error('username and password must be provided');
            }
            
            const method1 = method.toUpperCase();
            
            const result = await spec()
                    .withMethod(method1)
                    .withPath(url)
                    .withPathParams(await this.value(url, param))
                    .withAuth(username, password)
                    .withHeaders({
                        'Accept': "application/json",
                        ...headers
                    })
                    .expectStatus(status, `An error occurred in the API call because it did not return the expected statusCode: ${status} for this URL: ${url}`)

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return await result;
        }catch(error) {
            errorMessageEconnrefused(error, url)
            logger.error(error);
            assert.fail(error);
        }
    },
}