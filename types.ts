export interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  difficulty: string;
  calories: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum PageView {
  HOME = 'HOME',
  RECIPES = 'RECIPES',
  CHAT = 'CHAT'
}