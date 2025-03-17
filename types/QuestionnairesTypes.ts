//Type for the items object with data from API
export interface Questionnaires {
  _id: string;
  name: string;
  description: string;
  questions: Questions[];
  createdAt: string;
  updatedAt: string;
  questionsQuantity: number;
  responseCount: number;
}

export interface Questions {
  type: "text" | "multiple-choice" | "single-choice";
  text: string;
  options?: string[];
}

// export interface CampersGallery {
//   original: string;
//   thumb: string;
// }
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
