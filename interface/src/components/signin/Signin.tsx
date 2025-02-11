import { useState, useEffect } from "react";
import "../../styles/styles.css";
import DiamondPNG from "../../../assets/diamond.png";
import { AxiosResponse } from "axios";
import signinService from "./signin.service";

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signinResponse, setSigninResponse] = useState<AxiosResponse | null>(
    null
  );
  const [signinData, setSigninData] = useState({});

  useEffect(() => {
    console.log(signinData);
  }, [signinData]);

  const handleSignin = async () => {
    const data = {
      email,
      password,
    };
    setSigninData(data);
    const signinRes = await signinService(data);

    if (signinRes) {
      setSigninResponse(signinRes);
      console.log(signinResponse);
    }
    console.log(signinResponse);
  };

  return (
    <div className="container-login">
      <div className="wrap-login">
        <form onSubmit={handleSignin} className="login-form">
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
    </div>
  );
}

export default Signin;
