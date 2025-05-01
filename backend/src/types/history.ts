import {ResponseLevel} from "../flashcard";

export interface PracticeRecord {
    cardFront: string;
    cardBack: string;
    timestamp: number;
    difficulty: ResponseLevel;
    previousBucket: number;
    newBucket: number;
}