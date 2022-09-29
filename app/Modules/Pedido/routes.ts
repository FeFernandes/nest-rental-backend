import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('/dashboard', 'PedidosController.dashboard')
    Route.get('/total', 'PedidosController.total')
    Route.post('/', 'PedidosController.create')
    Route.get('/', 'PedidosController.index')
    Route.get('/:id', 'PedidosController.show')
    Route.delete('/:id', 'PedidosController.destroy')
    Route.put('/:id', 'PedidosController.edit')
  }).prefix('/pedidos')
}).prefix('api')
export default Route
