export const getFirstMessageOfError = (messages: string[]): string => {
  const messagesArray: string[] = Object.values(messages);
  return messagesArray[0];
}
