export default function makeCache(client: any) {
  return Object.freeze({
    get,
    set,
    remove,
  });

  async function get(key: string) {
    let data = null;

    try {
      await client.connect();
      data = await client.get(key);
    } catch (error) {
      console.log({ error });
      throw error;
    } finally {
      await client.disconnect();
      return JSON.parse(data);
    }
  }

  async function set(key: string, value: any) {
    try {
      await client.connect();
      await client.set(key, JSON.stringify(value));
    } catch (error) {
      throw error;
    } finally {
      return await client.disconnect();
    }
  }

  async function remove(key: string) {
    try {
      await client.connect();
      await client.del(key);
    } catch (error) {
      throw error;
    } finally {
      return await client.disconnect();
    }
  }
}
