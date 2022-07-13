import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ADD_TODO, DELETE_TODO, GET_TODOS } from '../graphql/graphql.queries';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  todos: any[] = [];
  error: any;
  
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
