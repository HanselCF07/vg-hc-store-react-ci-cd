import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useAPI from "../../hooks/useAPI";
import styles from "./Login.module.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
  const { login } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({});

  const { data, loading, error, executeFetch } = useAPI(API_BASE_URL);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      const response = await executeFetch("/api/v1/vg-hc-store/authentication/user/sign-in-ct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setIsRegister(false);
    } else {
      await login(form, true);
      window.location.href = "/";
    }
  };


  return (
    <div className={`${styles.loginPage}`}>
      <div className={`${styles.loginPageCard}`}>
        <div className={styles.loginPageTitle}>
          <h1 className="h3 fw-bold text-light ">
            {isRegister ? "Create an account" : "Sign in to HC Store"}
          </h1>
          <p className="card-text text-white">
            {isRegister ? "" : "Sign in below to access your account"}
          </p>
        </div>
        <div className="m-4">
          <form className={styles.loginPageForm} onSubmit={handleSubmit}>
            {isRegister ? (
              <>
                <input className={styles.loginPageInput} name="email" placeholder="Email address" onChange={handleChange} />
                <input className={styles.loginPageInput} name="password" type="password" placeholder="Password" onChange={handleChange} />
                <input className={styles.loginPageInput} name="name" placeholder="Name" onChange={handleChange} />
                <input className={styles.loginPageInput} name="phone" placeholder="Phone Number" onChange={handleChange} />
                <input className={styles.loginPageInput} name="address" placeholder="Address" onChange={handleChange} />
              </>
            ) : (
              <>
                <input className={styles.loginPageInput} name="username" placeholder="Email address" onChange={handleChange} />
                <input className={styles.loginPageInput} name="password" type="password" placeholder="Password" onChange={handleChange} />
              </>
            )}

            <button className={styles.loginPageInputButton} type="submit">
              {isRegister ? "Create" : "Sign in"}
            </button>
          </form>

          <div className={styles.loginPageOptionChangeForm}>
            {isRegister ? (
              <>
                ¿Already have an account?{" "}
                <span
                  onClick={() => setIsRegister(!isRegister)}
                  className={styles.loginPageOptionChangeFormSpan}
                >
                  Log in
                </span>
              </>
            ) : (
              <>
                ¿Don't have an account?{" "}
                <span
                  onClick={() => setIsRegister(!isRegister)}
                  className={styles.loginPageOptionChangeFormSpan}
                >
                  Sign up
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

}
