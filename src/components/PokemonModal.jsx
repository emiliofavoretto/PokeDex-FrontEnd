import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function PokemonModal({ id, onClose }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((r) => r.json())
      .then(setPokemon);
  }, [id]);

  async function favoritar() {
    // ajuste a rota para a do seu backend
    await api("/favorites", {
      method: "POST",
      body: JSON.stringify({ pokemonId: id }),
    });
    alert("Favoritado!");
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {!pokemon ? <p>Carregando...</p> : (
          <>
            <button onClick={onClose}>✕</button>
            <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} width="200" />
            <h2>#{pokemon.id} {pokemon.name}</h2>
            <p>Tipos: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
            <p>Altura: {pokemon.height / 10} m | Peso: {pokemon.weight / 10} kg</p>
            <ul>
              {pokemon.stats.map((s) => (
                <li key={s.stat.name}>{s.stat.name}: {s.base_stat}</li>
              ))}
            </ul>
            <button onClick={favoritar}>⭐ Favoritar</button>
          </>
        )}
      </div>
    </div>
  );
}