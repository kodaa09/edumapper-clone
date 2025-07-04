import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const SchoolsController = () => import('#controllers/schools_controller')
const UsersController = () => import('#controllers/users_controller')

router
  .group(() => {
    router.post('/auth/signup', [UsersController, 'signup'])
    router.post('/auth/login', [UsersController, 'login'])
    router.post('/auth/logout', [UsersController, 'logout']).use(middleware.auth())
    router.get('/auth/me', [UsersController, 'me']).use(middleware.auth())
    router.get('/auth/check', [UsersController, 'check']).use(middleware.auth())

    router.get('/schools', [SchoolsController, 'index'])
    router.get('/schools/:id', [SchoolsController, 'show'])
  })
  .prefix('api')
