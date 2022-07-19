import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'BannersController.create')
    Route.get('/', 'BannersController.index')
    Route.get('/:id', 'BannersController.show')
    Route.delete('/:id', 'BannersController.destroy')
    Route.put('/:id', 'BannersController.edit')
  }).prefix('/banners')
}).prefix('api')
export default Route
