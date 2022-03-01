
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export type DiscounType = "PERCENT" | "VALUE";
export type PaymentMethod = "credit" | "debit" | "payment_slip";

export class NewUserInput {
    firstName: string;
    lastName?: Nullable<string>;
    email: string;
    password: string;
    address?: Nullable<NewAddress>;
    phoneNumber?: Nullable<string>;
    roles: Nullable<string>[];
}

export class NewAddress {
    street: string;
    complement?: Nullable<string>;
    number: string;
    default?: Nullable<boolean>;
    country: string;
    district: string;
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
    description?: Nullable<string>;
    variants?: Nullable<Nullable<NewVariantInput>[]>;
}

export class NewVariantInput {
    name: string;
    assets?: Nullable<Nullable<IdInput>[]>;
    price: number;
    quantity: number;
    size?: Nullable<string>;
    color?: Nullable<string>;
}

export class NewAssetsInput {
    source: string;
    width?: Nullable<number>;
    height?: Nullable<number>;
    base64Url?: Nullable<string>;
    mime_type?: Nullable<string>;
}

export class GetListInput {
    take?: Nullable<number>;
}

export class GetProductBySlugInput {
    slug: string;
}

export class UpdateProductFieldsInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    variants?: Nullable<Nullable<NewVariantInput>[]>;
    collections?: Nullable<Nullable<IdInput>[]>;
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

export class IdInput {
    id?: Nullable<string>;
}

export class IntIdInput {
    id?: Nullable<number>;
}

export class IdListInput {
    ids?: Nullable<Nullable<string>[]>;
}

export class NewCollectionInput {
    name: string;
    description?: Nullable<string>;
    parent?: Nullable<Nullable<IdInput>[]>;
    children?: Nullable<Nullable<IdInput>[]>;
}

export class NewDiscountInput {
    name: string;
    description?: Nullable<string>;
    type?: Nullable<DiscounType>;
    products?: Nullable<Nullable<IdInput>[]>;
    value: number;
    expires: Date;
}

export class ProductDiscountInput {
    discount_id?: Nullable<string>;
    products?: Nullable<Nullable<IdInput>[]>;
}

export class NewCart {
    products?: Nullable<Nullable<IdInput>[]>;
    user_id: string;
}

export class UpdateCartFields {
    products?: Nullable<Nullable<IdInput>[]>;
}

export class UpdateCartInput {
    id: string;
    data: UpdateCartFields;
}

export class Role {
    id?: Nullable<string>;
    name?: Nullable<string>;
    description?: Nullable<string>;
    Users?: Nullable<Nullable<User>[]>;
    created_at?: Nullable<Date>;
}

export class Address {
    id: string;
    street: string;
    complement?: Nullable<string>;
    default: boolean;
    number: string;
    country: string;
    district: string;
    state: string;
    code: string;
    user_id: string;
    created_at: Date;
}

export class User {
    id: string;
    firstName: string;
    lastName?: Nullable<string>;
    email: string;
    password: string;
    phoneNumber?: Nullable<string>;
    address?: Nullable<Nullable<Address>[]>;
    payment_method?: Nullable<Payment>;
    roles?: Nullable<Nullable<Role>[]>;
    created_at: Date;
}

export class Payment {
    id: string;
    user: User;
    method?: Nullable<PaymentMethod>;
    card_number?: Nullable<string>;
    security_code?: Nullable<string>;
    validate?: Nullable<Date>;
}

export class Order {
    id: string;
    products?: Nullable<Nullable<Variant>[]>;
    payment: Payment;
    status: string;
    delivery_address: Address;
    created_at?: Nullable<Date>;
}

export class Cart {
    id: string;
    products?: Nullable<Nullable<Variant>[]>;
    user_id: string;
    created_at?: Nullable<Date>;
}

export class Product {
    id: string;
    name: string;
    slug: string;
    description?: Nullable<string>;
    variants?: Nullable<Nullable<Variant>[]>;
    price?: Nullable<Price>;
    collections?: Nullable<Nullable<Collection>[]>;
    discount?: Nullable<Nullable<Discount>[]>;
    created_at?: Nullable<Date>;
}

export class Variant {
    id: string;
    name: string;
    size?: Nullable<string>;
    color?: Nullable<string>;
    info?: Nullable<string>;
    assets?: Nullable<Nullable<Assets>[]>;
    SKU?: Nullable<string>;
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
    id: string;
    source: string;
    width?: Nullable<number>;
    height?: Nullable<number>;
    mime_type?: Nullable<string>;
    base64Url?: Nullable<string>;
}

export class Collection {
    id: string;
    name: string;
    description?: Nullable<string>;
    products?: Nullable<Nullable<Product>[]>;
    children?: Nullable<Nullable<Collection>[]>;
    parent?: Nullable<Nullable<Collection>[]>;
    created_at?: Nullable<Date>;
}

export class Discount {
    id: string;
    name: string;
    description?: Nullable<string>;
    type: DiscounType;
    products?: Nullable<Nullable<Product>[]>;
    value: number;
    created_at: Date;
    expires: Date;
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
    count?: Nullable<number>;
}

export class LoginResult {
    success?: Nullable<boolean>;
    access_token?: Nullable<string>;
    user?: Nullable<User>;
}

export class CreateUserResult {
    success?: Nullable<boolean>;
    errors?: Nullable<Nullable<Error>[]>;
    access_token?: Nullable<string>;
    user?: Nullable<User>;
}

export class ProductResult {
    success?: Nullable<boolean>;
    errors?: Nullable<Nullable<Error>[]>;
    item?: Nullable<Product>;
}

export class ProductsResult {
    success?: Nullable<boolean>;
    errors?: Nullable<Nullable<Error>[]>;
    items?: Nullable<Nullable<Product>[]>;
    total_items?: Nullable<number>;
}

export class VariantsResult {
    success?: Nullable<boolean>;
    errors?: Nullable<Nullable<Error>[]>;
    items?: Nullable<Nullable<Variant>[]>;
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

export class DiscountResult {
    errors?: Nullable<Nullable<Error>[]>;
    success?: Nullable<boolean>;
    discount?: Nullable<Discount>;
}

export class DiscountsResult {
    errors?: Nullable<Nullable<Error>[]>;
    success?: Nullable<boolean>;
    discounts?: Nullable<Nullable<Discount>[]>;
}

export class AddressResult {
    success?: Nullable<boolean>;
    errors?: Nullable<Nullable<Error>[]>;
    address?: Nullable<Nullable<Address>[]>;
}

export class CartResult {
    errors?: Nullable<Nullable<Error>[]>;
    success?: Nullable<boolean>;
    cart?: Nullable<Cart>;
}

export class CartsResult {
    errors?: Nullable<Nullable<Error>[]>;
    success?: Nullable<boolean>;
    carts?: Nullable<Nullable<Cart>[]>;
}

export class ListAssetsResult {
    errors?: Nullable<Nullable<Error>[]>;
    success?: Nullable<boolean>;
    items?: Nullable<Nullable<Assets>[]>;
}

export class AssetsResult {
    errors?: Nullable<Nullable<Error>[]>;
    success?: Nullable<boolean>;
    item?: Nullable<Assets>;
}

export abstract class IQuery {
    abstract users(): UsersResult | Promise<UsersResult>;

    abstract user(input?: Nullable<UserInput>): UserResult | Promise<UserResult>;

    abstract userAddress(input?: Nullable<IdInput>): AddressResult | Promise<AddressResult>;

    abstract userCart(input?: Nullable<IdInput>): CartResult | Promise<CartResult>;

    abstract roles(): Nullable<RolesResult> | Promise<Nullable<RolesResult>>;

    abstract products(input?: Nullable<GetListInput>): ProductsResult | Promise<ProductsResult>;

    abstract getProductBySlug(input?: Nullable<GetProductBySlugInput>): ProductResult | Promise<ProductResult>;

    abstract variants(input?: Nullable<IdListInput>): VariantsResult | Promise<VariantsResult>;

    abstract collections(input?: Nullable<GetListInput>): CollectionsResult | Promise<CollectionsResult>;

    abstract collection(input?: Nullable<IdInput>): CollectionResult | Promise<CollectionResult>;

    abstract discount(input?: Nullable<IdInput>): DiscountResult | Promise<DiscountResult>;

    abstract discounts(input?: Nullable<GetListInput>): DiscountsResult | Promise<DiscountsResult>;

    abstract cart(input?: Nullable<IdInput>): CartResult | Promise<CartResult>;

    abstract carts(): CartsResult | Promise<CartsResult>;

    abstract assets(input?: Nullable<GetListInput>): ListAssetsResult | Promise<ListAssetsResult>;
}

export abstract class IMutation {
    abstract createUser(input?: Nullable<NewUserInput>): Nullable<CreateUserResult> | Promise<Nullable<CreateUserResult>>;

    abstract updateUser(input?: Nullable<UpdateUserInput>): UserResult | Promise<UserResult>;

    abstract deleteUser(input?: Nullable<DeleteUserInput>): DeleteResult | Promise<DeleteResult>;

    abstract deleteAddress(input?: Nullable<IdInput>): DefaultResult | Promise<DefaultResult>;

    abstract createRole(input?: Nullable<NewRole>): CreateRoleResult | Promise<CreateRoleResult>;

    abstract deleteRole(input?: Nullable<DeleteRoleInput>): DeleteResult | Promise<DeleteResult>;

    abstract addRolesUser(input?: Nullable<AddRoleUserInput>): DefaultResult | Promise<DefaultResult>;

    abstract login(input?: Nullable<LoginInput>): Nullable<LoginResult> | Promise<Nullable<LoginResult>>;

    abstract verify(): Nullable<User> | Promise<Nullable<User>>;

    abstract createProduct(input?: Nullable<NewProductInput>): ProductResult | Promise<ProductResult>;

    abstract deleteProduct(input?: Nullable<IdInput>): DefaultResult | Promise<DefaultResult>;

    abstract updateProduct(input?: Nullable<UpdateProductInput>): ProductResult | Promise<ProductResult>;

    abstract updateVariants(input?: Nullable<UpdateVariantsInput>): VariantsResult | Promise<VariantsResult>;

    abstract deleteVariants(input?: Nullable<IdListInput>): DeleteResult | Promise<DeleteResult>;

    abstract createCollection(input?: Nullable<NewCollectionInput>): DiscountResult | Promise<DiscountResult>;

    abstract addProductsDiscount(input?: Nullable<ProductDiscountInput>): DiscountResult | Promise<DiscountResult>;

    abstract removeProductsDiscount(input?: Nullable<ProductDiscountInput>): DiscountResult | Promise<DiscountResult>;

    abstract deleteCollection(input?: Nullable<IdInput>): DefaultResult | Promise<DefaultResult>;

    abstract createDiscount(input?: Nullable<NewDiscountInput>): DiscountResult | Promise<DiscountResult>;

    abstract createCart(input?: Nullable<NewCart>): CartResult | Promise<CartResult>;

    abstract updateCart(input?: Nullable<UpdateCartInput>): CartResult | Promise<CartResult>;

    abstract deleteCart(input?: Nullable<IdInput>): DefaultResult | Promise<DefaultResult>;

    abstract createAssets(input?: Nullable<NewAssetsInput>): AssetsResult | Promise<AssetsResult>;
}

type Nullable<T> = T | null;
