import * as express from 'express'
import { assetsPath } from 'utils/paths'

// Init express to serve static
const app: express.Express = express()
app.use(express.static(assetsPath))

export default app
