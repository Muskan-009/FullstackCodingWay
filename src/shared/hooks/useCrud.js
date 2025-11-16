import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCrud = (endpoint) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/${endpoint}`)
      setData(response.data)
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error)
    } finally {
      setLoading(false)
    }
  }

  const createItem = async (itemData) => {
    try {
      const response = await axios.post(`/api/${endpoint}`, itemData)
      setData(prev => [...prev, response.data])
      return response.data
    } catch (error) {
      console.error(`Error creating ${endpoint}:`, error)
      throw error
    }
  }

  const updateItem = async (id, itemData) => {
    try {
      const response = await axios.put(`/api/${endpoint}/${id}`, itemData)
      setData(prev => prev.map(item => 
        item.id === id ? response.data : item
      ))
      return response.data
    } catch (error) {
      console.error(`Error updating ${endpoint}:`, error)
      throw error
    }
  }

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/api/${endpoint}/${id}`)
      setData(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      console.error(`Error deleting ${endpoint}:`, error)
    }
  }

  const openAddForm = () => {
    setEditingItem(null)
    setIsFormOpen(true)
  }

  const openEditForm = (item) => {
    setEditingItem(item)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingItem(null)
  }

  const handleSubmit = async (formData) => {
    try {
      if (editingItem) {
        await updateItem(editingItem.id, formData)
      } else {
        await createItem(formData)
      }
      closeForm()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [endpoint])

  return {
    data,
    loading,
    editingItem,
    isFormOpen,
    fetchData,
    createItem,
    updateItem,
    deleteItem,
    openAddForm,
    openEditForm,
    closeForm,
    handleSubmit
  }
}