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
import ListaCorsiPage from "./pages/ListaCorsiPage";
import ModificaCorsoPage from "./pages/ModificaCorsoPage";
import ListaOrdiniPage from "./pages/ListaOrdiniPage";
import UtentiListaCorsiPage from "./pages/UtentiListaCorsiPage";
import CorsiAcquistatiPage from "./pages/CorsiAcquistatiPage";
import CorsiCreatiPage from "./pages/CorsiCreatiPage";
import LezionePage from "./pages/LezionePage";
import CreaLezionePage from "./pages/CreaLezionePage";

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
            <Route
              path="/corsi/:corso_id/lezioni/:id"
              element={<LezionePage />}
            />
            <Route
              path="/corsi/:id/crealezione"
              element={<CreaLezionePage />}
            />
            <Route path="/corsi/:id" element={<CorsoPage />} />
            <Route path="/listacorsi" element={<UtentiListaCorsiPage />} />
            <Route path="/corsiacquistati" element={<CorsiAcquistatiPage />} />
            <Route path="/corsicreati" element={<CorsiCreatiPage />} />
            <Route path="/listacorsicreati" element={<CorsiCreatiPage />} />
            <Route path="/corsi/:id/modifica" element={<ModificaCorsoPage />} />
            <Route path="/admin/listautenti" element={<ListaUtentiPage />} />
            <Route path="/admin/listacorsi" element={<ListaCorsiPage />} />
            <Route path="/admin/listaordini" element={<ListaOrdiniPage />} />
            <Route
              path="/admin/corsi/:id/modifica"
              element={<ModificaCorsoPage />}
            />
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
