import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';

import * as Queries from './database/queries'
import database from './database/config';

import HistoryItem from './HistoryItem'

class Search extends Component {

  constructor(props) {
      super(props);
      this.state = {
        currentUser: props.currentUser,
        entityValue: '',
        resultStories: [],
        resultImages: [],
        isLoading: false,
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
  }


  handleSearch(event){
    event.preventDefault();

    this.setState({
      isLoading: true,
      resultStories: [],
      resultImages: [],
    })

    const thisComponent = this;

    // Massive query to get all sorted image arrays for relevant stories
    Queries.getStoriesInEntity(this.state.entityValue).then((res) => {
      for(var i = 0; i < res.length; i++) {
        thisComponent.state.resultStories.push(res[i]);

      }

      const stories = thisComponent.state.resultStories;
      console.log(stories)

      for(var i = 0; i < stories.length; i++){
        const query = database.collection("stories").doc((stories[i].sid).toString()).collection("myImages").orderBy("order");

        query.get().then((querySnapshot) => {
          let res = [];
          querySnapshot.forEach(function(doc){
              doc && doc.exists ? res.push(doc.data().url) : null;
          })

          var arrayOfArrays = thisComponent.state.resultImages.slice();
          arrayOfArrays.push(res);
          thisComponent.setState({
            resultImages: arrayOfArrays,
          })

        })
      }

      // Done loading
      thisComponent.setState({
        isLoading: false,
      })

    })



  }

  handleChange(event) {
    this.setState({entityValue: event.target.value});
  }

  render(){
    const thisComponent = this;

    if(this.state.isLoading) {
      return (<div/>);
    }
    else {
      return (
        <div>
          <h2 id="output">Stor.io Search</h2>
          <Grid container>
            <Grid item xs={1}/>
            <Grid item xs={10}>
              <form onSubmit={this.handleSearch}>
                <TextField
                  placeholder="What story would you like to see?"
                  helperText={`(Try McDonald's or Coca Cola)`}
                  fullWidth
                  type="search"
                  onChange={this.handleChange}
                  onSubmit={this.handleSearch}
                />
                <Button onClick={this.handleSearch} raised color="primary"> Search Entities </Button>
              </form>
            </Grid>
            <Grid item xs={1}/>

            <Grid item xs={1} />
            <Grid item xs={10}>
              <List style={listItemStyle}>
              {this.state.resultStories.map((story, i) => {
                  return (
                    <div key={i}>
                      <HistoryItem name={story.string} date={story.timestamp} images={this.state.resultImages[i]} />
                      <Divider style={dividerStyle}/>
                    </div>
                  )
              })}
              </List>
              test
            </Grid>
            <Grid item xs={1} />

          </Grid>
        </div>
      )
    }


  }
}

const dividerStyle = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  color: 'white',
  height: 3,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
};

const listItemStyle = {
  background: "black",
  color: "white",
  padding: '0px 0px'
};

export default Search;