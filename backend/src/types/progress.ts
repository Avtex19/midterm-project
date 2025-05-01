export interface ProgressStats {
    totalCards: number;
    cardsByBucket: Record<number, number>;
    successRate: number;
    averageMovesPerCard: number;
    totalPracticeEvents: number;
}