import Base from "../../../../utils/utilityfunctions.js"
import Base_json from "../../../../utils/utilityfunctions_json.js"
// import {Encrypter} from "../../../../crypto_utils/cryptoUtil.js"

let endpoint = await Base_json.extractApiEndpoints("config/ISV_API_LIST.xlsx","1","API_Name", "API_Base_URL", "API_Endpoint_URL", "1", "13")
let user_management = await Base_json.jsonReader("test/DevEnv/functionality_1/CRUD/data/user_managemet.json")
let status_code = await Base_json.jsonReader("test/DevEnv/functionality_1/CRUD/data/status.json")
let schema = await Base_json.jsonReader("test/DevEnv/functionality_1/CRUD/data/schema.json")
let padmin_token
let eadmin_token
let candidates_body


describe("User Mangement", ()=>{

  describe("Padmin", ()=>{
    

    it("register Padmin", async()=>{
      await Base_json.requestJsonWithBodyStatus("post",
        endpoint.ISV_UM_REGISTER_POST_O1,
        await Base_json.decryptObjectField("PAdmin", user_management.Register_PAdmin, "password"),
        status_code.created, {"x-api-key":"db630898-9179-4bbc-bfa0-95f2f7734a22"})
    })

    it("Login Padmin", async()=>{
      const Login = await Base_json.postJsonAndGetStatus(endpoint.ISV_UM_LWP_POST_O2,
        await Base_json.decryptObjectField("PAdmin", user_management.Login_PAdmin, "password"),
        status_code.sucess)
      padmin_token = Login.body.data.auth_code
    })

    it("Create a Edamin and Company by Padmin", async()=>{
      await Base_json.postJsonWithBearerTokenAndGetStatus(endpoint.ISV_UM_CComp_POST_O8,
        await Base_json.decryptMultipleObjectField("EAdmin", user_management.Eadmin_Company, "password"),
        status_code.created,
        padmin_token)
    })
  })

  describe("Eadmin", ()=>{

    it("Login Eadmin", async()=>{
      const Login = await Base_json.postJsonAndGetStatus(endpoint.ISV_UM_LWP_POST_O2,
        await Base_json.decryptObjectField("EAdmin", user_management.Login_Eadmin, "password"),
        status_code.sucess)
      eadmin_token = Login.body.data.auth_code
    })

    it("Create A Recruiter By Eadmin", async()=>{
      await Base_json.postJsonWithBearerTokenAndGetStatus(endpoint.ISV_UM_CEMP_POST_O9,
        await Base_json.decryptObjectField("Recruiter", user_management.Create_Recruiter, "password"),
        status_code.created,
        eadmin_token)
    })

  })

  describe("Recruiter", ()=>{
    let recruiter_token

    it("Login Recruiter", async()=>{
      const Login = await Base_json.postJsonAndGetStatus(endpoint.ISV_UM_LWP_POST_O2,
        await Base_json.decryptObjectField("Recruiter", user_management.Login_Recruiter, "password"),
        status_code.sucess)
      recruiter_token = Login.body.data.auth_code
    })

    it("Create A Candiate By Recruiter", async()=>{
      await Base_json.postJsonWithBearerTokenAndGetStatus(endpoint.ISV_UM_CCa_POST_11,
        await Base_json.decryptObjectField("Candidate", user_management.Create_Candidate, "password"),
        status_code.created,
        recruiter_token)
    })
  })

  describe("Fetch", ()=>{
    it("Fetch companies by Padmin", async()=>{
      await Base_json.getJsonStatusWithBearerToken(endpoint.ISV_UM_FComp_GET_12, status_code.sucess, padmin_token)
    })

    it("Fetch candidates by Eadmin", async()=>{
      const body = await Base_json.getJsonStatusWithBearerToken(endpoint.ISV_UM_FCa_GET_13,status_code.sucess, eadmin_token)  
      candidates_body = body.body;
    })
  })

  describe('schema Validation', ()=>{
    it('should validate the schema of the candidates', async()=>{
      await Base_json.validateJsonSchemaWithToken("get", endpoint.ISV_UM_FCa_GET_13, status_code.sucess, schema.candidate_schema, eadmin_token) 
    })
  })

  describe('expect response time', ()=>{
    it('should validate the response time of the candidates', async()=>{
      await Base_json.expectResponseTimeWithBearerToken("get", endpoint.ISV_UM_FCa_GET_13, eadmin_token, status_code.sucess, 1000 )
    })
  })

  describe('Expect Header', ()=>{
    it('should validate the Expect Header of the candidates', async()=>{
      await Base_json.expectHeaderWithBearerToken("get", endpoint.ISV_UM_FCa_GET_13,status_code.sucess, eadmin_token, "application/json" )
    })
  })



})


// describe("", ()=>{
//   it("", async()=>{
//     // await Base_json.validateJsonSchema("get", "http://localhost:3050", 200, {
//     //   "type": "object",
//     //   "properties": {
//     //     "message": { "type": "string" }
//     //   },
//     //   "required": ["message"]
//     // })
//     // await Base_json.validateJsonBodySchema("post", "http://localhost:3050", {message:"submit"}, 200, {
//     //   "type": "object",
//     //   "properties": {
//     //     "message": { "type": "string" }
//     //   },
//     //   "required": ["message"]
//     // })
//     // await Base_json.validateJsonSchemaWithToken("get", "http://localhost:3050", 200, {
//     //   "$schema": "http://json-schema.org/draft-04/schema#",
//     //   "description": "",
//     //   "type": "object",
//     //   "properties": {
//     //     "message": {
//     //       "type": "string",
//     //       "minLength": 1
//     //     }
//     //   },
//     //   "required": [
//     //     "message"
//     //   ]
//     // }, "pass")

//     await Base_json.requestJsonStatusWithPathParams("get", "http://localhost:3050/{user_id}/{account_id}", [1, 'CY001001'], 200)
//   })
// })






