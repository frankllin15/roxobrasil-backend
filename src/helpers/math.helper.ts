export class MathHelper {
  static max(values: number[]) {
    return values.reduce((prev, current) => {
      return current > prev ? current : prev;
    }, values[0]);
  }

  static min(values: number[]) {
    return values.reduce((prev, current) => {
      return current < prev ? current : prev;
    }, values[0]);
  }
}
