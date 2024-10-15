import Base  from "../../../../utils/utilityfunctions_json.js"
// import Base  from "../../../../utils/utilityfunctions.js"

describe("Internal app 1",()=>{
    // it("put", async function(){
    //     const data = await Base.jsonReader("temp_internal/regis.json")
    //     await Base.putBodyWithBearerTokenAndGetStatus("http://localhost:3170/1", data.username,  data.token, 200)
    //     // await Base.putJsonWithBearerTokenAndGetStatus("http://localhost:3170/1", data.username,  data.token, 200)
    // })
    it("App registry", async function(){
        const data = await Base.jsonReader("test/DevEnv/functionality_1/POST/data/application.json")
        await Base.postJsonAndGetStatus("http://localhost:3110/submit", data, 201, {"x-api-key":"0d9980d3367f76fc3f3223e3ca3c2e6e730b8d19a7fd49e69de1cc316955a8ba"})
        // await Base.expectErrorWithJsonBody("post", "http://localhost:3110/submit", data, {code:"ECONNREFUSED"})
    })

})

