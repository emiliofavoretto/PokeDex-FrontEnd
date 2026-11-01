import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PokemonModal from "../components/PokemonModal";

const POKE_API = "https://pokeapi.co/api/v2";
const img = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch(`${POKE_API}/pokemon?limit=20&offset=${offset}`)
      .then((r) => r.json())
      .then((data) => {
        const list = data.results.map((p) => ({
          name: p.name,
          id: Number(p.url.split("/").filter(Boolean).pop()),
        }));
        setPokemons(list);
      });
  }, [offset]);

  return (
    <div>
      <header>
        <h1>Pokédex</h1>
        <Link to="/perfil">Meu perfil</Link>
      </header>

      <div className="grid">
        {pokemons.map((p) => (
          <div key={p.id} className="card" onClick={() => setSelectedId(p.id)}>
            <img src={img(p.id)} alt={p.name} width="96" />
            <p>#{p.id} {p.name}</p>
          </div>
        ))}
      </div>

      <button disabled={offset === 0} onClick={() => setOffset(offset - 20)}>Anterior</button>
      <button onClick={() => setOffset(offset + 20)}>Próximo</button>

      {selectedId && (
        <PokemonModal id={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}