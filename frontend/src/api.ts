import axios from "axios";
import {AnswerDifficulty, Flashcard, PracticeSession, ProgressStats, UpdateRequest} from "./types";

// Base URL configuration for backend API endpoints
const API_BASE_URL = "http://localhost:3001/api";

// Initialize the axios client with common config
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Retrieves the list of flashcards scheduled for practice
export const fetchPracticeCards = async (): Promise<PracticeSession> => {
    const res = await apiClient.get<PracticeSession>("/practice");
    return res.data;
};

// Sends a user's answer feedback to the backend
export const submitAnswer = async (
    cardFront: string,
    cardBack: string,
    difficulty: AnswerDifficulty
): Promise<void> => {
    const payload: UpdateRequest = { cardFront, cardBack, difficulty };
    await apiClient.post("/update", payload);
};

// Gets a hint associated with a specific flashcard
export const fetchHint = async (card: Flashcard): Promise<string> => {
    const res = await apiClient.get<{ hint: string }>("/hint", {
        params: {
            cardFront: card.front,
            cardBack: card.back,
        },
    });
    return res.data.hint;
};

// Retrieves learning progress statistics
export const fetchProgress = async (): Promise<ProgressStats> => {
    const res = await apiClient.get<ProgressStats>("/progress");
    return res.data;
};

// Moves forward one day in the simulated learning session
export const advanceDay = async (): Promise<{ currentDay: number }> => {
    const res = await apiClient.post("/day/next");
    return res.data;
};
