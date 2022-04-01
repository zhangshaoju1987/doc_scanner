
export function idx(f, defaultValue) {
  try {
    const res = f();
    return res === null || res === undefined || isNaN(res) ? defaultValue : res;
  } catch (e) {
    return defaultValue;
  }
}
