export default function range(n: number) {
  return [...Array.from({ length: n }).keys()];
}
