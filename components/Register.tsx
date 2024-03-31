/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import styles from "./Login.module.css";
import { User, Lock, Mail } from "lucide-react";
import Link from "next/link";
import TagsInput from "./TagsInput";
import swal from "sweetalert";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    teams: [],
  });
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleTagsChange = (teams: any) => {
    setFormData({ ...formData, teams });
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // console.log("Form Data:", formData);
    //! -----> send Register data to a server
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      teams: formData.teams,
    };
    console.log(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:4001/user/register", options)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data.statusCode);
        if (data.statusCode === 201) {
          swal({
            title: "Success",
            text: "Account created successfully",
            icon: "success",
          }).then(() => {
            // Redirect to login page
            window.location.href = "/";
          });
        } else if (data.statusCode === 409) {
          swal({
            title: "Warning",
            text: "Email already exists",
            icon: "warning",
          });
        } else {
          swal({
            title: "Error",
            text: "An error occurred",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className={styles.wrapper}>
      <img src="./workbench.png" alt="" className={styles.logo} />
      <h5 className={styles.title}>CREATE ACCOUNT</h5>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <span>
            <User size={16} />
          </span>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="your name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
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
        <TagsInput teamz={formData.teams} onTagsChange={handleTagsChange} />
        <button className={styles.button}>CREATE ACCOUNT</button>
        <div className={styles.footer}>
          <Link href="/" className={styles.create__account}>
            sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
