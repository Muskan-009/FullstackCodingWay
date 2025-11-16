export const bookConfig = {
  name: 'books',
  title: '📚 Books',
  route: '/api/books',
  path: '/books',
  
  schema: {
    title: { type: 'VARCHAR(255)', required: true },
    author: { type: 'VARCHAR(255)', required: true },
    isbn: { type: 'VARCHAR(50)', required: true, unique: true },
    category: { type: 'VARCHAR(100)', required: true },
    published_year: { type: 'INTEGER' },
    available: { type: 'BOOLEAN', default: true }
  },
  
  columns: [
    { key: 'title', header: 'Title' },
    { key: 'author', header: 'Author' },
    { key: 'isbn', header: 'ISBN' },
    { key: 'category', header: 'Category' },
    { 
      key: 'available', 
      header: 'Status',
      render: (item) => item.available ? '✅ Available' : '❌ Not Available'
    }
  ],
  
  fields: [
    { name: 'title', label: 'Title', required: true },
    { name: 'author', label: 'Author', required: true },
    { name: 'isbn', label: 'ISBN', required: true },
    { name: 'category', label: 'Category', required: true },
    { name: 'published_year', label: 'Published Year', type: 'number' }
  ]
}