import {Router} from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { body, param } from 'express-validator'
import {handleInputErrors} from './middleware/index'

const router = Router()
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo de 49 Pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true        
 */

// GET ------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'                         
 */
router.get('/', getProducts)

// GET ID ------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path    
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Product not found
 *              400:
 *                  description: Bad Request - Invalid ID
 *                          
 */
router.get('/:id', 
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErrors,    
    getProductById
)

// POST ------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

/**
 * @swagger
 * /api/products/:
 *      post:
 *          summary: Creates a new product
 *          tags:
 *              - Products
 *          description: Return a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo 49 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 399
 *          responses:
 *              201:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid input data                          
 */

router.post('/',

    //Validacion
    body('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('Precio no valido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),  

    handleInputErrors,
    
    createProduct
)


// PUT ------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products
 *          description: Returns the update product
 *          parameters:
 *            - in: path    
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo 49 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 399
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Product not found
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *                          
 */

router.put('/:id',

    //Validacion
    param('id').isInt().withMessage('ID no Válido'),
    body('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('Precio no valido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),

    body('availability')
        .isBoolean().withMessage('Valor para Disponibilidad no valido'),
    
    handleInputErrors,
    
    updateProduct
)

// PATCH ------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Updates a product availability
 *          tags:
 *              - Products
 *          description: Returns the update availability
 *          parameters:
 *            - in: path    
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Product not found
 *              400:
 *                  description: Bad Request - Invalid ID
 *                          
 */
router.patch('/:id',
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErrors,
    updateAvailability
)

// DELETE ------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Deletes a product
 *          tags:
 *              - Products
 *          description: Returns a confirmation message
 *          parameters:
 *            - in: path    
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              items: 'Producto Eliminado'
 *              404:
 *                  description: Product not found
 *              400:
 *                  description: Bad Request - Invalid ID
 *                          
 */

router.delete('/:id',
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErrors,
    deleteProduct
 )

export default router