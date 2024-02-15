import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component'; 
import { BlogComponent } from './blog/blog.component';
import { CountryComponent } from './country/country.component';
import { CompaniesComponent } from './companies/companies.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { ArticleComponent } from './article/article.component'; // Update the path if necessary
import { ServiceComponent } from './service/service.component'; // Update the path if necessary



export const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'country', component: CountryComponent },
    { path: 'service/:id/:name', component: ServiceComponent },
    { path: 'companies', component: CompaniesComponent },
    { path: 'footer', component: FooterComponent },
    { path: '', component: HomeComponent },
    { path: 'navbar', component: NavbarComponent },
    // { path: 'article/:id/:slug', component: ArticleComponent },
     { path: '**', component:PageNotFoundComponent}

];


