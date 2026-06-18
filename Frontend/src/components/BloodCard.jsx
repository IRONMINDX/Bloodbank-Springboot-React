import './bloodbank.css';

const defaultChips = ['Emergency ready', 'Verified donor', 'Hospital support'];

function BloodCard({
  bloodGroup = 'A+',
  availableUnits = 12,
  requiredUnits = 18,
  hospitalName = 'City Care Hospital',
  city = 'Bhopal',
  lastUpdated = 'Updated just now',
  status = 'Urgent',
  chips = defaultChips,
  onRequest,
}) {
  const shortage = Math.max(requiredUnits - availableUnits, 0);
  const statusColor =
    status === 'Critical' ? '#b91c1c' : status === 'Urgent' ? '#c2410c' : '#15803d';

  return (
    <article className="bb-card">
      <div className="bb-card__top">
        <div>
          <span className="bb-card__badge" style={{ color: statusColor }}>
            <span className="bb-card__badge-dot" style={{ background: statusColor }} />
            {status}
          </span>
          <h3 className="bb-card__title">Blood Group {bloodGroup}</h3>
          <p className="bb-card__subtitle">
            {hospitalName} - {city}
          </p>
        </div>
      </div>

      <div className="bb-card__stats">
        <div className="bb-stat">
          <span className="bb-stat__label">Available Units</span>
          <span className="bb-stat__value">{availableUnits}</span>
        </div>
        <div className="bb-stat">
          <span className="bb-stat__label">Required Units</span>
          <span className="bb-stat__value">{requiredUnits}</span>
        </div>
        <div className="bb-stat">
          <span className="bb-stat__label">Shortage</span>
          <span className="bb-stat__value">{shortage}</span>
        </div>
        <div className="bb-stat">
          <span className="bb-stat__label">Updated</span>
          <span className="bb-stat__value">{lastUpdated}</span>
        </div>
      </div>

      <div className="bb-card__list" aria-label="Blood card highlights">
        {chips.map((chip) => (
          <span className="bb-chip" key={chip}>
            {chip}
          </span>
        ))}
      </div>

      <div className="bb-card__footer">
        <div className="bb-card__text">Need help filling this unit request?</div>
        <button className="bb-button bb-button--primary" type="button" onClick={onRequest}>
          Request Blood
        </button>
      </div>
    </article>
  );
}

export default BloodCard;
