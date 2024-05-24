import type { Ora } from 'ora';

export const closeOraOnSIGINT = (spinner: Ora) => {
  process.on('SIGINT', () => {
    spinner.stop();
  });
};