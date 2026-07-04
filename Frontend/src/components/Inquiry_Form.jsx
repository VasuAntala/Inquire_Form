import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

const labelStyle = {
  display: 'block',
  fontSize: '0.7rem',
  fontWeight: '600',
  color: '#555',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: '6px',
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '0.875rem',
  color: '#333',
  background: '#fff',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
};

export default function InquiryForm({ onSuccess, editingInquiry, onCancelEdit }) {
  const defaultState = { name: '', email: '', phone: '', subject: '', message: '' };
  const [formData, setFormData] = useState(defaultState);
  const [focused, setFocused] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  React.useEffect(() => {
    setFormData(editingInquiry || defaultState);
  }, [editingInquiry]);

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, phone: digits }));
      setPhoneError(digits.length > 0 && digits.length < 10 ? 'Phone number must be exactly 10 digits.' : '');
      return;
    }
    if (name === 'email') {
      setFormData(prev => ({ ...prev, email: value }));
      setEmailError(value && !isValidEmail(value) ? 'Enter a valid email address.' : '');
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone && formData.phone.length !== 10) {
      setPhoneError('Phone number must be exactly 10 digits.');
      return;
    }
    if (!isValidEmail(formData.email)) {
      setEmailError('Enter a valid email address.');
      return;
    }
    try {
      if (editingInquiry) {
        const { data } = await axios.put(`${API_BASE}/update/${editingInquiry._id}`, formData);
        if (data.success) {
          onCancelEdit();   // close edit mode
          onSuccess();      // tell InquiryTable to re-fetch
        } else {
          alert('Failed to update: ' + data.message);
        }
      } else {
        const { data } = await axios.post(`${API_BASE}/Submit`, formData);
        if (data.success) {
          onSuccess();      // tell InquiryTable to re-fetch
          setFormData(defaultState);
        } else {
          alert('Failed to submit: ' + data.message);
        }
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Could not reach the server.');
    } finally {
      setSubmitting(false);
    }
  };

  const getInputStyle = (field) => ({
    ...inputStyle,
    boxShadow: focused === field ? '0 0 0 3px rgba(169,135,224,0.15)' : 'none',
  });

  return (
    <div style={{
      background: '#fff',
      borderRadius: '8px',
      padding: '40px 48px',
      width: '100%',
      maxWidth: '520px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
    }}>

      <h2 style={{
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#222',
        marginBottom: '28px',
      }}>
        {editingInquiry ? 'Edit Inquiry' : 'Contact Us'}
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>Your Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              placeholder="Enter Your Name"
              required
              style={getInputStyle('name')}
            />
          </div>
          <div>
            <label style={labelStyle}>Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => setFocused('subject')}
              onBlur={() => setFocused(null)}
              placeholder="Subject"
              required
              style={getInputStyle('subject')}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocused('email')}
            onBlur={() => {
              setFocused(null);
              if (formData.email && !isValidEmail(formData.email)) {
                setEmailError('Enter a valid email address.');
              }
            }}
            placeholder="Eg. example@email.com"
            required
            style={{
              ...getInputStyle('email'),
              borderColor: emailError ? '#e05252' : undefined,
            }}
          />
          {emailError && (
            <p style={{ color: '#e05252', fontSize: '0.75rem', marginTop: '5px', fontWeight: '500' }}>
              ⚠ {emailError}
            </p>
          )}
        </div>

        <div>
          <label style={labelStyle}>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onFocus={() => setFocused('phone')}
            onBlur={() => {
              setFocused(null);
              if (formData.phone && formData.phone.length !== 10) {
                setPhoneError('Phone number must be exactly 10 digits.');
              }
            }}
            placeholder="Enter 10-digit number"
            maxLength={10}
            inputMode="numeric"
            required
            style={{
              ...getInputStyle('phone'),
              borderColor: phoneError ? '#e05252' : undefined,
            }}
          />
          {phoneError && (
            <p style={{ color: '#e05252', fontSize: '0.75rem', marginTop: '5px', fontWeight: '500' }}>
              ⚠ {phoneError}
            </p>
          )}
        </div>

        <div>
          <label style={labelStyle}>Message *</label>
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused(null)}
            placeholder="Please enter your Messege..."
            required
            style={{
              ...getInputStyle('message'),
              resize: 'vertical',
              minHeight: '100px',
              lineHeight: '1.5',
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '4px' }}>
          <button
            type="submit"
            style={{
              background: '#222',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              padding: '11px 32px',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#444'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#222'; }}
          >
            {editingInquiry ? 'Update' : submitting ? 'Submitting...' : 'Submit'}
            {!submitting && <span style={{ fontSize: '1rem' }}>→</span>}
          </button>

          {editingInquiry && (
            <button
              type="button"
              onClick={onCancelEdit}
              style={{
                background: 'transparent',
                color: '#888',
                border: '1px solid #ddd',
                borderRadius: '50px',
                padding: '11px 24px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f5f5f5'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
