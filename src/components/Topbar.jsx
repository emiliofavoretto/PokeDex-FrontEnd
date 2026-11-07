import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Pokeball from "./Pokeball";

export default function Topbar() {
  const { user } = useAuth();
  return (
    <header className="topbar">
      <Link to="/" className="brand">
        <Pokeball size={30} /> Pokédex
      </Link>
      <Link to="/perfil" className="profile-link">
        {user?.avatarUrl ? (
          <img className="avatar" src={user.avatarUrl} alt="" />
        ) : (
          <div className="avatar">{user?.name?.[0]?.toUpperCase() || "?"}</div>
        )}
        <span>Perfil</span>
      </Link>
    </header>
  );
}