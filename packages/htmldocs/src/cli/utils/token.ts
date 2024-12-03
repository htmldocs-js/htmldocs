import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { z } from "zod";

const TokenConfigSchema = z.object({
  team_id: z.string(),
  api_key: z.string(),
});

type TokenConfig = z.infer<typeof TokenConfigSchema>;

const configPath = path.join(os.homedir(), ".htmldocs.json");

export async function storeToken(teamId: string, apiKey: string) {
  const configData: TokenConfig = {
    team_id: teamId,
    api_key: apiKey,
  };
  fs.writeFileSync(configPath, JSON.stringify(configData, null, 2));
}

export async function getToken(): Promise<TokenConfig> {
  try {
    const configData = fs.readFileSync(configPath, "utf8");
    const parsedData = TokenConfigSchema.safeParse(JSON.parse(configData));
    if (!parsedData.success) {
      console.error("Invalid token configuration:", parsedData.error);
      throw new Error("Invalid token configuration");
    }
    return parsedData.data;
  } catch (error) {
    console.error("Error reading or parsing token config:", error);
    throw new Error("Invalid token configuration");
  }
}