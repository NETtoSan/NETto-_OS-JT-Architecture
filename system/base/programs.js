class Program {
  constructor(
    bot,
    {
      name = null,
      description = "No description provided.",
      category = "Miscellaneous",
      usage = "No usage provided.",
      enabled = true,
      aliases = new Array(),
      permissions = "No permission provided"
    }
  ) {
    this.bot = bot;
    this.conf = { enabled, aliases, permissions };
    this.help = { name, description, category, usage };
  }
}
module.exports = Program;
