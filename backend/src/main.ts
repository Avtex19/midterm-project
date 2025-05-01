import {AnswerDifficulty, BucketMap, Flashcard} from "./flashcard";
import {PracticeRecord, ProgressStats} from "./types";

/**
 * Converts a BucketMap into an array of Sets, where the index is the bucket number
 */
export function toBucketSets(buckets: BucketMap): Array<Set<Flashcard>> {
    const maxBucket = Math.max(...Array.from(buckets.keys()));
    const result = Array.from({ length: maxBucket + 1 }, () => new Set<Flashcard>());

    for (const [bucketNum, cards] of buckets.entries()) {
        result[bucketNum] = cards;
    }

    return result;
}

/**
 * Determines which cards should be practiced on a given day,
 * based on the Leitner system.
 */
export function practice(
    buckets: Array<Set<Flashcard>>,
    day: number
): Set<Flashcard> {
    const result = new Set<Flashcard>();

    buckets.forEach((set, index) => {
        if (index === 0 || (day % (1 << index) === 0)) {
            for (const card of set) {
                result.add(card);
            }
        }
    });

    return result;
}

/**
 * Updates the buckets based on the answer difficulty
 */
export function update(
    buckets: BucketMap,
    card: Flashcard,
    difficulty: AnswerDifficulty
): BucketMap {
    const newBuckets: BucketMap = new Map();

    let currentBucket = -1;
    for (const [bucketNum, cards] of buckets.entries()) {
        const clonedSet = new Set(cards);
        newBuckets.set(bucketNum, clonedSet);
        if (cards.has(card)) {
            currentBucket = bucketNum;
        }
    }

    if (currentBucket !== -1) {
        newBuckets.get(currentBucket)?.delete(card);
    }

    if (currentBucket === -1 && !newBuckets.has(0)) {
        newBuckets.set(0, new Set<Flashcard>());
    }

    let newBucket = 0;
    switch (difficulty) {
        case AnswerDifficulty.Wrong:
            newBucket = 0;
            break;
        case AnswerDifficulty.Hard:
            newBucket = currentBucket;
            break;
        case AnswerDifficulty.Easy:
            newBucket = currentBucket + 1;
            break;
    }

    if (!newBuckets.has(newBucket)) {
        newBuckets.set(newBucket, new Set<Flashcard>());
    }

    newBuckets.get(newBucket)!.add(card);

    return newBuckets;
}

/**
 * Retrieves a hint for a flashcard
 */
export function getHint(card: Flashcard): string {
    return card.hint ?? "No hint available for this card.";
}

/**
 * Computes progress statistics based on current buckets and history
 */
export function computeProgress(
    buckets: BucketMap,
    history: PracticeRecord[]
): ProgressStats {
    let totalCards = 0;
    const cardsByBucket: Record<number, number> = {};

    for (const [bucketNum, cards] of buckets.entries()) {
        const size = cards.size;
        cardsByBucket[bucketNum] = size;
        totalCards += size;
    }

    const maxBucket = Math.max(...Object.keys(cardsByBucket).map(Number), 0);
    for (let i = 0; i <= maxBucket; i++) {
        if (!(i in cardsByBucket)) {
            cardsByBucket[i] = 0;
        }
    }

    const totalAnswers = history.length;
    const correctAnswers = history.reduce((acc, record) => {
        return acc +
            (record.difficulty === AnswerDifficulty.Easy ||
            record.difficulty === AnswerDifficulty.Hard
                ? 1
                : 0);
    }, 0);

    const successRate =
        totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;

    const cardMoves: Record<string, number> = {};
    for (const { cardFront, cardBack } of history) {
        const key = `${cardFront}:${cardBack}`;
        cardMoves[key] = (cardMoves[key] ?? 0) + 1;
    }

    const moveCounts = Object.values(cardMoves);
    const averageMovesPerCard =
        moveCounts.length > 0
            ? moveCounts.reduce((a, b) => a + b, 0) / moveCounts.length
            : 0;

    return {
        totalCards,
        cardsByBucket,
        successRate,
        averageMovesPerCard,
        totalPracticeEvents: totalAnswers,
    };
}
