import { assert } from "chai";
import envConfig from 'konfig';
import chalk from "chalk";
import pkg from 'pactum';
import { logger } from "../logError/logfile.js";
import fs from 'fs';
import * as FS from "fs/promises"
import path from "path";
import { URL } from "url";
import dotenv from "dotenv";
import xlsx from "xlsx";
import { Encrypter } from "../crypto_utils/cryptoUtil.js";

// Load environment variables from .env file
dotenv.config({ path: ".env" });

// Initialize configuration from config folder
const global = new envConfig({ path: "./config" });
const base_url = global.config.baseUrl || "";
// console.log(global.config.baseUrl);

// Set base URL for Pactum requests
const { spec, request } = pkg;
request.setBaseUrl(base_url);

class BASEPAGE {

    async requestStatus(method, url, status, content_type = "application/json") {
        try {
            const method1 = method.toUpperCase();
            const specRequest = spec()
                .withMethod(method1)
                .withPath(url)
                .withHeaders({
                    'Accept': content_type
                })
                .expectHeaderContains('content-type', content_type)
                .expectStatus(status);
    
            const specResponse = await specRequest;
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return specResponse;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }


    async requestStatusWithToken(method, url, status, token, content_type = "application/json") {
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
                    'Accept': content_type
                })
                .expectHeaderContains('content-type', content_type)
                .expectStatus(status);
        
            const specResponse = await specRequest;
        
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return specResponse;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }
    
    
    
    async requestWithBodyStatus(method, url, body, status, content_type = "application/json") {
        try {
            const method1 = method.toUpperCase();
            const specRequest = spec()
                .withMethod(method1)
                .withPath(url)
                .withHeaders({
                    'Content-Type': content_type,
                    'Accept': content_type
                })
                .withBody(body)
                .expectHeaderContains('content-type', content_type)
                .expectStatus(status);
        
            const specResponse = await specRequest;
        
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return specResponse;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }
    


    async requestWithBodyTokenStatus(method, url, body, status, token, content_type = "application/json") {
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
                    'Content-Type': content_type,
                    'Accept': content_type
                })
                .withBody(body)
                .expectHeaderContains('content-type', content_type)
                .expectStatus(status);
            
            const specResponse = await specRequest;
            
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return specResponse;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    //Get Method


    async getstatus(url, status, content_type = "application/json") {
        try {
            const result = await spec()
                .get(url)
                .withHeaders({
                    'Accept': content_type
                })
                .expectHeader('content-type', content_type) // Exact match
                .expectStatus(status);
            
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return result;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }
    


    async getStatusWithBearerToken(url, status, token, content_type = "application/json") {
        try {
            if (!token) {
                throw new Error('Token is required');
            }
    
            const result = await spec()
                .get(url)
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Accept': content_type
                })
                .expectHeader('content-type', content_type) // Changed to exact match for header
                .expectStatus(status);
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return result;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }
    

    async getStatusWithPathParams(url, param=[], token=false, status, content_type = "application/json", callback = async()=>{}){
        try{
            async function value(url){
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
            }
            
            const result = token
                ? await spec()
                    .get(url)
                    .withPathParams(await value(url))
                    .withBearerToken(token)
                    .withHeaders({
                        'Authorization': `Bearer ${token}`,
                        'Accept': content_type
                    })
                    .expectHeaderContains('content-type', content_type)
                    .expectStatus(status)
                : await spec()
                    .get(url)
                    .withPathParams(await value(url))
                    .withHeaders({
                        'Accept': content_type
                    })
                    .expectHeaderContains('content-type', content_type)
                    .expectStatus(status)

                
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            await callback(result)
            return await result;
        }catch(err) {
            logger.error(err);
            assert.fail(err);
        }
    }

    async getStatusWithQueryParams(url, query={}, token=false, statusCode, content_type = "application/json", callback = async()=>{}){
        try{
            const result = token
                ?await spec()
                   .get(url)
                   .withQueryParams(query)
                   .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': content_type,
                    'Accept': content_type
                    })
                   .expectHeaderContains('content-type', content_type)
                   .expectStatus(statusCode)
                :await spec()
                    .get(url)
                    .withQuery(query)
                    .withHeaders({
                        'Content-Type': content_type,
                        'Accept': content_type
                    })
                    .expectHeaderContains('content-type', content_type)
                    .expectStatus(statusCode)
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(statusCode)}`));
            await callback(result)
            return await result;
        }catch(error){
            logger.error(error);
            assert.fail(error);
        }
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    async postBodyGetStatus(url, body, status, content_type = "application/json",  callback = async(res) => {}){
        try {
            let body_json = ""
            if(content_type === "application/json"){
                body_json = JSON.stringify(body);
            }
            const response = await spec()
                .post(url)
                .withHeaders({
                    'Content-Type': content_type,
                    'Accept':content_type
                })
                .withBody(`${body_json}`||`${body}`)
                .expectHeaderContains('content-type', content_type)
                .expectStatus(status)
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            await callback(response);
            return await response;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }

    async postBodyWithBearerTokenAndGetStatus(url, body, token, status, content_type = "application/json", callback = async () => {}) {
        try {
            let body_json = ""
            if(content_type === "application/json"){
                body_json = JSON.stringify(body);
            }
            const response = await spec()
                .post(url)
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': content_type,
                    'Accept': content_type
                })
                .withBody(`${body_json}`||`${body}`)
                .expectStatus(status)
                .expectHeaderContains('content-type',content_type);
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            await callback(response);
            return await response;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }



    async putBodyGetStatus(url, body, status, content_type = "application/json",  callback = async(res) => {}){
        try {
            let body_json = ""
            if(content_type === "application/json"){
                body_json = JSON.stringify(body);
            }
            const response = await spec()
                .put(url)
                .withHeaders({
                    'Content-Type': content_type,
                    'Accept':content_type
                })
                .withBody(`${body_json}`||`${body}`)
                .expectHeaderContains('content-type', content_type)
                .expectStatus(status)
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            await callback(response);
            return await response;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }

    async putBodyWithBearerTokenAndGetStatus(url, body, token, status, content_type = "application/json", callback = async () => {}) {
        try {
            let body_json = ""
            if(content_type === "application/json"){
                body_json = JSON.stringify(body);
            }
            const response = await spec()
                .put(url)
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': content_type,
                    'Accept': content_type
                })
                .withBody(`${body_json}`||`${body}`)
                .expectStatus(status)
                .expectHeaderContains('content-type',content_type);

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            await callback(response);
            return await response;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }

  

//--------------------------------------------------------------------------------------------------------------------------------

    async deleteAndGetStatus(url, status = 200, content_type = "application/json") {
        try {
            const response = await spec()
                .delete(url)
                .withHeaders({
                    'Accept': content_type
                })
                .expectHeaderContains('content-type', content_type) // Check that 'content-type' header contains the expected value
                .expectStatus(status);

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));

            return response;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }


    async deleteWithBearerTokenAndGetStatus(url, status = 200, token, content_type = "application/json") {
        try {
            if (!token) {
                throw new Error('Token is required');
            }
            
            const response = await spec()
                .delete(url)
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Accept': content_type
                })
                .expectHeaderContains('content-type', content_type) // Ensure the response header contains the expected content type
                .expectStatus(status);
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
    
            return response;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }
    

//--------------------------------------------------------------------------------------------------------------------------------

    async assertExpectBody(
        method, url, expectedBody, status = 200, partialMatch = true, contentType = "application/json", headers = {}
    ) {
        try {
            const methodUpper = method.toUpperCase();

            let specRequest = spec()
                .withMethod(methodUpper)
                .withPath(url)
                .withHeaders({
                    'Content-Type': contentType,
                    'Accept': contentType,
                    ...headers
                });

            if (partialMatch) {
                specRequest = specRequest.expectBodyContains(expectedBody);
            } else {
                specRequest = specRequest.expectBody(expectedBody);
            }

            // Add Header and status expectation
            specRequest = specRequest
                .expectHeaderContains('content-type', contentType)
                .expectStatus(status);

            const response = await specRequest;

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }


        async assertExpectBodyWithToken(
            method, url, expectedBody, status = 200, token, partialMatch = true, contentType = "application/json", headers = {}
        ) {
            try {
                if (!token) {
                    throw new Error("Authorization token is required");
                }
        
                const methodUpper = method.toUpperCase();
        
                let specRequest = spec()
                    .withMethod(methodUpper)
                    .withPath(url)
                    .withHeaders({
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': contentType,
                        'Accept': contentType,
                        ...headers
                    });
        
                if (partialMatch) {
                    specRequest = specRequest.expectBodyContains(expectedBody);
                } else {
                    specRequest = specRequest.expectBody(expectedBody);
                }
        
                // Add Header and status expectation
                specRequest = specRequest
                    .expectHeaderContains('content-type', contentType)
                    .expectStatus(status);
        
                const response = await specRequest;
        
                console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
                return response;
            } catch (error) {
                logger.error(error);
                assert.fail(error);
            }
        }


        async assertExceptBodyWithBody(
            method, url, body, expectedBody, status = 200, partialMatch = true, contentType = "application/json", headers = {}
        ) {
            try {
                const methodUpper = method.toUpperCase();
        
                let specRequest = spec()
                    .withMethod(methodUpper)
                    .withPath(url)
                    .withHeaders({
                        'Content-Type': contentType,
                        'Accept': contentType,
                        ...headers
                    })
                    .withBody(body);
        
                // Set body expectations based on partial match flag
                specRequest = partialMatch 
                    ? specRequest.expectBodyContains(expectedBody)
                    : specRequest.expectBody(expectedBody);
        
                // Add header and status expectation
                specRequest = specRequest
                    .expectHeaderContains('content-type', contentType)
                    .expectStatus(status);
        
                const response = await specRequest;
        
                console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
                return response;
            } catch (error) {
                logger.error(error.message); // Log specific error message
                assert.fail(`Request failed: ${error.message}`); // Provide a detailed failure message
            }
        }

            async assertExceptBodyWithBodyAndToken(
                method, url, body, expectedBody, status = 200, token, partialMatch = true, contentType = "application/json", headers = {}
            ) {
                try {
                    if (!token) {
                        throw new Error("Authorization token is required");
                    }
            
                    const methodUpper = method.toUpperCase();
            
                    // Build the request with method, URL, and headers
                    let specRequest = spec()
                        .withMethod(methodUpper)
                        .withPath(url)
                        .withHeaders({
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': contentType,
                            'Accept': contentType,
                            ...headers
                        })
                        .withBody(body); // Ensure body is included in the request
            
                    // Set body expectations based on the partial match flag
                    if (partialMatch) {
                        specRequest = specRequest.expectBodyContains(expectedBody);
                    } else {
                        specRequest = specRequest.expectBody(expectedBody);
                    }
            
                    // Add header and status expectations
                    specRequest = specRequest
                        .expectHeaderContains('content-type', contentType)
                        .expectStatus(status);
            
                    const response = await specRequest;
            
                    console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
                    return response;
                } catch (error) {
                    logger.error(error.message); // Log specific error message
                    assert.fail(`Request failed: ${error.message}`); // Provide a detailed failure message
                }
            }
        
        
    

//--------------------------------------------------------------------------------------------------------------------------------

    async jsonReader(path, name = "") {
        try {
            const data = await new Promise((resolve, reject) => {
                fs.readFile(path, 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
            return JSON.parse(data);
        } catch (err) {
            logger.error(err);
            assert.fail(`Error occurred while reading the ${name ? name + " " : ""}json file: ${err}`);
        }
    }

//--------------------------------------------------------------------------------------------------------------------------------

async  decryptObjectField(decrypt_key, object, keyname) {
    try {
        let obj = JSON.parse(JSON.stringify(object)); // Deep clone the object

        const decrypt = new Encrypter(decrypt_key);
        const decrypted_password = decrypt.dencrypt(obj[keyname]);

        obj[keyname] = decrypted_password;
        return obj
    } catch (error) {
        console.error(error);
    }
}

async decryptMultipleObjectField(decrypt_key, object, keyname) {
    try {
        // Deep clone the object (assuming the data is serializable)
        let obj = JSON.parse(JSON.stringify(object)); 
        
        // Recursive function to handle decryption
        const decryptObject = async (obj) => {
            if (typeof obj === 'object' && obj !== null) {
                if (obj[keyname]) {
                    obj = await this.decryptObjectField(decrypt_key, obj, keyname);
                    
                } else {
                    for (const key of Object.keys(obj)) {
                        if (typeof obj[key] === 'object' && obj[key] !== null) {
                            obj[key] = await decryptObject(obj[key]);
                        }
                    }
                }
            }
            return obj;
        };

        obj = await decryptObject(obj); // Start the decryption process
        return obj; // Return the fully decrypted object
    } catch (error) {
        console.error('Decryption error:', error);
    }
}



async decryptFieldFromFile(decrypt_key, path, keyname) {
    try {
        const data = await FS.readFile(path, 'utf-8'); // Read file asynchronously
        const obj = JSON.parse(data)

        await decryptObjectField(decrypt_key, obj, keyname);
    } catch (error) {
        console.error("Error in decryptPath:", error);
    }
}

//--------------------------------------------------------------------------------------------------------------------------------
        /**
     * Extracts API endpoints from a specified Excel sheet.
     *
     * @param {string} path - The file path to the Excel workbook.
     * @param {number} sheetNumber - The number of the sheet to extract data from (1-based index).
     * @param {string} apiNameColumn - The column name that contains the API names.
     * @param {string} apiEndpointUrlColumn - The column name that contains the API endpoint URLs.
     * @param {number} start_row - The starting row number for extraction (1-based index).
     * @param {number} end_row - The ending row number for extraction (1-based index).
     * @param {number[]} [skip_row] - An optional array of row numbers to skip during extraction.
     * @returns {Promise<Object>} A promise that resolves to an object mapping API names to their endpoints.
     * @throws {Error} If `start_row` is greater than `end_row`.
     * @throws {Error} If `sheetNumber` is not within the valid range.
     * @throws {Error} If `end_row` exceeds the total number of rows in the sheet.
     */
    async extractApiEndpoints(xlsx_path, sheetNumber, apiNameColumn, apiBaseUrl=null,  apiEndpointUrlColumn, start_row, end_row, skip_row = []) {
        try {
            // Validate input parameters
            const start_row_number = Number(start_row);
            const end_row_number = Number(end_row);
            if(start_row_number>end_row_number){
                throw new Error("Start row must be less than end row")
            }

            // Read the Excel file
            const workbook = xlsx.readFile(xlsx_path);

            // Get sheet names
            const sheetNames = workbook.SheetNames;
            const sheet_number = Number(sheetNumber)
            if (sheet_number < 1 || sheet_number > sheetNames.length) {
                throw new Error(`Invalid sheet number. Please select a sheet between 1 and ${sheetNames.length}`);
            }
    
            const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[sheetNumber-1]]);
            if (jsonData.length < end_row) {
                throw new Error("InvalidRowRangeError: The end row exceeds the total number of rows in the sheet.");
            }
            

            let result  = {}
    
    
            for (let i = start_row_number-1; i < end_row_number; i++){
                if(skip_row?.includes(i+1)) continue
                const row = jsonData[i];
                if(apiBaseUrl){
                    if(row && row[apiNameColumn] && row[apiBaseUrl] && row[apiEndpointUrlColumn]){
                        let baseUrl = row[apiBaseUrl];
                        let endpoint = row[apiEndpointUrlColumn];

                        // Ensure the base URL ends with a slash
                        if (!baseUrl.endsWith("/")) {
                            baseUrl += "/";
                        }

                        // Ensure the endpoint does not start with a slash
                        if (endpoint.startsWith("/")) {
                            endpoint = endpoint.slice(1);
                        }

                        result[row[apiNameColumn]] = baseUrl + endpoint;
                    }
                }
                else if (row && row[apiNameColumn] && row[apiEndpointUrlColumn]) {
                    result[row[apiNameColumn]] = row[apiEndpointUrlColumn];
                }
            }
    
            return result
        } catch (error) {
            logger.error(error)
            setTimeout(()=>{
                assert.fail(error)
            }, 50)
        }
    }
       
}

const Base = new BASEPAGE();
export default Base;

//--------------------------------------------------------------------------------------------------------------------------------

// const res = await Base.extractApiEndpoints("D:/API_MOCHA/Book1.xlsx","1","API Name", "API Base URL", "API Endpoint URL", "1", "13")
// console.log(res);
// console.log(await Base.jsonReader("test\\DevEnv\\functionality_1\\CRUD\\data\\create_recruiter.json"));



(()=>{
    const s = "/api/users/{user_id}/accounts/{account_id}"

s.split("").forEach((val)=>{
    console.log(typeof val);
})
// console.log(s.split("{").join("").split("}").join(""));

console.log(s.split('/'));

const m = []

s.split("/").forEach((val)=>{
    console.log(val);
    
    if(val.includes("{") && val.includes("}")){
        m.push(val.split("{")[1].split("}")[0])
    }
})

console.log(m);



const s1 = "{dcda}"
console.log(s1.split("{")[1].split("}")[0]);


function value(url, valuess){
    return new Promise((resolve, reject) =>{
        const arr = []
        const arr1 = {}
        url.split("/").forEach((val)=>{
            if(val.includes("{") && val.includes("}")){
                arr.push(val.split("{")[1].split("}")[0])
            }
        })

        for (var i=0; i<arr.length; i++){
            arr1[arr[i]] = valuess[i]
        }
        resolve(arr1)
    })
}

async function m1(val, valuess){
    const s = await value(val, valuess)
    console.log(await s);
    
}

m1("/api/users/{user_id}/accounts/{account_id}", ["0", "1"])


const s2 = "manu"
console.log(s2.substring(1, s2.length-1));


const s3 = "manu"

console.log(s3.charAt(0).toUpperCase() + s3.slice(1));


const  mg = {a: "manu", b:2}

const {a, b} = mg
console.log(b);
console.log('PORT:', process.env);
})





// const a = "{1234"

// console.log(a.substring(1, a.length), a.substring(a.length,))

// const a = {}

// a.m={
//     n:1,
//     o:2
// }

// const mm = a.m
// console.log(mm.o);


// const ab = "abcd"

// console.log(ab.substring(1));





