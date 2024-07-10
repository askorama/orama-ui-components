export class AttributeUtils {
  static getNonExplicitAttributes(element: HTMLElement, explicitProps: string[]): { [key: string]: string } {
    const allAttributes = Array.from(element.attributes);
    return allAttributes.reduce((acc, attr) => {
      if (!explicitProps.includes(attr.name)) {
        acc[attr.name] = attr.value;
      }
      return acc;
    }, {});
  }
}
