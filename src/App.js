import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './sampleFICT.js';

console.log(data);

function App() {
  let [value, setValue] = useState('');
  let [words, setWords] = useState([]);
  let [filter, setFIlter] = useState('');
  let [sort, setSort] = useState(-1);
  let [sortBy, setSortBy] = useState('word');

  function analise(data = value) {
    let words = data.replace(/[^`a-zA-Z]/g, ' ').split(' ').filter(Boolean);

    console.log(words.length, 'употреблений')

    let dict = words.reduce((acc, el) => {
      if (acc[el]) {
        acc[el] += 1;
      } else {
        acc[el] = 1;
      }

      return acc;
    }, {});

    let reduced = Object.keys(dict).map(word => ({ word, freq: dict[word]}));

    setWords(reduced);

    console.log(reduced);

  }

  function onFilter(e) {
    setFIlter(e.target.value);
  }

  useEffect(() => { setTimeout(() => analise(data), 0); }, []);

  console.log(sort);

  let preparedWords = words
    .filter(x => x.word.match(new RegExp(`^${filter}`)))
    .sort((a, b) => a[sortBy] === b[sortBy] ? 0 : a[sortBy] < b[sortBy] ? sort : -1 * sort)

  return (
    <div className="App">
      <input type="file" onChange={e => console.log(e.target.value)} />
      <textarea value={value} onChange={e => setValue(e.target.value)} />
      <button onClick={analise}>analyse</button>
      <button type="button" onClick={() => setSort(sort => sort === 1 ? -1 : 1)}>sort {sort === 1 ? 'DESC' : 'ASC'}</button>
      <button type="button" onClick={() => setSortBy(sort => sort === 'word' ? 'freq' : 'word')}>sort by {sortBy}</button>
      <input placeholder="filter.." onChange={onFilter} value={filter} />
      {words.length && <p>WORDS AMOUNT: {words.length}</p>}
      <table>
        <th>Word</th>
        <th>Frequency</th>
      {preparedWords.filter((x, i) => i < 100).map(({word, freq}) => <tr key={word}><td>{word}</td><td>{freq}</td></tr>)}
      </table>
    </div>
  );
}

export default App;
