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

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRoot({
      playground: true,
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ req }),
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    RolesModule,
    AuthModule,
    ProductModule,
    VariantsModule,
    CollectionsModule,
    DiscountModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
