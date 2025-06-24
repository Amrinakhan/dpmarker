"use client";

import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const CartPersonal = () => {
    const searchParams = useSearchParams();
    const [selectedPlan, setSelectedPlan] = useState({
        name: '',
        price: 0
    });

    useEffect(() => {
        const plan = searchParams.get('plan');
        const price = searchParams.get('price');
        if (plan && price) {
            setSelectedPlan({
                name: plan,
                price: parseFloat(price)
            });
        }
    }, [searchParams]);

    const [personalInfo, setPersonalInfo] = useState({
        emailAddress: '',
        firstName: '',
        lastName: '',
    });

    const [agreements, setAgreements] = useState({
        agreedToTerms: false,
        agreedToPrivacy: false,
    });

    const [errors, setErrors] = useState({
        emailAddress: '',
        firstName: '',
        lastName: '',
    });

    const [placingOrder, setPlacingOrder] = useState(false);

    const validateField = (name, value) => {
        if (!value.trim()) {
            setErrors(prev => ({
                ...prev,
                [name]: 'Please fill out this field'
            }));
            return false;
        }
        if (name === 'emailAddress' && !value.includes('@')) {
            setErrors(prev => ({
                ...prev,
                [name]: 'Please enter a valid email address'
            }));
            return false;
        }
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
        return true;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setAgreements(prevAgreements => ({
                ...prevAgreements,
                [name]: checked,
            }));
        } else {
            setPersonalInfo(prevInfo => ({
                ...prevInfo,
                [name]: value,
            }));
            validateField(name, value);
        }
    };

    const handleBlur = (e) => {
        const { name, value, type } = e.target;
        if (type !== 'checkbox') {
             validateField(name, value);
        }
    };

    const handlePlaceOrder = async () => {
        // Validate all fields before proceeding
        const isEmailValid = validateField('emailAddress', personalInfo.emailAddress);
        const isFirstNameValid = validateField('firstName', personalInfo.firstName);
        const isLastNameValid = validateField('lastName', personalInfo.lastName);

        if (!isEmailValid || !isFirstNameValid || !isLastNameValid) {
            return;
        }

        // Optionally, you might want to add validation for agreements here too
        // if (!agreements.agreedToTerms || !agreements.agreedToPrivacy) {
        //     alert('Please agree to the terms and privacy policy.');
        //     return;
        // }

        setPlacingOrder(true);

        const userId = 'replace-with-actual-user-id'; // TODO: Replace with actual user ID logic
        const orderData = {
            user_id: userId,
            email: personalInfo.emailAddress,
            first_name: personalInfo.firstName,
            last_name: personalInfo.lastName,
            plan_name: selectedPlan.name,
            total_amount: selectedPlan.price,
            payment_method: 'COD', // Assuming COD for now
            shipping_address: `${personalInfo.firstName} ${personalInfo.lastName}`, // Simple shipping address for now
            agreed_to_terms: agreements.agreedToTerms,
            agreed_to_privacy: agreements.agreedToPrivacy,
            cartItems: [] // Add an empty cartItems array to satisfy the backend expectation
        };

        try {
            const response = await fetch('/api/place-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();

            if (result.success) {
                alert('Order placed successfully! Order ID: ' + result.orderId);
            } else {
                // Check if the backend returned a specific error message
                const errorMessage = result.error || 'Failed to place order';
                alert('Failed to place order: ' + errorMessage);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('An error occurred while placing your order.');
        } finally {
            setPlacingOrder(false);
        }
    };

    return (
        <section className="cart-personal padding-y-120">
        <div className="container container-two">
          <div className="row gy-5">
            <div className="col-lg-8 pe-sm-5">
              <div className="cart-personal__content">
                <h5 className="cart-personal__title mb-32">Personal information</h5>
                <form action="#">
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="form-label font-18 mb-2 fw-500 font-heading"
                    >
                      Email Address <span className="text-danger">*</span>{" "}
                    </label>
                    <span className="text d-block mb-2">
                      We will send the purchase receipt to this address.
                    </span>
                    <input
                      type="email"
                      className={`common-input ${errors.emailAddress ? 'is-invalid' : ''}`}
                      id="email"
                      name="emailAddress"
                      value={personalInfo.emailAddress}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Email address"
                    />
                    {errors.emailAddress && (
                      <div className="text-danger mt-1">{errors.emailAddress}</div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="form-label font-18 mb-2 fw-500 font-heading"
                    >
                      First Name <span className="text-danger">*</span>{" "}
                    </label>
                    <span className="text d-block mb-2">
                      We will use this to personalize your account experience.
                    </span>
                    <input
                      type="text"
                      className={`common-input ${errors.firstName ? 'is-invalid' : ''}`}
                      id="name"
                      name="firstName"
                      value={personalInfo.firstName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="First name"
                    />
                    {errors.firstName && (
                      <div className="text-danger mt-1">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="lastName"
                      className="form-label font-18 mb-2 fw-500 font-heading"
                    >
                      Last name <span className="text-danger">*</span>{" "}
                    </label>
                    <span className="text d-block mb-2">
                      We will use this to personalize your account experience.
                    </span>
                    <input
                      type="text"
                      className={`common-input ${errors.lastName ? 'is-invalid' : ''}`}
                      id="lastName"
                      name="lastName"
                      value={personalInfo.lastName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Last name"
                    />
                    {errors.lastName && (
                      <div className="text-danger mt-1">{errors.lastName}</div>
                    )}
                  </div>
                  <div className="mt-32 mb-32">
                    <div className="common-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="agreedToTerms"
                        id="agree"
                        checked={agreements.agreedToTerms}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label mb-0" htmlFor="agree">
                        Agree To Terms
                      </label>
                    </div>
                    <div className="common-check mb-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="agreedToPrivacy"
                        id="privacy"
                        checked={agreements.agreedToPrivacy}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label mb-0" htmlFor="privacy">
                        Agree To Privacy Policy
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="cart-content__bottom flx-between gap-2">
                <Link scroll={false}
                  href="/subscriptions"
                  className="btn btn-outline-light flx-align gap-2 pill btn-lg"
                >
                  <span className="icon line-height-1 font-20">
                    <i className="las la-arrow-left" />
                  </span>
                  Back to Plans
                </Link>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="order-summary">
                <h5 className="order-summary__title mb-32">Order Summary</h5>
                <ul className="billing-list">
                  <li className="billing-list__item flx-between">
                    <span className="text text-heading fw-500">{selectedPlan.name}</span>
                    <span className="amount text-heading fw-500">${selectedPlan.price.toFixed(2)}</span>
                  </li>
                  <li className="billing-list__item flx-between">
                    <span className="text text-heading font-20 fw-500 font-heading">
                      Total
                    </span>
                    <span className="amount text-heading font-20 fw-500 font-heading">
                      ${selectedPlan.price.toFixed(2)}
                    </span>
                  </li>
                </ul>
                <button
                  type="button"
                  className="btn btn-outline-light pill btn-lg w-100 mt-32"
                  onClick={handlePlaceOrder}
                  disabled={placingOrder}
                >
                  <span className="icon icon-left">
                    <img
                      src="assets/images/icons/cart-reverse.svg"
                      alt=""
                      className="white-version"
                    />
                    <img
                      src="assets/images/icons/cart-white.svg"
                      alt=""
                      className="dark-version"
                    />
                  </span>
                  {placingOrder ? 'Processing Order...' : 'Purchase Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default CartPersonal;