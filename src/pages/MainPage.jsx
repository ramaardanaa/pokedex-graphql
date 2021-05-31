import {
  Container, Row, Col
} from "react-bootstrap"
import { useState,useRef,useCallback } from "react"
import { useLocation } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_POKEMON } from "../config/queries"
import CardPokemon from "../components/CardPokemon"
import loadingimg from "../assets/loading.gif"
import client from "../config/graphql"

export default function MainPage() {
  const [currentPokemons, setCurrentPokemons] = useState(15)
  const [hasMore,setHasMore] = useState(true)
  const { loading, error, data,fetchMore } = useQuery(GET_POKEMON, {
    variables: {
      first: 15
    }
  })
  function Query() {
    return new URLSearchParams(useLocation().search);
  }
  const query = Query()
  const filterType = query.get("filter")
  const observer = useRef()

  const lastPokemonElementRef = useCallback(el => {
    if(loading) return
    if(observer.current) observer.current.disconnect()
    if(!hasMore) return
    else{
      observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting){
          fetchMore({
            variables: {
              first: currentPokemons
            },
            updateQuery: (prevResult,{fetchMoreResult}) => {
              if(currentPokemons > fetchMoreResult.pokemons.length){
                setHasMore(false)
              }
              setCurrentPokemons(fetchMoreResult.pokemons.length + 15)
              return fetchMoreResult
            }
          })
        }
      })
    }

    if(el) observer.current.observe(el)
  },[loading,currentPokemons,hasMore])

  if (!data &&loading) {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center">
          <img src={loadingimg} />
        </div>
        <h4 style={{ textAlign: "center" }}>Loading...</h4>
      </>
    )
  }
  if (error) {
    return <p>Error...</p>
  }
  if (filterType && data) {
    console.log()
    const filteredData = data.pokemons.filter(el => el.types.indexOf(filterType) !== -1)
    return (
      <>
        <Container className="mt-5">
          <Row>
            {filteredData.map(pokemon => (
              <Col lg="6" xl="4" key={pokemon.id} sm="12" className="mt-3 d-flex justify-content-center">
                <CardPokemon pokemon={pokemon} />
              </Col>
            ))}
          </Row>
        </Container>
      </>
    )
  }
  return (

    <>
      <Container className="mt-5">
        <Row>
          {data.pokemons.map((pokemon, i) => {
            if (data.pokemons.length === i + 1) {
              return <Col ref={lastPokemonElementRef} lg="6" xl="4" key={pokemon.id} sm="12" className="mt-3 d-flex justify-content-center">
                <CardPokemon pokemon={pokemon} />
              </Col>
            } else {
              return <Col lg="6" xl="4" key={pokemon.id} sm="12" className="mt-3 d-flex justify-content-center">
                <CardPokemon pokemon={pokemon} />
              </Col>
            }
          })}
        </Row>
      </Container>
    </>
  )
}

