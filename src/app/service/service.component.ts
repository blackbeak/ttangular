import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { UtilsService } from '../utils.service';
import { Service } from '../data/models';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit, OnDestroy {
  serviceId: string | null = null;
  serviceData?: Service; // Made optional to reflect that it may not be initialized.
  currentIndex: number = 0;
  slugifiedName: string = '';
  iframeUrl?: SafeResourceUrl; // Made optional as well.
  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private utilsService: UtilsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.paramMap.subscribe(params => {
        this.serviceId = params.get('id');
        const name = params.get('name') || '';
        this.slugifiedName = this.utilsService.slugify(name);

        if (this.serviceId) {
          this.fetchService(this.serviceId);
        } else {
          console.error('No serviceId found in route parameters');
        }
      })
    );
  }

  fetchService(id: string): void {
    this.subscriptions.add(
      this.apiService.getServiceById(id).subscribe({
        next: (response: any) => {
          // console.log('Full API Response:', response);
          const bookingLink = response.onlybookingwithreviewslink;
          // console.log('Booking link:', bookingLink);
          
          if (bookingLink) {
            this.serviceData = response.service;
            this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(bookingLink);
          } else {
            console.error('Booking link not found in response');
          }
        },
        error: (error) => {
          console.error('Error fetching service data:', error);
        }
      })
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  // Navigation methods for images
  goToImage(index: number): void {
    if (this.serviceData && this.serviceData.images) {
      this.currentIndex = Math.max(0, Math.min(index, this.serviceData.images.length - 1));
    }
  }

  nextImage(): void {
    if (this.serviceData && this.serviceData.images && this.currentIndex < this.serviceData.images.length - 1) {
      this.currentIndex++;
    }
  }

  prevImage(): void {
    if (this.serviceData && this.serviceData.images && this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}