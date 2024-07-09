import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const apiEp = import.meta.env.VITE_APP_server;
const paymentEp = apiEp + "/create-stripe-payments";
const paymentSuccessEp = apiEp + "/confirm-order";
export const CheckOutForm = () => {
  const [form, setForm] = useState({});

  const stripe = useStripe();
  const elements = useElements();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // initiate the payment
    const payload = {
      amount: 25,
      currency: "usd",
      paymentMethod: "card",
    };
    // call payment initiation api
    const { data } = await axios.post(paymentEp, payload);
    //capture clientsecret
    console.log(data.clientSecret);

    const clientSecret = data.clientSecret;
    // create a payment intent
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: form.name,
          email: form.email,
        },
      },
    });
    // console.log(status);
    if (paymentIntent.status === "succeeded") {
      const confirmResponse = await axios.post(paymentSuccessEp, paymentIntent);
      console.log(confirmResponse);
      alert(confirmResponse.data.message);
      return;
    }
  };
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <div>
          Name:{" "}
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleOnChange}
          />
        </div>
        <div>
          Email:{" "}
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <CardElement />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
