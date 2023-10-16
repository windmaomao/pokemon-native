import { Pokemon, PokemonDetail } from "../types/pokemon";

const api = "https://pokeapi.co/api/v2";

const resolveId = (url: string): number => {
  const parts = url.split("/");
  return parseInt(parts[parts.length - 2]);
};

export const getPokemons = async (): Promise<Pokemon[]> => {
  return fetch(api + "/pokemon?limit=1000")
    .then((res) => res.json())
    .then((res) => {
      const items: any[] = res.results;
      return items.map((item) => ({
        id: resolveId(item.url),
        name: item.name,
      }));
    });
};

export const getPokemonImageSrc = (id: number) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

export const getPokemon = async (id: number): Promise<PokemonDetail> => {
  return fetch(api + "/pokemon/" + id).then((res) => res.json());
};
