export function slicePokemonUrlToId(input: string, length = 34) {
  return input.slice(length, input.length - 1);
}
