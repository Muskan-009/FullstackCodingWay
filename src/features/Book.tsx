import React from 'react';
import PageLayout from '../shared/components/Common/PageLayout';
import DataTable from '../shared/components/Common/DataTable';
import AddEditForm from '../shared/components/Common/AddEditForm';
import { useCrud } from '../shared/hooks/useCrud';

const BooksPage: React.FC = () => {
  const {
    data: books = [],
    loading,
    isFormOpen,
    editingItem,
    openAddForm,
    openEditForm,
    closeForm,
    handleSubmit,
    deleteItem
  } = useCrud('books');

  const bookColumns = [
    { key: 'title', header: 'Title' },
    { key: 'author', header: 'Author' },
    { key: 'isbn', header: 'ISBN' },
    { key: 'category', header: 'Category' },
    { 
      key: 'available', 
      header: 'Status',
      render: (book: any) => book.available ? '✅ Available' : '❌ Not Available'
    }
  ];

  const bookFields = [
    { name: 'title', label: 'Title', required: true },
    { name: 'author', label: 'Author', required: true },
    { name: 'isbn', label: 'ISBN', required: true },
    { name: 'category', label: 'Category', required: true },
    { name: 'published_year', label: 'Published Year', type: 'number' }
  ];

  return (
    <PageLayout title="📚 Books Management" onAddNew={openAddForm}>
      <DataTable
        title="Books"
        data={books}
        columns={bookColumns}
        onAdd={openAddForm}
        onEdit={openEditForm}
        onDelete={deleteItem}
        loading={loading}
      />

      <AddEditForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={handleSubmit}
        initialData={editingItem}
        fields={bookFields}
        title="Book"
      />
    </PageLayout>
  );
};

export default BooksPage;