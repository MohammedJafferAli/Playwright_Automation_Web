// AI Model Configuration
export const AI_CONFIG = {
  // Model type: 'llama' or 'openai'
  modelType: process.env.AI_MODEL_TYPE || 'llama',
  
  // Llama/Ollama Configuration
  llama: {
    baseUrl: process.env.LLAMA_MODEL_URL || 'http://localhost:11434',
    model: process.env.LLAMA_MODEL_NAME || 'llama2',
    temperature: 0.1
  },
  
  // OpenAI Configuration (fallback)
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4',
    temperature: 0.1
  }
};

// Validation function
export function validateConfig() {
  if (AI_CONFIG.modelType === 'llama') {
    console.log(`🦙 Using Llama model: ${AI_CONFIG.llama.model} at ${AI_CONFIG.llama.baseUrl}`);
    return true;
  } else if (AI_CONFIG.modelType === 'openai') {
    if (!AI_CONFIG.openai.apiKey) {
      throw new Error('OpenAI API key required when using OpenAI model');
    }
    console.log(`🤖 Using OpenAI model: ${AI_CONFIG.openai.model}`);
    return true;
  } else {
    throw new Error(`Unsupported model type: ${AI_CONFIG.modelType}`);
  }
}