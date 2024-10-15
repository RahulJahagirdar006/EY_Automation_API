import {Encrypter} from "./cryptoUtil.js"
import readline from "readline"
import {logger} from  "../logError/logfile.js"

/**
 * This utility is used to generate a encrypted password
*/


function generateEncryptedPassword(){
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('1. Enter the key name: ', (key_name) => {
  
      if (key_name==="" || key_name === undefined){
          logger.error("Key name cannot be empty")
          console.error("Key name cannot be empty")
          rl.close();
          return;
      }else if (key_name.length<3){
        logger.error("length of the key name must be greater than or equal to 3")
        console.error("length of the key name must be greater than or equal to 3")
        rl.close();
        return;
      }
    rl.question('2. Enter the password: ', (password) => {
      if (password==="" || password === undefined || !password){
          logger.error("password cannot be empty")
          console.error("password cannot be empty")
          rl.close();
          return;
      }
      const enc = new Encrypter(key_name) 
      const encrypted_password = enc.encrypt(password)
      console.log("3. Decryption key: ", key_name);
      console.log("4. Encrypted password: ", encrypted_password);
      rl.close();
    });
    
  });

  
}

generateEncryptedPassword()

