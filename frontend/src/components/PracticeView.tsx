import { useState, useEffect, useRef } from "react";
import { Flashcard, AnswerDifficulty } from "../types";

import HandPoseCamera from "./HandPoseCamera";
import {advanceDay, fetchHint, fetchPracticeCards, submitAnswer} from "../api.ts";
import {HandPose} from "../utils/handpose.ts";
import styles from './PracticeView.module.css'; // Import the CSS module

const PracticeView = () => {
  const [practiceCards, setPracticeCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [showBack, setShowBack] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [day, setDay] = useState<number>(0);
  const [sessionFinished, setSessionFinished] = useState<boolean>(false);
  const [hint, setHint] = useState<string | null>(null);
  const [loadingHint, setLoadingHint] = useState(false);
  const [hintError, setHintError] = useState<string | null>(null);

  const showBackRef = useRef<boolean>(false);
  const currentCardIndexRef = useRef<number>(0);

  useEffect(() => {
    showBackRef.current = showBack;
    currentCardIndexRef.current = currentCardIndex;
  }, [showBack, currentCardIndex]);

  const loadPracticeCards = async () => {
    setIsLoading(true);
    setError(null);
    setSessionFinished(false);
    setCurrentCardIndex(0);
    setShowBack(false);
    try {
      const session = await fetchPracticeCards();
      setPracticeCards(session.cards);
      setDay(session.day);
      if (session.cards.length === 0) {
        setSessionFinished(true); // No cards to practice today
      }
    } catch (err) {
      console.error("Failed to fetch practice cards:", err);
      setError("Could not load cards. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPracticeCards();
  }, []); // Load cards on component mount

  const handleShowBack = () => {
    setShowBack(true);
  };

  const handleAnswer = async (difficulty: AnswerDifficulty) => {
    if (currentCardIndexRef.current >= practiceCards.length) return;

    const currentCard = practiceCards[currentCardIndexRef.current];
    try {
      await submitAnswer(currentCard.front, currentCard.back, difficulty);
      // Move to the next card
      const nextIndex = currentCardIndexRef.current + 1;
      if (nextIndex < practiceCards.length) {
        setCurrentCardIndex(nextIndex);
        setHint(null);
        setShowBack(false); // Hide back for the new card
      } else {
        // Finished practicing all cards for this session
        setSessionFinished(true);
        console.log("Practice session finished for Day", day);
      }
    } catch (err) {
      console.error("Failed to submit answer:", err);
      setError("Failed to save progress. Please try again.");
    }
  };

  const handleNextDay = async () => {
    try {
      const { currentDay } = await advanceDay();
      setDay(currentDay);
      // Reload cards for the new day
      await loadPracticeCards();
    } catch (err) {
      console.error("Failed to advance day:", err);
      setError("Could not advance to the next day.");
    }
  };

  // Handle hand pose detection
  const handleHandPoseDetected = (pose: HandPose) => {
    if (!pose || !showBackRef.current) return;

    let difficulty: AnswerDifficulty;

    switch (pose) {
      case "thumbs_up":
        difficulty = AnswerDifficulty.Easy;
        break;
      case "thumbs_down":
        difficulty = AnswerDifficulty.Wrong;
        break;
      case "flat_hand":
        difficulty = AnswerDifficulty.Hard;
        break;
      default:
        return;
    }

    // Submit the answer
    handleAnswer(difficulty);
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading practice cards...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>Error: {error}</div>;
  }

  if (sessionFinished) {
    return (
        <div className={styles.sessionFinished}>
          <div className={styles.dayCounter}>Day {day}</div>
          <p>No more cards to practice today!</p>
          <button className={styles.btnPrimary} onClick={handleNextDay}>
            Go to Next Day
          </button>
        </div>
    );
  }

  const currentCard = practiceCards[currentCardIndex];

  const handleGetHint = async () => {
    if (!currentCard) return;
    setLoadingHint(true);
    setHintError(null);
    setHint(null);
    try {
      const fetchedHint = await fetchHint(currentCard);
      setHint(fetchedHint);
    } catch (err) {
      console.error("Failed to fetch hint:", err);
      setHintError("Could not load hint.");
    } finally {
      setLoadingHint(false);
    }
  };

  return (
      <div className={styles.practiceContainer}>
        <div className={styles.dayCounter}>Day {day}</div>
        <p className={styles.cardCounter}>
          Card {currentCardIndex + 1} of {practiceCards.length}
        </p>

        {/* Hand Pose Camera */}
        <div style={{ position: "absolute", top: "20px", right: "20px" }}>
          <HandPoseCamera
              onPoseDetected={handleHandPoseDetected}
              width={400}
              height={325}
              holdTimeMs={3000}
          />
        </div>

        {currentCard ? (
            <div className={`${styles.flashcard} ${showBack ? styles.flashcardBack : ""}`}>
              {showBack ? currentCard.back : currentCard.front}
            </div>
        ) : (
            <p>Something went wrong, no card to display.</p>
        )}

        {!showBack && (
            <div style={{ marginTop: "15px" }}>
              <button onClick={handleGetHint} disabled={loadingHint}>
                {loadingHint ? "Loading Hint..." : "Get Hint"}
              </button>
              {hint && (
                  <p style={{ color: "gray", fontStyle: "italic" }}>Hint: {hint}</p>
              )}
              {hintError && <p style={{ color: "red" }}>{hintError}</p>}
            </div>
        )}

        {!showBack ? (
            <button className={styles.btnPrimary} onClick={handleShowBack}>
              Show Answer
            </button>
        ) : (
            <div>
              <p className={styles.difficultyText}>How difficult was this card?</p>
              <div
                  className={styles.gestureInstructions}
                  style={{ marginBottom: "15px", fontSize: "14px", color: "#666" }}
              >
                <p>Use hand gestures to answer:</p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li>👍 Thumbs up = Easy</li>
                  <li>👎 Thumbs down = Wrong</li>
                  <li>✋ Flat hand = Hard</li>
                </ul>
              </div>
              <div>
                <button
                    className={styles.btnWrong}
                    onClick={() => handleAnswer(AnswerDifficulty.Wrong)}
                >
                  Wrong
                </button>
                <button
                    className={styles.btnHard}
                    onClick={() => handleAnswer(AnswerDifficulty.Hard)}
                >
                  Hard
                </button>
                <button
                    className={styles.btnEasy}
                    onClick={() => handleAnswer(AnswerDifficulty.Easy)}
                >
                  Easy
                </button>
              </div>
            </div>
        )}
      </div>
  );
};

export default PracticeView;
