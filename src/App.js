import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [search, setSearch] = useState('');
  const [results, setResults] = useState('Make a search to see results');
  const [searchButtonDisabled, setSearchButtonDisables] = useState(true);
  const [sumsVisible, setSumsVisible] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);
  const [scrapeTextVisible, setScrapeTextVisible] = useState(false);
  const [summarizeVisible, setSummarizeVisible] = useState(false);
  const [aggregateVisible, setAggregateVisible] = useState(false);
  const [finalSumVisible, setFinalSumVisible] = useState(false);
  const [scrapeVisible, setScrapeVisible] = useState(false);
  const [link1, setLink1] = useState('link1');
  const [link2, setLink2] = useState('link2');
  const [link3, setLink3] = useState('link3');
  const [scrape1, setScrape1] = useState('scrape1');
  const [scrape2, setScrape2] = useState('scrape2');
  const [scrape3, setScrape3] = useState('scrape3');
  const [sum1, setSum1] = useState('sum1');
  const [sum2, setSum2] = useState('sum2');
  const [sum3, setSum3] = useState('sum3');
  const [popup, setPopup] = useState('');

    // Code for github search!
    // fetch(`https://api.github.com/search/repositories?q=${search}`)
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data);
    //   setResults(data.items[0].full_name);
    // })

    // use effect to see if search is empty
    useEffect(() => {
      if (search === '') setSearchButtonDisables(true); else setSearchButtonDisables(false);
    }, [search])

  const init_search = async() => {
    setLinksVisible(false);
    setScrapeTextVisible(false);
    setSumsVisible(false);
    setScrapeVisible(false);
    setSummarizeVisible(false);
    setAggregateVisible(false);
    setFinalSumVisible(false);
    const response = await fetch('http://localhost:5000/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ search: search })
    })
    const data = await response.json();
    console.log("server sent back links of google search!")
    setLink1(data[0]);
    setLink2(data[1]);
    setLink3(data[2]);

    setLinksVisible(true);
    setScrapeVisible(true);
  }

  const init_scrape = async() => {
    setScrapeTextVisible(false);
    setSumsVisible(false);
    setSummarizeVisible(false);
    setAggregateVisible(false);
    setFinalSumVisible(false);
    let response = await fetch('http://localhost:5000/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        search: search,
        link: link1,
      })
    })
    let data = await response.json();
    console.log(data)
    if(data[0] === undefined) setScrape1(''); else setScrape1(data[0]);

    response = await fetch('http://localhost:5000/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        search: search,
        link: link2,
      })
    })
    data = await response.json();
    console.log(data)
    if(data[0] === undefined) setScrape2(''); else setScrape2(data[0]);

    response = await fetch('http://localhost:5000/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        search: search,
        link: link3,
      })
    })
    data = await response.json();
    console.log(data)
    if(data[0] === undefined) setScrape3(''); else setScrape3(data[0]);

    setScrapeTextVisible(true);
    setSummarizeVisible(true);
  }
  const init_summarize = async() => {
    setSumsVisible(false);
    setAggregateVisible(false);
    setFinalSumVisible(false);
    let response = await fetch('http://localhost:5000/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        search: search,
        scrape: scrape1,
      })
    })
    let data = await response.json();
    console.log(data)
    if(data[0] === undefined) setSum1(''); else setSum1(data[0]);
    response = await fetch('http://localhost:5000/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        search: search,
        scrape: scrape2,
      })
    })
    data = await response.json();
    console.log(data)
    if(data[0] === undefined) setSum2(''); else setSum2(data[0]);

    response = await fetch('http://localhost:5000/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        search: search,
        scrape: scrape3,
      })
    })
    data = await response.json();
    console.log(data)
    if(data[0] === undefined) setSum3(''); else setSum3(data[0]);

    setSumsVisible(true);
    setAggregateVisible(true);
  }
  const init_aggregate = async() => {
    const response = await fetch('http://localhost:5000/aggregate')
    const data = await response.text();
    console.log(data)

    setFinalSumVisible(true);
  }

  return (
    <div className="App">
      <div style={{left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundColor:"darkgray",zIndex:"-1"}} />
      <input style={{position:"fixed",top:"6%",width:"80%",left:"10%",height:"10%",fontSize:"60px",borderRadius:"2%",border:"10px solid lightgray",backgroundColor:"lightblue"}} type="text" value={search} placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
      <button style={{position:"fixed",top:"20%",width:"12%",height:"6%",left:"14%",borderRadius:"8%",backgroundColor:"lightgreen"}} onClick={init_search} disabled={searchButtonDisabled}>Search</button>
      {scrapeVisible && <button style={{position:"fixed",top:"20%",width:"12%",height:"6%",left:"34%",borderRadius:"8%",backgroundColor:"lightgreen"}} onClick={init_scrape}>Scrape</button>}
      {summarizeVisible && <button style={{position:"fixed",top:"20%",width:"12%",height:"6%",left:"54%",borderRadius:"8%",backgroundColor:"lightgreen"}} onClick={init_summarize}>Summarize</button>}
      {aggregateVisible && <button style={{position:"fixed",top:"20%",width:"12%",height:"6%",left:"75%",borderRadius:"8%",backgroundColor:"lightgreen"}} onClick={init_aggregate}>Aggregate</button>}
      {linksVisible && <div style={{position:"fixed",padding:"5px",top:"30%",width:"15%",left:"12%",backgroundColor:"lightblue",borderRadius:"8%"}}><a href={link1} target="_blank">{link1.substring(8,25)}...</a></div>}
      {linksVisible && <div style={{position:"fixed",padding:"5px",top:"40%",width:"15%",left:"12%",backgroundColor:"lightblue",borderRadius:"8%"}}><a href={link2} target="_blank">{link2.substring(8,25)}...</a></div>}
      {linksVisible && <div style={{position:"fixed",padding:"5px",top:"50%",width:"15%",left:"12%",backgroundColor:"lightblue",borderRadius:"8%"}}><a href={link3} target="_blank">{link3.substring(8,25)}...</a></div>}
      {scrapeTextVisible && <button style={{position:"fixed",top:"30%",width:"10%",height:"6%",left:"34%",backgroundColor:"pink",borderRadius:"8%"}} onClick={(e) => setPopup(scrape1)}>{scrape1.toString().substring(0,10)} ...</button>}
      {scrapeTextVisible && <button style={{position:"fixed",top:"40%",width:"10%",height:"6%",left:"34%",backgroundColor:"pink",borderRadius:"8%"}} onClick={(e) => setPopup(scrape2)}>{scrape2.toString().substring(0,10)} ...</button>}
      {scrapeTextVisible && <button style={{position:"fixed",top:"50%",width:"10%",height:"6%",left:"34%",backgroundColor:"pink",borderRadius:"8%"}} onClick={(e) => setPopup(scrape3)}>{scrape3.toString().substring(0,10)} ...</button>}
      {sumsVisible && <button style={{position:"fixed",top:"30%",width:"10%",height:"6%",left:"54%",backgroundColor:"pink",borderRadius:"8%"}} onClick={(e) => setPopup(sum1)}>{sum1.toString().substring(0,10)} ...</button>}
      {sumsVisible && <button style={{position:"fixed",top:"40%",width:"10%",height:"6%",left:"54%",backgroundColor:"pink",borderRadius:"8%"}} onClick={(e) => setPopup(sum2)}>{sum2.toString().substring(0,10)} ...</button>}
      {sumsVisible && <button style={{position:"fixed",top:"50%",width:"10%",height:"6%",left:"54%",backgroundColor:"pink",borderRadius:"8%"}} onClick={(e) => setPopup(sum3)}>{sum3.toString().substring(0,10)} ...</button>}
      {/* {sumsVisible && <button style={{position:"fixed",top:"30%",width:"10%",height:"6%",left:"75%",backgroundColor:"pink",borderRadius:"8%"}} onClick={(e) => setPopup(sum1)}>{sum1.toString().substring(0,10)} ...</button>}
      {sumsVisible && <button style={{position:"fixed",top:"40%",width:"10%",height:"6%",left:"75%",backgroundColor:"pink",borderRadius:"8%"}} onClick={(e) => setPopup(sum2)}>{sum2.toString().substring(0,10)} ...</button>}
      {sumsVisible && <button style={{position:"fixed",top:"50%",width:"10%",height:"6%",left:"75%",backgroundColor:"pink",borderRadius:"8%"}} onClick={(e) => setPopup(sum3)}>{sum3.toString().substring(0,10)} ...</button>} */}
      {finalSumVisible && <button style={{position:"fixed",top:"84%",width:"10%",height:"10%",left:"45%",borderRadius:"8%",backgroundColor:"lightgreen"}}>Final</button>}
      {popup!='' && <div style={{position:"fixed",top:"10%",width:"80%",bottom:"10%",left:"10%",backgroundColor:"lightblue",borderRadius:"8%",zIndex:"10"}}><button onClick={(e) => setPopup('')}>❌</button>{popup}</div>}
      {/* <div style={{position:"fixed",top:"60%",width:"60%",left:"20%"}}>{results}</div> */}
    </div>
  );
}

export default App;
