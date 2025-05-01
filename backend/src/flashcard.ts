export class Flashcard {
    constructor(
        public readonly front: string,
        public readonly back: string,
        public readonly hint?: string,
        public readonly tags: ReadonlyArray<string> = []
    ) {
        // Properties are automatically assigned by parameter modifiers
    }
}

export enum AnswerDifficulty {
    Wrong = 0,
    Hard = 1,
    Easy = 2,
}

// Mapping bucket number to a set of flashcards
export type BucketMap = Map<number, Set<Flashcard>>;
