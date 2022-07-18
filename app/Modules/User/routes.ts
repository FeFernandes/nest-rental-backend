import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/', async () => {
      return { hello: 'user' }
    })
    Route.post('/signup', 'UsuariosController.signup')
    Route.post('/login', 'UsuariosController.login')
  }).prefix('/usuarios')
}).prefix('api')
export default Route
