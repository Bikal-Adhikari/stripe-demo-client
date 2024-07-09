import { CheckOutForm } from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripeKey = import.meta.env.VITE_APP_stripe_Promise;

const stripePublicKey = loadStripe(`${stripeKey}`);

export const CheckOut = () => {
  return (
    <div>
      <div>Cart Total : $50</div>
      <hr />
      <div>
        <Elements stripe={stripePublicKey}>
          <CheckOutForm />
        </Elements>
      </div>
    </div>
  );
};
