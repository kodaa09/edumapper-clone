import type { HttpContext } from '@adonisjs/core/http'
import School from '#models/school'

export default class SchoolsController {
  /**
   * Récupère la liste des écoles
   */
  async index({ response }: HttpContext) {
    const schools = await School.query()

    return response.status(200).json({
      status: 'success',
      message: 'Liste des écoles récupérée avec succès',
      data: schools,
    })
  }
}
