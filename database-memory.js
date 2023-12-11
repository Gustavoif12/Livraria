import { randomUUID } from "crypto"

export class DatabaseMemory {
  #mangas = new Map()

  list(search) {
    return Array.from(this.#mangas.entries())
      .map((mangaArray) => {
        const id = mangaArray[0]

        const data = mangaArray[1]

        return {
          id,
          ...data,
        }
      })
      .filter((manga) => {
        if (search) {
          return manga.obra.includes(search)
        }
        return true
      })
  }

  create(manga) {
    const mangaId = randomUUID()
    this.#mangas.set(mangaId, manga)
  }

  update(id, manga) {
    this.#mangas.set(id, manga)
  }

  delete(id, manga) {
    this.#mangas.delete(id, manga)
  }
}
