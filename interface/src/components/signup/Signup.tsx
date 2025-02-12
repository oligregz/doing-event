import { FormEvent, useEffect, useState } from "react";
import "../../styles/styles.css";
import DiamondPNG from "../../../assets/diamond.png";
import { AxiosResponse } from "axios";
import signupService from "./signup.service";
import signinService from "../signin/signin.service";
import Dialog from "../dialog/Dialog";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const data: Record<string, string> = {
        name,
        email,
        cpf,
        rg,
        cnpj,
        dateOfBirth,
        password: confirmPassword,
      };

      const filteredData: Record<string, string> = {};
      for (const key in data) {
        if (data[key] !== "") {
          filteredData[key] = data[key];
        }
      }

      setSignupData(filteredData);
      const signupedUser = await signupService(filteredData);

      if (!signupedUser.id) {
        setErrorMessage(getFormattedErrorMessages(signupedUser));
        setDialogOpen(true);
        setShowCloseButton(true);
        return;
      }

      setSignupResponse(signupedUser);

      // savevalues in localStorage
      localStorage.setItem("name", name);
      localStorage.setItem("password", password);

      // try run auto sign in
      await handleAutoLogin();
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again later.");
      setDialogOpen(true);
      setShowCloseButton(true);
    }
  };

  const handleAutoLogin = async () => {
    try {
      setIsLoading(true);
      const storageName = localStorage.getItem("name");
      const storagePassword = localStorage.getItem("password");

      if (!storageName || !storagePassword) {
        throw new Error("Credentials not found in localStorage");
      }

      const signinRes = await signinService({
        username: storageName,
        password: storagePassword,
      });

      if (!signinRes.token) {
        setErrorMessage(
          "Automatic login failed. Please try logging in manually."
        );
        setDialogOpen(true);
        setShowCloseButton(true);
        return;
      }

      // save token in localStorage
      localStorage.setItem("token", signinRes.token);

      // push to events page
      navigate("/events");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Automatic login failed. Please try logging in manually."
      );
      setDialogOpen(true);
      setShowCloseButton(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getFormattedErrorMessages = (messages: string[]): string => {
    if (Array.isArray(messages)) {
      return messages
        .map((message, index) => ` | Error [${index + 1}] - ${message}`)
        .join("\n");
    }
    return "An unknown error occurred.";
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.clear();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      alert(passwordError);
      return;
    }
    setPasswordError("");

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
            <span className="txt1">Contains account?</span>
            <a href="/" className="txt2" onClick={() => navigate("/")}>
              Sign In.
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
