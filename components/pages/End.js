import React, { useState, useEffect } from 'react';
import './game.css';

const End = ({ response, selectedLanguage }) => {
  const [translatedTitle, setTranslatedTitle] = useState("");
  const [translatedContent, setTranslatedContent] = useState("");

  useEffect(() => {
    translateContent();
  }, [selectedLanguage, response]);

  const translateContent = async () => {
    try {
      const titleAndContent = ['This is the end, now you have your full essay', 'But most importantly, you learnt how to use AI.', response];

      const url = `https://microsoft-translator-text.p.rapidapi.com/translate?to=${selectedLanguage}&api-version=3.0&profanityAction=NoAction&textType=plain`;
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-key': 'b35f47e8c2msh9062ca976d6b16cp151f96jsn6fdbb2696cc7',
          'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com'
        },
        body: JSON.stringify(titleAndContent.map(text => ({ text })))
      };

      const translationResponse = await fetch(url, options);
      if (translationResponse.ok) {
        const translatedData = await translationResponse.json();
        setTranslatedTitle(translatedData[0].translations[0].text);
        setTranslatedContent(translatedData[1].translations[0].text);
      } else {
        console.error('Error translating content:', translationResponse.statusText);
      }
    } catch (error) {
      console.error('Error translating content:', error);
    }
  };

  return (
    <div className="welcome-box">
      <h2 style={{padding:'10px', margin:'20px'}}>{translatedTitle}</h2>
      <p style={{padding:'10px', margin:'10px'}}>{translatedContent}</p>
      <div className="response">
      </div>
    </div>
  );
};

export default End;