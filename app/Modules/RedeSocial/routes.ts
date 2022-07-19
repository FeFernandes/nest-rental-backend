import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'RedesSociaisController.create')
    Route.get('/', 'RedesSociaisController.index')
    Route.get('/:id', 'RedesSociaisController.show')
    Route.delete('/:id', 'RedesSociaisController.destroy')
    Route.put('/:id', 'RedesSociaisController.edit')
  }).prefix('/redessociais')
}).prefix('api')
export default Route
