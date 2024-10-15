import Base from "../../../../utils/utilityfunctions_json.js";

describe("Internal app 1", () => {
    it.only("should", async() => {       
        // await Base.getJsonStatus("https://api.restful-api.dev/objects", 200).then(async(response) => {
            
        // });
        await Base.assertExpectJson("get", "https://api.restful-api.dev/objects", "test/DevEnv/functionality_1/TestAPIs/TestData/Request.json", 200, false)
        
    })
})