export interface IGqlIncludes {
  roles: boolean;
  address: boolean;
}

export class UsersHelpers {
  static gqlIncludes(info): IGqlIncludes {
    return {
      roles: Object.keys(info.User?.roles).length > 0,
      address: Object.keys(info.User?.address).length > 0,
    };
  }
}
