// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout'
import ConceptContainer from './Home/containers/ConceptContainer'
import React from 'react'
import { IndexRoute, Route } from 'react-router'
import { injectReducer } from '../store/reducers'
import HomeViewContainer from './Home/containers/HomeViewContainer'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => {
  const reducer = require('./Home/modules/home').default
  injectReducer(store, { key: 'home', reducer })

  return (
    <Route path='/' component={CoreLayout}>
      <IndexRoute component={HomeViewContainer} />
      <Route path='concept/:id' component={ConceptContainer} />
    </Route>)
}

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
