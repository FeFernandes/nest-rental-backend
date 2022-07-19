import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'VisitasController.create')
    Route.get('/', 'VisitasController.index')
  }).prefix('/visitas')
}).prefix('api')
export default Route
