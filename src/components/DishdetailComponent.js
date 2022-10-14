
import React, { Component } from "react";
import {Card, CardImg,  CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Row, Col, Label, Modal, ModalBody, ModalHeader } from "reactstrap"
import {Link } from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

 //Comment component begins
class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state= {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen});
    }
    handleSubmit(values){
        console.log('Current State is: ' + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);
        return (
            <div>
                <Button outline onClick={this.toggleModal} className="">
                    <span className="fa fa-pencil fa-lg"></span>
                    Submit Comment
                </Button>
                <Modal toggle={this.toggleModal} isOpen={this.state.isModalOpen}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                     <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators= {{required, minLength:minLength(3), maxLength:maxLength(15)}}
                                />
                                <Errors className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    required:'Required\n',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                                >
                                </Errors>
                                </Col>                                
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit"  onClick={this.toggleModal} color="primary">
                                    Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                </ModalBody>
            </Modal>
            </div>
        );
    }
}

//DishDetail section begins
    function RenderDish({dish}){
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>  
            </div>                      
        );
    }
    function RenderComments({comments, postComment, dishId}){
        if( comments !== null){ 
            return (
                <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map((cmt)=>{
                        return (
                            <div key={cmt.id}>
                            <p >{cmt.comment}</p>
                            <p >--{cmt.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cmt.date)))}</p>
                            </div>
                        )
                    })
                }
                <CommentForm dishId={dishId} postComment={postComment}/>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
    
    const Dishdetail = (props) =>{
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) {
            return (
                <div className="container">
                    <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                    <div className="row">
                            <RenderDish dish={props.dish}></RenderDish>
                            <RenderComments comments={props.comments}
                             postComment={props.postComment}
                             dishId={props.dish.id}></RenderComments>
                    </div>
                </div>               
            )
        } else {
            return (
                <div></div>
            );
        }
    };



export default Dishdetail;