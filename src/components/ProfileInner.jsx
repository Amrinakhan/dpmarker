"use client";

import React, { useState, useEffect } from 'react';

const ProfileInner = () => {
    const [profileData, setProfileData] = useState({
        firstname: '',
        lastname: '',
        phoneNumber: '',
        emailAddress: '',
        city: '',
        stateRegion: '',
        postcode: '',
        country: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch user data
    const fetchProfileData = async (userEmail) => {
        setLoading(true);
        setError(null);
        try {
            // Replace 'user@example.com' with the actual logged-in user's email
            const response = await fetch(`/api/update-profile?emailAddress=${userEmail}`);
            const data = await response.json();

            if (data.success) {
                // Map database column names to state keys
                setProfileData({
                    firstname: data.user.firstname || '',
                    lastname: data.user.lastname || '',
                    phoneNumber: data.user['Phone Number'] || '',
                    emailAddress: data.user['Email Address'] || '',
                    city: data.user.City || '',
                    stateRegion: data.user['State/Region'] || '',
                    postcode: data.user.Postcode || '',
                    country: data.user.Country || '',
                });
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        // You need to replace 'user@example.com' with how you get the logged-in user's email
        const loggedInUserEmail = 'user@example.com'; // Replace with actual logic
        fetchProfileData(loggedInUserEmail);
    }, []); // Empty dependency array means this runs once on mount

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/update-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData), // Send the entire profile data
            });

            const data = await response.json();

            if (data.success) {
                alert('Profile updated successfully!');
                // Optionally refetch data to ensure the form shows the latest saved data
                // fetchProfileData(profileData.emailAddress); // Uncomment if needed
            } else {
                setError(data.error);
                alert(`Error updating profile: ${data.error}`);
            }
        } catch (err) {
            setError(err.message);
            alert(`An error occurred: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (error) {
        return <p>Error loading profile: {error}</p>;
    }

    return (
        <>
        {/* Cover Photo Start */}
        <div className="cover-photo position-relative z-index-1 overflow-hidden">
          <div className="avatar-upload">
            <div className="avatar-edit">
              <input type="file" id="imageUploadTwo" accept=".png, .jpg, .jpeg" />
              <label htmlFor="imageUploadTwo">
                <span className="icon">
                  {" "}
                  <img src="assets/images/icons/camera-two.svg" alt="" />{" "}
                </span>
                <span className="text">Change Cover</span>
              </label>
            </div>
            <div className="avatar-preview">
              <div id="imagePreviewTwo"></div>
            </div>
          </div>
        </div>
        {/* Cover Photo End */}
        <div className="dashboard-body__content profile-content-wrapper z-index-1 position-relative mt--100">
          {/* Profile Content Start */}
          <div className="profile">
            <div className="row gy-4">
              <div className="col-xxl-3 col-xl-4">
                <div className="profile-info">
                  <div className="profile-info__inner mb-40 text-center">
                    <div className="avatar-upload mb-24">
                      <div className="avatar-edit">
                        <input
                          type="file"
                          id="imageUpload"
                          accept=".png, .jpg, .jpeg"
                        />
                        <label htmlFor="imageUpload">
                          <img src="assets/images/icons/camera.svg" alt="" />
                        </label>
                      </div>
                      <div className="avatar-preview">
                        <div id="imagePreview"></div>
                      </div>
                    </div>
                    <h5 className="profile-info__name mb-1">Michel Smith</h5>
                    <span className="profile-info__designation font-14">
                      Exclusive Author
                    </span>
                  </div>
                  <ul className="profile-info-list">
                    <li className="profile-info-list__item">
                      <span className="profile-info-list__content flx-align flex-nowrap gap-2">
                        <img
                          src="assets/images/icons/profile-info-icon1.svg"
                          alt=""
                          className="icon"
                        />
                        <span className="text text-heading fw-500">Username</span>
                      </span>
                      <span className="profile-info-list__info">michel15</span>
                    </li>
                    <li className="profile-info-list__item">
                      <span className="profile-info-list__content flx-align flex-nowrap gap-2">
                        <img
                          src="assets/images/icons/profile-info-icon2.svg"
                          alt=""
                          className="icon"
                        />
                        <span className="text text-heading fw-500">Email</span>
                      </span>
                      <span className="profile-info-list__info">
                        michel15@gmail.com
                      </span>
                    </li>
                    <li className="profile-info-list__item">
                      <span className="profile-info-list__content flx-align flex-nowrap gap-2">
                        <img
                          src="assets/images/icons/profile-info-icon3.svg"
                          alt=""
                          className="icon"
                        />
                        <span className="text text-heading fw-500">Phone</span>
                      </span>
                      <span className="profile-info-list__info">
                        +880 15589 236 45
                      </span>
                    </li>
                    <li className="profile-info-list__item">
                      <span className="profile-info-list__content flx-align flex-nowrap gap-2">
                        <img
                          src="assets/images/icons/profile-info-icon4.svg"
                          alt=""
                          className="icon"
                        />
                        <span className="text text-heading fw-500">Country</span>
                      </span>
                      <span className="profile-info-list__info">Bangladesh</span>
                    </li>
                    <li className="profile-info-list__item">
                      <span className="profile-info-list__content flx-align flex-nowrap gap-2">
                        <img
                          src="assets/images/icons/profile-info-icon5.svg"
                          alt=""
                          className="icon"
                        />
                        <span className="text text-heading fw-500">Balance</span>
                      </span>
                      <span className="profile-info-list__info">$0.00 USD</span>
                    </li>
                    <li className="profile-info-list__item">
                      <span className="profile-info-list__content flx-align flex-nowrap gap-2">
                        <img
                          src="assets/images/icons/profile-info-icon6.svg"
                          alt=""
                          className="icon"
                        />
                        <span className="text text-heading fw-500">Member Since</span>
                      </span>
                      <span className="profile-info-list__info">Jan, 01, 2024</span>
                    </li>
                    <li className="profile-info-list__item">
                      <span className="profile-info-list__content flx-align flex-nowrap gap-2">
                        <img
                          src="assets/images/icons/profile-info-icon7.svg"
                          alt=""
                          className="icon"
                        />
                        <span className="text text-heading fw-500">Purchased</span>
                      </span>
                      <span className="profile-info-list__info">0 items</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-9 col-xl-8">
                <div className="dashboard-card">
                  <div className="dashboard-card__header pb-0">
                    <ul
                      className="nav tab-bordered nav-pills"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link font-18 font-heading active"
                          id="pills-personalInfo-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-personalInfo"
                          type="button"
                          role="tab"
                          aria-controls="pills-personalInfo"
                          aria-selected="true"
                        >
                          Personal Info
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link font-18 font-heading"
                          id="pills-payouts-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-payouts"
                          type="button"
                          role="tab"
                          aria-controls="pills-payouts"
                          aria-selected="false"
                        >
                          Payouts
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link font-18 font-heading"
                          id="pills-changePassword-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-changePassword"
                          type="button"
                          role="tab"
                          aria-controls="pills-changePassword"
                          aria-selected="false"
                        >
                          Change Password
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="profile-info-content">
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-personalInfo"
                        role="tabpanel"
                        aria-labelledby="pills-personalInfo-tab"
                        tabIndex={0}
                      >
                        <form onSubmit={handleSubmit} autoComplete="off">
                          <div className="row gy-4">
                            <div className="col-sm-6 col-xs-6">
                              <label
                                htmlFor="fName"
                                className="form-label mb-2 font-18 font-heading fw-600"
                              >
                                First Name
                              </label>
                              <input
                                type="text"
                                className="common-input border"
                                id="fName"
                                name="firstname"
                                value={profileData.firstname}
                                onChange={handleInputChange}
                                placeholder="First Name"
                              />
                            </div>
                            <div className="col-sm-6 col-xs-6">
                              <label
                                htmlFor="lastNamee"
                                className="form-label mb-2 font-18 font-heading fw-600"
                              >
                                Last Name
                              </label>
                              <input
                                type="text"
                                className="common-input border"
                                id="lastNamee"
                                name="lastname"
                                value={profileData.lastname}
                                onChange={handleInputChange}
                                placeholder="Last Name"
                              />
                            </div>
                            <div className="col-sm-6 col-xs-6">
                              <label
                                htmlFor="phonee"
                                className="form-label mb-2 font-18 font-heading fw-600"
                              >
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                className="common-input border"
                                id="phonee"
                                name="phoneNumber"
                                value={profileData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="Phone Number"
                              />
                            </div>
                            <div className="col-sm-6 col-xs-6">
                              <label
                                htmlFor="emailAdddd"
                                className="form-label mb-2 font-18 font-heading fw-600"
                              >
                                Email Address
                              </label>
                              <input
                                type="email"
                                className="common-input border"
                                id="emailAdddd"
                                name="emailAddress"
                                value={profileData.emailAddress}
                                readOnly
                                placeholder="Email Address"
                              />
                            </div>
                            <div className="col-sm-6 col-xs-6">
                              <label
                                htmlFor="cityyy"
                                className="form-label mb-2 font-18 font-heading fw-600"
                              >
                                City
                              </label>
                              <div className="select-has-icon">
                                <select
                                  className="common-input border"
                                  id="cityyy"
                                  name="city"
                                  value={profileData.city}
                                  onChange={handleInputChange}
                                >
                                  <option value="">Select City</option>
                                  <option value="Dhaka">Dhaka</option>
                                  <option value="Chandpur">Chandpur</option>
                                  <option value="Comilla">Comilla</option>
                                  <option value="Rangpur">Rangpur</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-sm-6 col-xs-6">
                              <label
                                htmlFor="Stateee"
                                className="form-label mb-2 font-18 font-heading fw-600"
                              >
                                State/Region
                              </label>
                              <div className="select-has-icon">
                                <select
                                  className="common-input border"
                                  id="Stateee"
                                  name="stateRegion"
                                  value={profileData.stateRegion}
                                  onChange={handleInputChange}
                                >
                                  <option value="">Select State/Region</option>
                                  <option value="USA">USA</option>
                                  <option value="Bangladesh">Bangladesh</option>
                                  <option value="India">India</option>
                                  <option value="Pakistan">Pakistan</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-sm-6 col-xs-6">
                              <label
                                htmlFor="Postcodeee"
                                className="form-label mb-2 font-18 font-heading fw-600"
                              >
                                Postcode
                              </label>
                              <input
                                type="text"
                                className="common-input border"
                                id="Postcodeee"
                                name="postcode"
                                value={profileData.postcode}
                                onChange={handleInputChange}
                                placeholder="Post Code"
                              />
                            </div>
                            <div className="col-sm-6 col-xs-6">
                              <label
                                htmlFor="Countryyy"
                                className="form-label mb-2 font-18 font-heading fw-600"
                              >
                                Country
                              </label>
                              <div className="select-has-icon">
                                <select
                                  className="common-input border"
                                  id="Countryyy"
                                  name="country"
                                  value={profileData.country}
                                  onChange={handleInputChange}
                                >
                                  <option value="">Select Country</option>
                                  <option value="USA">USA</option>
                                  <option value="Bangladesh">Bangladesh</option>
                                  <option value="India">India</option>
                                  <option value="Pakistan">Pakistan</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-sm-12 text-end">
                              <button type="submit" className="btn btn-main btn-lg pill mt-4" disabled={loading}>
                                {" "}
                                {loading ? 'Updating...' : 'Update Profile'}
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-payouts"
                        role="tabpanel"
                        aria-labelledby="pills-payouts-tab"
                        tabIndex={0}
                      >
                        <form action="#" autoComplete="off">
                          <div className="row gy-4">
                            <div className="col-sm-6 col-xs-6">
                              <label
                                htmlFor="name"
                                className="form-label mb-2 font-18 font-heading fw-600"
                              >
                                Full Name
                              </label>
                              <input
                                type="text"
                                className="common-input border"
                                id="name"
                                defaultValue="Michel"
                                placeholder="Full Name"
                              />
                            </div>
                            <div className="col-sm-6 col-xs-6">
                              <label
                                htmlFor="phone"
                                className="form-label mb-2 font-18 font-heading fw-600"
                              >
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                className="common-input border"
                                id="phone"
                                defaultValue="+880 15589 236 45"
                                placeholder="Phone Number"
                              />
                            </div>
                            <div className="col-sm-6 col-xs-6">
                              <label
                                htmlFor="emailAdd"
                                className="form-label mb-2 font-18 font-heading fw-600"
                              >
                                Email Address
                              </label>
                              <input
                                type="email"
                                className="common-input border"
                                id="emailAdd"
                                defaultValue="michel15@gmail.com"
                                placeholder="Email Address"
                              />
                            </div>
                            <div className="col-sm-6 col-xs-6">
                              <label
                                htmlFor="city"
                                className="form-label mb-2 font-18 font-heading fw-600"
                              >
                                City
                              </label>
                              <div className="select-has-icon">
                                <select className="common-input border" id="city" defaultValue={1}>
                                  <option value={1}>Dhaka</option>
                                  <option value={1}>Chandpur</option>
                                  <option value={1}>Comilla</option>
                                  <option value={1}>Rangpur</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-sm-12 text-end">
                              <button className="btn btn-main btn-lg pill mt-4">
                                {" "}
                                Pay Now
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-changePassword"
                        role="tabpanel"
                        aria-labelledby="pills-changePassword-tab"
                        tabIndex={0}
                      >
                        <form action="#" autoComplete="off">
                          <div className="row gy-4">
                            <div className="col-12">
                              <label
                                htmlFor="current-password"
                                className="form-label mb-2 font-18 font-heading fw-600"
                              >
                                Current Password
                              </label>
                              <div className="position-relative">
                                <input
                                  type="password"
                                  className="common-input common-input--withIcon common-input--withLeftIcon "
                                  id="current-password"
                                  placeholder="************"
                                />
                                <span className="input-icon input-icon--left">
                                  <img
                                    src="assets/images/icons/key-icon.svg"
                                    alt=""
                                  />
                                </span>
                                <span
                                  className="input-icon password-show-hide fas fa-eye la-eye-slash toggle-password-two"
                                  id="#current-password"
                                />
                              </div>
                            </div>
                            <div className="col-sm-6 col-xs-6">
                              <label
                                htmlFor="new-password"
                                className="form-label mb-2 font-18 font-heading fw-600"
                              >
                                New Password
                              </label>
                              <div className="position-relative">
                                <input
                                  type="password"
                                  className="common-input common-input--withIcon common-input--withLeftIcon "
                                  id="new-password"
                                  placeholder="************"
                                />
                                <span className="input-icon input-icon--left">
                                  <img
                                    src="assets/images/icons/lock-two.svg"
                                    alt=""
                                  />
                                </span>
                                <span
                                  className="input-icon password-show-hide fas fa-eye la-eye-slash toggle-password-two"
                                  id="#new-password"
                                />
                              </div>
                            </div>
                            <div className="col-sm-6 col-xs-6">
                              <label
                                htmlFor="confirm-password"
                                className="form-label mb-2 font-18 font-heading fw-600"
                              >
                                Current Password
                              </label>
                              <div className="position-relative">
                                <input
                                  type="password"
                                  className="common-input common-input--withIcon common-input--withLeftIcon "
                                  id="confirm-password"
                                  placeholder="************"
                                />
                                <span className="input-icon input-icon--left">
                                  <img
                                    src="assets/images/icons/lock-two.svg"
                                    alt=""
                                  />
                                </span>
                                <span
                                  className="input-icon password-show-hide fas fa-eye la-eye-slash toggle-password-two"
                                  id="#confirm-password"
                                />
                              </div>
                            </div>
                            <div className="col-sm-12 text-end">
                              <button className="btn btn-main btn-lg pill mt-4">
                                {" "}
                                Update Password
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Profile Content End */}
        </div>
      </>
      
    );
}

export default ProfileInner;