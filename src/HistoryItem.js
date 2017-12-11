import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';
import StarBorder from 'material-ui-icons/StarBorder';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

import GridList from './GridList';

class HistoryItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "Story",
      open: false,
    }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };


  render() {
    return (
      <List>
      <ListItem button onClick={this.handleClick}>
        <ListItemText inset primary={<b>{this.state.name}</b>} disableTypography />
        {this.state.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse component="li" in={this.state.open} timeout="auto" unmountOnExit>
        <GridList/>
      </Collapse>
      </List>
    )
  }
}

export default HistoryItem;