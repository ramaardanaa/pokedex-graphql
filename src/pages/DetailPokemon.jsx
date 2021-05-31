import {
  Container, Card, Col, Row, Button, Badge
} from "react-bootstrap"
import { useHistory, useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_DETAILPOKEMON } from "../config/queries"
import loadingimg from "../assets/loading.gif"
import { variant } from "../components/CardPokemon"

export default function DetailPokemon() {
  const { pokemon } = useParams()
  const { loading, error, data } = useQuery(GET_DETAILPOKEMON, {
    variables: {
      name: pokemon
    }
  })
  const history = useHistory()
  if (loading) {
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
  return (
    <Container fluid className="mt-3">
      <Row>
        <Col xl="3" md="12">
          <Card style={{ width: '100%', textAlign: "center" }} className="shadow-lg p-3 mb-3 bg-white rounded">
            <Card.Img variant="top" src={data.pokemon.image} height={400} />
            <Card.Body>
              <Card.Title>#{data.pokemon.number} {data.pokemon.name}</Card.Title>
              <Card.Text>
                {data.pokemon.types.map((type, i) => (
                  <Badge className="mr-1" style={{ fontSize: "15px" }} key={i} variant={variant(type)}>{type}</Badge>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '100%', textAlign: "center" }} className="shadow-lg p-0 mb-5 bg-white rounded">
            <Card.Body>
              {data.pokemon.evolutions ? (
                <Row>
                  {data.pokemon.evolutions.map(evo => (
                    <Col xl="6" lg="6" md="6" xs="6" key={evo.id}>
                      <Card onClick={() => history.push(evo.name)} style={{ width: '100%', textAlign: "center", cursor: "pointer" }} className="shadow-lg p-3 bg-white rounded">
                        <Card.Img variant="top" src={evo.image} height={120} />
                        <Card.Body>
                          <Card.Title>{evo.name}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )
                :
                <h4>Last Evolution</h4>}
            </Card.Body>
          </Card>

        </Col>
        <Col xl="9" md="12">
          <Card style={{ width: '100%' }} className="shadow-lg p-3 mb-3 bg-white rounded">
            <Card.Body>
              <h4 className="pb-2" style={{ borderBottom: "5px solid black", fontWeight: "500" }}>Characteristics</h4>
              <Row className="my-3">
                <Col className="p-2" lg="3">
                  <Card style={{ width: '100%', height: "10rem" }} className="p-3 bg-white">
                    <h5>HP</h5>
                    <h5 className="pb-5" style={{ borderBottom: "5px solid green", fontWeight: "700" }}>{data.pokemon.maxHP}</h5>
                  </Card>
                </Col>
                <Col className="p-2" lg="3">
                  <Card style={{ width: '100%', height: "10rem" }} className="p-3 bg-white">
                    <h5>CP</h5>
                    <h5 className="pb-5" style={{ borderBottom: "5px solid red", fontWeight: "700" }}>{data.pokemon.maxCP}</h5>
                  </Card>
                </Col>
                <Col className="p-2" lg="3">
                  <Card style={{ width: '100%', height: "10rem" }} className="p-3 bg-white">
                    <h5>Weight</h5>
                    <h5 className="pb-5" style={{ borderBottom: "5px solid yellow", fontWeight: "700" }}>{`${data.pokemon.weight.minimum}-${data.pokemon.weight.maximum}`}</h5>
                  </Card>
                </Col>
                <Col className="p-2" lg="3">
                  <Card style={{ width: '100%', height: "10rem" }} className="p-3 bg-white">
                    <h5>Height</h5>
                    <h5 className="pb-5" style={{ borderBottom: "5px solid pink", fontWeight: "700" }}>{`${data.pokemon.height.minimum}-${data.pokemon.height.maximum}`}</h5>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col className="pb-4" lg="6">
                  <h4 className="pb-2" style={{ borderBottom: "5px solid black", fontWeight: "500" }}>Resistances</h4>
                  {data.pokemon.resistant.map((res,i) => <Button key={i} variant="primary" className="rounded-pill mr-1">{res}</Button>)}
                </Col>
                <Col className="pb-4" lg="6">
                  <h4 className="pb-2" style={{ borderBottom: "5px solid black", fontWeight: "500" }}>Weakness</h4>
                  {data.pokemon.weaknesses.map((weak,i) => <Button key={i} variant="danger" className="rounded-pill mr-1">{weak}</Button>)}
                </Col>
              </Row>

              <Row>
                <Col className="pb-4" lg="6">
                  <h4 className="pb-2" style={{ borderBottom: "5px solid black", fontWeight: "500" }}>Fast Attacks</h4>
                  {data.pokemon.attacks.fast.map((fast, i) => (
                    <div key={i}>
                      <h5 >{fast.name} ({fast.type})</h5>
                      <div className="progress my-2">
                        <div className="progress-bar" role="progressbar" style={{ width: `${fast.damage}%` }} aria-valuenow={fast.damage} aria-valuemin="0" aria-valuemax="100">{fast.damage}</div>
                      </div>
                    </div>
                  ))}
                </Col>
                <Col className="pb-4" lg="6">
                  <h4 className="pb-2" style={{ borderBottom: "5px solid black", fontWeight: "500" }}>Special Attacks</h4>
                  {data.pokemon.attacks.special.map((special,i) => (
                    <div key={i}>
                      <h5>{special.name} ({special.type})</h5>
                      <div className="progress my-2">
                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${special.damage}%` }} aria-valuenow={special.damage} aria-valuemin="0" aria-valuemax="100">{special.damage}</div>
                      </div>
                    </div>
                  ))}
                </Col>
              </Row>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}