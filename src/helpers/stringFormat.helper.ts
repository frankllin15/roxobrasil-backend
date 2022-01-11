export class StringFormatHelper {
  static createSlug(name: string, id: string): string {
    const endId = id.match(/[\w]{5}$/);

    name = this.toCamelCase(name)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const slug = [endId, name].join('--');

    return slug;
  }
  static toCamelCase(string: string): string {
    return string.toLocaleLowerCase().replace(/\s/g, '-');
  }
}
