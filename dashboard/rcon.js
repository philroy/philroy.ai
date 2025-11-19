const { Rcon } = require("rcon-client");

module.exports = {
  async send(cmd) {
    const rcon = await Rcon.connect({
      host: "127.0.0.1",
      port: 25575,
      password: "YOUR_RCON_PASSWORD"
    });

    const response = await rcon.send(cmd);
    rcon.end();
    return response;
  }
};
