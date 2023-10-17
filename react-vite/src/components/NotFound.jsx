import {Link} from 'react-router-dom'
import  NotFoundSvg from '../assets/notfound.svg';
const NotFound =()=>{
    return (
    <div class="h-screen w-screen  d-flex align-items-center">
            <div class="container my-5 d-flex flex-column flex-md-row align-items-center justify-content-center px-5 text-secondary">
                <div class="max-w-m">
                    <div class="display-1 font-bold ">404</div>
                    <p
                    class="lead"
                    >Sorry we couldn't find this page. </p>
                <p class="mb-5">But dont worry, you can find plenty of other things on our homepage.</p>
                
                <Link to='/' class="btn btn-primary">back to homepage</Link>
            </div>
            <div class="max-w-lg">
                   <img src={NotFoundSvg} alt="" />
            </div>
            
        </div>
    </div>
    )
}
export default NotFound;