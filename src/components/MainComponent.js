import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomepageComponent.js';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    }
  };

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  };
  

  render() {
    const HomePage = () => {
      return (<Home/>);    
    };
    return (
      <div>
        <Header></Header>
        <Switch>
          <Route path='/home' component={HomePage}></Route>
          <Route exact  path='/menu' component={()=><Menu dishes={this.state.dishes}/>}></Route>
          <Redirect to="/home" ></Redirect>
        </Switch>
    
    
        <Footer></Footer>
       
        
      </div>
    );
  }
}

export default Main;