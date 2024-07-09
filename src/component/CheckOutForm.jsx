import { useState } from "react";

export const CheckOutForm = () => {
  const [form, setForm] = useState({});
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
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
        <h3>Card Element</h3>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
