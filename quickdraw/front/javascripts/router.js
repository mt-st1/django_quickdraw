import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TopPage from './components/pages/top_page';
import NotFoundPage from './components/pages/not_found_page';

const QuickDrawRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={ TopPage } />
      <Route component={ NotFoundPage } />
    </Switch>
  </BrowserRouter>
);

export default QuickDrawRouter;