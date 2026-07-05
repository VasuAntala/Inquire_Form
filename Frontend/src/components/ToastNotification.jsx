import React, { useEffect } from 'react';

const icons = {
  success: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  info: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

const styles = {
  success: {
    bg: '#14251c',
    border: '1px solid #1f4229',
    text: '#4ade80',
  },
  error: {
    bg: '#2d1414',
    border: '1px solid #5a1c1c',
    text: '#f87171',
  },
  warning: {
    bg: '#2d2214',
    border: '1px solid #5a421c',
    text: '#fbbf24',
  },
  info: {
    bg: '#14202d',
    border: '1px solid #1c395a',
    text: '#60a5fa',
  }
};

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '380px',
      width: '100%',
      pointerEvents: 'none'
    }}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  const { id, type = 'info', message, duration = 5000 } = toast;
  const config = styles[type] || styles.info;

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  return (
    <div style={{
      background: config.bg,
      border: config.border,
      borderRadius: '8px',
      padding: '14px 18px',
      color: '#f4f4f5',
      boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      pointerEvents: 'auto',
      animation: 'toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @keyframes toastSlideIn {
          from {
            transform: translateX(100%) translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
        }
        @keyframes toastProgress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>

      {/* Type Icon */}
      <span style={{ color: config.text, marginTop: '2px', flexShrink: 0 }}>
        {icons[type] || icons.info}
      </span>

      {/* Message Body */}
      <div style={{ flexGrow: 1, fontSize: '0.85rem', lineHeight: '1.4', fontWeight: '500', paddingRight: '12px' }}>
        {message}
      </div>

      {/* Close Button */}
      <button
        onClick={onDismiss}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#a1a1aa',
          cursor: 'pointer',
          padding: '2px',
          fontSize: '1.1rem',
          lineHeight: '1',
          marginTop: '-2px',
          transition: 'color 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.style.color = '#a1a1aa'}
      >
        &times;
      </button>

      {/* Progress Bar Timer indicator */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '3px',
        background: config.text,
        opacity: 0.6,
        animation: `toastProgress ${duration}ms linear forwards`
      }} />
    </div>
  );
}
