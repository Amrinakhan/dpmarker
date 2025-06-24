CREATE TABLE IF NOT EXISTS coupons (
    coupon_id INT AUTO_INCREMENT PRIMARY KEY,
    vendor_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    discount INT NOT NULL, -- Assuming discount is a percentage value
    status VARCHAR(50) DEFAULT 'active',
    valid_until DATE, -- Optional: Date when the coupon expires
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    redeemedBy VARCHAR(255) DEFAULT NULL, -- Email of the user who redeemed the coupon
    FOREIGN KEY (vendor_id) REFERENCES vendor(vendor_id) ON DELETE CASCADE
); 