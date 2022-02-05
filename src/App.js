import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import CorsoPage from "./pages/CorsoPage";
import CarrelloPage from "./pages/CarrelloPage";
import LoginPage from "./pages/LoginPage";
import RegistrazionePage from "./pages/RegistrazionePage";
import AccountPage from "./pages/AccountPage";
import PagamentoPage from "./pages/PagamentoPage";
import ConfermaOrdinePage from "./pages/ConfermaOrdinePage";
import OrdinePage from "./pages/OrdinePage";
import ListaUtentiPage from "./pages/ListaUtentiPage";
import ModificaUtentePage from "./pages/ModificaUtentePage";

function App() {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registrazione" element={<RegistrazionePage />} />
            <Route path="/accounts/:id" element={<AccountPage />} />
            <Route path="/metodopagamento" element={<PagamentoPage />} />
            <Route path="/confermaordine" element={<ConfermaOrdinePage />} />
            <Route path="/ordini/:id" element={<OrdinePage />} />
            <Route path="/corsi/:id" element={<CorsoPage />} />
            <Route path="/admin/listautenti" element={<ListaUtentiPage />} />
            <Route
              path="/admin/utenti/:id/modifica"
              element={<ModificaUtentePage />}
            />
            <Route path="/carrello" element={<CarrelloPage />}>
              <Route path=":id" element={<CarrelloPage />} />
            </Route>
          </Routes>
        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
