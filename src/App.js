import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function App() {

  const [search, setSearch] = useState('');
  const [results, setResults] = useState('Make a search to see results');
  const [sumsVisible, setSumsVisible] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);
  const [aggregateVisible, setAggregateVisible] = useState(false);
  const [finalSumVisible, setFinalSumVisible] = useState(false);
  const [scrapeVisible, setScrapeVisible] = useState(false);
  const [link1, setLink1] = useState('link1');
  const [link2, setLink2] = useState('link2');
  const [link3, setLink3] = useState('link3');
  const [sum1, setSum1] = useState('sum1');
  const [sum2, setSum2] = useState('sum2');
  const [sum3, setSum3] = useState('sum3');

    // Code for github search!
    // fetch(`https://api.github.com/search/repositories?q=${search}`)
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data);
    //   setResults(data.items[0].full_name);
    // })

  const init_search = async() => {
    const response = await fetch('http://localhost:5000/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ search: search })
    })
    const data = await response.text();
    console.log(data)

    setLinksVisible(true);
    setScrapeVisible(true);
  }

  const init_scrape = async() => {
    const response = await fetch('http://localhost:5000/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        search: search,
      })
    })
    const data = await response.text();
    console.log(data)

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
      <input style={{position:"fixed",top:"10%",width:"80%",left:"10%",height:"10%",fontSize:"60px",borderRadius:"2%",border:"10px solid lightgray",backgroundColor:"lightblue"}} type="text" value={search} placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
      <button style={{position:"fixed",top:"25%",width:"10%",height:"10%",left:"45%",borderRadius:"8%",backgroundColor:"lightgreen"}} onClick={init_search}>Search</button>
      {linksVisible && <div style={{position:"fixed",top:"38%",width:"20%",left:"10%",backgroundColor:"lightblue",borderRadius:"8%"}}>{link1}</div>}
      {linksVisible && <div style={{position:"fixed",top:"38%",width:"20%",left:"40%",backgroundColor:"lightblue",borderRadius:"8%"}}>{link2}</div>}
      {linksVisible && <div style={{position:"fixed",top:"38%",width:"20%",right:"10%",backgroundColor:"lightblue",borderRadius:"8%"}}>{link3}</div>}
      {scrapeVisible && <button style={{position:"fixed",top:"44%",width:"10%",height:"10%",left:"45%",borderRadius:"8%",backgroundColor:"lightgreen"}} onClick={init_scrape}>Scrape</button>}
      {sumsVisible && <div style={{position:"fixed",top:"58%",width:"10%",height:"8%",left:"15%",backgroundColor:"pink",borderRadius:"8%"}}>{sum1}</div>}
      {sumsVisible && <div style={{position:"fixed",top:"58%",width:"10%",height:"8%",left:"45%",backgroundColor:"pink",borderRadius:"8%"}}>{sum2}</div>}
      {sumsVisible && <div style={{position:"fixed",top:"58%",width:"10%",height:"8%",right:"15%",backgroundColor:"pink",borderRadius:"8%"}}>{sum3}</div>}
      {aggregateVisible && <button style={{position:"fixed",top:"70%",width:"10%",height:"10%",left:"45%",borderRadius:"8%",backgroundColor:"lightgreen"}} onClick={init_aggregate}>Aggregate</button>}
      {finalSumVisible && <button style={{position:"fixed",top:"84%",width:"10%",height:"10%",left:"45%",borderRadius:"8%",backgroundColor:"lightgreen"}}>Final</button>}
      {/* <div style={{position:"fixed",top:"60%",width:"60%",left:"20%"}}>{results}</div> */}
    </div>
  );
}

export default App;
