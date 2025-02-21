const getCurrentDate = () => {
  const date = new Date()
  // console.log("date", date)
  return date.toLocaleDateString(undefined)
}

export default getCurrentDate

export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  // Options for formatting the date and time
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  }

  // Format the date
  const formattedDate = date.toLocaleDateString("en-GB", options) // 'en-GB' uses DD/MM/YYYY format
  // Format the time
  const formattedTime = date.toLocaleTimeString("en-GB", timeOptions) // 'en-GB' uses HH:MM format

  // Replace slashes with underscores
  const formattedDateTime = `${formattedDate.replace(/\//g, "_")}_${formattedTime.replace(/:/g, "_")}`

  return formattedDateTime
}

export function formatDateSanity(date: Date): string {
  // Extract year, month, and day
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0") // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0") // Pad day with leading zero if needed

  // Extract hours and minutes
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")

  // Construct the formatted date-time string
  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`

  return formattedDateTime
}
