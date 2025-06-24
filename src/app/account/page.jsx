'use client';

import Preloader from "@/helper/Preloader";
import MasterLayout from "@/layout/MasterLayout";
import { useState, useEffect } from "react";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("settings");
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
  });
  const [orders, setOrders] = useState([]);
  const [redeemedCoupons, setRedeemedCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); // For success/error messages after save

  // Get the logged-in user's email from localStorage
  const [userEmail, setUserEmail] = useState(null);

  // Fetch user data on component mount (for Settings tab)
  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem('userEmail');
      if (!email) {
        setError("Please log in to view your account.");
        setLoading(false);
        return;
      }
      setUserEmail(email);

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/user?email=${email}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (e) {
        console.error("Failed to fetch user data:", e);
        if (e.message.includes("User not found")) {
          // If user not found, create a new user with default data
          setUserData({
            first_name: email.split('@')[0], // Use part before @ as first name
            last_name: "",
            email: email,
            address: ""
          });
          setMessage("Welcome! Please complete your profile information.");
        } else {
          setError(`Failed to load user data: ${e.message}. Make sure you are logged in.`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Fetch data for Orders History and Redeemed Coupons tabs when activeTab changes
  useEffect(() => {
    const fetchDataForTab = async () => {
      if (!userEmail) {
        setError("Please log in to view your orders and coupons.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setMessage(null);

      let apiUrl = "";
      let setDataFunction;

      if (activeTab === "orders") {
        apiUrl = `/api/orders?email=${userEmail}`;
        setDataFunction = setOrders;
      } else if (activeTab === "coupons") {
        apiUrl = `/api/redeemed-coupons?email=${userEmail}`;
        setDataFunction = setRedeemedCoupons;
      } else {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDataFunction(data);
        if (data.length === 0) {
          setMessage(`No ${activeTab} found for your account.`);
        }
      } catch (e) {
        console.error(`Failed to fetch ${activeTab} data:`, e);
        setError(`Failed to load ${activeTab} history: ${e.message}`);
        setDataFunction([]); // Reset data on error
      } finally {
        setLoading(false);
      }
    };

    // Only fetch for orders/coupons if not already loading user data or on initial render of settings
    if (activeTab !== "settings" && !loading) {
      fetchDataForTab();
    } else if (activeTab === "settings" && !userData.first_name && !loading) {
        // Re-fetch user data if settings tab is selected and data is missing (e.g. after an error)
        fetchUserData();
    }

  }, [activeTab, userEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    if (!userEmail) {
      setError("Cannot save: You must be logged in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, ...userData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      setMessage("Changes saved successfully!");
    } catch (e) {
      console.error("Failed to save changes:", e);
      setError(`Failed to save changes: ${e.message}`);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 5000); // Clear message after 5 seconds
    }
  };

  return (
    <>
      <MasterLayout>
        {/* Preloader */}
        {loading && <Preloader />}

        <div className="dashboard-body__content">
          <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
            <div className="welcome-balance__left">
              <h4 className="welcome-balance__title mb-0">My Account</h4>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="dashboard-body__item mb-32">
            <div className="tab-gradient">
              <button
                className={`btn btn-main ${activeTab === "settings" ? "active" : ""}`}
                onClick={() => setActiveTab("settings")}
                disabled={loading}
              >
                Settings
              </button>
              <button
                className={`btn btn-main ${activeTab === "orders" ? "active" : ""}`}
                onClick={() => setActiveTab("orders")}
                disabled={loading}
              >
                Orders History
              </button>
              <button
                className={`btn btn-main ${activeTab === "coupons" ? "active" : ""}`}
                onClick={() => setActiveTab("coupons")}
                disabled={loading}
              >
                Redeemed Coupons
              </button>
            </div>
          </div>

          {error && <div className="alert alert-danger mb-4">{error}</div>}
          {message && <div className="alert alert-success mb-4">{message}</div>}

          {/* Tab Content */}
          <div className="dashboard-body__item">
            {activeTab === "settings" && (
              <div className="common-card">
                <div className="card-body">
                  <form className="account-form" onSubmit={handleSaveChanges}>
                    <div className="row gy-4">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your first name"
                            name="first_name"
                            value={userData.first_name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your last name"
                            name="last_name"
                            value={userData.last_name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label className="form-label">Address</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Enter your address"
                            name="address"
                            value={userData.address || ""}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-main" disabled={loading}>
                          {loading ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="common-card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table style-two">
                      <thead>
                        <tr>
                          <th>Subscription Name</th>
                          <th>Purchase Date</th>
                          <th>Payment Method</th>
                          <th>Total Amount</th>
                          <th>User Name</th>
                          <th>User Email</th>
                          <th>Image</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.length > 0 ? (
                          orders.map((order, index) => (
                            <tr key={index}>
                              <td>{order.subscriptionName}</td>
                              <td>{new Date(order.purchaseDate).toLocaleDateString()}</td>
                              <td>{order.paymentMethod}</td>
                              <td>${order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}</td>
                              <td>{order.userName}</td>
                              <td>{order.userEmail}</td>
                              <td>
                                {order.subscriptionImage ? (
                                  <img src={order.subscriptionImage} alt={order.subscriptionName} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                ) : (
                                  'N/A'
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7">No orders found for this user.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "coupons" && (
              <div className="common-card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table style-two">
                      <thead>
                        <tr>
                          <th>Coupon Code</th>
                          <th>Discount</th>
                          <th>Redeem Date</th>
                          <th>Vendor</th>
                          <th>Vendor Contact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {redeemedCoupons.length > 0 ? (
                          redeemedCoupons.map((coupon, index) => (
                            <tr key={index}>
                              <td>{coupon.couponCode}</td>
                              <td>{(coupon.discount * 100).toFixed(0)}%</td>
                              <td>{new Date(coupon.redeemDate).toLocaleDateString()}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  {coupon.vendor?.logo && (
                                    <img 
                                      src={coupon.vendor.logo} 
                                      alt={coupon.vendor.title}
                                      className="rounded-circle me-2"
                                      style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                    />
                                  )}
                                  <div>
                                    <div className="fw-bold">{coupon.vendor?.title}</div>
                                    <small className="text-muted">{coupon.vendor?.description}</small>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div>
                                  <div><i className="las la-envelope me-2"></i>{coupon.vendor?.email}</div>
                                  <div><i className="las la-phone me-2"></i>{coupon.vendor?.phone}</div>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5">No redeemed coupons found for this user.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </MasterLayout>
    </>
  );
};

export default AccountPage;
