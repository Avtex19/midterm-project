import { PracticeRecord } from "./types";
import {BucketMap, Flashcard} from "./flashcard";

// --- Predefined Cards ---
const starterCards: Flashcard[] = [
    new Flashcard("der Tisch", "the table", "Starts with T", ["noun", "german"]),
    new Flashcard("la silla", "the chair", "Starts with S", ["noun", "spanish"]),
    new Flashcard("bonjour", "hello", "Greeting", ["phrase", "french"]),
    new Flashcard("arigato", "thank you", "Expression of gratitude", ["phrase", "japanese"]),
    new Flashcard("der Hund", "the dog", "Common pet", ["noun", "german"]),
    new Flashcard("el gato", "the cat", "Common pet", ["noun", "spanish"]),
];

// --- Application State ---
let buckets: BucketMap = new Map([[0, new Set(starterCards)]]);
let history: PracticeRecord[] = [];
let dayCounter: number = 0;

// --- Getters and Setters ---
export const getBuckets = (): BucketMap => buckets;

export const setBuckets = (updated: BucketMap): void => {
    buckets = updated;
};

export const getHistory = (): PracticeRecord[] => history;

export const addHistoryRecord = (entry: PracticeRecord): void => {
    history.push(entry);
};

export const getCurrentDay = (): number => dayCounter;

export const incrementDay = (): void => {
    dayCounter += 1;
};

// --- Helpers ---

// Locate card object by front/back values
export const findCard = (front: string, back: string): Flashcard | undefined => {
    for (const set of buckets.values()) {
        for (const flashcard of set) {
            if (flashcard.front === front && flashcard.back === back) {
                return flashcard;
            }
        }
    }

    // Fallback: card not yet added to state buckets
    return starterCards.find(c => c.front === front && c.back === back);
};

// Find which bucket a card currently belongs to
export const findCardBucket = (target: Flashcard): number | undefined => {
    for (const [bucketIndex, cards] of buckets.entries()) {
        if (cards.has(target)) return bucketIndex;
    }
    return undefined;
};

console.log("Initialized State:", buckets);
