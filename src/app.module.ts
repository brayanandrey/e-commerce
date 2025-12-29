import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
// import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './modules/orders/orders.module';
import { UsersModule } from './src/modules/users.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          __dirname + '/**/*.entity{.ts,.js}',
          __dirname + '/modules/**/entities/*.entity{.ts,.js}',
        ],
        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
        logging: configService.get('DB_LOGGING') === 'true',
      }),
      inject: [ConfigService],
    }),
    // DatabaseModule,
    AuthModule,
    // UsersModule,
    ProductsModule,
    OrdersModule,
    UsersModule,
  ],
})
export class AppModule {}
