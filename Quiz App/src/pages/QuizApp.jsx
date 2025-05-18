import React, { useContext, useEffect, useState } from 'react'
import { handleGet } from '../api/api'
import "../css/appquiz.css"
import { QuizContext } from '../global/GlobalState';

function QuizApp() {

    const { data,
        index,
        score,
        result, 
        selected,
        reviewList,
        options,
        currentQuestion,
        handleSelect,
        handleNext,
        handleReset } = useContext(QuizContext)

    if (data.length === 0) return <div className="container"><h2>Loading...</h2></div>;


    return (
        <div className="container">
            <h1>🧠 Quiz App</h1>
            {!result ? (
                <>
                    <h2>{index + 1}. {currentQuestion.question}</h2>
                    <ul className="options">
                        {options.map((option, i) => (
                            <li
                                key={i}
                                className={`option ${selected === option ? 'selected' : ''}`}
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                    <button className="next-btn" onClick={handleNext}>Next</button>
                    <div className="index">{index + 1} of {data.length} questions</div>
                </>
            ) : (
                <>
                    <h2>✅ You scored {score} out of {data.length}</h2>
                    <button className="reset-btn" onClick={handleReset}>Reset</button>
                    <h3>🔍 Review Answers:</h3>
                    <ul className="review-list">
                        {reviewList.map((item, id) => (
                            <li key={id} className="review-item">
                                <p>Sual: {item.question}</p>
                                <p>Sənin Cavabın: <span >{item.userAnswer}</span></p>
                                <p>Düzgün Cavab: <span >{item.correctAnswer}</span></p>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}

export default QuizApp