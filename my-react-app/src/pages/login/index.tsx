import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { getLocalStorage } from "../../utils/functions/getlocalStorage";
import { setLocalStorage } from "../../utils/functions/setLocalStorage";
import UserService from "../../service/user.service";
import ErrorLogin from "../../components/errorLogin/ErroLogin";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userLocal = getLocalStorage("user");
    if (userLocal) {
      switch (userLocal.cargo) {
        case "administrator":
          navigate("/admin/manage");
          break;
        default:
          break;
      }
    }
  }, [navigate]);

  const signup = (event: React.FormEvent) => {
    event.preventDefault();
    new UserService()
      .login(email, password)
      .then((res) => {
        // const { token, user } = res.data;

        console.log(res.data.user);
        // localStorage.setItem("token", token);
        // setLocalStorage("user", user);
        // setUser(user);
        // switch (user.cargo) {
        //   case "administrator":
        //     navigate("/admin/manage");
        //     break;
        //   default:
        //     break;
        // }
      })
      .catch((err) => {
        setError(true);
        setMessageError(err.message);
        console.log("ERRO -> ", err);
      });
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: "300px" }}>
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
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
              </div>
            </form>
            {error ? <ErrorLogin message={messageError} /> : ""}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
