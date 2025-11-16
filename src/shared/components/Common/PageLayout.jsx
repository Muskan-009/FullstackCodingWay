import React from 'react'

const PageLayout = ({ 
  title, 
  children,
  onAddNew 
}) => {
  return (
    <div className="page-layout">
      <div className="page-header">
        <h1>{title}</h1>
        {onAddNew && (
          <button onClick={onAddNew} className="btn-primary">
            + Add New
          </button>
        )}
      </div>
      <div className="page-content">
        {children}
      </div>
    </div>
  )
}

export default PageLayout