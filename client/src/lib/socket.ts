import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SERVER_URL = import.meta.env.VITE_SERVER_URL as string | undefined;
export const socket = io(SERVER_URL || undefined, { autoConnect: false });

export type Conn = 'unset' | 'connecting' | 'online' | 'offline';

export function useConnection(): Conn {
  const [conn, setConn] = useState<Conn>(SERVER_URL ? 'connecting' : 'unset');
  useEffect(() => {
    if (!SERVER_URL) return;
    const on = () => setConn('online');
    const off = () => setConn('offline');
    socket.on('connect', on); socket.on('disconnect', off); socket.on('connect_error', off);
    if (socket.connected) on(); else socket.connect();
    return () => { socket.off('connect', on); socket.off('disconnect', off); socket.off('connect_error', off); };
  }, []);
  return conn;
}
