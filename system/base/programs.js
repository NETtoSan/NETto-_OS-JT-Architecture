class Command {
    constructor(client, {
      name = null,
      description = "No description provided.",
      category = "Miscellaneous",
      usage = "No usage provided.",
      enabled = true,
      guildOnly = true,
      aliases = new Array(),
      permLevel = "User",
      restrictChannel = "default",
      ntEquivalent = "NETto!_NT dev"
    }) {
      this.client = client;
      this.conf = { enabled, guildOnly, aliases, permLevel, restrictChannel, ntEquivalent};
      this.help = { name, description, category, usage };
    }
  }
  module.exports = Command;
