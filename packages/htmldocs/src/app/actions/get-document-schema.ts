"use server";

import path from 'node:path';
import fs from 'node:fs';
import { DOCUMENT_SCHEMAS_DIR } from '../../utils/paths';
import { JSONSchema7Definition } from 'json-schema';
import logger from '~/lib/logger';

export async function getDocumentSchema(documentPath: string): Promise<JSONSchema7Definition | null> {
  const baseName = path.basename(documentPath, path.extname(documentPath));
  const schemaPath = path.join(
    DOCUMENT_SCHEMAS_DIR,
    baseName,
    `${baseName}.schema.json`
  );
  
  try {
    if (fs.existsSync(schemaPath)) {
      const rawSchema = JSON.parse(await fs.promises.readFile(schemaPath, 'utf-8'));
      return rawSchema?.definitions?.ComponentProps || null;
    }
  } catch (error) {
    logger.warn('Failed to load schema:', error);
  }
  
  return null;
} 