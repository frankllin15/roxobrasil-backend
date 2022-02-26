import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { VariantsModule } from './variants/variants.module';
import { CollectionsModule } from './collections/collections.module';
import { DiscountModule } from './discount/discount.module';
// import { GraphQLDate } from 'graphql-iso-date';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRoot({
      playground: true,
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ req }),
    }),

    RolesModule,
    AuthModule,
    ProductModule,
    VariantsModule,
    CollectionsModule,
    DiscountModule,
    CartModule,
    OrderModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
