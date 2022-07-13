import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ADD_TODO, DELETE_TODO, GET_TODOS } from '../graphql/graphql.queries';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: any[] = [];
  error: any;

  placeholder_video = "../assets/The.Wedding.Ringer.2020.720p.BluRay.x264.YIFY.mp4";

  todoForm = new FormGroup({
    is_clip: new FormControl('',),
    image_url: new FormControl('',Validators.required),
    video_url: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  addTodo() {
    // apollo graphql query to add todo
    this.apollo.mutate({
      mutation: ADD_TODO,
      variables: {
        is_clip:false,
        image_url:this.todoForm.value.image_url,
        video_url:this.placeholder_video,
        name: this.todoForm.value.name,
        description: this.todoForm.value.description,
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    }).subscribe(({data}: any) => {
      this.todos = data.addTodo;
      this.todoForm.reset();
    }
    , (error) => {
      this.error = error;
    }
    );

  }

  addTodoPrac() {
    // apollo graphql query to add todo
    this.apollo.mutate({
      mutation: ADD_TODO,
      variables: {
        is_clip:true,
        image_url:this.todoForm.value.image_url,
        video_url:this.todoForm.value.video_url,
        name: this.todoForm.value.name,
        description: this.todoForm.value.description,
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    }).subscribe(({data}: any) => {
      this.todos = data.addTodo;
      this.todoForm.reset();
    }
    , (error) => {
      this.error = error;
    }
    );

  }

  deleteTodo(id: string) {
    // apollo graphql query to delete todo
    this.apollo.mutate({
      mutation: DELETE_TODO,
      variables: {
        id: id,
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    }).subscribe(({data}: any) => {
      this.todos = data.deleteTodo;
    }
    , (error) => {
      this.error = error;
    }
    );
  }

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_TODOS
    }).valueChanges.subscribe(({ data, error }: any) => {
      this.todos = data.todos;
      this.error = error;
  }
  );
  }
}
