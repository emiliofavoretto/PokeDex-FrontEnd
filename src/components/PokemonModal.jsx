import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function PokemonModal({ id, onClose }) {
  const [pokemon, setPokemon] = useState(null);
  const [erro, setErro] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setPokemon(null);
    setErro(false);
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setPokemon)
      .catch(() => setErro(true));
  }, [id]);

  async function favoritar() {
    try {
      // ajuste a rota para a real do seu backend de favoritos
      await api("/api/usuarios_favoritos", {
        method: "POST",
        body: JSON.stringify({ pokemonId: pokemon.id }),
      });
      setMsg("⭐ Adicionado aos favoritos!");
    } catch (e) {
      setMsg(e.message);
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>✕</button>

        {erro && <p className="empty">Pokémon não encontrado 😕</p>}
        {!erro && !pokemon && <p className="empty">Carregando...</p>}

        {pokemon && (
          <>
            <img className="art" alt={pokemon.name}
                 src={pokemon.sprites.other["official-artwork"].front_default} />
            <h2>
              {pokemon.name} <span>#{String(pokemon.id).padStart(4, "0")}</span>
            </h2>

            <div className="types">
              {pokemon.types.map((t) => (
                <span key={t.type.name} className={`type ${t.type.name}`}>{t.type.name}</span>
              ))}
            </div>

            <div className="info">
              <div><strong>{pokemon.height / 10} m</strong>Altura</div>
              <div><strong>{pokemon.weight / 10} kg</strong>Peso</div>
            </div>

            <div className="stats">
              {pokemon.stats.map((s) => (
                <div className="stat" key={s.stat.name}>
                  <span className="label">{s.stat.name.replace("special-", "sp. ")}</span>
                  <div className="bar">
                    <div style={{ width: `${Math.min(s.base_stat / 2, 100)}%` }} />
                  </div>
                  <span className="val">{s.base_stat}</span>
                </div>
              ))}
            </div>

            <button className="btn-fav" onClick={favoritar}>⭐ Favoritar</button>
            {msg && <p className="fav-msg">{msg}</p>}
          </>
        )}
      </div>
    </div>
  );
}