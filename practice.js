// import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";
// import "./utils/utilityfunctions.js"
// export default defineConfig({
//   plugins: [
//     obfuscatorPlugin({
//         include: [
//             "src/utils/utilityfunctions.js", // Specific file
//             // "src/components/**/*.js",        // All JS files in the components directory
//             // /foo\.js$/                       // Any file ending with 'foo.js'
//           ]
//           ,
//       exclude: [/node_modules/],
//       apply: "build",
//       debugger: true,
//       options: {
//         // your javascript-obfuscator options
//         debugProtection: true,
//         // ...  [See more options](https://github.com/javascript-obfuscator/javascript-obfuscator)
//       },
//     }),
//   ],
// });

// import yargs from 'yargs';
// import { hideBin } from 'yargs/helpers'
// const argv = yargs(hideBin(process.argv)).argv

// console.log(argv);

import base from "./utils/utilityfunctions_json.js";
import { Encrypter } from "./crypto_utils/cryptoUtil.js";
import fs from "fs/promises"; // Use fs.promises for async/await


const m = await base.jsonReader("test/DevEnv/functionality_1/CRUD/data/user_managemet.json");

async function  decryptObjectField(decrypt_key, object, keyname) {
    try {
        let obj = JSON.parse(JSON.stringify(object)); // Deep clone the object

        const decrypt = new Encrypter(decrypt_key);
        const decrypted_password = decrypt.dencrypt(obj[keyname]);

        obj[keyname] = decrypted_password;
        console.log(obj);
        
        return obj
    } catch (error) {
        console.error(error);
    }
}

await decryptObjectField("EAdmin", m.Eadmin_Company.employee, "password");


async function decryptMultipleObjectField(decrypt_key, object, keyname) {
    try {
        // Deep clone the object (assuming the data is serializable)
        let obj = JSON.parse(JSON.stringify(object)); 
        
        // Recursive function to handle decryption
        const decryptObject = async (obj) => {
            if (typeof obj === 'object' && obj !== null) {
                if (obj[keyname]) {
                    obj = await decryptObjectField(decrypt_key, obj, keyname);
                    
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

await decryptMultipleObjectField("EAdmin", m.Eadmin_Company, "password");

async function decryptFieldFromFile(decrypt_key, path, keyname) {
    try {
        const data = await fs.readFile(path, 'utf-8'); // Read file asynchronously
        const obj = JSON.parse(data)

        await decryptObjectField(decrypt_key, obj.Register_PAdmin, keyname);
    } catch (error) {
        console.error("Error in decryptPath:", error);
    }
}

await decryptFieldFromFile("PAdmin", "test/DevEnv/functionality_1/CRUD/data/user_managemet.json", "password");


const apiKeys = new Set(['key1', 'key2', 'key3']);
console.log(apiKeys);

const keyToCheck = 'key1';
if (apiKeys.has(keyToCheck)) {
  console.log('API Key is valid.');
} else {
  console.log('Invalid API Key.');
}

apiKeys.add("key")
apiKeys.delete("key")

for (const api of apiKeys){
    console.log(api);
    
}

const ms = new Map();
ms.set('a', 'key1');
console.log(ms);


// Accessing the value using the `get` method
console.log(ms.get('a'));  // Output: 'key1'




// Make sure to include these imports:

