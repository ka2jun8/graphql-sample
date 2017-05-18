const assert = require("power-assert");
const request = require("superagent");

const env = require("dotenv").load();
const host = env.host || "http://localhost:4000/graphql";

describe("graphQL",()=>{
  before((done)=>{
    console.log("==== test start ====");
    done();
  });
  after((done)=>{
    console.log("==== test end ====");
    done();
  });
  it("get hello",(done)=>{
    request.post(host)
      .send({query: `{
        hello
      }`}).end((err, res)=>{
        if(err) assert(false);
        else assert(JSON.stringify(res.body) === JSON.stringify({
          data: {
            hello: "world"
          }
        }));
        done();
      });
  });

  it("get hello and user",(done)=>{
    request.post(host)
      .send({query: `{
        hello,
        user {
          name,
          age
        }
      }`}).end((err, res)=>{
        if(err) assert(false);
        else assert(JSON.stringify(res.body) === JSON.stringify({
          data: {
            hello: "world",
            user: {
              name: "Taro",
              age: 30
            }
          }
        }));
        done();
      });
    done();
  });

});