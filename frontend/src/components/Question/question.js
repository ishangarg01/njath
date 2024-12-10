import React from "react";
import styles from "./question.module.css";

export default function Question({ questionData, status, onUnlock, onHint }) {
    const { name, questionNumber } = questionData;
    const { totalQuestions, hintTaken, openedQuestions, correctAnswers } = status || {};

    const isUnlocked = openedQuestions && openedQuestions.includes(questionNumber);
    const hintNotTaken = !hintTaken || !hintTaken.includes(questionNumber);
    const isCorrectlyAnswered = correctAnswers && correctAnswers.includes(questionNumber);

    return (
        <div className={`${styles.question} ${isUnlocked ? styles.unlocked : styles.locked}`}>
            <p>Question {questionNumber}</p>
            <span>{name}</span>
            {isUnlocked ? (
                isCorrectlyAnswered ? (
                    <span className={styles["correct-answer"]}>✔</span>
                ) : hintNotTaken ? (
                    <button className={styles["hint-button"]} onClick={onHint}>
                        Hint
                    </button>
                ) : null
            ) : (
                <button className={styles["unlock-button"]} onClick={onUnlock}>
                    Unlock
                </button>
            )}
        </div>
    );
}
