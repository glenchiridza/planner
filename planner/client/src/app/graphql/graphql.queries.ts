import {gql} from 'apollo-angular'

const GET_TODOS = gql`
  query {
    todos {
      id
      image_url
      video_url
      name
      description
      is_clip
    }
  }
`


const ADD_TODO = gql`
  mutation addTodo($is_clip:Boolean!,$image_url:String!,$video_url:String!,$name: String!, $description: String!) {
    addTodo(is_clip:$is_clip,image_url:$image_url,video_url:$video_url,name: $name, description: $description) {
      id
      image_url
      video_url
      name
      description
      is_clip
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

