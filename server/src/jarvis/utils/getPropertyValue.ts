import { ElementHandle } from "puppeteer";

export default async function (el: ElementHandle<any>, propName: string) {
  try {
    const prop = await el.getProperty(propName);
    return await prop.jsonValue();
  } catch (err) {
    throw err;
  }
}
