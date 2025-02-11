import { useState } from "react";
import "../../styles/styles.css";
import DiamondPNG from "../../../assets/diamond.png";
import { AxiosResponse } from "axios";
import signinService from "./signin.service";
import Dialog from "../dialog/Dialog";

export function Signin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [signinResponse, setSigninResponse] = useState<AxiosResponse | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setShowCloseButton(false);

    try {
      const data = {
        username: name,
        password,
      };
      const signinRes = await signinService(data);

      if (!signinRes.token) {
        setErrorMessage(
          signinRes || "Login failed. Please check your credentials."
        );
        setIsDialogOpen(true);
      }
      setSigninResponse(signinRes);
      console.log(signinResponse);
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again later.");
      setIsDialogOpen(true);
    } finally {
      setIsLoading(false);
      setShowCloseButton(true);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="container-login">
      <div className="wrap-login">
        <form onSubmit={handleSignin} className="login-form">
          <span className="login-form-title">Welcome</span>

          <span className="login-form-title">
            <img src={DiamondPNG} alt="Diamond" />
          </span>

          <div className="wrap-input">
            <input
              className={name !== "" ? "has-val input" : "input"}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="focus-input" data-placeholder="Username"></span>
          </div>

          <div className="wrap-input">
            <input
              className={name !== "" ? "has-val input" : "input"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="focus-input" data-placeholder="Password"></span>
          </div>

          <div className="container-login-form-btn">
            <button type="submit" className="login-form-btn">
              Sign In
            </button>
          </div>

          <div className="text-center">
            <span className="txt1">No contains account?</span>

            <a href="#" className="txt2">
              Create account.
            </a>
          </div>
        </form>
      </div>

      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
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

export default Signin;
