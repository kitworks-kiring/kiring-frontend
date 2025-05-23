import swaggerJSDoc from 'swagger-jsdoc'

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API 명세서',
      version: '1.0.0',
      description: 'Last Updated: 2025-05-23 17:02',
    },
    // 인증 방식 명시
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['src/app/api/**/*.ts'],
})
