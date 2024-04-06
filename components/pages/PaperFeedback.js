import React, { useState, useEffect } from 'react';
import './game.css';

const WelcomeBox = ({ onNext, selectedLanguage }) => {
  const [translatedTitle, setTranslatedTitle] = useState("");
  const [translatedParagraphs, setTranslatedParagraphs] = useState([]);

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
          { text: 'Very well' },
          { text: 'Because now you have all this information about the second world war, you can start planning your essay.' },
          { text: 'Just like gathering the information, you don\'t want the AI to give you something done, you want to work on your project.' },
          { text: 'Using it to give you the full project can get you in Academic problems, or broken solutions.' },
          { text: 'Next' }
        ])
      };

      const response = await fetch(url, options);
      if (response.ok) {
        const translatedData = await response.json();
        setTranslatedTitle(translatedData[0].translations[0].text);
        setTranslatedParagraphs(translatedData.slice(1).map(item => item.translations[0].text));
      } else {
        console.error('Error translating content:', response.statusText);
      }
    } catch (error) {
      console.error('Error translating content:', error);
    }
  };

  return (
    <div className="welcome-box">
      <h2 style={{padding:'10px', margin:'20px'}}>{translatedTitle}</h2>
      {translatedParagraphs.map((paragraph, index) => (
        <p style={{padding:'10px', margin:'10px'}} key={index}>{paragraph}</p>
      ))}
      <button style={{margin:'5px', padding:'5px'}} onClick={onNext}>{translatedParagraphs[3]}</button>
    </div>
  );
};

export default WelcomeBox;