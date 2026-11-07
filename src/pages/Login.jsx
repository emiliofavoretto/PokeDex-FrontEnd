import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import Pokeball from "../components/Pokeball";

export default function Login() {
  const [modo, setModo] = useState("login"); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const isCadastro = modo === "cadastro";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setOk("");
    setLoading(true);
    try {
      if (isCadastro) {
        await api("/api/usuarios", {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
        });
        setOk("Conta criada! Agora é só entrar.");
        setModo("login");
        setPassword("");
      } else {
        await login(email, password);
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <Pokeball className="logo" />
        <h1>{isCadastro ? "Criar conta" : "Bem-vindo à Pokédex"}</h1>
        <p className="subtitle">
          {isCadastro ? "Preencha os dados para começar" : "Faça login para continuar"}
        </p>

        {error && <div className="msg-error">{error}</div>}
        {ok && <div className="msg-ok">{ok}</div>}

        {isCadastro && (
          <div className="field">
            <span className="icon">👤</span>
            <div className="inner">
              <label>Nome</label>
              <input value={name} onChange={(e) => setName(e.target.value)}
                     placeholder="Seu nome" maxLength={50} required />
            </div>
          </div>
        )}

        <div className="field">
          <span className="icon">@</span>
          <div className="inner">
            <label>E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                   placeholder="seu.email@exemplo.com" required />
          </div>
        </div>

        <div className="field">
          <span className="icon">🔒</span>
          <div className="inner">
            <label>Senha</label>
            <input type={verSenha ? "text" : "password"} value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder={isCadastro ? "Mínimo 8 caracteres" : "••••••••"}
                   minLength={isCadastro ? 8 : undefined} required />
          </div>
          <button type="button" className="eye" onClick={() => setVerSenha(!verSenha)}
                  aria-label="Mostrar senha">
            {verSenha ? "🙈" : "👁"}
          </button>
        </div>

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "AGUARDE..." : isCadastro ? "CADASTRAR" : "ENTRAR"}
        </button>

        <p className="auth-footer">
          {isCadastro ? "Já tem uma conta? " : "Não tem uma conta? "}
          <button type="button" className="link-btn"
                  onClick={() => { setModo(isCadastro ? "login" : "cadastro"); setError(""); setOk(""); }}>
            {isCadastro ? "Entrar" : "Cadastre-se"}
          </button>
        </p>
      </form>
    </div>
  );
}