import chalk from "chalk";
import * as http from "http";
import { AddressInfo } from "net";
import open from "open";

import { storeToken } from "../utils/token";

const apiUrl = "http://localhost:3001";

export const login = async () => {
  const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.url?.startsWith("/callback")) {
      const address = server.address() as AddressInfo;
      if (address === null) {
        console.error("Server is not running.");
        res.end("Server error.");
        return;
      }
      const url = new URL(req.url, `http://localhost:${address.port}`);
      const teamId = url.searchParams.get("team_id");
      const tokenId = url.searchParams.get("token_id");
      const tokenSecret = url.searchParams.get("token_secret");

      if (teamId && tokenId && tokenSecret) {
        await storeToken(teamId, tokenId, tokenSecret);
        res.end("Authentication successful! You can close this window.");
        console.log(chalk.green("Login successful and tokens stored."));
      } else {
        res.end("No team specified or tokens received!");
        console.log(
          chalk.red("No team specified or tokens received in the callback URL.")
        );
      }
      server.close();
    } else {
      res.statusCode = 404;
      res.end();
    }
  });

  server.listen(0, async () => {
    const address = server.address() as AddressInfo;
    if (address === null) {
      console.error("Server is not running.");
      return;
    }
    const url = new URL(`${apiUrl}/authorize`);
    const encodedCallbackUri = Buffer.from(
      `http://localhost:${address.port}/callback`
    ).toString("base64");
    url.searchParams.set("callback", encodedCallbackUri);
    await open(url.toString());
    console.log(
      chalk.blue("Please complete the authentication in your browser.")
    );
  });
};
