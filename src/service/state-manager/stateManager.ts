import { LocalState } from "@/support/LocalState";

export const saveLocalTestUrl = async (data: { name: string; url: string }) => {
  LocalState.set(data.name, data.url);
};
