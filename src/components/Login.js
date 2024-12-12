import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isStrongPassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Object.values(errors).some(Boolean)) {
      window.location.href = "/success";
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: fieldValue }));

    let error = "";
    if (name === "email" && !isValidEmail(fieldValue)) {
      error = "Geçerli bir email adresi giriniz.";
    }
    if (name === "password" && !isStrongPassword(fieldValue)) {
      error =
        "Şifre en az 8 karakter, bir büyük harf ve bir rakam içermelidir.";
    }
    if (name === "termsAccepted" && !fieldValue) {
      error = "Şartları kabul etmelisiniz.";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Şifre:</label>
        <input type="password" name="password" onChange={handleChange} />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <div>
        <label>
          <input type="checkbox" name="termsAccepted" onChange={handleChange} />
          Şartları kabul ediyorum
        </label>
        {errors.termsAccepted && <span>{errors.termsAccepted}</span>}
      </div>
      <button type="submit" disabled={Object.values(errors).some(Boolean)}>
        Giriş Yap
      </button>
    </form>
  );
};

export default Login;
