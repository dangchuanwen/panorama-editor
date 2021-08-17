export const generateUniqueId: () => string = () => {
  const uniqueID = String(Math.ceil(Date.now() * Math.random()));
  return uniqueID;
};
