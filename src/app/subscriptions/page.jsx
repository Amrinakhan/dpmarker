import HeaderOne from "@/components/HeaderOne";
import FooterOne from "@/components/FooterOne";
import Preloader from "@/helper/Preloader";
import { query } from "@/lib/db";
import Link from "next/link";

export const metadata = {
  title: "Subscriptions Page - Digital Market Place NEXT Js Template",
  description:
    "Browse our subscription plans on Digital Products Marketplace NEXT JS Template.",
};

const SubscriptionsPage = async () => {
  const fetchSubscriptions = async () => {
    console.log("Fetching subscription data...");

    try {
      // Fetch subscriptions from the database
      const subscriptions = await query('SELECT id, subsc_title, subsc_price FROM subscriptions');
      return subscriptions;
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      return []; // Return empty array if there's an error
    }
  };

  const subscriptions = await fetchSubscriptions();

  return (
    <>
      <Preloader />

      <HeaderOne />

      <section className="subscriptions-section padding-y-120">
        <div className="container">
          <h2 className="text-center mb-5">Subscription Plans</h2>
          <div className="row justify-content-center">
            {subscriptions.length > 0 ? (
              subscriptions.map((subscription) => (
                <div key={subscription.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 text-center">
                    <div className="card-body">
                      <h5 className="card-title">{subscription.subsc_title}</h5>
                      <p className="card-text">${parseFloat(subscription.subsc_price).toFixed(2)}</p>
                      <Link 
                        href={`/cart-personal?plan=${encodeURIComponent(subscription.subsc_title)}&price=${subscription.subsc_price}`}
                        className="btn btn-main mt-3"
                      >
                        Buy
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No subscription plans available at the moment.</p>
            )}
          </div>
        </div>
      </section>

      <FooterOne />
    </>
  );
};

export default SubscriptionsPage; 