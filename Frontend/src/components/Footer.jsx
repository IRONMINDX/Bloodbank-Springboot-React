import './bloodbank.css';

function Footer() {
  return (
    <footer className="bb-footer" id="contact">
      <div className="bb-shell">
        <div className="bb-footer__grid">
          <div>
            <div className="bb-brand" style={{ marginBottom: '0.85rem' }}>
              <span className="bb-brand__mark">B</span>
              <span className="bb-brand__meta">
                <span className="bb-brand__name">BloodBank</span>
                <span className="bb-brand__tag">Save lives faster</span>
              </span>
            </div>
            <p className="bb-footer__text">
              A responsive blood bank interface for donor registration, stock tracking, and urgent blood requests.
            </p>
          </div>

          <div>
            <h3 className="bb-footer__title">Quick Links</h3>
            <div className="bb-footer__links">
              <a className="bb-footer__link" href="#home">
                Home
              </a>
              <a className="bb-footer__link" href="#blood-stock">
                Blood Stock
              </a>
              <a className="bb-footer__link" href="#donor-form">
                Donate Blood
              </a>
            </div>
          </div>

          <div>
            <h3 className="bb-footer__title">Contact</h3>
            <div className="bb-footer__links">
              <span className="bb-footer__text">Emergency: +91 99999 00000</span>
              <span className="bb-footer__text">Email: support@bloodbank.org</span>
              <span className="bb-footer__text">24/7 help for hospitals and donors</span>
            </div>
          </div>
        </div>

        <div className="bb-footer__bottom">
          <span className="bb-footer__copy">(c) {new Date().getFullYear()} BloodBank. All rights reserved.</span>
          <span className="bb-footer__copy">Built with React, Spring Boot, and MySQL.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
