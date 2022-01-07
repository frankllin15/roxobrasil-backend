
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

export abstract class IQuery {
    abstract users(): Nullable<UsersResult> | Promise<Nullable<UsersResult>>;

    abstract user(id: string): Nullable<UserResult> | Promise<Nullable<UserResult>>;

    abstract roles(): Nullable<RolesResult> | Promise<Nullable<RolesResult>>;
}

export abstract class IMutation {
    abstract createUser(input?: Nullable<NewUserInput>): Nullable<CreateUserResult> | Promise<Nullable<CreateUserResult>>;

    abstract deleteUser(input?: Nullable<DeleteUserInput>): DeleteResult | Promise<DeleteResult>;

    abstract createRole(input?: Nullable<NewRole>): CreateRoleResult | Promise<CreateRoleResult>;

    abstract deleteRole(input?: Nullable<DeleteRoleInput>): DeleteResult | Promise<DeleteResult>;

    abstract login(input?: Nullable<LoginInput>): Nullable<LoginResult> | Promise<Nullable<LoginResult>>;

    abstract verify(): Nullable<User> | Promise<Nullable<User>>;

    abstract addRolesUser(input?: Nullable<AddRoleUserInput>): DefaultResult | Promise<DefaultResult>;
}

type Nullable<T> = T | null;
