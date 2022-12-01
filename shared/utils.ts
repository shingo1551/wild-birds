export function divide<T>(list: T[], n: number) {
  const k = Math.ceil(list.length / n);
  const lists = [];
  for (let i = 0; i < list.length; i += k) {
    lists.push(list.slice(i, i + k));
  }
  return lists;
}
