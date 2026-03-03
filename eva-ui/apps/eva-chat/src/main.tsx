import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";
import { I18nProvider } from "./lib/i18n";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <I18nProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </I18nProvider>
    </React.StrictMode>
);
