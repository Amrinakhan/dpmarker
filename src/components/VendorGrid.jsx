'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const VendorGrid = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await fetch('/api/vendors');
                if (!response.ok) {
                    throw new Error('Failed to fetch vendors');
                }
                const data = await response.json();
                setVendors(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVendors();
    }, []);

    if (loading) return <div>Loading vendors...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="vendor-grid">
            <div className="container">
                <div className="row">
                    {vendors.map((vendor) => (
                        <div key={vendor.id} className="col-lg-4 col-md-6 mb-4">
                            <div className="vendor-card">
                                <div className="vendor-image">
                                    <Image
                                        src={vendor.image_url || '/default-vendor.jpg'}
                                        alt={vendor.name}
                                        width={300}
                                        height={200}
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="vendor-info p-3">
                                    <h3 className="vendor-name">{vendor.name}</h3>
                                    <p className="vendor-description">{vendor.description}</p>
                                    <div className="vendor-meta">
                                        <span className="vendor-rating">
                                            Rating: {vendor.rating || 'N/A'}
                                        </span>
                                        <span className="vendor-location">
                                            Location: {vendor.location || 'N/A'}
                                        </span>
                                    </div>
                                    <Link 
                                        href={`/vendor/${vendor.id}`}
                                        className="btn btn-primary mt-3"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VendorGrid; 