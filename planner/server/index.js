const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema,GraphQLObjectType,GraphQLList,GraphQLNonNull,GraphQLInt,GraphQLString } = require("graphql");

const app = express();


const Todos = [
    { id: 1, image_url:"../assets/bao.jpeg",name: 'Kids show', description: 'Let the children watch adventure movies'},
    { id: 2, image_url:"../assets/securico.jpg",name: 'Learn Security', description: 'Read more about security 6PM-7PM'},

  ]
  
  const TodoType = new GraphQLObjectType({
      name: 'Todo',
      description: 'This is a todo',
      fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        image_url: {type: new GraphQLNonNull(GraphQLString)},
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
      })
    })

    const RootQueryType = new GraphQLObjectType({
        name: 'Query',
        description: 'Root Query',
        fields: () => ({
          todos: {
            type: new GraphQLList(TodoType),
            description: 'List of All Todos',
            resolve: () => Todos
          },
          todo:{
            type: TodoType,
            description: 'Single Todo',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
            },
            resolve: (root, args) => {
                return Todos.find(todo => todo.id === args.id)
            }
          }
        })
      })



      const RootMutationType = new GraphQLObjectType({
        name: 'Mutation',
        description: 'Root Mutation',
        fields: () => ({
          addTodo: {
            type: TodoType,
            description: 'Add a new Todo',
            args: {
                image_url: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                description: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve: (root, args) => {
                const newTodo = {
                    id: Todos.length + 1,
                    image_url:args.image_url,
                    name: args.name,
                    description: args.description,
                }
                Todos.push(newTodo)
                return newTodo
          }},
          deleteTodo: {
            type: TodoType,
            description: 'Delete a Todo',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
            },
            resolve: (root, args) => {
                const todo = Todos.find(todo => todo.id === args.id)
                if(todo){
                    Todos.splice(Todos.indexOf(todo), 1)
                    return todo
                }
                return null
            }
          },
    })})

    //schema with root qeury and mutations

    const schema = new GraphQLSchema({
        query: RootQueryType,

        mutation: RootMutationType
      }) 
    

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);
app.listen(4000);

console.log("Running a GraphQL API server at localhost:4000/graphql");
