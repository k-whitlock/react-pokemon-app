import React, {useState, useEffect} from 'react';
import { getAll } from './data/pokemon';
import './App.css';



function App() {
  const [pokeData, setPokeData] = useState([]);
  const [nextPoke, setNextPoke] = useState('');
  const [prevPoke, setPrevPoke] = useState('');
  const [loading, setLoading] = useState(true);
  const url = `https://pokeapi.co/api/v2/pokemon`;

  useEffect(() => {
    async function fetchPokemon() {
      let res = await getAll(url);
      console.log(res);
      
      setNextPoke(res.next);
      setPrevPoke(res.previous);
      setLoading(false);
    }
    fetchPokemon();
     
  }, []);



  
  return (
    <div>{loading ? <h1>One moment...</h1> : <h1>data is ready</h1>}</div>
  );
}

export default App;
