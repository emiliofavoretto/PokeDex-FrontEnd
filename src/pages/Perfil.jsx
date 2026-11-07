import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Topbar from "../components/Topbar";
import PokemonModal from "../components/PokemonModal";

const img = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export default function Perfil() {
  const { user, logout } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api("/api/usuarios_favoritos")
      .then(async (res) => {
        const lista = Array.isArray(res) ? res : res.data || [];
        const comNome = await Promise.all(
          lista.map(async (f) => {
            const p = await fetch(`https://pokeapi.co/api/v2/pokemon/${f.pokemonId}`)
              .then((r) => r.json())
              .catch(() => null);
            return { ...f, name: p?.name || `#${f.pokemonId}` };
          })
        );
        setFavorites(comNome);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Topbar />
      <main className="container">
        <section className="profile-card">
          {user.avatarUrl ? (
            <img className="avatar" src={user.avatarUrl} alt="avatar" />
          ) : (
            <div className="avatar">{user.name[0].toUpperCase()}</div>
          )}
          <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
          <button className="btn-logout" onClick={() => { logout(); navigate("/login"); }}>
            Sair
          </button>
        </section>

        <h2 className="section-title">⭐ Meus favoritos</h2>

        {favorites.length === 0 ? (
          <p className="empty">Você ainda não favoritou nenhum Pokémon.</p>
        ) : (
          <div className="grid">
            {favorites.map((f) => (
              <div key={f.id} className="card" onClick={() => setSelected(f.pokemonId)}>
                <img src={img(f.pokemonId)} alt={f.name} loading="lazy" />
                <div className="num">#{String(f.pokemonId).padStart(4, "0")}</div>
                <div className="name">{f.name}</div>
              </div>
            ))}
          </div>
        )}
      </main>

      {selected && <PokemonModal id={selected} onClose={() => setSelected(null)} />}
    </>
  );
}