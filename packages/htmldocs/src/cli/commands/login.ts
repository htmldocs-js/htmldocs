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
      const code = url.searchParams.get("code");
      const tokenId = url.searchParams.get("token_id");
      const tokenSecret = url.searchParams.get("token_secret");

      if (tokenId && tokenSecret) {
        // storeToken(tokenId, tokenSecret);
        res.end("Authentication successful! You can close this window.");
        console.log(chalk.green("Login successful and tokens stored."));
      } else if (code) {
        const tokenData = await verifyCodeWithApi(code);
        if (tokenData) {
          storeToken(tokenData.token_id, tokenData.token_secret);
          res.end("Authentication successful! You can close this window.");
          console.log(chalk.green("Login successful and tokens stored."));
        } else {
          res.end("Authentication failed!");
          console.log(chalk.red("Authentication failed!"));
        }
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
    const authUrl = `${apiUrl}/authorize?redirect_uri=http://localhost:${server.address().port}/callback`;
    await open(authUrl);
    console.log(
      chalk.blue("Please complete the authentication in your browser.")
    );
  });
};

async function verifyCodeWithApi(code: string) {
  console.log("verifying code with api");
  const response = await fetch(`${apiUrl}/api/auth/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  if (response.ok) {
    console.log("verified code with api");
    return response.json();
  } else {
    console.error(chalk.red("Error verifying code."));
    return null;
  }
}

function storeToken(tokenId: string, tokenSecret: string) {
  const configData = JSON.stringify({
    token_id: tokenId,
    token_secret: tokenSecret,
  });
  fs.writeFileSync(configPath, configData);
}
