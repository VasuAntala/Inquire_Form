import React, { useState, useEffect } from 'react';
import InquiryForm from './Inquiry_Form';
import InquiryTable from './Inquiry_Table';
import SearchBar from './SearchBar';
import ErrorBoundary from './ErrorBoundary';
import ToastContainer from './ToastNotification';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

export default function InquiryPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingInquiry, setEditingInquiry] = useState(null);
  const [hasData, setHasData] = useState(false);

  // Notifications and network states
  const [toasts, setToasts] = useState([]);
  const [isOffline, setIsOffline] = useState(false);

  const addToast = (message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    axios.get(`${API_BASE}/api/inquiries`)
      .then(() => {
        setIsOffline(false);
      })
      .catch(err => {
        if (!err.response || err.code === 'ERR_NETWORK') {
          setIsOffline(true);
        }
      });
  }, [refreshKey]);

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleEditInquiry = (inquiry) => {
    setEditingInquiry(inquiry);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ErrorBoundary>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${isOffline ? '80px' : '48px'} 16px 48px`,
        gap: '32px',
        transition: 'padding 0.3s ease',
      }}>

        {/* Connection Offline Banner */}
        {isOffline && (
          <div style={{
            width: '100%',
            background: '#e05252',
            color: '#fff',
            textAlign: 'center',
            padding: '12px 16px',
            fontSize: '0.875rem',
            fontWeight: '600',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            <span>⚠️ Connection Offline: Unable to reach the API server at {API_BASE}. Please verify the backend is running.</span>
            <button
              onClick={() => {
                setIsOffline(false);
                setRefreshKey(prev => prev + 1);
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '4px',
                color: '#fff',
                padding: '4px 10px',
                fontSize: '0.75rem',
                fontWeight: '700',
                cursor: 'pointer',
                marginLeft: '12px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            >
              Retry
            </button>
          </div>
        )}

        <InquiryForm
          onSuccess={handleSuccess}
          editingInquiry={editingInquiry}
          onCancelEdit={() => setEditingInquiry(null)}
          addToast={addToast}
          setIsOffline={setIsOffline}
        />

        <div style={{ width: '100%', maxWidth: '700px' }}>
          {hasData && <SearchBar value={searchQuery} onChange={setSearchQuery} />}
          <InquiryTable
            refreshKey={refreshKey}
            searchQuery={searchQuery}
            onEdit={handleEditInquiry}
            onDataCountChange={(count) => setHasData(count > 0)}
            addToast={addToast}
            setIsOffline={setIsOffline}
          />
        </div>

        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </ErrorBoundary>
  );
}
