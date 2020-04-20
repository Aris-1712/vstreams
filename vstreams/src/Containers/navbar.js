import React from 'react'
import  {Link,withRouter} from 'react-router-dom'
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';

const navbar=(props)=>{
    
    console.log(props)
    return(
      <div>
            {/* <MDBNavbar style={{backgroundColor:"cadetblue"}}  dark expand="md"  fixed="top">
              <MDBNavbarBrand>
                  <strong><span> <i class="far fa-play-circle fa-1x"></i></span><Link style={{color:"white"}} to={{pathname:'/Home',search: '?id='+ props.obj.key}}> V-Streamz </Link></strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler  />
              <MDBCollapse navbar>
                <MDBNavbarNav center>
                <MDBNavItem>
                <MDBNavbarBrand>
                 <Link style={{color:"white"}} to={{pathname:'/Userinfo',search:'?'+ props.obj.key}}> {props.obj.Name} </Link>
              </MDBNavbarBrand>
              </MDBNavItem> 
                </MDBNavbarNav>
                <MDBNavbarNav right>
                
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar> */}

{/* <a class="navbar-brand" href="#"><Link style={{color:"white"}} to={{pathname:'/Home',search: '?id='+ props.obj.key}}><strong><span> <i class="far fa-play-circle fa-1x"></i></span><span>    </span> V-Streamz</strong> </Link></a> */}
{/* <Link class="navbar-brand mx-auto" style={{color:"white"}} to={{pathname:'/Userinfo',search:'?'+ props.obj.key}}>{props.obj.Name}</Link> */}
{/* <a style={{color:"white"} } href="/signin">Logout</a> */}
<nav class="navbar navbar-light navbar-expand-md bg-faded justify-content-center" style={{backgroundColor:"cadetblue"}}>
    <a  class="navbar-brand d-flex w-50 mr-auto"><Link style={{color:"white"}} to={{pathname:'/Home',search: '?id='+ props.obj.key}}><strong><span> <i class="far fa-play-circle fa-1x"></i></span><span>    </span> V-Streamz</strong> </Link></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-collapse collapse w-100" id="collapsingNavbar3">
        <ul class="navbar-nav w-100 justify-content-center">
            
            <li class="nav-item">
                <a class="nav-link" ><Link  style={{color:"white"}} to={{pathname:'/Userinfo',search:'?'+ props.obj.key}}>{props.obj.Name}</Link></a>
            </li>
           
        </ul>
        <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
            
            <li class="nav-item">
                <a class="nav-link" style={{color:"white"} } href="/signin">Logout</a>
            </li>
        </ul>
    </div>
</nav>

</div>
    )
}

export default withRouter(navbar)