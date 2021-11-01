import { catsService } from '../services/CatsService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class CatsController extends BaseController {
  constructor() {
    super('api/cats')
    this.router
      .get('', this.getAllCats)
      .post('', this.createCat)
      .put('/:catId', this.editCat)
      .delete('/:catId/adopted', this.deleteCat)
  }

  async getAllCats(req, res, next) {
    try {
      logger.log('Cats controller get all')
      const cats = await catsService.getAllCats()
      return res.send(cats)
    } catch (error) {
      next(error)
    }
  }

  async createCat(req, res, next) {
    try {
      const catData = req.body
      const cat = await catsService.createCat(catData)
      // Structuring the response data
      return res.send({ message: 'cat created', result: cat })
    } catch (error) {
      next(error)
    }
  }

  async editCat(req, res, next) {
    try {
      const id = req.params.catId
      const updatedCat = req.body
      // NOTE spoiler to not trust the client with nothing
      updatedCat.id = id
      const cat = await catsService.editCat(id, updatedCat)
      return res.send({ message: 'cat edited', results: cat })
    } catch (error) {
      next(error)
    }
  }

  async deleteCat(req, res, next) {
    try {
      const id = req.params.catId
      const message = await catsService.deleteCat(id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
