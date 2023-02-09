import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faOm } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect } from 'react';


const App = () => {
  const [data, setData] = useState([])
  const [quotation, setQuotation] = useState("What you are is what you have been. What you'll be is what you'll do now");
  const [author, setAuthor] = useState('Buddha');

  const newQuote = () => {
    const quote = data[Math.floor(Math.random() * data.length)];
    setQuotation(quote.text);
    if (!quote.author) {
      setAuthor('Unknown');
    } else {
      setAuthor(quote.author);
    }
  }

  useEffect(() => {
    const getQuote = async () => {
      const response = await fetch('https://type.fit/api/quotes')
      const quotes = await response.json();
      setData(quotes);
    }
    getQuote();
  }, [])

  const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text${quotation} - ${author}`;
    window.open(twitterUrl, '_blank');
  }

  return (
    <div className='background'>
      <FontAwesomeIcon className='om' icon={faOm} />
      <div className="quote-container">
        <div className='quote-text'>
          <FontAwesomeIcon className='icon' icon={faQuoteLeft} />
          <span className='quote'> {quotation}</span>
        </div>
        <div className='author-container'>
          <span className='author'>{author}</span>
        </div>
        <div className='button-container'>
          <button className='twitter-button' title='Tweet this!' onClick={() => tweetQuote()}><FontAwesomeIcon icon={faTwitter} className='twitter-icon' /></button>
          <button className='new-quote-button' title='Generate new quote' onClick={() => newQuote()}>New Quote</button>
        </div>
      </div>
    </div>
  );
}

export default App;
