// CategoryAttributes and Category interfaces remain unchanged

export interface CategoryAttributes {
    name: string;
    slug: string;
    description: string;
  }
  
  export interface Category {
    id: number;
    attributes: CategoryAttributes;
  }
  
  // Define interfaces for different block types
  
  export interface QuoteBlock {
    id: number;
    __component: 'shared.quote';
    title: string;
    body: string;
    url: string;
  }
  
  export interface RichTextBlock {
    id: number;
    __component: 'shared.rich-text';
    body: string;
  }
  
  export interface MediaBlock {
    id: number;
    __component: 'shared.media';
    url: string;
    alt: string;
    // Define additional properties for the media block as needed
  }
  
  // ArticleAttributes now includes a blocks array
  
  export interface ArticleAttributes {
    title: string;
    description: string;
    slug: string;
    publishedAt: string;
    category: {
      data: Category;  
    };
    cover: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      };
    };
    blocks: Array<QuoteBlock | RichTextBlock | MediaBlock>; // Array of different block types
  }
  
  export interface Article {
    id: number;
    attributes: ArticleAttributes;
  }
  
  export interface AboutAttributes {
    title: string;
    id: number;
    blocks: Array<QuoteBlock | RichTextBlock | MediaBlock>; // Array of different block types
  }
  
  export interface About {
    id: number;
    attributes: AboutAttributes;
  }
  
  export interface ImageFormat {
    url: string;
    path: null | string;
    size: number;
    width: number;
    height: number;
  }
  
  export interface ImageFormats {
    small: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
    orig: ImageFormat;
  }
  
  export interface ImageAttributes {
    formats: ImageFormats;
  }
  
  export interface ImageData {
    small: string;
    medium: string;
    large: string;
    orig: string;
  }
  
  
  export interface Service {
    id: string;
    systemtype: string;
    name: string;
    name_translations: Translations;
    shortdescription: string;
    shortdescription_translations: Translations;
    description: string;
    description_translations: Translations;
    included: string;
    included_translations: Translations;
    excluded: string | null;
    requirements: string | null;
    attention: string;
    attention_translations: Translations;
    location: Location;
    images: ImageData[];
    servicetypeid: string;
    serviceType: string;
    serviceprovider: ServiceProvider;
    lineOfBusinessId: string;
    onlybookingwithreviewslink: string;
    starting_price: Price;
    cancellation_text: string;
  }
  
  interface Translations {
    [key: string]: string;
  }
  
  interface Location {
    line1: string;
    line2: boolean | string;
    city: string;
    state: boolean | string;
    postcode: string;
    country: string;
    lat: string;
    lng: string;
  }
  
  
  interface ServiceProvider {
    id: string;
    name: string;
    total_reviews: string;
    rating: string;
  }
  
  interface Price {
    currency: string;
    price: string;
    text: string;
  }
  
  interface CancellationPolicy {
    fee_percentage: number;
    days: number;
    hours: number;
  }
  
  export interface Home {
    data: {
      id: number;
      attributes: {
        headline: string;
        shortDesc: string;
        longDesc: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        countries: {
          data: Country[];
        }
        homeImage: {
          data: {
            id: number;
            attributes: {
              name: string;
              alternativeText: string | null;
              caption: string | null;
              width: number;
              height: number;
              formats: {
                large?: HomeImageFormat;
                medium?: HomeImageFormat;
                small?: HomeImageFormat;
                thumbnail?: HomeImageFormat;
              };
              hash: string;
              ext: string;
              mime: string;
              size: number;
              url: string;
              previewUrl: string | null;
              provider: string;
              provider_metadata: {
                public_id: string;
                resource_type: string;
              };
              
            }
          }
        }
      }
    }
  }
  
  interface HomeImageFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    provider_metadata: {
      public_id: string;
      resource_type: string;
    };
  }
  
  interface Country {
    id: number;
    attributes: {
      slug: string;
      countryName: string;
      countryid: number;
      countryImage: {
        data: {
          id: number;
          attributes: {
            alternativeText: string;
            formats: {
              small: {
                url: string;
              }
            }
          }
        }
      }
    }
  }
  
 
  
