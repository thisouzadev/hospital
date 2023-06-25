import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useAppStore } from '../../store';
import AuthService from '../../service/auth.service';

import ErrorLogin from '../../components/errorLogin/ErroLogin';

const Login: React.FC = () => {
  const [, dispatch] = useAppStore();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageError, setMessageError] = useState('');
  const [error, setError] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  const signup = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await AuthService.login(email, password);
    console.log(res);
    return;
    if (res.error) {
      setError(true);
      setMessageError(res.message);
      return;
    }
    dispatch({ type: 'LOG_IN', payload: { user: res.user, token: res.accessToken, stayLoggedIn } });
    navigate('/', { replace: true });
  };

  const handleStayLoggedIn = () => {
    setStayLoggedIn(!stayLoggedIn);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: '300px' }}>
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                  />
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                  <input
                    type="password"
                    className="form-control"
                    autoComplete="on"
                    id="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </label>
              </div>
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={signup}
                >
                  entrar
                </button>
                <Link to="/recover-password" className="btn btn-link">
                  Recuperar Senha
                </Link>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="stayLoggedIn">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="stayLoggedIn"
                      checked={stayLoggedIn}
                      onChange={handleStayLoggedIn}
                    />
                    Manter-se conectado
                  </label>
                </div>
              </div>
            </form>
            {error && <ErrorLogin message={messageError} />}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
