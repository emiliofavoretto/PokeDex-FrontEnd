import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Perfil() {
  const { user, logout } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api("/favorites").then(setFavorites).catch(console.error); // ajuste a rota
  }, []);

  return (
    <div>
      <Link to="/">← Voltar</Link>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      {user.avatarUrl && <img src={user.avatarUrl} alt="avatar" width="100" />}

      <h2>Favoritos</h2>
      <ul>
        {favorites.map((f) => (
          <li key={f.id}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${f.pokemonId}.png`}
                 width="64" alt="" />
            Pokémon #{f.pokemonId}
          </li>
        ))}
      </ul>

      <button onClick={() => { logout(); navigate("/login"); }}>Sair</button>
    </div>
  );
}