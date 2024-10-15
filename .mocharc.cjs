const  envConfig = require('konfig');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const dotenv = require('dotenv');
dotenv.config({path:".env"})



const argv = yargs(hideBin(process.argv)).argv
const global = new envConfig({ path: "./config" });
const env = global.config.env;

// console.log("Value of --hello:", argv);


  // async function open(){
  //   const { default: openLogo } = await import('./open.js');
  //   await openLogo();
  // };
  // open()

  module.exports = {
    // require: ['open.js'],
    // spec: `./test/` + env + `/functionality_1/**/*.js`, // Define the location of your test files
    spec: `./test/` + env + `/functionality_1/TestAPIs/Actualapi.js`,
    timeout: process.env.MAXTIMEOUT?parseInt(process.env.MAXTIMEOUT):10000,               // Set a timeout for tests (in milliseconds)
    // recursive: true,             // Look for test files in subdirectories
    // require: ['@babel/register'], // Use Babel to transpile ES6+ code
    reporter: 'mochawesome',            // Set the reporter to use for test results
    slow: 1000,                  // Specify the "slow" test threshold (in milliseconds)
    retries: process.env.RETRIES?parseInt(process.env.RETRIES):1,                  // Automatically retry failed tests up to 2 times
    ui: 'bdd',                   // Set the interface to "BDD" style (describe/it)
  };

