import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";
import SignIn from "./pages/SignIn";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import {store} from './stores/appState'
import {Provider} from 'react-redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <div className="h-full bg-white">
                    <div className="h-full">
                        <NavBar/>
                        <Routes>
                            <Route path="/" element={<App/>}/>
                            <Route path="/signin" element={<SignIn/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                        </Routes>
                        <Footer/>
                    </div>
                </div>
            </Provider>
        </Router>
    </React.StrictMode>,
)
