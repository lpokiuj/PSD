import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassTransformer } from 'class-transformer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        // .env
        ConfigModule.forRoot({
            isGlobal: true,
        }),

        // TypeORM
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    type: 'mysql',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    entities: [UserEntity],
                    synchronize: true,
                };
            },
        }),

        UsersModule,

        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,

        // Class Validator
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },

        // Class Transformer
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassTransformer,
        },
    ],
})
export class AppModule {}
