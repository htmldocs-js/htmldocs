import type { HotReloadEvent } from './hotReloadEvent';

export interface HotReloadChange {
  filename: string;
  event: HotReloadEvent;
}