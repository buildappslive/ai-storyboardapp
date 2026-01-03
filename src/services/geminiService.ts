import { GoogleGenAI, Type } from "@google/genai";
import { StoryboardPanel, StoryboardResult } from '../types';
import { getGeminiApiKey } from './config';

const getClient = () => {
  const API_KEY = getGeminiApiKey();
  if (!API_KEY) {
    throw new Error("API_KEY is not set. Please configure it in Settings.");
  }
  return new GoogleGenAI({ apiKey: API_KEY });
};

const storyboardSchema = {
  type: Type.OBJECT,
  properties: {
    art_style: {
      type: Type.STRING,
      description: 'A global, highly detailed art style description (e.g., "A modern 2D digital animation style, clean sharp line art, cel-shaded lighting, vibrant colors, Studio Ghibli inspired backgrounds").',
    },
    characters: {
      type: Type.ARRAY,
      description: 'A detailed cast list with precise physical traits.',
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          visual_description: {
            type: Type.STRING,
            description: 'Specific physical traits: hair style/color, specific clothing items, eye color, height, and any distinguishing accessories.'
          }
        },
        required: ['name', 'visual_description']
      }
    },
    panels: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          panel_text: { type: Type.STRING, description: 'The relevant text from the script.' },
          scene_action: { type: Type.STRING, description: 'The visual action happening in this specific panel.' },
          character_names_in_scene: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'List of character names present in this specific panel.'
          }
        },
        required: ['panel_text', 'scene_action', 'character_names_in_scene'],
      },
    },
  },
  required: ['art_style', 'characters', 'panels'],
};

export const generateStoryboardFromScript = async (
  script: string,
  onProgress: (message: string) => void,
  aspectRatio: "1:1" | "16:9" = "1:1"
): Promise<StoryboardResult> => {
  const ai = getClient();
  onProgress('Analyzing script characters and production design...');

  const analysisPrompt = `
    You are an expert Storyboard Director. Analyze the provided script to create a visually consistent production plan.
    
    TASK:
    1. Define a "Global Art Style" that is consistent, high-quality, and appealing for a cartoon/animation.
    2. Create a "Character Sheet" for every person in the script. Be extremely specific about their visual traits (clothing, hair, accessories) so they look the same in every panel.
    3. Break the script into 6-10 key visual panels.
    4. For each panel, identify exactly which characters are present.

    SCRIPT:
    ${script}
  `;

  const analysisResponse = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: analysisPrompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: storyboardSchema,
    },
  });

  const parsedJson = JSON.parse(analysisResponse.text);
  const { characters, panels, art_style } = parsedJson;
  const generatedPanels: StoryboardPanel[] = [];

  // Helper to get character descriptions for a specific panel
  const getCharacterDescriptionsForPanel = (names: string[]) => {
    return characters
      .filter((char: any) => names.some(n => n.toLowerCase() === char.name.toLowerCase()))
      .map((char: any) => `${char.name.toUpperCase()}: ${char.visual_description}`)
      .join(" | ");
  };

  for (let i = 0; i < panels.length; i++) {
    const panelData = panels[i];
    const characterBlock = getCharacterDescriptionsForPanel(panelData.character_names_in_scene);

    // Constructing a robust prompt for character and style consistency
    const finalPrompt = `
      [STYLE]: ${art_style}
      [CHARACTERS]: ${characterBlock}
      [SCENE]: ${panelData.scene_action}
      [INSTRUCTIONS]: Maintain strict character consistency based on the [CHARACTERS] block. High-quality production storyboard, cinematic composition, vibrant colors.
    `;

    onProgress(`Drawing panel ${i + 1} of ${panels.length}...`);

    try {
      const imageResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: finalPrompt }] },
        config: {
          imageConfig: {
            aspectRatio
          }
        },
      });

      const imagePart = imageResponse.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      if (imagePart?.inlineData) {
        generatedPanels.push({
          id: i,
          text: panelData.panel_text,
          imageUrl: `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`,
          image_prompt: finalPrompt
        });
      }
    } catch (error) {
      console.error(`Panel ${i + 1} generation failed:`, error);
      // We continue to try generating other panels even if one fails
    }
  }

  if (generatedPanels.length === 0) {
    throw new Error("Failed to generate any storyboard panels. Please try again with a different script.");
  }

  return {
    timestamp: Date.now(),
    panels: generatedPanels,
    characters,
    artStyle: art_style,
    scriptExcerpt: script.substring(0, 100) + (script.length > 100 ? '...' : '')
  };
};
