// pokemon api data source

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonApi = createApi({
  reducerPath: 'pokemonAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`
    })
  })
})

// Hooks are autocreated for us for use in functional components based on provided options above:
// Beautiful! can have as many x hooks across app
export const { useGetPokemonByNameQuery } = pokemonApi