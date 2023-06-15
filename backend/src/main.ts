import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configuração do CORS
  const corsOptions: CorsOptions = {
    origin: '*', // Defina a origem permitida, pode ser um domínio específico ou '*' para permitir de qualquer origem
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Defina os métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Defina os cabeçalhos permitidos
  };
  app.enableCors(corsOptions);

  // Configuração do Body Parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => console.log('running on port', PORT));
}
bootstrap();
