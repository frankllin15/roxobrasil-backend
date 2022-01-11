
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class NewUserInput {
    firstName: string;
    lastName?: Nullable<string>;
    email: string;
    password: string;
    address?: Nullable<NewAddress>;
    roles: Nullable<string>[];
}

export class NewAddress {
    street: string;
    complement?: Nullable<string>;
    number: string;
    default?: Nullable<boolean>;
    country: string;
    state: string;
    code: string;
}

export class NewRole {
    name: string;
    description: string;
}

export class DeleteRoleInput {
    id: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class VerifyInput {
    token?: Nullable<string>;
}

export class AddRoleInput {
    id: string;
}

export class AddRoleUserInput {
    userId: string;
    roles?: Nullable<Nullable<AddRoleInput>[]>;
}

export class DeleteUserInput {
    id: string;
}

export class UserInput {
    id: string;
}

export class UpdateUserFildsInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    address?: Nullable<NewAddress>;
}

export class UpdateUserInput {
    id: string;
    data?: Nullable<UpdateUserFildsInput>;
}

export class NewProductInput {
    name: string;
    descrition?: Nullable<string>;
    variants?: Nullable<Nullable<NewVariantInput>[]>;
}

export class NewVariantInput {
    name: string;
    assets?: Nullable<Nullable<NewAssetsInput>[]>;
    price: number;
    quantity: number;
    size?: Nullable<string>;
    color?: Nullable<string>;
}

export class NewAssetsInput {
    source: string;
    width?: Nullable<number>;
    height?: Nullable<number>;
}

export class GetListInput {
    take?: Nullable<number>;
}

export class GetProductBySlugInput {
    slug: string;
}

export class DeleteInput {
    id: string;
}

export class UpdateProductFieldsInput {
    name?: Nullable<string>;
    descrition?: Nullable<string>;
    variants?: Nullable<Nullable<NewVariantInput>[]>;
    collections?: Nullable<Nullable<ConnectionInput>[]>;
}

export class UpdateProductInput {
    id: string;
    data?: Nullable<UpdateProductFieldsInput>;
}

export class UpdateVariantsFielsInput {
    id: string;
    name?: Nullable<string>;
    assets?: Nullable<Nullable<NewAssetsInput>[]>;
    price?: Nullable<number>;
    quantity?: Nullable<number>;
    size?: Nullable<string>;
    color?: Nullable<string>;
}

export class UpdateVariantsInput {
    product_id: string;
    variants?: Nullable<Nullable<UpdateVariantsFielsInput>[]>;
}

export class ConnectionInput {
    id?: Nullable<string>;
}

export class NewCollectionInput {
    name: string;
    description?: Nullable<string>;
    parent?: Nullable<Nullable<ConnectionInput>[]>;
    children?: Nullable<Nullable<ConnectionInput>[]>;
}

export class Role {
    id?: Nullable<string>;
    name?: Nullable<string>;
    description?: Nullable<string>;
    Users?: Nullable<Nullable<User>[]>;
    created_at?: Nullable<string>;
}

export class Address {
    id: string;
    street: string;
    complement?: Nullable<string>;
    default: boolean;
    number: string;
    country: string;
    state: string;
    code: string;
    user_id: string;
    user: User;
}

export class User {
    id: string;
    firstName: string;
    lastName?: Nullable<string>;
    email: string;
    password: string;
    roles?: Nullable<Nullable<Role>[]>;
    address?: Nullable<Nullable<Address>[]>;
    created_at: string;
}

export class Product {
    id: string;
    name: string;
    slug: string;
    descrition?: Nullable<string>;
    variants?: Nullable<Nullable<Variant>[]>;
    price?: Nullable<Price>;
    collections?: Nullable<Nullable<Collection>[]>;
}

export class Variant {
    id: string;
    name: string;
    size?: Nullable<string>;
    color?: Nullable<string>;
    info?: Nullable<string>;
    assets?: Nullable<Nullable<Assets>[]>;
    product?: Nullable<Product>;
    price: number;
    quantity: number;
    in_stock?: Nullable<boolean>;
}

export class Price {
    id: number;
    max: number;
    min: number;
    product?: Nullable<Product>;
}

export class Assets {
    id: number;
    source: string;
    width?: Nullable<number>;
    height?: Nullable<number>;
    mime_type?: Nullable<string>;
    variant_id: string;
    variant: Variant;
}

export class Collection {
    id: string;
    name: string;
    description?: Nullable<string>;
    products?: Nullable<Nullable<Product>[]>;
    children?: Nullable<Nullable<Collection>[]>;
    parent?: Nullable<Nullable<Collection>[]>;
    created_at?: Nullable<string>;
}

export class Error {
    message?: Nullable<string>;
    code?: Nullable<string>;
}

export class DefaultResult {
    errors?: Nullable<Nullable<Error>[]>;
    success?: Nullable<boolean>;
}

export class CreateRoleResult {
    errors?: Nullable<Nullable<Error>[]>;
    success?: Nullable<boolean>;
    role?: Nullable<Role>;
}

export class RolesResult {
    errors?: Nullable<Nullable<Error>[]>;
    success?: Nullable<boolean>;
    roles?: Nullable<Nullable<Role>[]>;
}

export class RoleResult {
    errors?: Nullable<Nullable<Error>[]>;
    success?: Nullable<boolean>;
    role?: Nullable<Role>;
}

export class UserResult {
    errors?: Nullable<Nullable<Error>[]>;
    success?: Nullable<boolean>;
    user?: Nullable<User>;
}

export class UsersResult {
    errors?: Nullable<Nullable<Error>[]>;
    success?: Nullable<boolean>;
    users?: Nullable<Nullable<User>[]>;
}

export class DeleteResult {
    errors?: Nullable<Nullable<Error>[]>;
    success?: Nullable<boolean>;
}

export class LoginResult {
    access_token?: Nullable<string>;
    user?: Nullable<User>;
}

export class CreateUserResult {
    access_token?: Nullable<string>;
    user?: Nullable<User>;
}

export class ProductResult {
    success?: Nullable<boolean>;
    errors?: Nullable<Nullable<Error>[]>;
    product?: Nullable<Product>;
}

export class ProductsResult {
    success?: Nullable<boolean>;
    errors?: Nullable<Nullable<Error>[]>;
    products?: Nullable<Nullable<Product>[]>;
    total_items?: Nullable<number>;
}

export class VariantsResult {
    success?: Nullable<boolean>;
    errors?: Nullable<Nullable<Error>[]>;
    variants?: Nullable<Nullable<Variant>[]>;
}

export class CollectionResult {
    success?: Nullable<boolean>;
    errors?: Nullable<Nullable<Error>[]>;
    collection?: Nullable<Collection>;
}

export class CollectionsResult {
    success?: Nullable<boolean>;
    errors?: Nullable<Nullable<Error>[]>;
    collections?: Nullable<Nullable<Collection>[]>;
}

export class DeleteAllProductsResult {
    count?: Nullable<number>;
}

export abstract class IQuery {
    abstract users(): Nullable<UsersResult> | Promise<Nullable<UsersResult>>;

    abstract user(input?: Nullable<UserInput>): Nullable<UserResult> | Promise<Nullable<UserResult>>;

    abstract roles(): Nullable<RolesResult> | Promise<Nullable<RolesResult>>;

    abstract products(input?: Nullable<GetListInput>): ProductsResult | Promise<ProductsResult>;

    abstract getProductBySlug(input?: Nullable<GetProductBySlugInput>): ProductResult | Promise<ProductResult>;

    abstract collections(input?: Nullable<GetListInput>): CollectionsResult | Promise<CollectionsResult>;
}

export abstract class IMutation {
    abstract createUser(input?: Nullable<NewUserInput>): Nullable<CreateUserResult> | Promise<Nullable<CreateUserResult>>;

    abstract updateUser(input?: Nullable<UpdateUserInput>): UserResult | Promise<UserResult>;

    abstract deleteUser(input?: Nullable<DeleteUserInput>): DeleteResult | Promise<DeleteResult>;

    abstract createRole(input?: Nullable<NewRole>): CreateRoleResult | Promise<CreateRoleResult>;

    abstract deleteRole(input?: Nullable<DeleteRoleInput>): DeleteResult | Promise<DeleteResult>;

    abstract addRolesUser(input?: Nullable<AddRoleUserInput>): DefaultResult | Promise<DefaultResult>;

    abstract login(input?: Nullable<LoginInput>): Nullable<LoginResult> | Promise<Nullable<LoginResult>>;

    abstract verify(): Nullable<User> | Promise<Nullable<User>>;

    abstract createProduct(input?: Nullable<NewProductInput>): ProductResult | Promise<ProductResult>;

    abstract deleteProduct(input?: Nullable<DeleteInput>): DefaultResult | Promise<DefaultResult>;

    abstract deleteAllProducts(): Nullable<DeleteAllProductsResult> | Promise<Nullable<DeleteAllProductsResult>>;

    abstract updateProduct(input?: Nullable<UpdateProductInput>): ProductResult | Promise<ProductResult>;

    abstract updateVariants(input?: Nullable<UpdateVariantsInput>): VariantsResult | Promise<VariantsResult>;

    abstract createCollection(input?: Nullable<NewCollectionInput>): CollectionResult | Promise<CollectionResult>;

    abstract deleteCollection(input?: Nullable<DeleteInput>): DefaultResult | Promise<DefaultResult>;
}

type Nullable<T> = T | null;