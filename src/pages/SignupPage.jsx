import { userService } from "../services/userService";
import { useRef, useState } from "react";
import Spinner from "../components/spinner";

export const SignUp = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();
  if (isLoading) return <Spinner />;
  else {
    return (
      <section className="sign-up-page">
        <div className="sign-up-page-container">
          <h1 className="title">Welcome to </h1>
          <h1 className="title">
            Mister-<span className="color">₿</span>ITCoin
            <span className="color">.</span>
          </h1>
          <h3 className="sub-title">Please enter your name </h3>
          <input type="text" ref={inputRef} className="input" />
          <div className="sign-in-btn-container">
            <button
              onClick={() => {
                const userName = inputRef.current.value;
                userService.signup(userName);
                setIsLoading(true);
                setTimeout(() => {
                  props.setUser(userName);
                  setIsLoading(false);
                }, 500);
              }}
            >
              sign up
            </button>
          </div>
        </div>
      </section>
    );
  }
};
