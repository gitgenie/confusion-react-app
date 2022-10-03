
import {Card, CardImg,  CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from "reactstrap"
import {Link } from "react-router-dom";
   
    function RenderDish({dish}){
        return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>            
        );
    }
    function RenderComments({comments}){
        if( comments !== null){
           const comm =  comments.map((cmt)=>{
            return (
                <div key={cmt.id}>
                <p >{cmt.comment}</p>
                <p >--{cmt.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cmt.date)))}</p>
                </div>
            )});
            return comm; 
        } else {
            return (
                <div></div>
            );
        }
    }
    
    const Dishdetail = (props) =>{
        if(!!props.dish){
            return (
             
                <div className="container">
                    <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                    <div className="row">
                        <div  className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish}></RenderDish>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments:</h4>
                            <RenderComments comments={props.dish.comments}></RenderComments>
                        </div>
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