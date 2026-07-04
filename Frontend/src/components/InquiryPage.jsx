import React, { useState } from 'react';
import InquiryForm from './Inquiry_Form';
import InquiryTable from './Inquiry_Table';
import SearchBar from './SearchBar';

export default function InquiryPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');

  const [editingInquiry, setEditingInquiry] = useState(null);

  const [hasData, setHasData] = useState(false);

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
        {hasData && <SearchBar value={searchQuery} onChange={setSearchQuery} />}
        <InquiryTable
          refreshKey={refreshKey}
          searchQuery={searchQuery}
          onEdit={handleEditInquiry}
          onDataCountChange={(count) => setHasData(count > 0)}
        />
      </div>
    </div>
  );
}
