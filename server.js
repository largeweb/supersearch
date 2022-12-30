// simple express server running on port 3000
const port = 5000;
const app = require('express')();
app.use(require('body-parser').json());

let links = 0;
let progress = 0;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});

app.post('/search', (req, res) => {
    console.log("search is: " + req.body.search);
    res.send("server search hit")
});

app.post('/scrape', (req, res) => {
    console.log("endpoint hit");
    res.send("server scrape hit")
});

app.post('/aggregate', (req, res) => {
    console.log("endpoint hit");
    res.send("server aggregate hit")
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6