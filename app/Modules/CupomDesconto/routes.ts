import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'CuponsDescontosController.create')
    Route.get('/', 'CuponsDescontosController.index')
    Route.get('/:id', 'CuponsDescontosController.show')
    Route.delete('/:id', 'CuponsDescontosController.destroy')
    Route.put('/:id', 'CuponsDescontosController.edit')
  }).prefix('/cuponsdescontos')
}).prefix('api')
export default Route
