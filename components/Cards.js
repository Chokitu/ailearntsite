import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Learn More</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/ai-basics.png'
              text='Learn about the basics of AI'
              path='/services'
            />
            <CardItem
              src='images/tools.png'
              text='Get tool recommendations for all your projects'
              path='https://zapier.com/blog/best-ai-productivity-tools/'
            />
            <CardItem
              src='images/tutorials.png'
              text='Watch tutorials on how to use AI in your projects'
              path='https://www.youtube.com/playlist?list=PL9ooVrP1hQOGHNaCT7_fwe9AabjZI1RjI'
            />
            <CardItem
              src='images/community.png'
              text='Connect with other developers in the community'
              path='https://globalai.community/'
            />
            <CardItem
              src='images/news.png'
              text='Stay updated with the latest news in AI'
              path='https://www.wsj.com/tech/ai'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
