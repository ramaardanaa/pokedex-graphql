import {
  Card, Badge
} from "react-bootstrap"
import {useHistory} from "react-router-dom"

export function variant(type){
  switch(type){
    case "Grass":
      return "success"
    case "Ground":
      return "warning"
    case "Electric":
      return "warning"
    case "Fire": 
      return "danger"
    case "Poison":
      return "dark"
    case "Water":
      return "primary"
    default:
      return "secondary"

  }
}
function CardPokemon({ pokemon }) {
  const history = useHistory()
  function handleDetail(){
    history.push(pokemon.name)
  }
  return (
    <Card onClick={handleDetail} style={{ width: '20rem', textAlign: "center" }} className="handlehover shadow-lg p-3 mb-5 bg-white rounded">
      <Card.Img variant="top" src={pokemon.image} height={280} />
      <Card.Body>
        <Card.Title>{pokemon.name}</Card.Title>
        <Card.Text>
          {pokemon.types.map((type,i) => (
            <Badge className="mr-1" key={i} variant={variant(type)}>{type}</Badge>
          ))}
        </Card.Text>
        <h5>HP: {pokemon.maxHP}</h5> <h5>CP: {pokemon.maxCP}</h5>
      </Card.Body>
    </Card>
  )
}

export default CardPokemon