import './App.css';
import AuthUser from './auth/AuthUser';
import Guest from '../src/components/User/Guest';
import Auth from '../src/components/User/Auth';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  const {getToken} = AuthUser()
  // if(!getToken()){
  //   return <Guest/>
  // }
  //  return (<Auth/>);
  return  (<>
 
               {!getToken() ? <Guest/>: <Auth/>}
      
          </>)
}


export default App
