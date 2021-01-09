export const PUBLIC_GUILD_ID = '1';
export const PUBLIC_GUILD_NAME = 'Public';
export const userGuildOptions = (guilds) => {
  return guilds.map(g => {
    return { label: g.name, value: g.id}
  });
};

export const parseGuildName = (guilds, guildId) => {
  const selectedGuild = guilds.find(g => g.id === guildId);
  return selectedGuild ? selectedGuild.name : PUBLIC_GUILD_NAME;
};
