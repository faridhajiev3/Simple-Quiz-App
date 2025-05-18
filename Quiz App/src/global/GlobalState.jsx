import { createContext, useContext, useEffect, useState } from 'react';
import { handleGet } from '../api/api';

export const QuizContext = createContext(null)


export default function QuizProviderProvider({ children }) {
    const [data, setData] = useState([]); // backend-dən gələn data
    const [index, setIndex] = useState(0); // sualin nomrəsi
    const [score, setScore] = useState(0); // doğru cavblarin sayı
    const [result, setResult] = useState(false);
    const [selected, setSelected] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [reviewList, setReviewList] = useState([]);
    const [options, setOptions] = useState([]);

    const currentQuestion = data[index];

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const result = await handleGet();
                setData(result);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchQuiz();
    }, []);


    // suallari qarışdırır
    useEffect(() => {
        if (currentQuestion) {
            const shuffled = [currentQuestion.correctAnswer, ...currentQuestion.incorrectAnswer];
            setOptions(shuffled.sort(() => Math.random() - 0.5));
        }
    }, [currentQuestion]);

    // cavabları yoxlayir

    useEffect(() => {
        if (result) {
            const review = data.map(item => {
                const userAnswer = answers.find(ans => ans.question === item.question);
                return {
                    question: item.question,
                    userAnswer: userAnswer?.answer, // bizim seçdiyim cavab handleSelect den gelir
                    correctAnswer: item.correctAnswer
                };
            });
            setReviewList(review);
        }
    }, [result, data]);

    // cavabları işarələyir 

    const handleSelect = (answer) => {
        setSelected(answer);
        setAnswers(prev => {
            const updated = [...prev];
            updated[index] = { question: currentQuestion.question, answer };
            return updated;
        });

        if (answer === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1); // doğru olarsa score 1 artırır
        }
    };

    const handleNext = () => {
        if (index === data.length - 1) {
            setResult(true); // sonuncu sualidisa nəticəni göstərir
        } else {
            setIndex(prev => prev + 1);
        }
    };

    const handleReset = () => {
        setIndex(0);
        setScore(0);
        setResult(false);
        setSelected(null);
        setAnswers([]);
        setReviewList([]);
    };
    return (
        <QuizContext.Provider value={{
            data,
            index,
            score,
            result,
            selected,
            reviewList,
            options,
            currentQuestion,
            handleSelect,
            handleNext,
            handleReset
        }}>{children}</QuizContext.Provider>
    )
}