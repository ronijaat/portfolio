import emailjs from '@emailjs/browser';
import React, { useRef, useState } from 'react';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import './Footer.scss';

const Footer = () => {
  const form = useRef();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        'template_7ihqzm6',
        form.current,
        {
          publicKey: process.env.REACT_APP_SERVICE_KEY,
        }
      )
      .then(
        () => {
          console.log('SUCCESS!');
          setLoading(false);
          setIsFormSubmitted(true);
        },
        (error) => {
          console.log('FAILED...', error);
          setLoading(false);
          setIsFormSubmitted(true);
        }
      );
  };

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href="mailto:raunakbaliyan1801@gmail.com" className="p-text">
            raunakbaliyan1801@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="tel:+91 7310986315" className="p-text">
            +91 7310986315
          </a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <form
          ref={form}
          onSubmit={sendEmail}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="app__footer-form app__flex">
            <div className="app__flex">
              <input
                className="p-text"
                type="text"
                placeholder="Your Name"
                name="name"
              />
            </div>
            <div className="app__flex">
              <input
                className="p-text"
                type="email"
                placeholder="Your Email"
                name="email"
              />
            </div>
            <div className="app__flex">
              <textarea
                className="p-text"
                placeholder="Your Message"
                name="message"
              />
            </div>
            <input
              type="submit"
              value={!loading ? 'Send Message' : 'Sending...'}
              className="p-text"
              style={{
                backgroundColor: '#f7f7f7',
                color: '#000',
                cursor: 'pointer',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
              }}
            />
          </div>
        </form>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg'
);
