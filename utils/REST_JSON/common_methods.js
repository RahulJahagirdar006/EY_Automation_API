import fs from 'fs';
import * as FS from "fs/promises"
import xlsx from "xlsx";
import { Encrypter } from "../../crypto_utils/cryptoUtil.js";



export const common_methods = {

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
    },

///------------------------------------------------------------------------------------------------------------------------------------

    async decrypt(decrypt_key, password){
        try {
            const decrypt = new Encrypter(decrypt_key);
            return decrypt.dencrypt(password);
        } catch (error) {
            console.error(error);
        }
    },

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
    },

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
    },
    


    async decryptFieldFromFile(decrypt_key, path, keyname) {
        try {
            const data = await FS.readFile(path, 'utf-8'); // Read file asynchronously
            const obj = JSON.parse(data)
    
            await decryptObjectField(decrypt_key, obj, keyname);
        } catch (error) {
            console.error("Error in decryptPath:", error);
        }
    },


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
        },

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    async  excelToJson(xlsx_path, sheetNumber, path, {start_row, end_row, skip_row = []}) {
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
            if (jsonData.length < Number(end_row)) {
                throw new Error("InvalidRowRangeError: The end row exceeds the total number of rows in the sheet.");
            }

            // console.log(jsonData);
            
            const object = JSON.stringify(jsonData, null, 4);
            const cleanedRawJSON  = object.replace(/\\r\\n/g, ""); 
            const parsedJSON = JSON.parse(cleanedRawJSON); // Parse the cleaned string to JSON object
            
        for (let i = 0; i < parsedJSON.length; i++){
            // Iterate through the keys of the first object in the array
            
            Object.keys(parsedJSON[i]).forEach((val) => {
                // Check if the value is a string and starts with '{', indicating it could be a JSON string
                if (typeof parsedJSON[i][val] === 'string' && parsedJSON[i][val].startsWith('{') && parsedJSON[i][val].endsWith('}')) {
                    try {
                        // Parse the string to JSON and update the value in `s`
                        parsedJSON[i][val] = JSON.parse(parsedJSON[i][val]);
            
                    } catch (error) {
                        // Log any errors in case the string is not valid JSON
                        console.error(`Error parsing value for ${val}:`, error);
                    }
                }
            });
        }

        let final_value = []
        
        if(start_row_number&&end_row_number){
                for (let i = Number(start_row)-1; i<Number(end_row); i++){
                    if(skip_row.includes(i+1)){
                        continue;
                    }
                    else final_value.push(parsedJSON[i])
                }
            }else if(start_row_number&& !end_row_number){
                for (let i = Number(start_row)-1; i<parsedJSON.length; i++){
                    if(skip_row.includes(i+1)) continue;
                    else final_value.push(parsedJSON[i])
                }
            }else if(!start_row_number&& end_row_number){
                for (let i = 0; i<Number(end_row); i++){
                    if(skip_row.includes(i+1)) continue;
                    else final_value.push(parsedJSON[i])
                }
            }
            else{
                final_value = parsedJSON
            }
            var json_value = JSON.stringify(final_value, null, 4);
            fs.writeFile(path, json_value, 'utf8', function (err){
                if (err) throw err;
                console.log(`JSON data has been saved to ${path}`);
            });
            
        } catch (error) {
            // logger.error(error)
            setTimeout(()=>{
                // assert.fail(error)
            }, 50)
            console.error(error)
        }
    },

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    async  extractDataFromExcel(xlsx_path, sheetNumber, {start_row, end_row, skip_row = []}) {
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
            if (jsonData.length < Number(end_row)) {
                throw new Error("InvalidRowRangeError: The end row exceeds the total number of rows in the sheet.");
            }

            // console.log(jsonData);
            
            const object = JSON.stringify(jsonData, null, 4);
            const cleanedRawJSON  = object.replace(/\\r\\n/g, ""); 
            const parsedJSON = JSON.parse(cleanedRawJSON); // Parse the cleaned string to JSON object
            
        for (let i = 0; i < parsedJSON.length; i++){
            // Iterate through the keys of the first object in the array
            
            Object.keys(parsedJSON[i]).forEach((val) => {
                // Check if the value is a string and starts with '{', indicating it could be a JSON string
                if (typeof parsedJSON[i][val] === 'string' && parsedJSON[i][val].startsWith('{') && parsedJSON[i][val].endsWith('}')) {
                    try {
                        // Parse the string to JSON and update the value in `s`
                        parsedJSON[i][val] = JSON.parse(parsedJSON[i][val]);
            
                    } catch (error) {
                        // Log any errors in case the string is not valid JSON
                        console.error(`Error parsing value for ${val}:`, error);
                    }
                }
            });
        }

        let final_value = []
        
        if(start_row_number&&end_row_number){
                for (let i = Number(start_row)-1; i<Number(end_row); i++){
                    if(skip_row.includes(i+1)){
                        continue;
                    }
                    else final_value.push(parsedJSON[i])
                }
            }else if(start_row_number&& !end_row_number){
                for (let i = Number(start_row)-1; i<parsedJSON.length; i++){
                    if(skip_row.includes(i+1)) continue;
                    else final_value.push(parsedJSON[i])
                }
            }else if(!start_row_number&& end_row_number){
                for (let i = 0; i<Number(end_row); i++){
                    if(skip_row.includes(i+1)) continue;
                    else final_value.push(parsedJSON[i])
                }
            }
            else{
                final_value = parsedJSON
            }
            
            return final_value
            
        } catch (error) {
            // logger.error(error)
            setTimeout(()=>{
                // assert.fail(error)
            }, 50)
            console.error(error)
        }
    }
        
}

