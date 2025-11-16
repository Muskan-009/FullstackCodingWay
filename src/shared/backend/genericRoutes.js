import express from 'express'

export const createGenericRoutes = (controller) => {
  const router = express.Router()
  
  router.get('/', controller.getAll)
  router.post('/', controller.create)
  router.put('/:id', controller.update)
  router.delete('/:id', controller.delete)
  
  return router
}