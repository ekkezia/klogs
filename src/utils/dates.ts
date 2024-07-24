const getCurrentDate = () => {
  const date = new Date();
  return date.toLocaleDateString(undefined); 
};

export default getCurrentDate