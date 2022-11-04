import React, { useState } from "react";

function RegisterView(props) {
  const emptyForm = {
    email: "",
    username: "",
    password: "",
    isStaff: 0
  };

  const [formData, setFormData] = useState(emptyForm); // useState 1

  function handleChange(event) {
    let { name, value } = event.target;

    console.log(formData.checked);

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.registerCb(
      formData.email,
      formData.username,
      formData.password,
      formData.isStaff
    );
  }

  return (
    <div>
      <h1>Register</h1>
      <form
        className="form-control form-row align-items-center"
        onSubmit={handleSubmit}
      >
        <label>
          Email:
          <input
            name="email"
            className="form-control"
            value={formData.email}
            type="text"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Username:
          <input
            name="username"
            className="form-control"
            value={formData.username}
            type="text"
            required
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            name="password"
            className="form-control"
            value={formData.password}
            type="password"
            required
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Click checkbox if school staff
          <input
            name="isStaff"
            // className="form-control"
            value={formData.isStaff}
            type="checkbox"
            onChange={handleChange}
          />
        </label>
        <br />
        
        <button className="btn btn-primary">REGISTER</button>
      </form>
    </div>
  );
}

export default RegisterView;