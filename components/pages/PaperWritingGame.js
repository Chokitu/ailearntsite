import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './game.css';

const PaperWritingGame = ({ onNext, selectedLanguage }) => {
  const [translatedPrompts, setTranslatedPrompts] = useState([]);
  const [translatedResponse, setTranslatedResponse] = useState("");
  const [translatedFeedback, setTranslatedFeedback] = useState("");
  const [translatedInstructions, setTranslatedInstructions] = useState({});
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    translateContent();
  }, [selectedLanguage]);

  const translateContent = async () => {
    try {
      const prompts = [
        'Basic Tips on Writing a Paper',
        'Give me good information on how to write a paper',
        'Write me a full paper',
        'Help me plan to write a paper about the Second World War'
      ];
      const translatedPrompts = await translateTexts(prompts);
      setTranslatedPrompts(translatedPrompts);

      const instructions = {
        title: 'How to Write a Paper',
        paragraph: 'Select a prompt below to get started. Each prompt will generate a response from the AI.'
      };
      const translatedInstructions = await translateTexts([instructions.title, instructions.paragraph]);
      setTranslatedInstructions({
        title: translatedInstructions[0],
        paragraph: translatedInstructions[1]
      });
    } catch (error) {
      console.error('Error translating content:', error);
    }
  };

  const translateTexts = async (texts) => {
    try {
      const url = `https://microsoft-translator-text.p.rapidapi.com/translate?to=${selectedLanguage}&api-version=3.0&profanityAction=NoAction&textType=plain`;
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-key': 'b35f47e8c2msh9062ca976d6b16cp151f96jsn6fdbb2696cc7',
          'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com'
        },
        body: JSON.stringify(texts.map(text => ({ text })))
      };

      const response = await fetch(url, options);
      if (response.ok) {
        const translatedData = await response.json();
        return translatedData.map(item => item.translations[0].text);
      } else {
        throw new Error('Failed to translate texts');
      }
    } catch (error) {
      throw new Error('Error translating texts:', error);
    }
  };

  const handlePromptSelection = async (promptIndex) => {
    try {
      const prompts = [
        'Sure, here\'s some basic tips on how to start writing a paper.',
        'Give me good information on how to write a paper',
        'Writing a full paper requires more specific instructions.',
        'Help me plan to write a paper about the Second World War'
      ];
      const response = await axios.post("https://gentle-pear-houndstooth.cyclic.app/chat", { prompt: prompts[promptIndex - 1] });
      const aiResponse = response.data;
      const translatedResponse = await translateTexts([aiResponse]);
      setTranslatedResponse(translatedResponse[0]);
      provideFeedback(promptIndex);
    } catch (error) {
      console.error('Request error:', error);
      setTranslatedResponse("Error: Failed to fetch information.");
      setTranslatedFeedback("An error occurred while fetching information. Please try again later.");
      provideFeedback(promptIndex);
    }
  };

  const provideFeedback = async (promptIndex) => {
    const feedbacks = [
      "This is a good starting point to gather tips on writing a paper.",
      "This is the best starting point to learn how to write a paper.",
      "Writing a full paper requires more specific instructions.",
      "This prompt is focused on planning to write a paper about the Second World War."
    ];

    try {
      const translatedFeedback = await translateTexts([feedbacks[promptIndex - 1]]);
      setTranslatedFeedback(translatedFeedback[0]);
      setIsCorrect(promptIndex === 4);
    } catch (error) {
      console.error('Error translating feedback:', error);
      setTranslatedFeedback("An error occurred while fetching feedback. Please try again later.");
    }
  };

  const handleNext = () => {
    if (isCorrect) {
      onNext();
    }
  };

  return (
    <div className="game-container">
      <div className="instructions">
        <h2 style={{padding:'20px', margin:'20px'}}>{translatedInstructions.title}</h2>
        <p style={{padding:'10px', margin:'10px'}}>{translatedInstructions.paragraph}</p>
      </div>
      <div className="prompts">
        {translatedPrompts.map((prompt, index) => (
          <button style={{margin:'5px', padding:'5px'}} key={index + 1} onClick={() => handlePromptSelection(index + 1)}>{prompt}</button>
        ))}
      </div>
      <div className="response">
        <h3 style={{padding:'20px', margin:'20px'}}>AI Response:</h3>
        <p>{translatedResponse}</p>
      </div>
      <div className="feedback">
        <h3 style={{padding:'20px', margin:'20px'}}>Feedback:</h3>
        <p style={{padding:'10px', margin:'10px'}}>{translatedFeedback}</p>
      </div>
      {isCorrect && <button onClick={handleNext}>Next</button>}
    </div>
  );
};

export default PaperWritingGame;