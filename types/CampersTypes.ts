//Type for the items object with data from API
export interface Campers {
  id: string;
  name: string;
  price: number;
  rating?: number;
  location?: string;
  AC?: boolean;
  TV?: boolean;
  bathroom?: boolean;
  consumption?: string;
  description?: string;
  engine?: string;
  transmission?: string;
  kitchen?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
  form?: string;
  length?: string;
  width?: string;
  height?: string;
  tank?: string;
  reviews?: CampersReview[];
  gallery?: CampersGallery[];
}

export interface CampersReview {
  comment: string;
  reviewer_name: string;
  reviewer_rating: number;
}

export interface CampersGallery {
  original: string;
  thumb: string;
}
export enum Equipment {
  WATER = "water",
  GAS = "gas",
  AC = "AC",
  BATHROOM = "bathroom",
  TV = "TV",
  RADIO = "radio",
  REFRIGERATOR = "refrigerator",
  MICROWAVE = "microwave",
  KITCHEN = "kitchen",
}

export interface CamperUtility {
  name: string | undefined;
  value: string | boolean | undefined;
  icon: string;
}

export interface FiltersList {
  location: string;
  vehicleType: string;
  equipment: Equipment[];
}
