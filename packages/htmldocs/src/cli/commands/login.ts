import chalk from "chalk";
import * as http from "http";
import { AddressInfo } from "net";
import open from "open";

import { storeToken } from "../utils/token";

const apiUrl = "http://localhost:3000";

export const login = async () => {
  const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.writeHead(200);
      res.end();
      return;
    }

    if (req.url?.startsWith("/callback") && req.method === "POST") {
      let body = "";
      req.on("data", chunk => {
        body += chunk.toString();
      });
      req.on("end", async () => {
        try {
          const { team_id, token_id, token, token_secret } = JSON.parse(body);

          if (team_id && token_id && token && token_secret) {
            await storeToken(team_id, token_id, token, token_secret);
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Authentication successful! You can close this window.");
            console.log(chalk.green("Login successful and tokens stored."));
          } else {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("Invalid data received");
            console.log(
              chalk.red("Invalid data received in the callback.")
            );
          }
        } catch (error) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Error processing data");
          console.log(
            chalk.red("Error processing data in the callback.")
          );
        }
        server.close();
      });
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
      chalk.blue("Please select a team and complete the authentication in your browser.")
    );
  });
};
