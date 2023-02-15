import type { ComputedRef } from "vue";

export type BasicUser = {
  _id: string;
  username: string;
  discriminator: string;
};

export interface Message {
  _id: string;
  authorID: string;
  author: BasicUser;
  content: string;
  channel: Channel;
  channelID: string;
  guildID: string;
}

export interface AuthorWithMessages {
  _id: string;
  authorID: string;
  author: BasicUser;
  messages: Array<Message>;
}

export enum ChannelType {
  DM,
  GROUP_DM,
  GUILD_TEXT,
  GUILD_VOICE,
  GUILD_CATEGORY,
}

export type Channel = {
  _id: string;
  name: string;
  guildID: string;
  type: ChannelType;
  parentID: string | null;
  position: number;
  topic?: string;
  nsfw: boolean;
  usersTyping: Array<BasicUser>;
  messages: Array<Message>;
};

export type Guild = {
  _id: string;
  name: string;
  description: string;
  owner: BasicUser;
  members: Array<BasicUser>;
  channels: Array<Channel>;
  lastVisitedChannel?: string;
};

export type User = BasicUser & {
  email: string;
  guilds: Array<Guild>;
};

export type LoginResponse = User & { token: string };
