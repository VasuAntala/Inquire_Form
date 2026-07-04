import React, { useState } from 'react';
import InquiryForm from './Inquiry_Form';
import InquiryTable from './Inquiry_Table';
import SearchBar from './SearchBar';

export default function InquiryPage() {
  // ── refreshKey: owned here, incremented after create/update → InquiryTable re-fetches
  const [refreshKey, setRefreshKey] = useState(0);

  // ── searchQuery: owned here, passed to SearchBar & InquiryTable for filtering
  const [searchQuery, setSearchQuery] = useState('');

  // ── editingInquiry: set by InquiryTable Edit button, consumed by InquiryForm
  const [editingInquiry, setEditingInquiry] = useState(null);

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleEditInquiry = (inquiry) => {
    setEditingInquiry(inquiry);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '48px 16px',
      gap: '32px',
    }}>

      {/* Inquiry Form — owns POST /Submit & PUT /update/:id via axios */}
      <InquiryForm
        onSuccess={handleSuccess}
        editingInquiry={editingInquiry}
        onCancelEdit={() => setEditingInquiry(null)}
      />

      {/* Table section — owns GET /form/all & DELETE /delete/:id via axios */}
      <div style={{ width: '100%', maxWidth: '700px' }}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <InquiryTable
          refreshKey={refreshKey}
          searchQuery={searchQuery}
          onEdit={handleEditInquiry}
        />
      </div>
    </div>
  );
}
