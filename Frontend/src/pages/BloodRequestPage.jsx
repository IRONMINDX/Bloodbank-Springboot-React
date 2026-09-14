import { useEffect, useState } from 'react';
import {
  getAllRequests,
  createRequest,
  updateRequest,
  deleteRequest,
} from '../api/requestApi.js';
import '../components/bloodbank.css';

const getTodayDateString = () => new Date().toISOString().split('T')[0];

const initialFormState = {
  requesterName: '',
  bloodGroup: '',
  unitsRequired: 1,
  hospitalName: '',
  city: '',
  urgency: 'Urgent',
  status: 'Pending',
  requestedDate: getTodayDateString(),
};

function BloodRequestPage({ initialBloodGroup = '', onNavigateDashboard }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    ...initialFormState,
    bloodGroup: initialBloodGroup || '',
  });

  useEffect(() => {
    let isMounted = true;

    getAllRequests()
      .then((data) => {
        if (isMounted) {
          setRequests(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load blood requests.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess('');
    setError('');

    const payload = {
      requesterName: form.requesterName.trim(),
      bloodGroup: form.bloodGroup,
      unitsRequired: Number(form.unitsRequired),
      hospitalName: form.hospitalName.trim(),
      city: form.city.trim(),
      urgency: form.urgency,
      status: form.status,
      requestedDate: form.requestedDate || getTodayDateString(),
    };

    try {
      if (editingId) {
        const updated = await updateRequest(editingId, payload);
        setRequests((current) =>
          current.map((item) => (item.id === editingId ? updated : item))
        );
        setSuccess('Blood request updated successfully!');
      } else {
        const created = await createRequest(payload);
        setRequests((current) => [created, ...current]);
        setSuccess('Blood request submitted successfully!');
      }

      setForm({
        ...initialFormState,
        bloodGroup: '',
      });
      setEditingId(null);
    } catch (err) {
      setError(err.message || 'Failed to process blood request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (request) => {
    setEditingId(request.id);
    setForm({
      requesterName: request.requesterName || '',
      bloodGroup: request.bloodGroup || '',
      unitsRequired: request.unitsRequired || 1,
      hospitalName: request.hospitalName || '',
      city: request.city || '',
      urgency: request.urgency || 'Urgent',
      status: request.status || 'Pending',
      requestedDate: request.requestedDate || getTodayDateString(),
    });
    setSuccess('');
    setError('');
    document.getElementById('request-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({
      ...initialFormState,
      bloodGroup: '',
    });
    setSuccess('');
    setError('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blood request?')) {
      return;
    }

    try {
      setError('');
      await deleteRequest(id);
      setRequests((current) => current.filter((item) => item.id !== id));
      setSuccess('Blood request deleted successfully.');
      if (editingId === id) {
        handleCancelEdit();
      }
    } catch (err) {
      setError(err.message || 'Failed to delete blood request.');
    }
  };

  const getUrgencyColor = (urgency) => {
    if (urgency === 'Critical') return '#b91c1c';
    if (urgency === 'Urgent') return '#c2410c';
    return '#15803d';
  };

  const getStatusBadgeStyle = (status) => {
    if (status === 'Fulfilled') return { bg: '#e8f5e9', color: '#1b5e20' };
    if (status === 'Approved') return { bg: '#e0f2fe', color: '#0369a1' };
    if (status === 'Cancelled') return { bg: '#fee2e2', color: '#991b1b' };
    return { bg: '#fef3c7', color: '#92400e' }; // Pending
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="bb-form__eyebrow">Emergency & Patient Requests</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '0.5rem 0', lineHeight: 1.1 }}>
            Blood Requests
          </h1>
          <p style={{ color: 'var(--bb-muted)', margin: 0, maxWidth: '60ch' }}>
            Submit emergency blood requirements or manage existing hospital requests.
          </p>
        </div>
        {onNavigateDashboard && (
          <button
            className="bb-button bb-button--ghost"
            type="button"
            onClick={onNavigateDashboard}
          >
            ← Back to Dashboard
          </button>
        )}
      </div>

      {success && (
        <div className="bb-alert bb-alert--success" role="status">
          {success}
        </div>
      )}

      {error && (
        <div className="bb-alert bb-alert--error" role="alert">
          {error}
        </div>
      )}

      {/* Form Section */}
      <section id="request-form" className="bb-form" style={{ marginBottom: '2.5rem' }}>
        <div className="bb-form__header">
          <span className="bb-form__eyebrow">
            {editingId ? 'Edit Mode' : 'New Request'}
          </span>
          <h2 className="bb-form__title">
            {editingId ? 'Update Blood Request' : 'Create a Blood Request'}
          </h2>
          <p className="bb-form__subtitle">
            {editingId
              ? 'Update the request details and status below.'
              : 'Fill in patient and hospital details to submit an urgent blood requirement.'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bb-form__grid">
            <label className="bb-field">
              <span className="bb-field__label">Requester / Patient Name</span>
              <input
                className="bb-field__input"
                name="requesterName"
                type="text"
                value={form.requesterName}
                onChange={handleChange}
                placeholder="e.g. Dr. Rajesh / Patient Name"
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
                <option value="">Select blood group</option>
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
              <span className="bb-field__label">Units Required</span>
              <input
                className="bb-field__input"
                name="unitsRequired"
                type="number"
                min="1"
                max="50"
                value={form.unitsRequired}
                onChange={handleChange}
                placeholder="e.g. 2"
                required
              />
            </label>

            <label className="bb-field">
              <span className="bb-field__label">Hospital Name</span>
              <input
                className="bb-field__input"
                name="hospitalName"
                type="text"
                value={form.hospitalName}
                onChange={handleChange}
                placeholder="e.g. City Care Hospital"
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
                placeholder="e.g. Bhopal"
                required
              />
            </label>

            <label className="bb-field">
              <span className="bb-field__label">Urgency Level</span>
              <select
                className="bb-field__select"
                name="urgency"
                value={form.urgency}
                onChange={handleChange}
                required
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Critical">Critical</option>
              </select>
            </label>

            <label className="bb-field">
              <span className="bb-field__label">Status</span>
              <select
                className="bb-field__select"
                name="status"
                value={form.status}
                onChange={handleChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Fulfilled">Fulfilled</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </label>

            <label className="bb-field">
              <span className="bb-field__label">Requested Date</span>
              <input
                className="bb-field__input"
                name="requestedDate"
                type="date"
                value={form.requestedDate}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="bb-form__actions">
            <p className="bb-form__hint">
              {editingId
                ? 'Saving will update this record in the database.'
                : 'Your request will be recorded for immediate donor and inventory matching.'}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {editingId && (
                <button
                  className="bb-button bb-button--ghost"
                  type="button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              )}
              <button
                className="bb-button bb-button--primary"
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? 'Saving...'
                  : editingId
                  ? 'Update Request'
                  : 'Submit Blood Request'}
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Existing Requests Section */}
      <section id="existing-requests">
        <div style={{ marginBottom: '1.25rem' }}>
          <span className="bb-form__eyebrow">Active Pipeline</span>
          <h2 style={{ margin: '0.6rem 0 0.3rem', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
            Existing Blood Requests ({requests.length})
          </h2>
          <p style={{ color: 'var(--bb-muted)', margin: 0 }}>
            List of all current blood requests from hospitals and patients.
          </p>
        </div>

        {loading && (
          <p style={{ color: 'var(--bb-muted)', fontStyle: 'italic' }}>Loading blood requests...</p>
        )}

        {!loading && requests.length === 0 && (
          <div className="bb-card" style={{ textAlign: 'center', padding: '2.5rem' }}>
            <h3 style={{ margin: '0 0 0.5rem', color: 'var(--bb-text)' }}>No Blood Requests Found</h3>
            <p style={{ color: 'var(--bb-muted)', margin: 0 }}>
              Use the form above to submit your first blood request.
            </p>
          </div>
        )}

        {!loading && requests.length > 0 && (
          <div className="bb-stock-grid">
            {requests.map((item) => {
              const urgencyColor = getUrgencyColor(item.urgency);
              const statusBadge = getStatusBadgeStyle(item.status);

              return (
                <article className="bb-card" key={item.id}>
                  <div className="bb-card__top">
                    <div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                        <span className="bb-card__badge" style={{ color: urgencyColor }}>
                          <span className="bb-card__badge-dot" style={{ background: urgencyColor }} />
                          {item.urgency}
                        </span>
                        <span
                          style={{
                            padding: '0.35rem 0.65rem',
                            borderRadius: '999px',
                            background: statusBadge.bg,
                            color: statusBadge.color,
                            fontSize: '0.78rem',
                            fontWeight: 700,
                          }}
                        >
                          {item.status}
                        </span>
                      </div>
                      <h3 className="bb-card__title">Group {item.bloodGroup}</h3>
                      <p className="bb-card__subtitle">
                        {item.hospitalName} - {item.city}
                      </p>
                    </div>
                  </div>

                  <div className="bb-card__stats">
                    <div className="bb-stat">
                      <span className="bb-stat__label">Units Needed</span>
                      <span className="bb-stat__value">{item.unitsRequired}</span>
                    </div>
                    <div className="bb-stat">
                      <span className="bb-stat__label">Requested Date</span>
                      <span className="bb-stat__value" style={{ fontSize: '1rem' }}>
                        {item.requestedDate || 'N/A'}
                      </span>
                    </div>
                    <div className="bb-stat" style={{ gridColumn: '1 / -1' }}>
                      <span className="bb-stat__label">Requester</span>
                      <span className="bb-stat__value" style={{ fontSize: '1rem', fontWeight: 600 }}>
                        {item.requesterName}
                      </span>
                    </div>
                  </div>

                  <div className="bb-card__footer" style={{ borderTop: '1px solid rgba(191, 30, 46, 0.08)', paddingTop: '0.8rem' }}>
                    <button
                      className="bb-button bb-button--ghost bb-button--sm"
                      type="button"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bb-button bb-button--danger bb-button--sm"
                      type="button"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default BloodRequestPage;
