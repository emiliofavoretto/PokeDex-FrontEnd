import { useEffect, useState } from "react";
import PokemonModal from "../components/PokemonModal";
import Topbar from "../components/Topbar";

const POKE_API = "https://pokeapi.co/api/v2";
const LIMIT = 24;
const img = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [selected, setSelected] = useState(null);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    fetch(`${POKE_API}/pokemon?limit=${LIMIT}&offset=${offset}`)
      .then((r) => r.json())
      .then((data) => {
        setPokemons(
          data.results.map((p) => ({
            name: p.name,
            id: Number(p.url.split("/").filter(Boolean).pop()),
          }))
        );
      });
  }, [offset]);

  function buscar(e) {
    e.preventDefault();
    if (busca.trim()) setSelected(busca.trim().toLowerCase());
  }

  return (
    <>
      <Topbar />
      <main className="container">
        <form className="search" onSubmit={buscar}>
          <input placeholder="Buscar por nome ou número..." value={busca}
                 onChange={(e) => setBusca(e.target.value)} />
          <button type="submit">Buscar</button>
        </form>

        <div className="grid">
          {pokemons.map((p) => (
            <div key={p.id} className="card" onClick={() => setSelected(p.id)}>
              <img src={img(p.id)} alt={p.name} loading="lazy" />
              <div className="num">#{String(p.id).padStart(4, "0")}</div>
              <div className="name">{p.name}</div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button className="btn-ghost" disabled={offset === 0}
                  onClick={() => setOffset(offset - LIMIT)}>← Anterior</button>
          <span>Página {offset / LIMIT + 1}</span>
          <button className="btn-ghost" onClick={() => setOffset(offset + LIMIT)}>Próxima →</button>
        </div>
      </main>

      {selected && <PokemonModal id={selected} onClose={() => setSelected(null)} />}
    </>
  );
}