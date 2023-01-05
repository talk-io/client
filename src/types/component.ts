export interface Author {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  authorID: string;
  author: Author;
  content: string;
  channelID: string;
  guildID: string;
}

export interface Channel {
  id: string;
  name: string;
  guildID: string;
  messages: Array<Message>;
}

export interface Category {
  id: string;
  name: string;
  guildID: string;
  channels: Array<Channel>;
}

export interface Guild {
  id: string;
  name: string;
  categories: Array<Category>;
  lastVisitedChannel?: string;
}
