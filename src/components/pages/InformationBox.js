
import React, { useState, useEffect } from 'react';
import './game.css';

const InformationBox = ({ onNext, selectedLanguage }) => {
  const [translatedTitle, setTranslatedTitle] = useState(""); // State to store translated title
  const [translatedParagraphs, setTranslatedParagraphs] = useState([]); // State to store translated paragraphs

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
            { Text: 'Using AI to Gather Information' },
            { Text: "To start using AI effectively, it's crucial to gather information." },
            { Text: "Remember, AI is a tool to assist us in studying and preparing for projects, not to deliver the entire project." },
            { Text: "Using it to give you the full project can get you in Academic problems, or broken solutions." }
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

    // Translate text when the component mounts
    translateText();
  }, [selectedLanguage]);

  return (
    <div className="information-box">
      <h2 style={{padding:'10px', margin:'20px'}}>{translatedTitle}</h2>
      {translatedParagraphs.map((paragraph, index) => (
        <p style={{padding:'10px', margin:'10px'}} key={index}>{paragraph}</p>
      ))}

      {/* Next button */}
      <button style={{margin:'5px', padding:'5px'}} onClick={onNext}>Next</button>
    </div>
  );
};

export default InformationBox;