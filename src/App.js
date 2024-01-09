import React, { useState } from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Switch } from "react-router-dom";
import _ from 'lodash';

// import all components pages
import Documentation from './components/documentation';

export default function App(props) {
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Documentation />} />
          </Routes> 
        </Router>
      </div>
    );
  }
  
