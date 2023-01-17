export namespace Events {
  export enum UserEvents {
    INIT = "init",
    UPDATE = "update",
    UPDATE_STATUS = "updateStatus",
    UPDATE_AVATAR = "updateAvatar",
  }

  export enum GuildUserEvents {
    JOIN_GUILD = "guildUserJoin",
    LEAVE_GUILD = "guildUserLeave",
    KICK = "guildUserKick",
    BAN = "guildUserBan",
    UNBAN = "guildUserUnban",
    UPDATE = "guildUserUpdate",
  }

  export enum GuildEvents {
    GUILD_UPDATED = "guildUpdated",
    GUILD_DELETED = "guildDeleted",
  }

  export enum ChannelEvents {
    GET_CHANNELS = "getChannels",
    GET_CHANNEL = "getChannel",
    CHANNEL_CREATED = "channelCreated",
    CHANNEL_UPDATED = "channelUpdated",
    CHANNEL_DELETED = "channelDeleted",
  }

  export enum MessageEvents {
    GET_MESSAGES = "getMessages",
    MESSAGE_CREATED = "messageCreated",
    MESSAGE_UPDATED = "messageUpdated",
    MESSAGE_DELETED = "messageDeleted",
  }
}