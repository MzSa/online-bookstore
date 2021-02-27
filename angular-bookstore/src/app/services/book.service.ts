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
  //private baseUrl = "http://localhost:8080/api/v1/books?size=100";

  constructor(private httpClient: HttpClient) { }

  getBooks(theCategoryId: number): Observable<Book[]>{

    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;

    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
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
