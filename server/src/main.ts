// написано с помощью 
// https://www.youtube.com/watch?v=96ri9zHeSJM
// https://www.youtube.com/watch?v=9EtkpCzqZu0

const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Eco-Delivery API',
      description: 'API for Eco-Delivery project',
      version: '0.0.1',
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  apis: ['./app.module.js'], 
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
