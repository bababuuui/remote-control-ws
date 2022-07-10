export const waitForMs = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve("");
    }, ms);
  });
};
