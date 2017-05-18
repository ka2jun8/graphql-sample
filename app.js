const express = require("express");
const bodyParser = require("body-parser");
const gE = require("graphql-server-express");
const makeExecutableSchema = require("graphql-tools").makeExecutableSchema;

const schemas = [`
  type User {
    name: String,
    age: Int
  }
  type Query {
    hello: String,
    user: User
  }
  schema {
    query: Query
  }
`];

const resolvers = {
  Query: {
    hello(root) {
      return "world";
    },
    user(){
      return { name: "Taro", age: 30 }; 
    }
  }
};

const schema = makeExecutableSchema({typeDefs: schemas, resolvers});

const app = express();
app.use("/graphql", bodyParser.json(), gE.graphqlExpress({schema}));
app.use("/graphiql", gE.graphiqlExpress({endpointURL: "/graphql"}));
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
