import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { ProductModule } from './modules/product/product.module';
import { VariantsModule } from './modules/variants/variants.module';
import { CollectionsModule } from './modules/collections/collections.module';
import { DiscountModule } from './modules/discount/discount.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { UploadModule } from './modules/upload/upload.module';
import { StorageModule } from './modules/storage/storage.module';
import { AssetsModule } from './modules/assets/assets.module';

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
    StorageModule,
    AssetsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
