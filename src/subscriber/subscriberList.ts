import SubscriberType from "@/constant/SubscriberType";
import { subscriber } from "./subscriber";
import { saveLocalTestUrl } from "@/service/state-manager/stateManager";

export const registerSubscribers = () => {
  subscriber.subscribe(SubscriberType.SAVE_LOCAL_TEST_URL, saveLocalTestUrl);
};
