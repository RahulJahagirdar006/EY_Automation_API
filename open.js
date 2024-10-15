// esModule.js (ES6 Module)
import open from "open";

// export default async function openLogo() {
//     await open("https://www.npmjs.com/package/open?activeTab=readme");
//     console.log("Swagger API documentation is now accessible at https://www.npmjs.com/package/open?activeTab=readme");
// }



(async function() {
        setTimeout(async()=>{
            await open("https://www.npmjs.com/package/open?activeTab=readme");
            console.log("Swagger API documentation is now accessible at https://www.npmjs.com/package/open?activeTab=readme");
        })
})()
