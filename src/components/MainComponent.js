import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import Contact from './ContactComponent.js';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomepageComponent.js';
import Dishdetail from './DishdetailComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
};
const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))

});
class Main extends Component {

  render() {
    const DishWithId = ({match}) => {
      return(
          <Dishdetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment={this.props.addComment} />
      );
    };
       
    return (
      <div>
        <Header></Header>
        <Switch>
          <Route path='/home'>
            <Home 
            dish={this.props.dishes.filter((dish)=> dish.featured)[0]}
            promotion={this.props.promotions.filter((promo)=> promo.featured)[0]}
            leader={this.props.leaders.filter((leader)=> leader.featured)[0]}>
            </Home>
          </Route>
          <Route exact  path='/menu'><Menu dishes={this.props.dishes}/></Route>
          <Route   path='/menu/:dishId' >{DishWithId}</Route>
          <Route exact path='/contact' ><Contact></Contact></Route>
          <Route exact  path='/aboutus'><About leaders={this.props.leaders}/></Route>
          <Redirect to="/home" >
           <Home 
            promotion={this.props.promotions.filter((promo)=> promo.featured)[0]}
            leader={this.props.leaders.filter((leader)=> leader.featured)[0]}>
           </Home>
          </Redirect>
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));