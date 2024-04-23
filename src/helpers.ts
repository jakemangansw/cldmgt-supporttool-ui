import { SocketEvent } from "./models/SocketEvent"

export const emit = (ws: WebSocket, eventName: string, eventData: any) => {
  let event: SocketEvent = {
    eventType: eventName,
    data: JSON.stringify(eventData)
  }
  ws.send(JSON.stringify(event))
}

export const getColorByValue = (value: number) => {
  // Ensure the value is within the range of 0-100
  value = Math.min(Math.max(value, 0), 100);

  // Define an array of ten hex colors
  const colors = [
    "#000000",
    "#ff0000",
    "#ff4400",
    "#ff8800",
    "#ffcc00",
    "#ffd600",
    "#b9ff00",
    "#d7ff00",
    "#acff00",
    "#86ff00",
    "#3fc59d"
  ];

  // Calculate the index based on the value
  const index = Math.floor((value / 100) * colors.length-1);
  return colors[index] ?? "ff0000";
}

export const getWidthByValue = (value: number) => {
  // Ensure the value is within the range of 0-100
  value = Math.min(Math.max(value, 0), 100);

  // Calculate the index based on the value
  const index = Math.floor((value / 100) * 10-1);
  return index*10;
}