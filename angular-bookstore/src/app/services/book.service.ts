import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:8080/api/v1/books";

  constructor(private httpClient: HttpClient) { }

  getBooks(): Observable<Book[]>{
    return this.httpClient.get<GetResponseBooks>(this.baseUrl).pipe(
      //map operator help us to convert response to book[]
      map(response => response._embedded.books)
    );
  }
}

// this will help us to unwrap the book array from the json response 

interface GetResponseBooks{
  _embedded: {
    books: Book[];
  }
}
