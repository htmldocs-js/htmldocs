import chalk from "chalk";
import * as http from "http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import open from "open";

const configPath = path.join(os.homedir(), ".htmldocs.json");
const apiUrl = "http://localhost:3001";

export const login = async () => {
  const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.url?.startsWith("/callback")) {
      const url = new URL(req.url, `http://localhost:${server.address().port}`);
      const tokenId = url.searchParams.get("token_id");
      const tokenSecret = url.searchParams.get("token_secret");

      if (tokenId && tokenSecret) {
        await storeToken(tokenId, tokenSecret);
        res.end("Authentication successful! You can close this window.");
        console.log(chalk.green("Login successful and tokens stored."));
      } else {
        res.end("No code or tokens received!");
        console.log(
          chalk.red("No code or tokens received in the callback URL.")
        );
      }
      server.close();
    } else {
      res.statusCode = 404;
      res.end();
    }
  });

  server.listen(0, async () => {
    const url = new URL(`${apiUrl}/authorize`);
    const encodedCallbackUri = Buffer.from(`http://localhost:${server.address().port}/callback`).toString('base64');
    url.searchParams.set("callback", encodedCallbackUri);
    await open(url.toString());
    console.log(
      chalk.blue("Please complete the authentication in your browser.")
    );
  });
};

async function storeToken(tokenId: string, tokenSecret: string) {
  const configData = JSON.stringify({
    token_id: tokenId,
    token_secret: tokenSecret,
  });
  fs.writeFileSync(configPath, configData);
}
