import { useState } from "react";

function OrderPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    qty: 1,
  });

  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  function validate(values) {
    const e = {};

    if (values.name.trim().length < 2) {
      e.name = "Name too short";
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
      e.email = "Enter a valid email";
    }

    if (Number(values.qty) < 1) {
      e.qty = "Quantity must be at least 1";
    }

    return e;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: name === "qty" ? Math.max(1, Number(value)) : value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const found = validate(form);

    setErrors(found);

    if (Object.keys(found).length === 0) {
      setDone(true);
    }
  }

  if (done) {
    return <h2>Thanks, {form.name}! Order received.</h2>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Place Order</h2>

      <div>
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />
        <br />
        {errors.name && <span>{errors.name}</span>}
      </div>

      <br />

      <div>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <br />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <br />

      <div>
        <input
          type="number"
          name="qty"
          min={1}
          value={form.qty}
          onChange={handleChange}
        />
        <br />
        {errors.qty && <span>{errors.qty}</span>}
      </div>

      <br />

      <button type="submit">Place Order</button>
    </form>
  );
}

export default OrderPage;