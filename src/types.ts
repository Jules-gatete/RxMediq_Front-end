export interface PredictionFormData {
  disease: string;
  age: number;
  gender: 'male' | 'female';
  severity: 'LOW' | 'NORMAL' | 'HIGH';
}

export interface PredictionResponse {
  predicted_drug: string;
}

export interface LiveData {
  age_plot: any;
  severity_plot: any;
}

export interface RetrainingResponse {
  message: string;
  accuracy: number;
}