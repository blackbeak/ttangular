import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private titleService: Title, 
    private metaService: Meta) 
    { }

  // Existing slugify method
  slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '_')        // collapse whitespace and replace by underscore
      .replace(/-+/g, '_');        // collapse dashes
  }

  // Method to update the page title
  updateTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  // Method to update meta tags
  updateMetaTags(tags: {name: string, content: string}[]): void {
    tags.forEach(tag => {
      this.metaService.updateTag({ name: tag.name, content: tag.content });
    });
  }
}

