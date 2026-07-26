import type { Template } from '@/types/template';

export const DATE_PLANNING_TEMPLATE: Template = {
  id: 'date-planning-v1',
  name: 'Date Planning',
  description: 'Help your partner plan the perfect date by sharing your preferences.',
  questions: [
    {
      id: 'name',
      label: 'Your Name',
      placeholder: 'What should we call you?',
      type: 'text',
      required: true,
    },
    {
      id: 'preferred_date',
      label: 'Preferred Date',
      type: 'date',
      required: true,
    },
    {
      id: 'preferred_time',
      label: 'Time of Day',
      type: 'time_select',
      required: true,
      options: [
        { value: 'morning', label: 'Morning', emoji: '🌅', description: '8 – 11 AM' },
        { value: 'afternoon', label: 'Afternoon', emoji: '☀️', description: '12 – 3 PM' },
        { value: 'evening', label: 'Evening', emoji: '🌆', description: '5 – 8 PM' },
        { value: 'night', label: 'Night', emoji: '🌙', description: '8 PM+' },
      ],
    },
    {
      id: 'date_type',
      label: 'Type of Date',
      type: 'card_select',
      required: true,
      options: [
        { value: 'dinner', label: 'Dinner', emoji: '🍽️', description: 'Fine dining' },
        { value: 'coffee', label: 'Coffee', emoji: '☕', description: 'Cosy & casual' },
        { value: 'movie', label: 'Movie', emoji: '🎬', description: 'Film & popcorn' },
        { value: 'long_drive', label: 'Long Drive', emoji: '🚗', description: 'Windows down' },
        { value: 'park_walk', label: 'Park Walk', emoji: '🌿', description: 'Fresh air' },
        { value: 'surprise', label: 'Surprise Me', emoji: '🎁', description: 'Your choice!' },
      ],
    },
    {
      id: 'cuisine',
      label: 'Cuisine Preference',
      type: 'chip_select',
      required: true,
      options: [
        { value: 'indian', label: 'Indian', emoji: '🍛' },
        { value: 'italian', label: 'Italian', emoji: '🍝' },
        { value: 'chinese', label: 'Chinese', emoji: '🥢' },
        { value: 'japanese', label: 'Japanese', emoji: '🍱' },
        { value: 'mexican', label: 'Mexican', emoji: '🌮' },
        { value: 'street_food', label: 'Street Food', emoji: '🌯' },
        { value: 'anything', label: 'Anything', emoji: '🤍' },
      ],
    },
    {
      id: 'budget',
      label: 'Budget',
      type: 'range',
      required: true,
      min: 500,
      max: 5000,
      step: 100,
      unit: '₹',
    },
    {
      id: 'mood',
      label: 'Mood',
      type: 'card_select',
      required: true,
      options: [
        { value: 'romantic', label: 'Romantic', emoji: '🌹' },
        { value: 'chill', label: 'Chill', emoji: '🌊' },
        { value: 'fun', label: 'Fun', emoji: '🎉' },
        { value: 'adventure', label: 'Adventure', emoji: '🏔️' },
        { value: 'surprise', label: 'Surprise', emoji: '🎁' },
      ],
    },
    {
      id: 'outfit',
      label: 'Outfit Preference',
      type: 'card_select',
      required: true,
      options: [
        { value: 'casual', label: 'Casual', emoji: '👕', description: 'Comfortable & easy' },
        { value: 'dress_up', label: 'Dress Up', emoji: '✨', description: 'Looking gorgeous' },
        { value: 'surprise', label: 'Surprise Me', emoji: '🎭', description: 'Whatever you choose' },
      ],
    },
    {
      id: 'notes',
      label: 'Additional Notes',
      placeholder: 'Allergies, special requests, favourite song to play…',
      type: 'textarea',
      required: false,
      maxLength: 500,
    },
  ],
};

export const TEMPLATES: Record<string, Template> = {
  [DATE_PLANNING_TEMPLATE.id]: DATE_PLANNING_TEMPLATE,
};
