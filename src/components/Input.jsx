import { useState, useEffect } from 'react'

const Input = () => {
    const [textInput, setTextInput] = useState("")
    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [speed, setSpeed] = useState(500)

    const handleTextChange = (e) => {
        setTextInput(e.target.value)
    }

    const removePunctuation = (text) => {
        // Use a regular expression to remove punctuation
        return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '')
    };

    const splitIntoWords = (text) => {
        return text.split(/\s+/);
    };

    const handleButtonClick = () => {
        const cleanedText = removePunctuation(textInput);
        const wordsArray = splitIntoWords(cleanedText);
        setWords(wordsArray);
        setCurrentIndex(0);
        setIsPaused(false);
    }

    const handleStopClick = () => {
        setCurrentIndex(0);
        setIsPaused(true);
    }

    const handlePauseResumeClick = () => {
        setIsPaused((prevPaused) => !prevPaused);
    }

    const handleResetClick = () => {
        setCurrentIndex(0);
        setIsPaused(false);
    }

    const handleSpeedChange = (selectedSpeed) => {
        setSpeed(selectedSpeed);
    }

    useEffect(() => {
        let intervalId;

        if (!isPaused) {
            intervalId = setInterval(() => {
                if (currentIndex < words.length) {
                    setCurrentIndex((prevIndex) => prevIndex + 1);
                } else {
                    clearInterval(intervalId);
                }
            }, speed);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [currentIndex, words, isPaused, speed]);

    return (
        <div >
            <h2>Enter Text Below</h2>
            <textarea className="textarea" name="" id="" cols="50" rows="10" value={textInput} onChange={handleTextChange} placeholder=""></textarea>
            <div className="btn-grp">
                <button type="button" className="btn btn-primary" onClick={handleButtonClick}>Run</button>
                <button type="button" className="btn btn-danger" onClick={handleStopClick}>Stop</button>
                <button type="button" className="btn btn-success" onClick={handlePauseResumeClick}>{isPaused ? 'Resume' : 'Pause'}</button>
                <button type="button" className="btn btn-warning" onClick={handleResetClick}>Reset</button>
            </div>
            <div className="spd-grp">
                <strong>Change speed</strong>
                <select id="speed" onChange={(e) => handleSpeedChange(Number(e.target.value))} value={speed}>
                    <option value="100">0.1 seconds</option>
                    <option value="200">0.2 seconds</option>
                    <option value="300">0.3 seconds</option>
                    <option value="400">0.4 seconds</option>
                    <option value="500">0.5 seconds</option>
                </select>
            </div>
            
            {words.map((word, index) => (
                <p className="big" key={index} style={{ display: index === currentIndex ? 'block' : 'none' }}>
                    {word}
                </p>
            ))}

        </div>
    )
}

export default Input

