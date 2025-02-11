import { FormEvent, useEffect, useState } from "react";
import "../../styles/styles.css";
import DiamondPNG from "../../../assets/diamond.png";
import { AxiosResponse } from "axios";
import signupService from "./signup.service";
import Dialog from "../dialog/Dialog";

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
  const [signupResponse, setSignupResponse] = useState<AxiosResponse | null>(
    null
  );
  const [signupData, setSignupData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log();
  }, [signupData, signupResponse]);

  const registerUser = async () => {
    try {
      const data = {
        name,
        email,
        cpf,
        rg,
        cnpj,
        dateOfBirth,
        password: confirmPassword,
      };

      setSignupData(data);
      const signupedUser = await signupService(data);

      if (!signupedUser.id) {
        setErrorMessage(signupedUser);
        setDialogOpen(true);
        setShowCloseButton(true);
        console.error("Signup service returned undefined.");
        return;
      }

      setSignupResponse(signupedUser);
      console.log("signupedUser - ", signupedUser);
      console.log("signupResponse - ", signupResponse);
      // set email and pasword in localstorage
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again later.");
      setDialogOpen(true);
      setShowCloseButton(true);
    }
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    // checks password integrity
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      alert(passwordError);
      return;
    }
    setPasswordError("");

    // create user and set your login variables in localstorage
    try {
      setIsLoading(true);
      setShowCloseButton(false);
      await registerUser();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
              Sign Up
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

      <Dialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        showCloseButton={showCloseButton}
      >
        <p>{errorMessage}</p>
      </Dialog>

      <Dialog isOpen={isLoading} onClose={() => {}} showCloseButton={false}>
        <p>Loading...</p>
      </Dialog>
    </div>
  );
}

export default Signup;
