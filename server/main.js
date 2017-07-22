const express = require('express')
const path = require('path')
const webpack = require('webpack')
const logger = require('../build/lib/logger')
const webpackConfig = require('../build/webpack.config')
const project = require('../project.config')
const compress = require('compression')

const app = express()
app.use(compress())

const mongodb = require('mongodb')

// Retrieve
let MongoClient = mongodb.MongoClient

let concepts

// Connect to the db
MongoClient.connect('mongodb://localhost:27017/cern_db', function (err, db) {
  if (!err) {
    console.log('Connected to mongodb')
    concepts = db.collection('concepts')
  }
})

app.get('/api/compare', function (req, res) {
  concepts.find({ concept: new RegExp(req.query['str'], 'i') }).toArray((err, doc) => {
    res.send(doc)
  })
})

app.get('/api/concept/:id', function (req, res) {
  concepts.findOne({ 'id': req.params.id }, (err, doc) => {
    res.send(doc)
  })
})

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  logger.info('Enabling webpack development and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : path.resolve(project.basePath, project.srcDir),
    hot         : true,
    quiet       : false,
    noInfo      : false,
    lazy        : false,
    stats       : 'normal',
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    // Pass to next layer of middleware
    next()
  })

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(path.resolve(project.basePath, 'public')))

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  logger.warn(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(path.resolve(project.basePath, project.outDir)))
}

module.exports = app
