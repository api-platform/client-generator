import React from 'react';
import { Route } from 'react-router-dom';
import { List, Create, Update, Show } from '../components/{{{lc}}}/';

export default [
  <Route path="/{{{name}}}/create" component={Create} exact key="create" />,
  <Route path="/{{{name}}}/edit/:id" component={Update} exact key="update" />,
  <Route path="/{{{name}}}/show/:id" component={Show} exact key="show" />,
  <Route path="/{{{name}}}/" component={List} exact strict key="list" />,
  <Route path="/{{{name}}}/:page" component={List} exact strict key="page" />
];
