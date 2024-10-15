

import BASEPAGE1 from "../utils/utilityfunctions.js"
// import dotenv from "dotenv"
// dotenv.config({path:".env"})
const base1 = new BASEPAGE1()


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var data = await base1.jsonReader("test/app/DevEnv/Data/regis.json") 
var regis= await base1.jsonReader("test/app/DevEnv/Data/regis_data.json") 
// console.log(regis);

describe.only("perform api your own request", function(){
    describe("Post", function(){
        it.skip("Login (Json) and get the token", async function(){
          await base1.postJsonAndGetStatus(data.loginurl, "test/app/DevEnv/Data/login.json", 200, (res)=>{
            console.log(res.body);
          })
        })

        it("Get (without json)", async function(){
          await base1.getstatus('http://localhost:3170/Home', 200, async(res)=>{
            console.log(res.body);
          })
        });

        it("Get (Json)", async function(){
            await base1.getJsonStatus('http://localhost:3170/Home?json=1', 200, async(res)=>{
              console.log(res.body);
            })
        })

        it('Get with Bearer token (without json)', async function(){
          await base1.getStatusWithBearerToken('http://localhost:3170/Home/bearer',data.token, 200, async(res)=>{
            console.log(res.body);
          })
        })

        it('Get with Bearer token (json)', async function(){
          await base1.getStatusWithBearerToken('http://localhost:3170/Home/bearer?json=1',data.token, 200, async(res)=>{
            console.log(res.body);
          })
        })

        it('Get with Bearer token (json)', async function(){
          await base1.getJsonStatusWithPathParams('http://localhost:3170/Home/{id}/hello/{pa}', ["1", "2"], data.token, 200, async(res)=>{
            console.log(res.body);
          })
        })
      })
        //--with method
    describe.only('with method', async function(){
          
          it.only("get request and get status", async()=>{
            await base1.requestStatus("GET", 'http://localhost:3170/Home', 200, async(res)=>{
              console.log(res.body);
            })
          })
          
  
          it.only("post the request and get status", async()=>{
            await base1.requestStatus("POST", 'http://localhost:3170/Home/', 200, async(res)=>{
              console.log(res.body);
            })
          })
  
          it.only("get request and get status (Json)", async()=>{
            await base1.requestJsonStatus("GET", 'http://localhost:3170/Home?json=1', 200, async(res)=>{
              console.log(res.body);
            })
          })

          it.only("post the request and get status (Json)", async()=>{
            await base1.requestJsonStatus("POST", 'http://localhost:3170/Home?json=2', 200, async(res)=>{
              console.log(res.body);
            })
          })


          it.only("with token send request and get status ", async()=>{
            await base1.requestStatusWithToken("GET", 'http://localhost:3170/Home/bearer', data.token, 200, async(res)=>{
              console.log(res.body);
            })
            await base1.requestStatusWithToken("GET", 'http://localhost:3170/Home/1/hello/2', data.token, 200, async(res)=>{
              console.log(res.body);
            })
            await base1.getJsonStatusWithPathParams('http://localhost:3170/Home/{id1}/hello/{id2}',["1", "2"], data.token, 200, async(res)=>{
              console.log(res.body);
            })
          })

          it.only("with token send request and get status (Json)", async()=>{
            await base1.requestJsonStatusWithToken("GET", 'http://localhost:3170/Home/bearer?json=1', data.token, 200, async(res)=>{
              console.log(res.body.message);
            })
          })

          it.only("with token and query, send request and get status", async()=>{
            await base1.getJsonStatusWithQueryParams('http://localhost:3170/Home/query', {"account":"123"}, data.token, 200, async(res)=>{
              console.log(res.body);
            })
            
          })

          it.only("Post body and get status", async()=>{
            await base1.postBodyGetStatus('http://localhost:3170/Home/', {"a":1}, 200, async(res)=>{
              console.log(res.body);
            })
          })

          it.only("Post JSON body with bearer token and get status", async () => {
            await base1.postJsonWithBearerTokenAndGetStatus(
                'http://localhost:3170/Home/json1',
                { "a": "hello" },
                data.token,
                200,
                async (res) => {
                    console.log(res.body);
                }
            );
            console.log(process.env.NODE_ENV);
            
        });

        it.skip("should", async () => {
          await base1.deleteAndGetstatus("http://localhost:3170/7", 200,  async(res)=>{
            console.log(res.body.message);
          })
        })

        it.skip("should", async () => {
          await base1.deleteWithBearerTokenAndGetstatus("http://localhost:3170/9", data.token, 200,  (res)=>{
            console.log(res.body.message);
          })
        })


          it.skip("Delete body and get status", async()=>{
            await base1.requestJsonStatusWithToken("DELETE", "http://localhost:3170/3", data.token, 200, async(res)=>{
              console.log(res.body.message);
            })
          })

        

          it.skip("Login (Json) and get the token", async function(){
            await base1.postJsonAndGetStatus(data.loginurl, "test/app/DevEnv/Data/login.json", 200, (res)=>{
              console.log(res.body);
            })
            // await spec()
            // .get('http://localhost:3170/login')
            // .withAuth('john_doe', 'password123')
            // .expectStatus(200);
          })
  
      })
        
        
})

// describe.only("", function(){
//   it("", async function(){
//     for (let i = 0; i<regis.length; i++){
//         await base1.postBodyGetStatus("http://localhost:3170/register", regis[i], 201, async(res)=>{
//           console.log(regis.username);
//         })
//     }
//   })
// })


