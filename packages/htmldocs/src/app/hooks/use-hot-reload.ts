'use client';
import { useEffect, useRef } from 'react';
import { type Socket, io } from 'socket.io-client';
import type { HotReloadChange } from '../../utils/types/hot-reload-change';

// Create a singleton socket instance
let globalSocket: Socket | null = null;

/**
 * Hook that detects any "reload" event sent from the CLI's web socket
 * and calls the received parameter callback
 */
export const useHotreload = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onShouldReload: (changes: HotReloadChange[]) => any,
) => {
  useEffect(() => {
    if (!globalSocket) {
      globalSocket = io();
    }

    globalSocket.on('reload', (changes: HotReloadChange[]) => {
      console.log('Reloading...');
      void onShouldReload(changes);
    });

    return () => {
      // Only remove this specific listener, don't disconnect the socket
      globalSocket?.off('reload');
    };
  }, [onShouldReload]);
};