import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the AiLearnt newsletter to receive development updates
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <Button buttonStyle='btn--outline'>Subscribe</Button>
          </form>
        </div>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Learn More</h2>
            <Link to='/products'>AiBasics</Link>
            <Link to='https://zapier.com/blog/best-ai-productivity-tools/'>Tools</Link>
            <Link to='https://www.youtube.com/playlist?list=PL9ooVrP1hQOGHNaCT7_fwe9AabjZI1RjI'>Tutorials</Link>
            <Link to='https://globalai.community/'>Community</Link>
            <Link to='https://www.wsj.com/tech/ai'>News and Updates</Link>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              AiLearnt
              <img src="/images/ailearnt-logo.png" alt="Logo" className="navbar-logo-image" />
            </Link>
          </div>
          <small class='website-rights'>AiLearnt © 2024</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
