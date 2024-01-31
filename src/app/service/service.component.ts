import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../data/models'; // Assuming you have a service.model.ts file
import { ApiService } from '../api.service'; // Assuming you have an API service to call your backend
import { CommonModule } from '@angular/common';

// ... (other imports)

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  serviceId: string | null = null;
  serviceData: Service | null = null; // Assuming 'Service' is the correct type for your data

  constructor(
    private route: ActivatedRoute, 
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.serviceId = params.get('id');
  
      console.log('Received serviceId:', this.serviceId);
  
      if (this.serviceId) {
        console.log('Fetching service data for ID:', this.serviceId);
        this.fetchService(this.serviceId);
      } else {
        console.error('No serviceId found in route parameters');
      }
    });
  }
  
  fetchService(id: string): void {
    this.apiService.getServiceById(id).subscribe(
      (data: Service) => {
        console.log('Service data received:', data);
        this.serviceData = data;
      },
      (error: any) => {
        console.error('Error fetching service data:', error);
      }
    );
  }
}

