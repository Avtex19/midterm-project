import {ResponseLevel} from "../flashcard";

export interface UpdateRequest {
    cardFront: string;
    cardBack: string;
    difficulty: ResponseLevel;
}