import React from 'react';

export default function SearchBar({ value, onChange }) {
  const [focused, setFocused] = React.useState(false);

  return (
    <div style={{ position: 'relative', marginBottom: '16px' }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '14px',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }}>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#aaa">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search by name, subject or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          paddingLeft: '40px',
          paddingRight: '16px',
          paddingTop: '11px',
          paddingBottom: '11px',
          background: '#fff',
          border: `1px solid ${focused ? '#a987e0' : '#ddd'}`,
          borderRadius: '6px',
          fontSize: '0.875rem',
          color: '#333',
          outline: 'none',
          fontFamily: 'inherit',
          boxShadow: focused
            ? '0 0 0 3px rgba(169,135,224,0.15)'
            : '0 2px 8px rgba(0,0,0,0.08)',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
      />
    </div>
  );
}
