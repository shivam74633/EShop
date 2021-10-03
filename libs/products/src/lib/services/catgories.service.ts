import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Category } from '../models/category';
import { Observable } from 'rxjs';

import { environment } from '@env/environment'

@Injectable({
  providedIn: 'root'
})
export class CatgoriesService {
  
  categoryApiUrl = environment.apiURl+ 'category';

  constructor(private http: HttpClient) { }

  getCategories() : Observable<any>{
    return this.http.get(this.categoryApiUrl);
  }

  getCategory(id: string) : Observable<any>{
    return this.http.get(`${this.categoryApiUrl}/${id}`);
  }

  createCategory(category: Category) : Observable<any>{
    return this.http.post(this.categoryApiUrl,category)
  }

  deleteCategory(categoryId: string): Observable<any>{
    return this.http.delete(`${this.categoryApiUrl}/${categoryId}`)
  }

  updateCategory(categoryId: string,category: Category) : Observable<any>{
    return this.http.put(`${this.categoryApiUrl}/${categoryId}`,category);
  }
}
