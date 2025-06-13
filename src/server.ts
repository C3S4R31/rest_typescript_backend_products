import express from 'express'
import colors from 'colors'
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'
import router from './router'
import db from './config/db'

//Conectar a base de datos
export async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.cyan.bold('Conexion exitosa a la BD'))        
    } catch (error) {
        //console.log(error)
        console.log(colors.red.bold('Hubo un error al conectar a la BD'))        
    }
}

connectDB()

// Instancia de express
const server = express()

// Permitir conexiones
const whitelist = [
  process.env.FRONTEND_URL,
  'http://localhost:5173'
];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`🚫 CORS bloqueado: ${origin}`);
      callback(new Error('Error de cors'));
    }
  },
  credentials: true,
};

server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))
server.use('/api/products', router)

// Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions))


export default server
