import { Pokemon } from "../types/pokemon";

const resolveId = (url: string) => {
  const parts = url.split("/");
  return parts[parts.length - 2];
};

export const getPokemons = async (): Promise<Pokemon[]> => {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=500")
    .then((res) => res.json())
    .then((res) => {
      const items: any[] = res.results;
      return items.map((item) => ({
        id: resolveId(item.url),
        name: item.name,
      }));
    });
};

export const pokemonSrc = (id: string) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};
