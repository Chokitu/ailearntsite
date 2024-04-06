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
          { text: 'Take some time' },
          { text: 'Now that you know how to write a basic World War 2 essay, we encourage you to spend some time writing a small 6 lines essay about the theme.' },
          { text: 'When you are done click Next' },
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
      <h2 style={{margin:'20px', padding:'10px'}}>{translatedTitle}</h2>
      {translatedParagraphs.map((paragraph, index) => (
        <p style={{margin:'10px', padding:'10px'}} key={index}>{paragraph}</p>
      ))}
      <button style={{margin:'5px', padding:'5px'}} onClick={onNext}>{translatedParagraphs[2]}</button>
    </div>
  );
};

export default WelcomeBox;