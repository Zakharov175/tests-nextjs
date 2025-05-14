export const sanitizeStr = (receivedString: string): string => {
  return !receivedString || typeof receivedString !== "string"
    ? ""
    : receivedString.trim().normalize();
};
