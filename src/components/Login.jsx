"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    try {
      const response = await fetch('/api/send-login-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Login successful (notification sent):', data.message);
        alert('Login successful! Check your email for notification.');
        
        // Save email to localStorage for header display
        localStorage.setItem('userEmail', email);

        // Redirect to homepage
        router.push('/');

      } else {
        console.error('Login failed:', data.error);
        alert('Login failed. Check console for details.');
      }
    } catch (error) {
      console.error('Error during login request:', error);
      alert('An error occurred during login.');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signIn('facebook', { 
        callbackUrl: '/',
        redirect: true
      });
      
      if (result?.error) {
        console.error('Facebook login failed:', result.error);
        alert('Facebook login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during Facebook login:', error);
      alert('An error occurred during Facebook login.');
    }
  };

  return (
    <>
      {/* ================================== Account Page Start =========================== */}
      <section className="account d-flex">
        <img
          src="assets/images/thumbs/account-img.png"
          alt=""
          className="account__img"
        />
        <div className="account__left d-md-flex d-none flx-align section-bg position-relative z-index-1 overflow-hidden">
          <img
            src="assets/images/shapes/pattern-curve-seven.png"
            alt=""
            className="position-absolute end-0 top-0 z-index--1 h-100"
          />
          <div className="account-thumb">
            <img src="assets/images/thumbs/banner-img.png" alt="" />
            <div className="statistics animation bg-main text-center">
              <h5 className="statistics__amount text-white">50k</h5>
              <span className="statistics__text text-white font-14">
                Customers
              </span>
            </div>
          </div>
        </div>
        <div className="account__right padding-y-120 flx-align">
          <div className="dark-light-mode">
            {/* Light Dark Mode */}
            <ThemeToggle />
          </div>
          <div className="account-content">
            <Link scroll={false} href="/" className="logo mb-64">
              <img
                src="assets/images/logo/logo.png"
                alt=""
                className="white-version"
              />
              <img
                src="assets/images/logo/white-logo-two.png"
                alt=""
                className="dark-version"
              />
            </Link>
            <h4 className="account-content__title mb-48 text-capitalize">
              Welcome Back!
            </h4>
            <form onSubmit={handleLogin}>
              <div className="row">
                <div className="col-12">
                  <label
                    htmlFor="email"
                    className="form-label mb-2 font-18 font-heading fw-600"
                  >
                    Email
                  </label>
                  <div className="position-relative">
                    <input
                      type="email"
                      className="common-input common-input--bg common-input--withIcon"
                      id="email"
                      placeholder="infoname@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="input-icon">
                      <img src="assets/images/icons/envelope-icon.svg" alt="" />
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <label
                    htmlFor="your-password"
                    className="form-label mb-2 font-18 font-heading fw-600"
                  >
                    Password
                  </label>
                  <div className="position-relative">
                    <input
                      type="password"
                      className="common-input common-input--bg common-input--withIcon"
                      id="your-password"
                      placeholder="6+ characters, 1 Capital letter"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className="input-icon toggle-password cursor-pointer"
                      id="#your-password"
                    >
                      <img src="assets/images/icons/lock-icon.svg" alt="" />
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="flx-between gap-1">
                    <div className="common-check my-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="checkbox"
                        id="keepMe"
                      />
                      <label
                        className="form-check-label mb-0 fw-400 font-14 text-body"
                        htmlFor="keepMe"
                      >
                        Keep me signed in
                      </label>
                    </div>
                    <Link scroll={false}
                      href="#"
                      className="forgot-password text-decoration-underline text-main text-poppins font-14"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-main btn-lg w-100 pill mb-3"
                  >
                    {" "}
                    Sign In
                  </button>
                </div>
                <div className="col-12">
                  <button
                    type="button"
                    onClick={handleFacebookLogin}
                    className="btn btn-outline-light btn-lg-icon btn-lg w-100 pill mb-3"
                    style={{ marginBottom: '16px' }}
                  >
                    <span className="icon icon-left">
                      <img src="assets/images/icons/facebook.svg" alt="" />
                    </span>
                    Sign in with Facebook
                  </button>
                </div>
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-outline-light btn-lg-icon btn-lg w-100 pill"
                  >
                    <span className="icon icon-left">
                      <img src="assets/images/icons/google.svg" alt="" />
                    </span>
                    Sign in with google
                  </button>
                </div>
                <div className="col-sm-12 mb-0">
                  <div className="have-account">
                    <p className="text font-14">
                      New to the market?{" "}
                      <Link scroll={false}
                        className="link text-main text-decoration-underline fw-500"
                        href="/register"
                      >
                        sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* ================================== Account Page End =========================== */}
    </>
  );
};

export default Login;
