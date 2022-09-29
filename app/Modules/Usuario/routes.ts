import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('/total', 'UsuariosController.total')
    Route.post('/', 'UsuariosController.create')
    Route.get('/', 'UsuariosController.index')
    Route.get('/:id', 'UsuariosController.show')
    Route.delete('/:id', 'UsuariosController.destroy')
    Route.post('/login', 'UsuariosController.login')
    Route.put('/:id', 'UsuariosController.edit')
  }).prefix('/usuarios')
}).prefix('api')
export default Route
