import React from 'react';
import HeaderOne from "@/components/HeaderOne";
import FooterOne from "@/components/FooterOne";
import Preloader from "@/helper/Preloader";
import { notFound } from 'next/navigation';
import { vendors } from '@/data/vendors'; // Assuming vendor data is needed to find products

// Function to find a product by ID across all vendors
function findProductById(productId) {
  for (const vendor of vendors) {
    const product = vendor.products.find(p => p.id === productId);
    if (product) {
      // Return the product and its vendor's logo and name
      return { product, vendorLogo: vendor.logo, vendorName: vendor.name };
    }
  }
  return null; // Product not found
}

// Although using generateStaticParams is good for static generation,
// if you have many products or frequent updates, fetching dynamically might be better.
// For this example, we'll fetch data directly in the component.

export async function generateMetadata({ params }) {
  const productData = findProductById(params.id);

  if (!productData) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${productData.product.name} - Product Details`,
    description: productData.product.description,
  };
}

export default function ProductDetailsPage({ params }) {
  const productData = findProductById(params.id);

  if (!productData) {
    notFound(); // Show 404 page if product is not found
  }

  const { product, vendorLogo, vendorName } = productData;

  return (
    <>
      <Preloader />
      <HeaderOne />

      {/* Product Details Section */}
      <div className="product-details-page padding-y-120">
        <div className="container container-two">
          <div className="row">
            {/* Product Image and Info */}
            <div className="col-lg-8">
              <div className="product-details-card common-card">
                <div className="card-body">
                  {/* Product Cover Image */}
                  <div className="product-cover-image mb-4">
                    <img 
                      src={product.image} // Assuming 'image' is the cover image path
                      alt={product.name}
                      className="img-fluid rounded"
                      style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div className="d-flex align-items-start mb-4">
                    {/* Vendor Logo */}
                    <img 
                      src={vendorLogo}
                      alt={`${vendorName} Logo`}
                      className="vendor-logo rounded-circle me-3"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <div>
                      {/* Product Title */}
                      <h1 className="product-title mb-2">{product.name}</h1>
                      {/* Product Description */}
                      <p className="product-description text-muted">{product.description}</p>
                    </div>
                  </div>

                  {/* Product Stats */}
                  <div className="product-stats d-flex align-items-center gap-4 mb-4">
                    <span className="price h4 text-main">${product.price}</span>
                    {/* Assuming rating and sales are part of product data if needed here, or vendor data */}
                    {/* Example placeholders: */}
                    {/* <span className="rating"><i className="las la-star text-warning"></i> {product.rating || 'N/A'}</span> */}
                    {/* <span className="sales"><i className="las la-shopping-cart text-muted"></i> {product.sales || 'N/A'} Sales</span> */}
                  </div>

                  {/* Add more product details as needed */}
                  {/* ... */}
                </div>
              </div>
            </div>

            {/* Sidebar with Vendor Info */}
            <div className="col-lg-4">
              <div className="vendor-info-sidebar common-card">
                <div className="card-body">
                  <h4 className="card-title mb-4">About {vendorName}</h4>
                  {/* Display vendor-specific info here */}
                  <p>Vendor: {vendorName}</p>
                  {/* Add sections for licenses, terms, features, etc. */}
                  {/* You'll need to add this data to your vendors.js structure */}
                  <h5>Licenses:</h5>
                  <p>Standard License</p>
                  <h5>Terms:</h5>
                  <p>Usage terms apply.</p>
                  <h5>Features:</h5>
                  <ul>
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                  </ul>
                  {/* Add contact button or other vendor actions */}
                </div>
              </div>
              {/* You can add the SimpleCouponCard component here if it's product/vendor specific */}
               {/* <SimpleCouponCard couponCode="PRODUCTCOUPON" />  */}
            </div>
          </div>
        </div>
      </div>

      {/* BrandSectionOne */}
      {/* <BrandSectionOne /> Uncomment if needed on this page */}

      <FooterOne />
    </>
  );
} 