export const sanitizeStr = (receivedString: string): string => {
  return !receivedString || typeof receivedString !== "string"
    ? ""
    : receivedString.trim().normalize();
};

console.log("Current_env =",process.env.CURRENT_TEST);
