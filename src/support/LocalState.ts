import { Lowdb } from "@/lib/db/Lowdb";
import { OUT_DIR } from "./directory";

export class LocalState {
  private static state: Lowdb;

  private static initialize() {
    try {
      LocalState.state = new Lowdb(`${OUT_DIR}/data.json`);
      LocalState.state.setParent("data");
    } catch (error) {
      console.log(`Failed to initialize local state: ${error}`);
      console.log(error);
    }
  }

  public static set(key: string, value: string) {
    try {
      this.initialize();
      this.state.set(key, value);
    } catch (error) {
      console.log(`Failed to save Key: ${key} - Value: ${value}`);
      console.log(error);
    }
  }

  public static get(key: string) {
    try {
      this.initialize();
      this.state.get(key);
    } catch (error) {
      console.log(`Failed to get value for Key: ${key}`);
      console.log(error);
    }
  }
}
