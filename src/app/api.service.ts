import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category, Article, About, Service } from './data/models';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://ttbackend-production-d6df.up.railway.app/api';
  private serviceApiUrl ='https://api.toristy.com';
  private apiKey = 'CYRYUUkQZxYLFKORkvOq6JzhavmRgz';

  constructor(private http: HttpClient) { }

  // Method to fetch all article categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  // Method to fetch all articles with a limit and sorted by published date
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/articles?populate=category,cover&pagination[limit]=45&sort=publishedAt:desc`);
  }

  // Method to fetch a single article by slug
  getArticleById(id: string): Observable<Article> {
    return this.http.get<{ data: Article }>(`${this.baseUrl}/articles/${id}?populate=*`)
      .pipe(
        map(response => response.data)
      );
  }

  // Method to fetch home page content with country images
  getHomePageContent(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/index?populate[countries][populate][countryImage]=true`);
  }


   // Method to fetch about page content
   getAboutPageData(): Observable<About> {
    return this.http.get<About>(`${this.baseUrl}/about?populate=*`);
  }

   // Method to fetch all Services with a limit and sorted by cataegory
   getServicesByCategory(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.serviceApiUrl}/articles?populate=category,cover&pagination[limit]=45&sort=publishedAt:desc`);
  }

  // Method to fetch a single service by ID
  getServiceById(id: string): Observable<any> {
    const url = `${this.serviceApiUrl}/service/${id}?apikey=${this.apiKey}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    // Return an observable with a user-facing error message
    return throwError(errorMessage);
  }
  
}

