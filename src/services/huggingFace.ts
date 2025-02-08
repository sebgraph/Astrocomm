import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_URL = 'https://api-inference.huggingface.co/models';
const API_TOKEN = import.meta.env.VITE_HUGGING_FACE_API_KEY; // Replace with your actual token

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json',
};

// Function to generate AI text suggestions
export const generateText = async (inputText: string) => {
  const response = await axios.post(
    `${API_URL}/mistralai/Mistral-7B-Instruct-v0.1`,
    { inputs: inputText },
    { headers }
  );
  return response.data[0]?.generated_text || 'No response.';
};
