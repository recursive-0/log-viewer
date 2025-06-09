export const formatTimestamp = (timestamp: string) => {
  return new Date(parseInt(timestamp)).toLocaleString();
};
