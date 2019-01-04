import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DrawingPage from './components/pages/drawing_page';
import NotFoundPage from './components/pages/not_found_page';

const QuickDrawRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={ DrawingPage } />
      <Route component={ NotFoundPage } />
    </Switch>
  </BrowserRouter>
);

export default QuickDrawRouter;