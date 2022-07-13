import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DELETE_TODO, GET_TODOS } from '../graphql/graphql.queries';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  videos:any[] = []
  error:any;

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
      this.videos = data.deleteTodo;
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
      this.videos = data.todos;
      this.error = error;
  }
  );
  }

}
