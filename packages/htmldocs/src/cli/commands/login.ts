import chalk from "chalk";
import * as http from "http";
import { AddressInfo } from "net";
import open from "open";
import os from 'os';
import { URL } from 'url';

import { storeToken } from "../utils/token";

const apiUrl = process.env.API_URL || "http://localhost:3000";

export const login = async () => {
  const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.writeHead(200);
      res.end();
      return;
    }

    if (req.url?.startsWith("/callback") && req.method === "GET") {
      try {
        const url = new URL(req.url, `http://localhost`);
        const team_id = url.searchParams.get('team_id');
        const api_key = url.searchParams.get('api_key');

        if (team_id && api_key) {
          await storeToken(team_id, api_key);
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(`
            <!DOCTYPE html>
            <html>
              <head><title>Authentication Successful</title></head>
              <body>
                <script>window.close()</script>
                Authentication successful! You can close this window.
              </body>
            </html>
          `);
          console.log(chalk.green("Login successful and API key stored."));
          process.exit(0);
        } else {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Invalid data received");
          console.log(chalk.red("Invalid data received in the callback."));
        }
        server.close();
      } catch (error) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Error processing data");
        console.log(chalk.red("Error processing data in the callback."));
        server.close();
      }
    } else {
      res.statusCode = 404;
      res.end();
    }
  });

  server.listen(0, async () => {
    const address = server.address() as AddressInfo;
    if (address === null) {
      console.error(chalk.red("Server is not running."));
      return;
    }
    const url = new URL(`${apiUrl}/authorize`);
    
    const fullHostname = os.hostname();
    const cleanHostname = fullHostname.split('.')[0];
    
    const callbackData = {
      url: `http://localhost:${address.port}/callback`,
      hostname: cleanHostname
    };
    
    const encodedData = Buffer.from(
      JSON.stringify(callbackData)
    ).toString('base64');
    
    url.searchParams.set('callback', encodedData);
    await open(url.toString());
    console.log(
      chalk.blue("Please select a team and complete the authentication in your browser.")
    );
  });
};
