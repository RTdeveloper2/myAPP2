import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts`);
  }

  addItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/posts`, item);
  }

  updateItem(item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/posts/${item.id}`, item);
  }

  deleteItem(itemId: number){
    const res = fetch(`https://jsonplaceholder.typicode.com/posts/${itemId}`, {
        method: 'DELETE',
      });
    res.then((response) => response.json())
  .then((json) => console.log(json));
  }
}
