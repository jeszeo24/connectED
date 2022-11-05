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

    setFormData((data) => ({
      ...data,
      [name]: value
    }));
  }

  function handleChangeCheck(event) {
    let checkbox = event.target.checked;
    console.log(checkbox);

    setFormData((data) => ({
      ...data,
      [event.target.name]: checkbox
    }));
  }

  function handleSubmit(event) {
    console.log("isStaff", formData.isStaff);
    event.preventDefault();

    let isStaff;

    if (formData.isStaff === true) {
      isStaff = 1; 
    } else {
      isStaff = 0;
    }

    props.registerCb(
      formData.email,
      formData.username,
      formData.password,
      isStaff
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
            onChange={handleChangeCheck}
          />
        </label>
        <br />
        
        <button className="btn btn-primary">REGISTER</button>
      </form>
    </div>
  );
}

export default RegisterView;