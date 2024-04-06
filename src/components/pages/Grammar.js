import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './game.css';

const GrammarGame = ({ onNext, selectedLanguage }) => {
  const [translatedTitle, setTranslatedTitle] = useState("");
  const [translatedInstructions, setTranslatedInstructions] = useState("");
  const [translatedPrompts, setTranslatedPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [response, setResponse] = useState("");
  const [translatedFeedbackHeader, setTranslatedFeedbackHeader] = useState("");
  const [translatedFeedback, setTranslatedFeedback] = useState("");
  const [translatedAIResponseHeader, setTranslatedAIResponseHeader] = useState("");
  const [translatedAIResponse, setTranslatedAIResponse] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [nextButtonText, setNextButtonText] = useState("");
  const [essay, setEssay] = useState(""); // State to store the user's essay
  

  useEffect(() => {
    translateContent();
  }, [selectedLanguage]);

  const translateContent = async () => {
    try {
      const url = `https://microsoft-translator-text.p.rapidapi.com/translate?to=${selectedLanguage}&api-version=3.0&profanityAction=NoAction&textType=plain`;
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-key': 'b35f47e8c2msh9062ca976d6b16cp151f96jsn6fdbb2696cc7',
          'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com'
        },
        body: JSON.stringify([
          { text: 'Grammar & Punctuation Game' },
          { text: 'Select a prompt below to practice correcting grammar and punctuation in your own essay.' },
          { text: 'Review and correct grammatical and punctuation errors' },
          { text: 'Describe your favorite vacation spot' },
          { text: 'Rewrite a sentence with incorrect grammar' },
          { text: 'Create a recipe for an ice cream sundae' },
          { text: 'Paste Your Essay Here:' },
          { text: 'Feedback:' },
          { text: 'AI Response:' },
          { text: 'Next' }
        ])
      };

      const response = await fetch(url, options);
      if (response.ok) {
        const translatedData = await response.json();
        setTranslatedTitle(translatedData[0].translations[0].text);
        setTranslatedInstructions(translatedData[1].translations[0].text);
        setTranslatedPrompts(translatedData.slice(2, 10).map(item => item.translations[0].text));
      } else {
        console.error('Error translating content:', response.statusText);
      }
    } catch (error) {
      console.error('Error translating content:', error);
    }
  };

  const handlePromptSelection = (prompt) => {
    setSelectedPrompt(prompt);
    setResponse(""); // Clear previous response
    setTranslatedFeedback(""); // Clear previous feedback
    setTranslatedAIResponse(""); // Clear previous AI response
    setShowFeedback(false);
    setShowNextButton(false);

    generateResponse(prompt);
  };

  const generateResponse = (prompt) => {
    // Implement AI response generation logic based on the selected prompt
    if (prompt === 1) {
      // Example: Sending a request to a backend server to interact with the OpenAI API
      axios.post("https://gentle-pear-houndstooth.cyclic.app/chat", { prompt: `${translatedPrompts[0]}\n${essay}` })

        .then((res) => {
          const responseData = res.data; // Assuming the response contains both response and feedback
          setResponse(res.data);
          setNextButtonText(translatedPrompts[9]); // Set next button text
          setShowNextButton(true); // Show the Next button after receiving the AI response
        })
        .catch((err) => {
          console.error("Request error:", err);
          setResponse("Error: Failed to fetch information.");
          setTranslatedFeedback("An error occurred while fetching information. Please try again later.");
          setShowFeedback(true);
        });
    } else {
      // Simulated AI response for other prompts
      let aiResponse = "";
      switch (prompt) {
        case 2:
          aiResponse = "Describe your favorite vacation spot.";
          break;
        case 3:
          aiResponse = "Rewrite the following sentence: 'The boy goed to the park.'";
          break;
        case 4:
          aiResponse = "Create a recipe for a delicious ice cream sundae.";
          break;
        default:
          aiResponse = "Invalid prompt selection.";
          break;
      }
      setResponse(aiResponse);
      // Provide feedback based on the selected prompt
      provideFeedback(prompt);
    }
  };

  const provideFeedback = (prompt) => {
    // Provide feedback based on the selected prompt
    switch (prompt) {
      case 1:
        setTranslatedFeedback("Reviewing and correcting grammatical and punctuation errors is crucial for clarity.");
        setTranslatedAIResponse(""); // No AI response for this prompt
        break;
      case 2:
        setTranslatedFeedback("This prompt is unrelated to grammar and punctuation.");
        setTranslatedAIResponse(""); // No AI response for this prompt
        break;
      case 3:
        setTranslatedFeedback("Rewriting sentences helps reinforce proper grammar usage.");
        setTranslatedAIResponse(""); // No AI response for this prompt
        break;
      case 4:
        setTranslatedFeedback("Creating a recipe for an ice cream sundae is unrelated to grammar and punctuation.");
        setTranslatedAIResponse(""); // No AI response for this prompt
        break;
      default:
        setTranslatedFeedback("Invalid prompt selection.");
        setTranslatedAIResponse(""); // No AI response for invalid prompt
        break;
    }
    setShowFeedback(true);
  };

  useEffect(() => {
    console.log("Response:", response);
    console.log("Translated Feedback:", translatedFeedback);
    console.log("Translated AI Response:", translatedAIResponse);
    console.log("Show Feedback:", showFeedback);
    console.log("Show Next Button:", showNextButton);
  }, [response, translatedFeedback, translatedAIResponse, showFeedback, showNextButton]);


  const finalEssay = response;
  return (
    <div className="game-container">
      <h2 style={{margin:'10px', padding:'20px'}}>{translatedTitle}</h2>
      <p style={{margin:'10px', padding:'10px'}}>{translatedInstructions}</p>
      <div className="prompts">
        {translatedPrompts.slice(0, 4).map((prompt, index) => (
          <button style={{margin:'5px', padding:'5px'}} key={index} onClick={() => handlePromptSelection(index + 1)}>{prompt}</button>
        ))}
      </div>
      <p style={{margin:'5px', padding:'5px'}}>{translatedPrompts[6]}</p>
      <textarea value={essay} onChange={(e) => setEssay(e.target.value)} rows="10" cols="50" />
      {(
        <div className="feedback">
      <h3 style={{padding:'10px', margin:'20px'}}>Feedback:</h3>
      <p style={{margin:'10px', padding:'10px'}}>{translatedFeedback}</p>
        </div>
      )}

        <div className="next-button">
          <button style={{margin:'5px', padding:'5px'}} onClick={onNext}>Next</button>
        </div>
      <div className="response">
        <h3 style={{padding:'10px', margin:'20px'}}>AiLearnt:</h3>
        <p style={{margin:'10px', padding:'10px'}}>{response}</p>
      </div>
    </div>
  );
};

export default GrammarGame;