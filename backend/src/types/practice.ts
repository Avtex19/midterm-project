import {StudyItem} from "../flashcard";

export interface PracticeSession {
    cards: StudyItem[];
    day: number;
}