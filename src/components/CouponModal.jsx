'use client';

import React, { useState } from 'react';

const CouponModal = ({ coupon, onClose }) => {
    const [pin, setPin] = useState(['', '', '', '']);

    const handlePinChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newPin = [...pin];
            newPin[index] = value;
            setPin(newPin);

            // Auto-focus next input
            if (value && index < 3) {
                const nextInput = document.getElementById(`pin-${index + 1}`);
                if (nextInput) nextInput.focus();
            }
        }
    };

    const handleSubmit = async () => {
        const enteredPin = pin.join('');
        if (enteredPin.length !== 4) {
            alert('Please enter a 4-digit PIN');
            return;
        }

        try {
            const response = await fetch('/api/redeem-coupon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    couponId: coupon.id,
                    pin: enteredPin,
                }),
            });

            const data = await response.json();
            if (data.success) {
                alert('Coupon redeemed successfully!');
                onClose();
            } else {
                alert(data.message || 'Failed to redeem coupon');
            }
        } catch (error) {
            alert('Error redeeming coupon');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{coupon.title}</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="coupon-details">
                        <p className="discount">Discount: {coupon.discount}%</p>
                        <p className="valid-until">Valid until: {new Date(coupon.valid_until).toLocaleDateString()}</p>
                    </div>
                    <div className="pin-input-container">
                        <p>Enter 4-digit PIN:</p>
                        <div className="pin-inputs">
                            {[0, 1, 2, 3].map((index) => (
                                <input
                                    key={index}
                                    id={`pin-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={pin[index]}
                                    onChange={(e) => handlePinChange(index, e.target.value)}
                                    className="pin-input"
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="submit-button" onClick={handleSubmit}>
                        Redeem Coupon
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CouponModal; 