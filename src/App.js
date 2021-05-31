import { ApolloProvider } from "@apollo/client"
import client from "./config/graphql"
import { BrowserRouter,Route, Switch } from "react-router-dom"
import MainPage from "./pages/MainPage"
import DetailPokemon from "./pages/DetailPokemon"
import ErrorPage from "./pages/ErrorPage"
import Header from "./components/Header"

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header/>
        <Switch>
            <Route exact path="/">
              <MainPage/>
            </Route>
            <Route exact path="/:pokemon">
              <DetailPokemon/>
            </Route>
            <Route exact path="/404">
              <ErrorPage/>
            </Route>
        </Switch>

      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
