import React from 'react';
import { Scene, Actions } from 'react-native-router-flux';
import List from '../components/{{{lc}}}/List';
import Create from '../components/{{{lc}}}/Create';
import Show from '../components/{{{lc}}}/Show';
import Update from '../components/{{{lc}}}/Update';
import {delayRefresh} from '../utils/helpers';

export default [
          <Scene
              rightTitle="Add"
              onRight={() => Actions.{{{lc}}}Create()}
              key="{{{lc}}}List" component={List}
              title="List of {{{title}}}s"
              initial
          />,
          <Scene key="{{{lc}}}Create" component={Create}
                 title="Add a new {{{lc}}}"/>,
          <Scene key="{{{lc}}}Show" component={Show}
                 leftTitle="< List of {{{title}}}s"
                 onLeft={() => {
                   Actions.pop();
                   delayRefresh();
                 }}/>,
          <Scene key="{{{lc}}}Update" component={Update}
                 title="Update {{{title}}}"/>,
];
