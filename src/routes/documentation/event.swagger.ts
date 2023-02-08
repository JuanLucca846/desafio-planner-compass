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
 *  /api/v1/events:
 *   get:
 *     tags:
 *         - events
 *     description: Get all events
 *     parameters:
 *       - name: dayOfTheWeek
 *         in: query
 *         description: Get event by day of the week
 *     responses:
 *       200:
 *         description: Success
 *     security:
 *       - Authorization: []
 */

/**
 * @swagger
 *  /api/v1/events/{id}:
 *   get:
 *     tags:
 *         - events
 *     description: Get events by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Event ID
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *     security:
 *       - Authorization: []
 */

/**
 * @swagger
 *  /api/v1/events:
 *   post:
 *     tags:
 *       - events
 *     description: Create event
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Event
 *         description: Create an event
 *         schema:
 *           type: object
 *           properties:
 *             description:
 *               type: string
 *               example: Lorem ipsum dolor sit amet, consectetur
 *             userId:
 *               type: string
 *               example: 63e076e61ba94f420431609d
 *     responses:
 *       200:
 *         description: Success
 *     security:
 *       - Authorization: []
 */

/**
 * @swagger
 *  /api/v1/events/{id}:
 *   put:
 *     tags:
 *         - events
 *     description: Update events by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Event ID
 *         required: true
 *       - in: body
 *         name: Event
 *         description: Update an event
 *         schema:
 *           type: object
 *           properties:
 *             description:
 *               type: string
 *               example: Testing
 *     responses:
 *       200:
 *         description: Success
 *     security:
 *       - Authorization: []
 */

/**
 * @swagger
 *  /api/v1/events/{id}:
 *   delete:
 *     tags:
 *         - events
 *     description: Delete events by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Event ID
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *     security:
 *       - Authorization: []
 */

/**
 * @swagger
 *  /api/v1/events:
 *   delete:
 *     tags:
 *         - events
 *     description: Delete all events by week day
 *     parameters:
 *       - name: dayOfTheWeek
 *         in: query
 *         description: Delete event by day of the week
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *     security:
 *       - Authorization: []
 *
 * securityDefinitions:
 *   Authorization:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */
