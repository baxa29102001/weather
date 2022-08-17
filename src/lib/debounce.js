export const debounce = (func, wait = 300) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      timeout = null;

      func(...args);
    };

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
  };
};
