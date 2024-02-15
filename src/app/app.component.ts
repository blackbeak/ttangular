import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
//import { NgxPiwikProModule } from '@piwikpro/ngx-piwik-pro';  

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent, 
    FooterComponent,  
    HttpClientModule, 
    RouterOutlet,
    //NgxPiwikProModule.forRoot('a49a5069-98fa-4cc7-8be6-bd15f9990328', 'https://toristy.piwik.pro'),
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})

export class AppComponent {
  title = 'Toristy 24';
}
