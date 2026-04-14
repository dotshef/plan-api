import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { DbModule } from './db/db.module';
import { PostsModule } from './posts/posts.module';
import { env } from './env';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: env.logLevel,
        transport:
          env.nodeEnv !== 'production'
            ? { target: 'pino-pretty', options: { singleLine: true } }
            : undefined,
      },
    }),
    DbModule,
    PostsModule,
  ],
})
export class AppModule {}
