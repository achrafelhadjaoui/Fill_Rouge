import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config.app'; 
import databaseConfig from './config/database.config';  // Fixed the typo in the directory name
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entity/users.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { VehiclesModule } from './vehicles/vehicles.module';
import jwtConfig from './config/jwt_config';
import googleConfig from './config/google-oauth.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Makes the configuration globally available
      load: [config, databaseConfig, jwtConfig, googleConfig],  // Load custom configurations
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],  // Import ConfigModule to use ConfigService
      inject: [ConfigService],   // Inject ConfigService
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',  // Specify the database type
        host: configService.get<string>('database.host'),  // Accessing database host
        port: +configService.get<number>('database.port'),  // Accessing database port
        username: configService.get<string>('database.username'),  // Accessing username from environment
        password: configService.get<string>('database.password'),  // Accessing password from environment
        database: configService.get<string>('database.database'),  // Accessing database name from environment
        //entities: [],  // Path to your entities
        synchronize: false,  // Automatically synchronize schema (for development)
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    UsersModule,
    VehiclesModule,
  ],
  controllers: [AppController],
  providers: [AppService,

    // make the guard global
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
