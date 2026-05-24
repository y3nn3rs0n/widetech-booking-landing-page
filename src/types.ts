export interface Service {
  id: string;
  name: string;
  duration: string;
  description: string;
  price: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
