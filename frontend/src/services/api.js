import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Characters API
export const charactersAPI = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/characters');
      return response.data;
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw new Error('Failed to fetch characters');
    }
  },

  getById: async (id) => {
    try {
      const response = await apiClient.get(`/characters/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching character ${id}:`, error);
      throw new Error('Failed to fetch character');
    }
  },

  create: async (characterData) => {
    try {
      const response = await apiClient.post('/characters', characterData);
      return response.data;
    } catch (error) {
      console.error('Error creating character:', error);
      throw new Error('Failed to create character');
    }
  }
};

// Breathing Techniques API
export const breathingTechniquesAPI = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/breathing-techniques');
      return response.data;
    } catch (error) {
      console.error('Error fetching breathing techniques:', error);
      throw new Error('Failed to fetch breathing techniques');
    }
  },

  getById: async (id) => {
    try {
      const response = await apiClient.get(`/breathing-techniques/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching breathing technique ${id}:`, error);
      throw new Error('Failed to fetch breathing technique');
    }
  },

  create: async (techniqueData) => {
    try {
      const response = await apiClient.post('/breathing-techniques', techniqueData);
      return response.data;
    } catch (error) {
      console.error('Error creating breathing technique:', error);
      throw new Error('Failed to create breathing technique');
    }
  }
};

// Story Arcs API
export const storyArcsAPI = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/story-arcs');
      return response.data;
    } catch (error) {
      console.error('Error fetching story arcs:', error);
      throw new Error('Failed to fetch story arcs');
    }
  },

  getById: async (id) => {
    try {
      const response = await apiClient.get(`/story-arcs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching story arc ${id}:`, error);
      throw new Error('Failed to fetch story arc');
    }
  },

  create: async (arcData) => {
    try {
      const response = await apiClient.post('/story-arcs', arcData);
      return response.data;
    } catch (error) {
      console.error('Error creating story arc:', error);
      throw new Error('Failed to create story arc');
    }
  }
};

// Health check API
export const healthAPI = {
  check: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw new Error('Backend service unavailable');
    }
  }
};

export default apiClient;