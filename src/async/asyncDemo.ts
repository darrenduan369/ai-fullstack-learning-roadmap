export function waitForMessage(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Async task finished");
    }, 1000);
  });
}
