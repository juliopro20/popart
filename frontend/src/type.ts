export interface Product {
  _id?: string;
  id?: string | number; // Support both string IDs from MongoDB and legacy number IDs if needed
  title: string;
  description: string;
  purchasePrice: number;
  rentalPrice: number;
  category: string;
  imageUrl: string;
  cloudinaryPublicId?: string;
  inStock: boolean;
  quantity?: number;
  
  // Custom UI state for PopArt Inflatable Balloons
  selectedAcquisitionType?: 'rent' | 'purchase';
  selectedPrice?: number;
}

export interface PaymentInfoData {
  fullName: string;
  phone: string;
  eventDate: string;
  deliveryAddress: string;
  notes?: string;
}