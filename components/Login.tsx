/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import styles from "./Login.module.css";
import { User, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = {
      email: formData.email,
      password: formData.password,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      fetch("http://localhost:4001/auth/login", options)
        .then((response) => response.json())
        .then((data) => {
          //? ----> Extract the required data from the response
          const {
            name,
            email,
            role,
            access_token,
            teams,
            assignedTasks,
            assignedSubtasks,
          } = data;
          //? -----> Prepare an object with the required data
          const userData = {
            name,
            email,
            role,
            access_token,
            teams,
            assignedTasks,
            assignedSubtasks,
          };
          //? -----> Store the user data in local storage
          localStorage.setItem("userData", JSON.stringify(userData));
          // console.log("Success:", data);
          if (data.statusCode === 401) {
            swal({
              title: "Warning",
              text: "Invalid email or password",
              icon: "warning",
            });
            setError("Invalid email or password");
          } else if (data.statusCode === 500) {
            swal({
              title: "Error",
              text: "An error occurred. Please try again later",
              icon: "error",
            });
            setError("An error occurred. Please try again later");
          } else {
            swal({
              title: "Success",
              text: "Login successful",
              icon: "success",
            }).then(() => {
              //?----> Redirect to dashboard page
              router.push("/dashboard");
            });
          }
        });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <div className={styles.wrapper}>
      <img src="./workbench.png" alt="" className={styles.logo} />
      <h5 className={styles.title}>LOGIN</h5>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <span>
            <Mail size={16} />
          </span>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="your email"
          />
        </div>
        <div className={styles.field}>
          <span>
            <Lock size={16} />
          </span>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            placeholder="your password"
          />
        </div>
        <button className={styles.button}>LOGIN</button>
        <div className={styles.footer}>
          <Link href="/register" className={styles.create__account}>
            create account
          </Link>
          <a
            href="#"
            style={{
              color: "var(--secondary)",
              fontWeight: "600",
              textTransform: "uppercase",
              borderBottom: "1px solid var(--secondary)",
              cursor: "pointer",
            }}
          >
            Forgot password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
