import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Lazy load BooksPage
const BooksPage = lazy(() => import('./features/Book'))

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/books" element={<BooksPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter