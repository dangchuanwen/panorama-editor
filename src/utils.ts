export const generateUniqueId: () => string = () => String(Math.ceil(Date.now() * Math.random()));
