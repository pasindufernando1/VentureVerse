import React, { useState } from 'react';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    validateField(name, value); // Validate the field as the user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Perform additional actions (e.g., submit the form data)
    }
  };

  const validateForm = () => {
    const { name, email, password } = formData;
    const errors = {};

    // Validation rules
    if (!name) {
      errors.name = 'Name is required.';
    }

    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email format.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const validateField = (fieldName, value) => {
    const errors = { ...formErrors };

    // Validation rules for specific fields
    if (fieldName === 'email') {
      if (!value) {
        errors.email = 'Email is required.';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errors.email = 'Invalid email format.';
      } else {
        errors.email = ''; // Clear the error if the value is valid
      }
    }

    setFormErrors(errors);
  };

  const getEmailLabel = () => {
    if (formErrors.email) {
      return 'Email (Invalid)'
    }
    return 'Email';
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">{getEmailLabel()}</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {/* {formErrors.email && <span className="error">{formErrors.email}</span>} */}

        <label htmlFor="password">Password</label>
        <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
        />
        {/* {formErrors.password && <span className="error">{formErrors.password}</span>} */}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
