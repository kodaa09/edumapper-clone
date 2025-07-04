import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import User from '#models/user'

export default class UsersController {
  /**
   * Validateur pour l'inscription
   */
  static signupValidator = vine.compile(
    vine.object({
      email: vine.string().email(),
      password: vine.string().minLength(4),
      fullName: vine.string().trim().minLength(3),
    })
  )

  /**
   * Validateur pour la connexion
   */
  static loginValidator = vine.compile(
    vine.object({
      email: vine.string().email(),
      password: vine.string(),
    })
  )

  /**
   * Inscription d'un nouvel utilisateur
   */
  async signup({ request, response }: HttpContext) {
    const payload = await request.validateUsing(UsersController.signupValidator)

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findBy('email', payload.email)
    if (existingUser) {
      return response.status(400).json({
        status: 'error',
        message: 'Un utilisateur avec cet email existe déjà',
      })
    }

    const user = await User.create(payload)

    return response.status(201).json({
      status: 'success',
      message: 'Inscription réussie',
      data: user,
    })
  }

  /**
   * Connexion d'un utilisateur
   */
  async login({ auth, request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(UsersController.loginValidator)

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)

      return response.status(200).json({
        status: 'success',
        message: 'Connexion réussie',
        data: user,
      })
    } catch {
      return response.status(400).json({
        status: 'error',
        message: 'Email ou mot de passe incorrect',
      })
    }
  }

  /**
   * Vérifie si l'utilisateur est authentifié
   */
  async check({ auth, response }: HttpContext) {
    const isAuthenticated = await auth.use('web').check()

    return response.status(200).json({
      status: 'success',
      authenticated: isAuthenticated,
    })
  }

  /**
   * Récupère les informations de l'utilisateur connecté
   */
  async me({ auth, response }: HttpContext) {
    try {
      const isAuthenticated = await auth.use('web').check()

      if (isAuthenticated) {
        const user = auth.use('web').user
        if (!user) {
          return response.status(401).json({
            status: 'error',
            message: 'Non authentifié',
          })
        }

        return response.status(200).json({
          status: 'success',
          data: user,
        })
      }

      return response.status(401).json({
        status: 'error',
        message: 'Non authentifié',
      })
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'Erreur serveur interne',
      })
    }
  }

  /**
   * Déconnexion de l'utilisateur
   */
  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.status(200).json({
      status: 'success',
      message: 'Déconnexion réussie',
    })
  }
}
