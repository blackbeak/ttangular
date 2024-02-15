import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlaneCircleXmark, faPiggyBank, faMagnifyingGlassPlus, faRankingStar  } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { Home } from '../data/models';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  faPlanetCircleXmark = faPlaneCircleXmark;
  faPiggyBank = faPiggyBank;
  faMagnifyingGlassPlus = faMagnifyingGlassPlus;
  faRankingStar = faRankingStar;

  homeContent: Home = {} as Home;

  constructor(private apiService: ApiService, private utilsService: UtilsService) { }

  

  ngOnInit() {
    this.apiService.getHomePageContent().subscribe({
      next: (data) => {
        this.homeContent = data; // Assuming this directly gives you the structure you need
        // Dynamically update the title and meta description with the fetched data
        this.utilsService.updateTitle(this.homeContent?.data?.attributes?.headline);
        const imageUrl = this.homeContent?.data?.attributes?.homeImage?.data?.attributes?.formats?.large?.url ||
                 this.homeContent?.data?.attributes?.homeImage?.data?.attributes?.formats?.medium?.url ||
                 this.homeContent?.data?.attributes?.homeImage?.data?.attributes?.formats?.small?.url ||
                 'https://res.cloudinary.com/dwoluaptn/image/upload/v1692946527/tt_background_8d384a23c7.jpg'; // Fallback to a default image URL if none are available

        this.utilsService.updateMetaTags([
          { name: 'description', content: this.homeContent?.data?.attributes?.shortDesc },
          { name: 'og:title', content: this.homeContent?.data?.attributes?.headline },
          { name: 'og:image', content: imageUrl },
          { name: 'og:url', content: 'https://toristy.travel/' },
          { name: 'og:type', content: 'Website' },
          { name: 'og:site_name', content: 'Toristy Travel' },
        ]);
      },
      error: (error) => console.error('There was an error fetching the home page content:', error)
    });
  }
}

