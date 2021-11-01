import { BadRequest } from '../utils/Errors'

// NOTE THIS IS JUST FOR TODAY
const FakeDB = {
  cats: [
    {
      name: 'Felix',
      id: '0'
    },
    {
      name: 'Mittens',
      id: '1'
    },
    {
      name: 'The Venerable Fuzzbutt',
      id: '2'
    },
    {
      name: 'Duck',
      id: '3'
    },
    {
      name: 'Phat Cat',
      id: '4'
    },
    {
      name: 'Simba the 51st',
      id: '5'
    },
    {
      name: 'Socks',
      id: '6'
    },
    {
      name: 'Bozko',
      id: '7'
    },
    {
      name: 'Mr. Snibbly',
      id: '8'
    }
  ]
}

class CatsService {
  async createCat(catData) {
    // give the cat an Id on insertion
    catData.id = FakeDB.cats.length.toString()
    await FakeDB.cats.push(catData)
    // NOTE just for today we are returning the data literally
    return catData
  }

  async getAllCats() {
    // NOTE you normally want await here cause the DB is held somewhere else
    const cats = await FakeDB.cats
    return cats
  }

  async editCat(id, updatedCat) {
    const catIndex = await FakeDB.cats.findIndex(c => c.id === id)
    if (catIndex === -1) {
      throw new BadRequest('no cat by that id')
    }
    FakeDB.cats.splice(catIndex, 1, updatedCat)
    return updatedCat
  }

  async deleteCat(id) {
    const catIndex = await FakeDB.cats.findIndex(c => c.id === id)
    if (catIndex === -1) {
      throw new BadRequest("can't delete a cat that is already not there... partner")
    }
    FakeDB.cats.splice(catIndex, 1)
    return 'delorted'
  }
}

export const catsService = new CatsService()
