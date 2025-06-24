'use client';

import React, { useEffect, useState, useRef } from 'react';

const ProductCouponModal = ({ coupon, onClose, vendorName, vendorLogo, onRedeemSuccess, userEmail }) => {
    const [otpPin, setOtpPin] = useState(["", "", "", ""]);
    const otpPinRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [isVerifying, setIsVerifying] = useState(false);

    // Handle PIN input and auto-tab
    const handleOtpPinChange = (idx, e) => {
        const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
        const newPin = [...otpPin];
        newPin[idx] = val;
        setOtpPin(newPin);
        if (val && idx < 3) {
            otpPinRefs[idx + 1].current.focus();
        }
        if (!val && idx > 0 && e.nativeEvent.inputType === "deleteContentBackward") {
            otpPinRefs[idx - 1].current.focus();
        }
    };

    // Modal animation
    const [show, setShow] = useState(false);
    useEffect(() => {
        setTimeout(() => setShow(true), 10);
        
        // Handle escape key to close modal
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    const handleSubmit = async () => {
        const enteredOtp = otpPin.join('');
        if (enteredOtp.length !== 4) {
            alert('Please enter a 4-digit OTP');
            return;
        }

        if (!userEmail) {
            alert('Please log in to redeem this coupon');
            return;
        }
        
        setIsVerifying(true);
        try {
            const response = await fetch('/api/coupons/verify-redeem', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    couponId: coupon.coupon_id,
                    otpCode: enteredOtp,
                    userEmail: userEmail
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // Show success message
                onClose(); // Close modal on success
                if (onRedeemSuccess) {
                    onRedeemSuccess(coupon.coupon_id); // Call success handler with coupon ID
                }
            } else {
                alert(data.message || 'Failed to verify OTP or redeem coupon'); // Show error message
            }
        } catch (error) {
            console.error('Error verifying OTP or redeeming coupon:', error);
            alert('An error occurred during verification.');
        } finally {
            setIsVerifying(false);
        }
    };
    
    // Format valid_until date from the database (assuming YYYY-MM-DD or similar)
    const validUntilDate = coupon?.valid_until ? new Date(coupon.valid_until) : null;
    const formattedValidUntil = validUntilDate && !isNaN(validUntilDate) // Check if date is valid
        ? validUntilDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase().replace(/ /g, ' ') // Format like DD MMM YYYY
        : 'N/A';

    // Placeholder for estimated savings - replace with actual calculation if needed
    // This might need logic based on the coupon discount and potential product price
    const estimatedSavings = `OMR ${coupon?.discount || 0}`; // Example based on discount

    if (!coupon) {
        return null; // Don't render if no coupon is selected
    }

    return (
        <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(30,40,60,0.22)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(6px)",
            transition: "background 0.3s"
        }} onClick={onClose}> {/* Close modal on backdrop click */}
            <div style={{
                background: "rgba(255,255,255,0.92)",
                borderRadius: 28,
                maxWidth: 390,
                width: "94%",
                padding: "0 0 28px 0",
                boxShadow: "0 8px 32px 0 rgba(30,60,90,0.16)",
                position: "relative",
                fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
                border: "1.5px solid #eaf6fd",
                overflow: "hidden",
                transform: show ? "translateY(0) scale(1)" : "translateY(40px) scale(0.98)",
                opacity: show ? 1 : 0,
                transition: "all 0.35s cubic-bezier(.4,1.4,.6,1)",
            }} onClick={e => e.stopPropagation()}> {/* Prevent closing when clicking inside modal */}
                {/* Header with icon */}
                <div style={{
                    background: "linear-gradient(90deg, #36c6f0 0%, #eaf6fd 100%)",
                    borderTopLeftRadius: 28,
                    borderTopRightRadius: 28,
                    padding: "28px 0 18px 0",
                    textAlign: "center",
                    position: "relative",
                    boxShadow: "0 2px 12px #eaf6fd"
                }}>
                    {/* Floating Close button */}
                    <button
                        onClick={onClose}
                        style={{
                            position: "absolute",
                            top: 18,
                            right: 18,
                            background: "rgba(255,255,255,0.7)",
                            border: "none",
                            fontSize: 24,
                            cursor: "pointer",
                            color: "#1da1f2",
                            borderRadius: "50%",
                            width: 36,
                            height: 36,
                            boxShadow: "0 2px 8px rgba(30,60,90,0.10)",
                            transition: "background 0.2s, color 0.2s"
                        }}
                        onMouseOver={e => e.currentTarget.style.background = '#eaf6fd'}
                        onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.7)'}
                        aria-label="Close"
                    >×</button>
                    {/* Tablet/Menu Icon - Using a simple representation, replace with actual if needed */}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 10
                    }}>
                         <div style={{
                            background: "#fff",
                            borderRadius: 16,
                            width: 54,
                            height: 54,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 8px #eaf6fd"
                        }}>
                            {vendorLogo ? (
                                <img src={vendorLogo} alt={`${vendorName} Logo`} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 16 }} />
                            ) : (
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                     <rect x="5" y="7" width="22" height="18" rx="4" fill="#eaf6fd" stroke="#1da1f2" strokeWidth="2" />
                                     <rect x="10" y="12" width="12" height="2.5" rx="1.25" fill="#1da1f2" />
                                     <rect x="10" y="17" width="8" height="2.5" rx="1.25" fill="#1da1f2" />
                                 </svg>
                            )}
                        </div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 24, color: "#1da1f2", letterSpacing: 0.5, marginBottom: 2 }}>
                        {coupon?.title || 'Coupon'} {/* Use dynamic title */}
                    </div>
                    <div style={{ color: "#6b7a90", fontSize: 15, fontWeight: 500 }}>
                        {/* Static description from screenshot, replace if dynamic data exists */}
                        of equal or lesser value
                    </div>
                </div>
                {/* Icons row */}
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 36,
                    margin: "22px 0 0 0"
                }}>
                    {/* Placeholder Offer Icons - Keep as is or replace with dynamic logic if needed */}
                    <div style={{ textAlign: "center" }}>
                        <div style={{
                            border: "2px solid #1da1f2",
                            borderRadius: 12,
                            width: 44,
                            height: 44,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 6px auto",
                            fontWeight: 700,
                            color: "#1da1f2",
                            fontSize: 18,
                            background: "#eaf6fd",
                            transition: "box-shadow 0.2s"
                        }}>
                            2<span style={{ fontSize: 13, fontWeight: 400 }}>&nbsp;for&nbsp;1</span>
                        </div>
                        <div style={{ fontSize: 13, color: "#6b7a90", fontWeight: 500, marginTop: 2 }}>Buy 1 Get 1 Free</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <div style={{
                            border: "2px solid #1da1f2",
                            borderRadius: 12,
                            width: 44,
                            height: 44,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 6px auto",
                            fontWeight: 700,
                            color: "#1da1f2",
                            fontSize: 22,
                            background: "#eaf6fd",
                            transition: "box-shadow 0.2s"
                        }}>
                            🍽️
                        </div>
                        <div style={{ fontSize: 13, color: "#6b7a90", fontWeight: 500, marginTop: 2 }}>Dine-in Only</div>
                    </div>
                </div>
                {/* Savings */}
                <div style={{ textAlign: "center", color: "#6b7a90", fontSize: 15, margin: "22px 0 4px 0", fontWeight: 500 }}>
                    Your Estimated Savings
                </div>
                <div style={{ textAlign: "center", color: "#1da1f2", fontWeight: 800, fontSize: 32, marginBottom: 12, letterSpacing: 1 }}>
                    {estimatedSavings} {/* Use dynamic estimated savings */}
                </div>
                {/* PIN input modern boxes */}
                <div style={{ textAlign: "center", marginBottom: 10, color: "#6b7a90", fontSize: 16, fontWeight: 500 }}>
                    Please ask {vendorName || '[Vendor Name]'} to enter their OTP
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 12,
                    marginBottom: 10
                }}>
                    {[0,1,2,3].map((_, i) => (
                        <input
                            key={i}
                            ref={otpPinRefs[i]}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={otpPin[i]}
                            onChange={e => handleOtpPinChange(i, e)}
                            style={{
                                width: 38,
                                height: 44,
                                borderRadius: 10,
                                background: otpPin[i] ? "#d0f1ff" : "#f4fafd",
                                border: otpPin[i] ? "2px solid #36c6f0" : "2px solid #eaf6fd",
                                textAlign: "center",
                                fontSize: 26,
                                color: "#1da1f2",
                                fontWeight: 700,
                                boxShadow: otpPin[i] ? "0 2px 8px #b6eaff" : "0 1px 4px #eaf6fd",
                                outline: "none",
                                transition: "all 0.18s"
                            }}
                            onFocus={e => e.target.select()}
                        />
                    ))}
                </div>
                {/* Valid Until Date */}
                {formattedValidUntil !== 'N/A' && (
                    <div style={{ textAlign: "center", color: "#6b7a90", fontSize: 13, fontWeight: 500, marginBottom: 10 }}>
                        Valid to {formattedValidUntil} {/* Use dynamic valid until date */}
                    </div>
                )}
                {/* Rules of Use Link */}
                <div style={{ textAlign: "center", color: "#6b7a90", fontSize: 13, fontWeight: 500 }}>
                    Offers are subject to <a href="#" style={{ color: "#1da1f2", textDecoration: "underline", fontWeight: 600, transition: "color 0.2s" }}
                        onMouseOver={e => e.currentTarget.style.color = '#36c6f0'}
                        onMouseOut={e => e.currentTarget.style.color = '#1da1f2'}
                    >Rules of Use</a>
                </div>
                <button
                    style={{
                        margin: "12px auto 0 auto",
                        display: "block",
                        background: "#1da1f2",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 32px",
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: "pointer",
                        disabled: coupon?.redeemed === 1 || isVerifying
                    }}
                    onClick={coupon?.redeemed === 1 || isVerifying ? null : handleSubmit}
                    disabled={coupon?.redeemed === 1 || isVerifying}
                >
                    {coupon?.redeemed === 1 ? 'Redeemed' : (isVerifying ? 'Verifying...' : 'Verify & Redeem')}
                </button>
            </div>
        </div>
    );
}

export default ProductCouponModal; 