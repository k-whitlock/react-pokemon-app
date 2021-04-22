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

  const nextPokemon = async () => {
    setLoading(true);
    let data = await getAll(nextPoke)
    await loadPokemon(data.results)
    setNextPoke(data.next)
    setPrevPoke(data.previous)
    setLoading(false);
  }

  const prevPokemon = async () => {
    if (!prevPoke) return;
    setLoading(true);
    let data = await getAll(prevPoke)
    await loadPokemon(data.results)
    setNextPoke(data.next)
    setPrevPoke(data.previous)
    setLoading(false);
  }

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

//go through each pokemon in pokeData array and render the card component
  return ( 
    <div>   
      {loading ? 
        <div class="d-flex justify-content-center align-items-center mt-5">
          <h1>Loading...</h1>
          <div class="spinner-border ml-4" style={{width: "3rem", height: "3rem"}} role="status" aria-hidden="true">
          </div>
        </div> 
        :(
      <div className="container-fluid my-5 mx-auto">
        <div className="d-flex justify-content-center">
          <button onClick={prevPokemon} id="back" type="button" className="btn btn-primary btn-md rounded mr-3 ">Prev</button>
          <button onClick={nextPokemon} id="forward" type="button" className="btn btn-primary btn-md rounded mr-3 ">Next</button>
        </div>  
        
        <div id="" className="row justify-content-around">
          {pokeData.map((pokemon, i) => {
            return <CardComponent key={i} pokemon={pokemon} />
          })}
        </div>
      </div>
      )}
    </div> 
  );
}

export default App;
