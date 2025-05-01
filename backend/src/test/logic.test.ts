import * as logic from "../main";
import { AnswerDifficulty, Flashcard } from "../flashcard";
import { PracticeRecord } from "../types";
import { BucketMap } from "../flashcard";

function makeCard(front: string, back: string): Flashcard {
    return new Flashcard(front, back, "hint", []);
}

describe("Leitner logic", () => {
    let cardA: Flashcard;
    let cardB: Flashcard;

    beforeEach(() => {
        cardA = makeCard("one", "eins");
        cardB = makeCard("two", "zwei");
    });

    test("practice returns bucket 0 cards every day", () => {
        const buckets: BucketMap = new Map<number, Set<Flashcard>>([
            [0, new Set<Flashcard>([cardA, cardB])]
        ]);
        const day = 3;

        const sets = logic.toBucketSets(buckets);
        const result = logic.practice(sets, day);

        expect(result.has(cardA)).toBe(true);
        expect(result.has(cardB)).toBe(true);
    });

    test("update moves card to correct bucket", () => {
        const buckets: BucketMap = new Map<number, Set<Flashcard>>([
            [0, new Set<Flashcard>([cardA])]
        ]);
        const updated = logic.update(buckets, cardA, AnswerDifficulty.Easy);

        expect(updated.get(0)?.has(cardA)).toBe(false);
        expect(updated.get(1)?.has(cardA)).toBe(true);
    });

    test("computeProgress returns correct stats", () => {
        const buckets: BucketMap = new Map<number, Set<Flashcard>>([
            [1, new Set<Flashcard>([cardA])]
        ]);

        const history: PracticeRecord[] = [
            {
                cardFront: cardA.front,
                cardBack: cardA.back,
                timestamp: Date.now(),
                difficulty: AnswerDifficulty.Easy,
                previousBucket: 0,
                newBucket: 1,
            },
        ];

        const stats = logic.computeProgress(buckets, history);

        expect(stats.totalCards).toBe(1);
        expect(stats.cardsByBucket[0]).toBe(0);
        expect(stats.cardsByBucket[1]).toBe(1);
        expect(stats.successRate).toBe(100);
        expect(stats.averageMovesPerCard).toBe(1);
        expect(stats.totalPracticeEvents).toBe(1);
    });
});
