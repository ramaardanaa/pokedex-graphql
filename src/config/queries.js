import { gql } from "@apollo/client"

export const GET_POKEMON = gql`
  query pokemons($first: Int!){
    pokemons(first: $first){
      id
      name
      image
      maxHP
      maxCP
			types
    }
  }
`

export const GET_DETAILPOKEMON = gql`
query pokemon($name: String){
  pokemon(name: $name){
    id
    number
    name
    weight{
      minimum
      maximum
    }
    height{
      minimum
      maximum
    }
    types
    resistant
    weaknesses
    maxCP
    maxHP
    image
    attacks{
      fast{
        name
        type
        damage
      }
      special{
        name
        type
        damage
      }
    }
    evolutions{
      id
      name
      image
    }
  }
}
`

