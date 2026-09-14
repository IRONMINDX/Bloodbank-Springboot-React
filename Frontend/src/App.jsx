import { useEffect, useState } from 'react';
import { getAllInventory } from './api/inventoryApi.js';
import BloodCard from './components/BloodCard.jsx';
import DonorForm from './components/DonorForm.jsx';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import './components/bloodbank.css';

function App() {
  const [page, setPage] = useState('dashboard');
  const [inventory, setInventory] = useState([]);
  const [loadingInventory, setLoadingInventory] = useState(true);
  const [inventoryError, setInventoryError] = useState('');

  useEffect(() => {
    let isMounted = true;

    getAllInventory()
      .then((data) => {
        if (isMounted) {
          setInventory(data || []);
          setLoadingInventory(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setInventoryError(err.message || 'Failed to load blood inventory records.');
          setLoadingInventory(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRequest = (bloodGroup) => {
    console.log('Request blood for:', bloodGroup);
  };

  const handleDonorSubmit = (savedDonor) => {
    console.log('Donor registered successfully:', savedDonor);
  };

  if (page === 'login') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bb-bg)', color: 'var(--bb-text)' }}>
        <Navbar
          links={[
            { label: 'Dashboard', href: '#dashboard' },
            { label: 'Login', href: '#login' },
            { label: 'Sign Up', href: '#signup' },
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
              bloodGroup={inventory[0]?.bloodGroup || 'O+'}
              availableUnits={inventory[0]?.availableUnits ?? 8}
              requiredUnits={inventory[0]?.requiredUnits ?? 15}
              hospitalName={inventory[0]?.hospitalName || 'Central Hospital'}
              city={inventory[0]?.city || 'Bhopal'}
              status={inventory[0]?.status || 'Urgent'}
              lastUpdated={inventory[0]?.lastUpdated}
              onRequest={() => handleRequest(inventory[0]?.bloodGroup || 'O+')}
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
              Live blood stock availability across connected hospital units.
            </p>
          </div>

          {loadingInventory && (
            <p style={{ color: 'var(--bb-muted)', fontStyle: 'italic' }}>Loading blood inventory...</p>
          )}

          {inventoryError && (
            <div className="bb-alert bb-alert--error" role="alert">
              {inventoryError}
            </div>
          )}

          {!loadingInventory && !inventoryError && inventory.length === 0 && (
            <p style={{ color: 'var(--bb-muted)' }}>No blood inventory records available right now.</p>
          )}

          {!loadingInventory && !inventoryError && inventory.length > 0 && (
            <div className="bb-stock-grid">
              {inventory.map((card) => (
                <BloodCard
                  key={card.id || `${card.bloodGroup}-${card.hospitalName}`}
                  {...card}
                  onRequest={() => handleRequest(card.bloodGroup)}
                />
              ))}
            </div>
          )}
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
