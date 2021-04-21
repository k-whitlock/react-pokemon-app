import React, {useState, useEffect} from 'react';
import { getAll, getPokemon } from './data/pokemon';
import CardComponent from './components/Card/CardComponent';
import './App.css';



function App() {
  const [pokeData, setPokeData] = useState([]);
  const [nextPoke, setNextPoke] = useState('');
  const [prevPoke, setPrevPoke] = useState('');
  const [loading, setLoading] = useState(true);
  const url = `https://pokeapi.co/api/v2/pokemon`;

  useEffect(() => {
    async function fetchPokemon() {
      //fetch all pokemon by using  getAll function in data component.
      let res = await getAll(url);
      setNextPoke(res.next);
      setPrevPoke(res.previous);
      let pokemon = await loadPokemon(res.results);
      //set loading to false once results from loadPokemon function are returned
      setLoading(false);
    }
    fetchPokemon();  
  }, []);

  const loadPokemon = async data => {
    // make a new array from the results of 1st fetch call with the pokemon stats
    let _pokemonData = await Promise.all(
      data.map(async pokemon => {
        //function getPokemon used in data component
        let pokemonStats = await getPokemon(pokemon.url);
        return pokemonStats
      })
    );

    setPokeData(_pokemonData); 
  };

  console.log(pokeData);


  return (
  <div className="container-fluid w-50 bg-light rounded my-5">
    <div id="" className="row flex-wrap mx-auto">
      {pokeData.map((pokemon, i) => {
        return <CardComponent  />
      })}
    </div>
  </div>
  );
}

export default App;
