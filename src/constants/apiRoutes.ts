import { service } from "@/utils/service";

import type { Message as MessageType } from "@/types/auth";

export enum Auth {
  login = "/auth/login",
  signup = "/auth/signup",
  me = "/auth/me",
}

export class Message {
  protected static MESSAGE_LIMIT = 50;

  public static SEND(channelID: string) {
    return this._url(channelID);
  }

  public static async GET(channelID: string) {
    return service.get<never, Array<MessageType>>(
      `${this._url(channelID)}?limit=${this.MESSAGE_LIMIT}`,
    );
  }

  protected static _url(channelID: string) {
    return `/channels/${channelID}/messages`;
  }
}
