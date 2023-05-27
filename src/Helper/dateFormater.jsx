export const dateFormater = (inputDate) => {
  // Input date string
  //const inputDate = 'Wed May 17 2023 00:00:00 GMT+0530 (India Standard Time)';

  // Create a new Date object with the input date string
  const dateObject = new Date(inputDate);

  // Format the date as per the desired output format
  const year = dateObject.getUTCFullYear();
  const month = `0${dateObject.getUTCMonth() + 1}`.slice(-2); // Months are zero-based, so add 1
  const day = `0${dateObject.getUTCDate()}`.slice(-2);
  const hours = `0${dateObject.getUTCHours()}`.slice(-2);
  const minutes = `0${dateObject.getUTCMinutes()}`.slice(-2);
  const seconds = `0${dateObject.getUTCSeconds()}`.slice(-2);
  const milliseconds = `00${dateObject.getUTCMilliseconds()}`.slice(-3);
  const outputDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

  // Output the converted date
  console.log(outputDate);
  
  return outputDate;
};
