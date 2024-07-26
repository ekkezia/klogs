const getCurrentDate = () => {
  const date = new Date();
  return date.toLocaleDateString(undefined); 
};

export default getCurrentDate

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Options for formatting the date and time
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  // Format the date
  const formattedDate = date.toLocaleDateString('en-GB', options); // 'en-GB' uses DD/MM/YYYY format
  // Format the time
  const formattedTime = date.toLocaleTimeString('en-GB', timeOptions); // 'en-GB' uses HH:MM format

  // Replace slashes with underscores
  const formattedDateTime = `${formattedDate.replace(/\//g, '_')}_${formattedTime.replace(/:/g, '_')}`;

  return formattedDateTime;
}
