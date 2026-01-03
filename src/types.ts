
export interface Character {
  name: string;
  visual_description: string;
}

export interface StoryboardPanel {
  id: number;
  text: string;
  imageUrl: string;
  image_prompt?: string;
}

export interface StoryboardResult {
  dbId?: number; // Auto-incremented by IndexedDB
  timestamp: number;
  panels: StoryboardPanel[];
  characters: Character[];
  artStyle: string;
  scriptExcerpt: string;
}
