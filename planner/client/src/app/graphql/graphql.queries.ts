import {gql} from 'apollo-angular'

const GET_TODOS = gql`
  query {
    todos {
      id
      image_url
      name
      description
    }
  }
`

const ADD_TODO = gql`
  mutation addTodo($image_url:String!,$name: String!, $description: String!) {
    addTodo(image_url:$image_url,name: $name, description: $description) {
      id
      image_url
      name
      description
    }
  }
`

const DELETE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
  `

export {GET_TODOS, ADD_TODO, DELETE_TODO}

