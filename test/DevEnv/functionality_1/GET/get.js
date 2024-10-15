import Base from "../../../../utils/utilityfunctions_json.js"
// import Base  from "../../../../utils/utilityfunctions.js"


describe("Internal app 2",()=>{
 
    it("Transaction history", async function(){
        // await Base.requestJsonStatusWithBasicAuth("get", "http://localhost:3005/data?accountNumber=1234567891", 200, "iStaff", "iStaff"  )
        await Base.getJsonStatusBasicAuth("http://localhost:3005/data?accountNumber=1234567891", 200, "iStaff", "iStaff"  )
    })

})

