export const listItemStyles = (index: number, arrayLength: number) => {
  const button = `${index === 0 ? "rounded-t-xl" : ""} ${
    index === arrayLength - 1 ? "rounded-b-xl" : ""
  } bg-white dark:bg-neutral-800`;

  const view = `flex flex-row justify-between items-center ${
    index !== arrayLength - 1
      ? "border-b border-neutral-200 dark:border-neutral-600"
      : ""
  } ml-5 py-3 pr-5`;

  return [button, view];
};
