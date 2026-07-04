import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export default function InquiryTable({ onEdit, refreshKey, searchQuery }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE}/form/all`)
      .then(({ data }) => {
        if (data.success) setInquiries(data.data);
      })
      .catch(err => console.error('Failed to load inquiries:', err))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${API_BASE}/delete/${id}`);
      if (data.success) {
        setInquiries(prev => prev.filter(inq => inq._id !== id));
      } else {
        alert('Failed to delete: ' + data.message);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Could not reach the server.');
    }
  };

  const filtered = inquiries.filter(inq =>
    inq.name.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    inq.subject.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    inq.email.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '32px', color: '#aaa', fontSize: '0.9rem' }}>
        Loading inquiries...
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        padding: '40px 24px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        marginTop: '8px',
      }}>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 14px',
        }}>
          <svg width="24" height="24" fill="none" stroke="#bbb" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p style={{ color: '#555', fontSize: '0.95rem', fontWeight: '600', marginBottom: '4px' }}>
          No inquiries found
        </p>
        <p style={{ color: '#aaa', fontSize: '0.82rem' }}>
          {inquiries.length === 0 ? 'Submit an inquiry to get started.' : 'Try a different search term.'}
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: '#fff',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    }}>

      <div style={{
        padding: '12px 20px',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ color: '#555', fontSize: '0.82rem', fontWeight: '600' }}>
          All Inquiries
        </span>
        <span style={{
          background: '#f0ebfc',
          color: '#7c5cbf',
          fontSize: '0.72rem',
          fontWeight: '700',
          padding: '3px 10px',
          borderRadius: '20px',
        }}>
          {filtered.length} {filtered.length === 1 ? 'record' : 'records'}
        </span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          minWidth: '540px',
          fontSize: '0.85rem',
        }}>
          <thead>
            <tr style={{ background: '#fafafa' }}>
              {['Name', 'Contact', 'Subject', 'Message', 'Actions'].map((h, i) => (
                <th key={h} style={{
                  padding: '11px 16px',
                  textAlign: i === 4 ? 'right' : 'left',
                  fontSize: '0.68rem',
                  fontWeight: '700',
                  color: '#888',
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  borderBottom: '1px solid #eee',
                  whiteSpace: 'nowrap',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((inquiry, idx) => (
              <TableRow
                key={inquiry._id}
                inquiry={inquiry}
                onEdit={onEdit}
                onDelete={handleDelete}
                isLast={idx === filtered.length - 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableRow({ inquiry, onEdit, onDelete, isLast }) {
  const [hovered, setHovered] = useState(false);

  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#faf8ff' : '#fff',
        borderBottom: isLast ? 'none' : '1px solid #f0f0f0',
        transition: 'background 0.15s',
      }}
    >

      <td style={{ padding: '13px 16px', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #c778d8, #7b9fe8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: '700',
            color: '#fff',
            flexShrink: 0,
          }}>
            {inquiry.name.charAt(0).toUpperCase()}
          </div>
          <span style={{ color: '#222', fontWeight: '600', fontSize: '0.85rem' }}>
            {inquiry.name}
          </span>
        </div>
      </td>


      <td style={{ padding: '13px 16px', whiteSpace: 'nowrap' }}>
        <div style={{ color: '#444', fontSize: '0.83rem' }}>{inquiry.email}</div>
        <div style={{ color: '#aaa', fontSize: '0.76rem', marginTop: '2px' }}>
          {inquiry.phone || '—'}
        </div>
      </td>


      <td style={{ padding: '13px 16px', maxWidth: '140px' }}>
        <div style={{
          color: '#7c5cbf',
          fontSize: '0.83rem',
          fontWeight: '600',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {inquiry.subject}
        </div>
      </td>


      <td style={{ padding: '13px 16px', maxWidth: '200px' }}>
        <div style={{
          color: '#777',
          fontSize: '0.8rem',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          lineHeight: '1.4',
        }}>
          {inquiry.message}
        </div>
      </td>

      <td style={{ padding: '13px 16px', whiteSpace: 'nowrap', textAlign: 'right' }}>
        <ActionBtn
          onClick={() => onEdit(inquiry)}
          label="Edit"
          color="#4f7df0"
          hoverBg="#eef2ff"
        />
        <ActionBtn
          onClick={() => onDelete(inquiry._id)}
          label="Delete"
          color="#e05252"
          hoverBg="#fff0f0"
        />
      </td>
    </tr>
  );
}

function ActionBtn({ onClick, label, color, hoverBg }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        marginLeft: '6px',
        padding: '5px 12px',
        borderRadius: '4px',
        border: `1px solid ${hov ? color : '#e5e5e5'}`,
        background: hov ? hoverBg : '#fff',
        color: hov ? color : '#666',
        fontSize: '0.78rem',
        fontWeight: '600',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'all 0.15s',
      }}
    >
      {label}
    </button>
  );
}
