import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'CategoriasController.create')
    Route.get('/', 'CategoriasController.index')
    Route.get('/:id', 'CategoriasController.show')
    Route.delete('/:id', 'CategoriasController.destroy')
    Route.put('/:id', 'CategoriasController.edit')
  }).prefix('/categorias')
}).prefix('api')
export default Route
