import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from "./pages/HomePage";
import CharPage from "./pages/CharPage";
import SelectedCharContext from "./context/SelectedCharContext";
import CharDetailsPage from "./pages/CharDetailsPage";
import EquipamentoPage from "./pages/EquipamentoPage";
import CharCarrinhoPage from "./pages/CharCarrinhoPage";

function App() {
    const [selectedChar, setSelectedChar] = React.useState({});

    return (
        <SelectedCharContext.Provider value={{ selectedChar, setSelectedChar }}>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cadastrarPersonagem" element={<CharPage />} />
                    <Route path="/editarPersonagem/:id" element={<CharDetailsPage />} />
                    <Route path="/equipamentos/:id" element={<EquipamentoPage />} />
                    <Route path="/carrinho/:idPersonagem/:idCarrinho" element={<CharCarrinhoPage />} />
                </Routes>
            </Router>
        </SelectedCharContext.Provider>
    );
}

export default App;