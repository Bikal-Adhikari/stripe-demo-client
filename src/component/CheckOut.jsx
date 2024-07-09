import React from "react";
import { CheckOutForm } from "./CheckOutForm";

export const CheckOut = () => {
  return (
    <div>
      <div>Cart Total : $50</div>
      <hr />
      <div>
        <CheckOutForm />
      </div>
    </div>
  );
};
