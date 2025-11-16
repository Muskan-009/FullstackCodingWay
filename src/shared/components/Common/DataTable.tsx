import React, { useState } from 'react';

interface Column {
  key: string;
  header: string;
  render?: (item: any) => React.ReactNode;
}

interface DataTableProps {
  title?: string; // ✅ Make title optional
  data?: any[];
  columns: Column[];
  onAdd?: () => void;
  onEdit?: (item: any) => void;
  onDelete?: (id: string | number) => void;
  loading?: boolean;
  enableSearch?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
}

const DataTable: React.FC<DataTableProps> = ({ 
  title = 'Data', // ✅ Default title
  data = [],
  columns, 
  onAdd, 
  onEdit, 
  onDelete,
  loading = false,
  enableSearch = true,
  enablePagination = true,
  pageSize = 10
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Safe data handling
  const safeData = Array.isArray(data) ? data : [];
  const safeTitle = title || 'Data'; // ✅ Safe title
  
  // Search filter
  const filteredData = safeData.filter(item =>
    columns.some(col => {
      const value = item?.[col.key]?.toString().toLowerCase() || '';
      return value.includes(searchTerm.toLowerCase());
    })
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = enablePagination 
    ? filteredData.slice(startIndex, startIndex + pageSize)
    : filteredData;

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Loading {safeTitle}...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {safeTitle} <span className="text-sm text-gray-500">({filteredData.length})</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {enableSearch && (
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Search ${safeTitle.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            )}
            
            {onAdd && (
              <button 
                onClick={onAdd}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <span>+</span>
                Add New
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      {filteredData.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          {searchTerm ? 'No results found for your search.' : `No ${safeTitle.toLowerCase()} found.`}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map(col => (
                    <th 
                      key={col.key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                    >
                      {col.header}
                    </th>
                  ))}
                  {(onEdit || onDelete) && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((item, index) => (
                  <tr 
                    key={item?.id || index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {columns.map(col => (
                      <td 
                        key={col.key}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {col.render ? col.render(item) : item?.[col.key]}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          {onEdit && (
                            <button
                              onClick={() => onEdit(item)}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs transition-colors"
                            >
                              Edit
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(item?.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {enablePagination && totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(startIndex + pageSize, filteredData.length)} of {filteredData.length} entries
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 bg-blue-500 text-white rounded">
                    {currentPage}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DataTable;