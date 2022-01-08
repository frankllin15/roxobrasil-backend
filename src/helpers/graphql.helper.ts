export class GraphqlHelper {
  static createGenericErrorResult(error) {
    return {
      success: false,
      errors: [
        {
          message: error.message,
          code: error.code,
        },
      ],
    };
  }
}
