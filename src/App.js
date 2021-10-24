import React, {useState, useEffect} from 'react';
import { getAll, getPokemon } from './data/pokemon';
import CardComponent from './components/Card/CardComponent';
import './App.css';



function App() {
  //pokedata is the array we will get from the _pokemondata()
  //setPokeData we call this when we update our state in the app
  const [pokeData, setPokeData] = useState([]);
  //store the url for the next set of pokemon data
  const [nextPoke, setNextPoke] = useState('');
  //store the url for the previous set of pokemon data
  const [prevPoke, setPrevPoke] = useState('');
  //handling the loading state when fetching data from api
  const [loading, setLoading] = useState(true);
  const url = `https://pokeapi.co/api/v2/pokemon`;

  //when component mounts to page run this
  useEffect(() => {
    async function fetchPokemon() {
      //fetch all pokemon by using  getAll function in data component.
      let res = await getAll(url);
      
      setNextPoke(res.next);
      setPrevPoke(res.previous);
      await loadPokemon(res.results);
      //set loading to false once results from loadPokemon function are returned
      setLoading(false);
    }
    fetchPokemon();  
  }, [url]);

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

  

//go through each pokemon in pokeData array and render the card component
  return ( 
    // if data is loading show spinner. if not show buttons and pokemon cards
    <div>   
      {loading ? 
        <div className="d-flex justify-content-center align-items-center mt-5">
          <h1>Loading...</h1>
          <div className="spinner-border ml-4" style={{width: "3rem", height: "3rem"}} role="status" aria-hidden="true">
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
