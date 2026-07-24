export interface DatePreference {
  id?: string;
  name: string;
  preferred_date: string;
  preferred_time: string;
  date_type: string;
  cuisine: string;
  budget: number;
  mood: string;
  outfit: string;
  note?: string;
  created_at?: string;
}

export type TimeOption = 'Breakfast' | 'Lunch' | 'Evening' | 'Night';
export type DateTypeOption = 'Dinner' | 'Coffee' | 'Movie' | 'Long Drive' | 'Park Walk' | 'Surprise Me';
export type CuisineOption = 'Indian' | 'Italian' | 'Chinese' | 'Japanese' | 'Mexican' | 'Street Food' | 'Anything';
export type MoodOption = 'Romantic' | 'Chill' | 'Fun' | 'Adventure' | 'Surprise';
export type OutfitOption = 'Casual' | 'Dress Up' | 'Surprise Me';
