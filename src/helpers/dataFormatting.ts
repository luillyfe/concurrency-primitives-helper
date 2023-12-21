// Generate a function to remove any invalid character from an input string.
// The function will take in a string and return a string
// The function will use a regular expression to remove any invalid characters.
export function cleanJSONString(text: string) {
  // remove all backticks from text
  text = text.replace(/`/g, '');

  try {
    return JSON.parse(text);
  } catch (error) {
    // log error
    console.warn(error);
    return text;
  }
}
