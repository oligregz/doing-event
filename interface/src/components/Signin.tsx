import { useState } from "react";
import "../styles/styles.css";
import DiamondPNG from "../../assets/diamond.png";

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container-login">
      <div className="wrap-login">
        <form className="login-form">
          <span className="login-form-title">Welcome</span>

          <span className="login-form-title">
            <img src={DiamondPNG} />
          </span>

          <div className="wrap-input">
            <input
              className={email !== "" ? "has-val input" : "input"}
              type="email"
              name=""
              id=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="focus-input" data-placeholder="Email"></span>
          </div>

          <div className="wrap-input">
            <input
              className={email !== "" ? "has-val input" : "input"}
              type="password"
              name=""
              id=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="focus-input" data-placeholder="Password"></span>
          </div>

          <div className="container-login-form-btn">
            <button className="login-form-btn">Sig In</button>
          </div>

          <div className="text-center">
            <span className="txt1">No contains account?</span>

            <a href="#" className="txt2">
              Create account.
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
