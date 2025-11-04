import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './desain/styling.css';
import ListMajalah from './halaman/listMajalah';
import RouteHalaman from './routinghalaman/routing';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <RouteHalaman />
    </BrowserRouter>
);


