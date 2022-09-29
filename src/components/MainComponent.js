import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import Contact from './ContactComponent.js';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomepageComponent.js';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      selectedDish: null
    }
  };

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  };
  

  render() {
    
    return (
      <div>
        <Header></Header>
        <Switch>
          <Route path='/home'>
            <Home 
            dish={this.state.dishes.filter((dish)=> dish.featured)[0]}
            promotion={this.state.promotions.filter((promo)=> promo.featured)[0]}
            leader={this.state.leaders.filter((leader)=> leader.featured)[0]}>
            </Home>
          </Route>
          <Route exact  path='/menu'><Menu dishes={this.state.dishes}/></Route>
          <Route exact path='/contact' ><Contact></Contact></Route>
          <Redirect to="/home" > <Home 
            
            promotion={this.state.promotions.filter((promo)=> promo.featured)[0]}
         
            leader={this.state.leaders.filter((leader)=> leader.featured)[0]
          }></Home></Redirect>
        </Switch>
    
    
        <Footer></Footer>
       
        
      </div>
    );
  }
}

export default Main;