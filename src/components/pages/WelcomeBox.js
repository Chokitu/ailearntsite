import React, { useState, useEffect } from 'react';
import './game.css';
import BodyComponent from './BodyComponent';

const WelcomeBox = ({ onNext, onLanguageChange }) => {
  const [translatedTitle, setTranslatedTitle] = useState(""); // State to store translated title
  const [translatedParagraphs, setTranslatedParagraphs] = useState([]); // State to store translated paragraphs
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language is English

  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
      onLanguageChange(storedLanguage);
    }
  }, []);

  useEffect(() => {
    const translateText = async () => {
      try {
        // Construct the request URL
        const url = `https://microsoft-translator-text.p.rapidapi.com/translate?to=${selectedLanguage}&api-version=3.0&profanityAction=NoAction&textType=plain`;

        // Set up request options
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-rapidapi-key': 'b35f47e8c2msh9062ca976d6b16cp151f96jsn6fdbb2696cc7',
            'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com'
          },
          body: JSON.stringify([
            { Text: 'Welcome to the AI Learning Game', 
              Style: {padding: '3%'}
            },
            { Text: 'In this game, you will learn how to use AI effectively.' },
            { Text: "Let's start by learning how to gather information with AI." },
            { Text: 'Choose your language below' }
          ])
          
        };

        // Make the translation request
        const response = await fetch(url, options);

        // Check if the request was successful
        if (response.ok) {
          // Get the translated text
          const translatedData = await response.json();
          setTranslatedTitle(translatedData[0].translations[0].text);
          setTranslatedParagraphs(translatedData.slice(1).map(item => item.translations[0].text));
        } else {
          console.error('Error translating text:', response.statusText);
        }
      } catch (error) {
        console.error('Error translating text:', error);
      }
    };

    // Translate text when the language changes
    translateText();
  }, [selectedLanguage]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setSelectedLanguage(selectedLanguage);
    onLanguageChange(selectedLanguage);
    localStorage.setItem("selectedLanguage", selectedLanguage);
  };

  return (
    <div className="welcome-box">
      <h2 style={{padding:'10px', margin:'20px'}}>{translatedTitle}</h2>
      {translatedParagraphs.map((paragraph, index) => (
        <p style={{padding:'10px', margin:'10px'}} key={index}>{paragraph}</p>
      ))}

      {/* Language dropdown */}
      <select onChange={handleLanguageChange} value={selectedLanguage}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="pt-br">Portuguese</option>
        {/* Add more options for other languages */}
      </select>

      {/* Next button */}
      <button style={{margin:'5px', padding:'5px'}} onClick={onNext}>Next</button>
    </div>
  );
};

export default WelcomeBox;