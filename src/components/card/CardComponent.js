import React from 'react';
import './style.css';


function CardComponent({pokemon}) {
    return (
        <div className="card col-3 text-center rounded bg-light m-3 p-3" style={{maxWidth: 300}}>
            <div className="">
                <img className="pokemon-img"src={pokemon.sprites.front_default} alt="" />
            </div>
            <div className="pokemon-types d-flex justify-content-center">
                {pokemon.types.map(type => {
                    return (
                        <h1 className="pokemon-type badge badge-dark mx-2 p-2">
                        {type.type.name}
                        </h1>
                    );
                })}
            </div>
            <div className="pokemon-info">
                <p className="mb-0">Height: {pokemon.height} | Weight: {pokemon.weight}</p>
            </div>
            <div className="pokemon-name text-capitalize mt-2">
                <h3>{pokemon.id}. {pokemon.name}</h3>
            </div>  
        </div>
    )
}


export default CardComponent; 