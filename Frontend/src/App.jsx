import { useState } from 'react';
import BloodCard from './components/BloodCard.jsx';
import DonorForm from './components/DonorForm.jsx';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import './components/bloodbank.css';

function App() {
  const [page, setPage] = useState('dashboard');

  const stockCards = [
    {
      bloodGroup: 'A+',
      availableUnits: 12,
      requiredUnits: 18,
      hospitalName: 'City Care Hospital',
      city: 'Bhopal',
      status: 'Urgent',
    },
    {
      bloodGroup: 'O-',
      availableUnits: 4,
      requiredUnits: 10,
      hospitalName: 'LifeLine Medical Center',
      city: 'Indore',
      status: 'Critical',
    },
    {
      bloodGroup: 'B+',
      availableUnits: 20,
      requiredUnits: 14,
      hospitalName: 'Red Cross Unit',
      city: 'Jabalpur',
      status: 'Stable',
    },
  ];

  const handleRequest = (bloodGroup) => {
    console.log('Request blood for:', bloodGroup);
  };

  const handleDonorSubmit = (payload) => {
    console.log('Donor payload:', payload);
  };

  if (page === 'login') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bb-bg)', color: 'var(--bb-text)' }}>
        <Navbar
          links={[
            { label: 'Dashboard', href: 'pages/login.jsx' },
            { label: 'Login', href: 'pages/login.jsx'},
            { label: 'Sign Up', href: 'pages/signup.jsx' },
          ]}
          actionLabel="Sign Up"
          onAction={() => setPage('signup')}
        />

        <main className="bb-shell" style={{ padding: '2rem 0 3rem' }}>
          <section className="bb-hero">
            <div>
              <span className="bb-form__eyebrow">Login page</span>
              <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4.4rem)', margin: '0.9rem 0 1rem', lineHeight: 1.02 }}>
                Welcome back.
              </h1>
              <p style={{ color: 'var(--bb-muted)', fontSize: '1.05rem', maxWidth: '62ch', lineHeight: 1.7 }}>
                Sign in to access the blood bank dashboard, donor records, and blood stock management.
              </p>
              <button className="bb-button bb-button--ghost" type="button" onClick={() => setPage('dashboard')}>
                Go to Dashboard
              </button>
            </div>

            <Login onSubmit={() => setPage('dashboard')} onSwitchToSignup={() => setPage('signup')} />
          </section>
        </main>
      </div>
    );
  }

  if (page === 'signup') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bb-bg)', color: 'var(--bb-text)' }}>
        <Navbar
          links={[
            { label: 'Dashboard', href: '#dashboard' },
            { label: 'Login', href: '#login' },
            { label: 'Sign Up', href: '#signup' },
          ]}
          actionLabel="Login"
          onAction={() => setPage('login')}
        />

        <main className="bb-shell" style={{ padding: '2rem 0 3rem' }}>
          <section className="bb-hero">
            <div>
              <span className="bb-form__eyebrow">Signup page</span>
              <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4.4rem)', margin: '0.9rem 0 1rem', lineHeight: 1.02 }}>
                Create your account.
              </h1>
              <p style={{ color: 'var(--bb-muted)', fontSize: '1.05rem', maxWidth: '62ch', lineHeight: 1.7 }}>
                Register to manage blood requests, donor details, and inventory access.
              </p>
              <button className="bb-button bb-button--ghost" type="button" onClick={() => setPage('dashboard')}>
                Go to Dashboard
              </button>
            </div>

            <Signup onSubmit={() => setPage('dashboard')} onSwitchToLogin={() => setPage('login')} />
          </section>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bb-bg)', color: 'var(--bb-text)' }}>
      <Navbar
        links={[
          { label: 'Home', href: '#home' },
          { label: 'Blood Stock', href: '#blood-stock' },
          { label: 'Donate', href: '#donor-form' },
          { label: 'Login', href: '#login' },
          { label: 'Sign Up', href: '#signup' },
        ]}
        onAction={() => document.getElementById('donor-form')?.scrollIntoView({ behavior: 'smooth' })}
        actionLabel="Emergency Request"
      />

      <main id="home" className="bb-shell" style={{ padding: '2rem 0 3rem' }}>
        <section className="bb-hero">
          <div>
            <span className="bb-form__eyebrow">Emergency blood support</span>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4.4rem)', margin: '0.9rem 0 1rem', lineHeight: 1.02 }}>
              A faster way to connect donors, hospitals, and urgent requests.
            </h1>
            <p style={{ color: 'var(--bb-muted)', fontSize: '1.05rem', maxWidth: '62ch', lineHeight: 1.7 }}>
              Track blood stock, register donors, and respond to emergency requests with a clean responsive interface
              built for a React, Spring Boot, and MySQL blood bank system.
            </p>
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginTop: '1.4rem' }}>
              <a className="bb-button bb-button--primary" href="#blood-stock" style={{ textDecoration: 'none' }}>
                View Blood Stock
              </a>
              <a className="bb-button bb-button--ghost" href="#donor-form" style={{ textDecoration: 'none' }}>
                Register Donor
              </a>
              <button className="bb-button bb-button--ghost" type="button" onClick={() => setPage('login')}>
                Login
              </button>
              <button className="bb-button bb-button--ghost" type="button" onClick={() => setPage('signup')}>
                Sign Up
              </button>
            </div>
          </div>

          <div>
            <BloodCard
              bloodGroup="O+"
              availableUnits={8}
              requiredUnits={15}
              hospitalName="Central Hospital"
              city="Bhopal"
              status="Urgent"
              onRequest={() => handleRequest('O+')}
            />
          </div>
        </section>

        <section id="blood-stock" style={{ marginTop: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span className="bb-form__eyebrow">Current inventory</span>
            <h2 style={{ margin: '0.7rem 0 0.3rem', fontSize: 'clamp(1.5rem, 3vw, 2.3rem)' }}>
              Blood stock overview
            </h2>
            <p style={{ color: 'var(--bb-muted)', margin: 0 }}>
              Sample stock cards you can connect to Spring Boot and MySQL later.
            </p>
          </div>

          <div className="bb-stock-grid">
            {stockCards.map((card) => (
              <BloodCard
                key={`${card.bloodGroup}-${card.hospitalName}`}
                {...card}
                onRequest={() => handleRequest(card.bloodGroup)}
              />
            ))}
          </div>
        </section>

        <section id="donor-form" style={{ marginTop: '2rem' }}>
          <DonorForm onSubmit={handleDonorSubmit} />
        </section>

        <section id="login" style={{ marginTop: '2rem' }}>
          <button className="bb-button bb-button--ghost" type="button" onClick={() => setPage('login')}>
            Open Login Page
          </button>
        </section>

        <section id="signup" style={{ marginTop: '1rem' }}>
          <button className="bb-button bb-button--ghost" type="button" onClick={() => setPage('signup')}>
            Open Signup Page
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
