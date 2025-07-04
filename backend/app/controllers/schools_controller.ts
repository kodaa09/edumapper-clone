import type { HttpContext } from '@adonisjs/core/http'
import School from '#models/school'

export default class SchoolsController {
  async index({ response }: HttpContext) {
    const schools = await School.query()

    return response.status(200).json({
      status: 'success',
      message: 'Liste des écoles récupérée avec succès',
      data: schools,
    })
  }

  async show({ params, response }: HttpContext) {
    const school = await School.query().where('id', params.id).first()

    return response.status(200).json({
      status: 'success',
      message: 'École récupérée avec succès',
      data: school,
    })
  }
}
