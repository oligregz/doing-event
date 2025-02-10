import { FormEvent, useState } from "react";
import "../styles/styles.css";
import DiamondPNG from "../../assets/diamond.png";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      alert(passwordError);
      return;
    }
    setPasswordError("");
  };

  return (
    <div className="container-login">
      <div className="wrap-login">
        <form className="login-form" onSubmit={(e) => handleSignup(e)}>
          <span className="login-form-title">Welcome</span>

          <span className="login-form-title">
            <img src={DiamondPNG} alt="Logo" />
          </span>

          <div className="wrap-input">
            <input
              className={name !== "" ? "has-val input" : "input"}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="focus-input" data-placeholder="Name"></span>
          </div>

          <div className="wrap-input">
            <input
              className={email !== "" ? "has-val input" : "input"}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="focus-input" data-placeholder="Email"></span>
          </div>

          <div className="wrap-input">
            <input
              className={cpf !== "" ? "has-val input" : "input"}
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <span className="focus-input" data-placeholder="CPF"></span>
          </div>

          <div className="wrap-input">
            <input
              className={rg !== "" ? "has-val input" : "input"}
              type="text"
              value={rg}
              onChange={(e) => setRg(e.target.value)}
            />
            <span className="focus-input" data-placeholder="RG"></span>
          </div>

          <div className="wrap-input">
            <input
              className={cnpj !== "" ? "has-val input" : "input"}
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
            <span className="focus-input" data-placeholder="CNPJ"></span>
          </div>

          <div className="wrap-input">
            <input
              className={dateOfBirth !== "" ? "has-val input" : "input"}
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <span
              className="focus-input"
              data-placeholder="Date of Birth"
            ></span>
          </div>

          <div className="wrap-input">
            <input
              className={password !== "" ? "has-val input" : "input"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="focus-input" data-placeholder="Password"></span>
          </div>

          <div className="wrap-input">
            <input
              className={confirmPassword !== "" ? "has-val input" : "input"}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="focus-input"
              data-placeholder="Confirm Password"
            ></span>
          </div>

          {passwordError && <p className="error-text">{passwordError}</p>}

          <div className="container-login-form-btn">
            <button className="login-form-btn" type="submit">
              Sign In
            </button>
          </div>

          <div className="text-center">
            <span className="txt1">No account?</span>
            <a href="#" className="txt2">
              Create account.
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
