const API_URL = process.env.NEXT_PUBLIC_API_URL;

type WSOptions = {
  onMessage?: (data: any) => void;
  onOpen?: () => void;
  onClose?: () => void;
};

export function createWebSocket(options: WSOptions) {
  const ws = new WebSocket("ws://localhost:8000/ws");

  ws.onopen = () => {
    options.onOpen?.();
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      options.onMessage?.(data);
    } catch {
      console.warn("Invalid JSON:", event.data);
    }
  };

  ws.onclose = () => {
    options.onClose?.();
  };

  return ws;
}