import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, Article, About, Service } from './data/models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://strapichronicles-production.up.railway.app/api';
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

  // Method to fetch home page content
  getHomePageContent(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/index?populate=*`);
  }

  // Method to fetch home page content with testimonials populated
  getHomePageContentWithTestimonials(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/index?populate[testimonials][populate]=*`)
      .pipe(
        tap(data => console.log('Fetched data with testimonials:', data)) // Log fetched data
      );
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
  getServiceById(id: string): Observable<Service> {
    return this.http.get<{ data: Service }>(`${this.serviceApiUrl}/service/${id}?apikey=${this.apiKey}`)
      .pipe(
        map(response => response.data)
      );
  }
}

