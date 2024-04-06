
import React, { useState, useEffect } from 'react';
import './game.css';

const WorldWar2 = ({ onNext, selectedLanguage }) => {
  const [translatedTitle, setTranslatedTitle] = useState("");
  const [translatedParagraph, setTranslatedParagraph] = useState("");
  const [translatedPrompts, setTranslatedPrompts] = useState([]);
  const [translatedResponse, setTranslatedResponse] = useState("");
  const [translatedFeedback, setTranslatedFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    translateTitleAndParagraph();
    translatePrompts();
  }, [selectedLanguage]);

  const translateTitleAndParagraph = async () => {
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
          { text: 'How to Use AI Prompts' },
          { text: 'Select the best prompt to start writing an essay about the Second World War. Make sure to select the right one.' }
        ])
      };

      const response = await fetch(url, options);
      if (response.ok) {
        const translatedData = await response.json();
        setTranslatedTitle(translatedData[0].translations[0].text);
        setTranslatedParagraph(translatedData[1].translations[0].text);
      } else {
        console.error('Error translating title and paragraph:', response.statusText);
      }
    } catch (error) {
      console.error('Error translating title and paragraph:', error);
    }
  };

  const translatePrompts = async () => {
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
          { text: 'World War 2 Movies' },
          { text: 'Give me good information on World War 2' },
          { text: 'Write me a full Essay on World War 2' },
          { text: 'I like the World War 2' }
        ])
      };

      const response = await fetch(url, options);
      if (response.ok) {
        const translatedData = await response.json();
        setTranslatedPrompts(translatedData.map(item => item.translations[0].text));
      } else {
        console.error('Error translating prompts:', response.statusText);
      }
    } catch (error) {
      console.error('Error translating prompts:', error);
    }
  };

  const handlePromptSelection = async (promptIndex) => {
    console.log("Prompt Index:", promptIndex);
    setShowFeedback(false);
    setShowNextButton(false);
  
    switch (promptIndex + 1) {
      case 1:
        console.log("Prompt 1 selected");
        setTranslatedResponse("World War II has been a popular subject for filmmakers, offering a wealth of stories filled with heroism, sacrifice, and the complexities of war. Here are some noteworthy World War II movies spanning different perspectives and aspects of the conflict.");
        provideFeedback(promptIndex + 1);
        break;
      case 2:
        console.log("Prompt 2 selected");
        await generateResponse("Give me good information on World War 2");
        break;
      case 3:
        console.log("Prompt 3 selected");
        setTranslatedResponse(`
        World War II, often abbreviated as WWII, was one of the most significant and devastating conflicts in human history. Lasting from 1939 to 1945, it involved the majority of the world's nations, polarizing them into two opposing military alliances: the Allies and the Axis powers. The war saw unparalleled levels of destruction, loss of life, and profound geopolitical shifts, leaving an indelible mark on the 20th century.
        
        The origins of World War II can be traced back to the aftermath of World War I, where the harsh conditions imposed on Germany by the Treaty of Versailles, along with economic instability and political unrest, created a fertile ground for the rise of totalitarian regimes. In Germany, Adolf Hitler and the Nazi Party ascended to power in 1933, advocating for aggressive expansionism and espousing racist ideologies.
        
        The invasion of Poland by Germany on September 1, 1939, marked the beginning of World War II. This act of aggression prompted Britain and France to declare war on Germany, thus initiating a conflict that would engulf the globe. The war was characterized by a series of major theaters, including the European, Pacific, African, and Eastern fronts.
        
        In Europe, Nazi Germany, led by Hitler, sought to establish dominance over the continent through blitzkrieg tactics and rapid territorial expansion. Key events such as the Battle of Britain, the invasion of the Soviet Union, and the Battle of Stalingrad shaped the course of the war in Europe. Despite initial successes, Germany faced formidable resistance from Allied forces, including the United States, the Soviet Union, Britain, and other European nations.
        
        Simultaneously, in the Pacific theater, Imperial Japan sought to expand its empire through aggressive military campaigns across East Asia and the Pacific Ocean. The surprise attack on Pearl Harbor on December 7, 1941, brought the United States into the war and marked the beginning of a brutal conflict in the Pacific, characterized by naval battles, island hopping campaigns, and intense aerial warfare.
        
        World War II witnessed unprecedented levels of violence and atrocities, including the Holocaust, in which six million Jews, along with millions of others, were systematically murdered by the Nazis. The war also saw the widespread use of new and devastating weapons, such as atomic bombs, which were dropped on the Japanese cities of Hiroshima and Nagasaki in August 1945, leading to Japan's surrender and the end of the war.
        
        The aftermath of World War II brought about profound geopolitical changes, including the emergence of the United States and the Soviet Union as superpowers, the founding of the United Nations to promote international cooperation and prevent future conflicts, and the beginning of the Cold War between the Western bloc and the Eastern bloc.
        
        In conclusion, World War II was a watershed moment in human history, shaping the modern world in profound ways. It was a conflict characterized by unprecedented levels of destruction, loss of life, and human suffering, but it also laid the foundation for the post-war era of global cooperation and the pursuit of peace.`);
        provideFeedback(promptIndex + 1);
        break;
      case 4:
        console.log("Prompt 4 selected");
        setTranslatedResponse("That's a vague prompt. Could you provide more specific instructions?");
        provideFeedback(promptIndex + 1);
        break;
      default:
        console.log("Invalid prompt selection");
        setTranslatedResponse("Invalid prompt selection.");
    }
  };
  
  
  const generateResponse = async (prompt) => {
    try {
      const response = await fetch("https://gentle-pear-houndstooth.cyclic.app/chat", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });
  
      if (response.ok) {
        const responseData = await response.text(); // Get the response as text
        await translateAIResponse(responseData); // Translate the AI response
        provideFeedback(2);
      } else {
        console.error('Request error:', response.statusText);
        setTranslatedResponse("Error: Failed to fetch information.");
        setTranslatedFeedback("An error occurred while fetching information. Please try again later.");
        setShowFeedback(true);
        setShowNextButton(true);
      }
    } catch (error) {
      console.error('Request error:', error);
      setTranslatedResponse("Error: Failed to fetch information.");
      setTranslatedFeedback("An error occurred while fetching information. Please try again later.");
      setShowFeedback(true);
      setShowNextButton(true);
    }
  };
  
  
  const provideFeedback = async (promptIndex) => {
    let translatedFeedback = "";
    switch (promptIndex) {
      case 1:
        translatedFeedback = await translateFeedback("This is a good starting point to gather basic information about movies, but won't be enough");
        break;
      case 2:
        translatedFeedback = await translateFeedback("This is the best starting point, since you have a lot of information now about the War, and you can start a better research.");
        break;
      case 3:
        translatedFeedback = await translateFeedback("Writing a full essay on World War 2 will likely give you a full project but only created by AI, we don't want that.");
        break;
      case 4:
        translatedFeedback = await translateFeedback("This prompt is too vague and may not provide useful information.");
        break;
      default:
        translatedFeedback = await translateFeedback("Invalid prompt selection.");
    }
    setShowFeedback(true);
    setShowNextButton(true);
    setTranslatedFeedback(translatedFeedback);
  };
  
  
  const translateFeedback = async (feedback) => {
    try {
      const url = `https://microsoft-translator-text.p.rapidapi.com/translate?to=${selectedLanguage}&api-version=3.0&profanityAction=NoAction&textType=plain`;
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-key': 'b35f47e8c2msh9062ca976d6b16cp151f96jsn6fdbb2696cc7',
          'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com'
        },
        body: JSON.stringify([{ text: feedback }])
      };
  
      const response = await fetch(url, options);
      if (response.ok) {
        const translatedData = await response.json();
        return translatedData[0].translations[0].text;
      } else {
        console.error('Error translating feedback:', response.statusText);
        return feedback;
      }
    } catch (error) {
      console.error('Error translating feedback:', error);
      return feedback;
    }
  };
  
  const translateAIResponse = async (response) => {
    try {
      const url = `https://microsoft-translator-text.p.rapidapi.com/translate?to=${selectedLanguage}&api-version=3.0&profanityAction=NoAction&textType=plain`;
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-key': 'b35f47e8c2msh9062ca976d6b16cp151f96jsn6fdbb2696cc7',
          'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com'
        },
        body: JSON.stringify([{ text: response }])
      };
  
      const translationResponse = await fetch(url, options);
      if (translationResponse.ok) {
        const translatedData = await translationResponse.json();
        setTranslatedResponse(translatedData[0].translations[0].text); // This sets the translated response
      } else {
        console.error('Error translating AI response:', translationResponse.statusText);
      }
    } catch (error) {
      console.error('Error translating AI response:', error);
    }
  };
  

  return (
    <div className="game-container">
      <div className="instructions">
        <h2 style={{padding:'20px', margin:'20px'}}>{translatedTitle}</h2>
        <p style={{padding:'10px', margin:'10px'}}>{translatedParagraph}</p>
      </div>
      <div className="prompts">
        {translatedPrompts.map((prompt, index) => (
          <button style={{margin:'5px', padding:'5px'}}key={index} onClick={() => handlePromptSelection(index)}>{prompt}</button>
        ))}
      </div>
      {showFeedback && (
        <div className="feedback">
          <h3 style={{padding:'20px', margin:'10px'}}>Feedback:</h3>
          <p>{translatedFeedback}</p>
        </div>
      )}
      {showNextButton && (
        <div className="next-button">
          <button style={{padding:'5px', margin:'4px', marginTop:'15px'}} onClick={onNext}>Next</button>
        </div>
      )}
      <div className="response">
        <h3 style={{padding:'20px', margin:'10px'}}>AI Response:</h3>
        <p>{translatedResponse}</p>
      </div>
    </div>
  );
};

export default WorldWar2;