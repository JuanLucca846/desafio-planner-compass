/**
 * @swagger
 * securityDefinitions:
 *   Authorization:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

/**
 * @swagger
 *  /api/v1/users/signUp:
 *   post:
 *     tags:
 *       - user
 *     description: Create user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: User
 *         description: Create an user
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *               example: Juan
 *             lastName:
 *               type: string
 *               example: Lucca
 *             birthDate:
 *               type: date
 *               example: 1998-06-05
 *             city:
 *               type: string
 *               example: Sao Paulo
 *             country:
 *               type: string
 *               example: Brasil
 *             email:
 *               type: string
 *               example: lucca470@gmail.com
 *             password:
 *               type: string
 *               example: 1234
 *             confirmPassword:
 *               type: string
 *               example: 1234
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 *  /api/v1/users/signIn:
 *   post:
 *     tags:
 *       - user
 *     description: Login user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: User
 *         description: Login an user
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: lucca470@gmail.com
 *             password:
 *               type: string
 *               example: 1234
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 *  /api/v1/user/{id}:
 *   put:
 *     tags:
 *       - user
 *     description: Update user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *       - in: body
 *         name: User
 *         description: Update an user
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *               example: Test
 *             lastName:
 *               type: string
 *               example: User
 *             birthDate:
 *               type: date
 *               example: 1998-06-05
 *             city:
 *               type: string
 *               example: Sao Paulo
 *             country:
 *               type: string
 *               example: Portugal
 *             email:
 *               type: string
 *               example: lucca40@gmail.com
 *             password:
 *               type: string
 *               example: 12345
 *             confirmPassword:
 *               type: string
 *               example: 12345
 *     responses:
 *       200:
 *         description: Success
 *     security:
 *       - Authorization: []
 */
