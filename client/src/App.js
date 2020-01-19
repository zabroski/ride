// Packages and Libraries
import React from 'react';
import { Route, Link } from 'react-router-dom';
//Components
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'
import  ProtectedRoute from './components/ ProtectedRoute'
import { login, getProfile, signUp } from './service/apiService'
//CSS
import './App.css';
import authService from './service/authService';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignedIn: false,
      user: {}
    }
  }


  async componentDidMount() {
    try{
      const fetchUser = await getProfile()

      this.setState(state => {
        return {
          ...state,
          isSignedIn: authService.isAuthenticated(),
          user: fetchUser
        }

      })

    } catch(e) {
      throw e
    }
  }

loginUser = async (credentials) => {
  try {
    const user = await login(credentials)

    this.setState(state => {
      return {
        ...state,
        isSignedIn: true,
        // user: user
      }
    })
  }
  catch (e) {
    throw e
  }
}


signOutUser = () => {
  authService.signOut()

  this.setState(state => {
    return {
      isSignedIn: false,
      user: {}
    }
  })
}

signUpUser = async (credentials) => {
  
  try {
    await signUp(credentials)
    const newUser = {email: credentials.email, password: credentials.password}
    this.loginUser(newUser)
  } catch (e) {
    throw e
  }
}

  render() {
    const { isSignedIn , user} = this.state
    
    return (
      <div className="App">
  
        <nav>
          <div><Link to="/">Home</Link></div>
          {
            isSignedIn &&
            <div><Link to="/dashboard">Dashboard</Link></div>

          }
          {
            !isSignedIn ? (
              <div><Link to="/login">Login</Link></div>
            ) : (
              <button onClick= {this.signOutUser}>Sign Out</button>
            )
          
          }

          {!isSignedIn ? (
              <div><Link to="/signup">Sign up</Link></div>
            ) : (
              null
            )
          }
        </nav>
  
        <main>
          <Route exact path="/" component={Home} />
          <ProtectedRoute path="/dashboard" 
          user={user}
          component={Dashboard} />
          <Route 
          path="/login"
           render={(props) => <Login  {...props} handleLogin={this.loginUser} isSignedIn={isSignedIn}/>} />
            <Route 
            path='/signup' 
            render = {(props) => <Signup {...props} handleSignUp={this.signUpUser} isSignedIn={isSignedIn} />}
             />
        </main>

   
      </div>
    );
  }
}

export default App;