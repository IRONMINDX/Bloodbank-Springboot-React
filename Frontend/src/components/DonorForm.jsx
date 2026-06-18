import { useState } from 'react';
import './bloodbank.css';

const initialState = {
  fullName: '',
  bloodGroup: '',
  age: '',
  gender: '',
  phone: '',
  email: '',
  city: '',
  lastDonation: '',
  availability: 'available',
  message: '',
};

function DonorForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      ...form,
      age: form.age ? Number(form.age) : '',
    };

    if (onSubmit) {
      onSubmit(payload);
    } else {
      console.log('Donor form submitted:', payload);
    }

    setForm(initialState);
  };

  return (
    <section className="bb-form" aria-labelledby="donor-form-title">
      <div className="bb-form__header">
        <span className="bb-form__eyebrow">Become a donor</span>
        <h2 className="bb-form__title" id="donor-form-title">
          Register as a blood donor
        </h2>
        <p className="bb-form__subtitle">
          Share your details so hospitals and patients can reach you quickly when blood is needed.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bb-form__grid">
          <label className="bb-field">
            <span className="bb-field__label">Full Name</span>
            <input
              className="bb-field__input"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </label>

          <label className="bb-field">
            <span className="bb-field__label">Blood Group</span>
            <select
              className="bb-field__select"
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              required
            >
              <option value="">Select group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </label>

          <label className="bb-field">
            <span className="bb-field__label">Age</span>
            <input
              className="bb-field__input"
              name="age"
              type="number"
              min="18"
              max="70"
              value={form.age}
              onChange={handleChange}
              placeholder="18+"
              required
            />
          </label>

          <label className="bb-field">
            <span className="bb-field__label">Gender</span>
            <select
              className="bb-field__select"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </label>

          <label className="bb-field">
            <span className="bb-field__label">Phone Number</span>
            <input
              className="bb-field__input"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              required
            />
          </label>

          <label className="bb-field">
            <span className="bb-field__label">Email Address</span>
            <input
              className="bb-field__input"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="bb-field">
            <span className="bb-field__label">City</span>
            <input
              className="bb-field__input"
              name="city"
              type="text"
              value={form.city}
              onChange={handleChange}
              placeholder="Your city"
              required
            />
          </label>

          <label className="bb-field">
            <span className="bb-field__label">Last Donation Date</span>
            <input
              className="bb-field__input"
              name="lastDonation"
              type="date"
              value={form.lastDonation}
              onChange={handleChange}
            />
          </label>

          <label className="bb-field bb-field--full">
            <span className="bb-field__label">Availability</span>
            <select
              className="bb-field__select"
              name="availability"
              value={form.availability}
              onChange={handleChange}
            >
              <option value="available">Available for donation</option>
              <option value="not-available">Not available right now</option>
            </select>
          </label>

          <label className="bb-field bb-field--full">
            <span className="bb-field__label">Message</span>
            <textarea
              className="bb-field__textarea"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Any health notes or preferred contact time"
            />
          </label>
        </div>

        <div className="bb-form__actions">
          <p className="bb-form__hint">We only use your details for donation and emergency coordination.</p>
          <button className="bb-button bb-button--primary" type="submit">
            Submit Donor Details
          </button>
        </div>
      </form>
    </section>
  );
}

export default DonorForm;
