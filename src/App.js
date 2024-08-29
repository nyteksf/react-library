import Nav from "./components/Nav";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Footer from "./components/Footer";
import OpenBook from "./pages/OpenBook";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { books } from "./data";

function App() {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Route 
                    path="/" 
                    exact 
                    render={() => <Home />} />
                <Route
                    path="/books"
                    exact
                    render={() => <Books books={books} />}
                />
                <Route
                    path="/books/:id"
                    render={() => <OpenBook books={books} />}
                />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
