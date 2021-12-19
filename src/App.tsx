import React, { Suspense } from 'react';
import logo from './logo.svg';
import Container from "./components/Container";
import loadable from '@loadable/component'; 
import { Routes, Route } from "react-router-dom";
import './App.css';
import { Spinner } from "./components/Spinner"
/* import Home from "./pages/Home";
import Sales from "./pages/Sales";
import NotFound  from './pages/NotFound'; */

const Home = loadable(() => import('./pages/Home'))
const Sales = loadable(() => import('./pages/Sales'))
const NotFound = loadable(() => import('./pages/NotFound'))

function App() {
  return (
    <Suspense fallback={<Spinner/>}>
        <Routes>
        
          <Route path="/" element={<Container />}>
          <Route path="sales" element={<Sales />} />
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          
          
        </Routes>
      </Suspense>
  );
}

export default App;
