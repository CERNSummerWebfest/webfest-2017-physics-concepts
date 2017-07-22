import { injectReducer } from '../../store/reducers'

// Sync route definition
export default (store) =>
  (nextState, cb) => {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const HomeView = require('./containers/HomeViewContainer').default
      /*  Return getComponent   */
      cb(null, HomeView)

      /* Webpack named bundle   */
    }, 'home')
  }
