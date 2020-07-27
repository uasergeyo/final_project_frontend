import React from 'react';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      userPassword: '',
    };
  }
  emailHandler = (e) => {
    this.setState({ userEmail: e.target.value })
  }

  passwordHandler = (e) => {
    this.setState({ userPassword: e.target.value })
  }

  onLoginHandler = (e) => {
    try{
      this.props.onLogin(this.state.userEmail, this.state.userPassword)
      .then(()=>window.location.replace(this.props.previousURL))
    }catch(error){
      console.log(error)
      window.location.replace(this.props.previousURL)
    }
  }

  onRegisterHandler = () => {
    this.props.history.push("/registration")
  }

  render() {

    return (
      <div className="bg-light mb-5 p-5">
        <div className="form_signin form-check">
          <p className="mb-3 text-muted">Ваш email</p>
          <label htmlFor="inputEmail" className="sr-only"></label>
          <input onChange={this.emailHandler} type="email" className="form-control mb-3" placeholder="Email" required autoFocus />
          <p className="mb-3 text-muted">Ваш пароль</p>
          <label htmlFor="inputPassword" className="sr-only"></label>
          <input type="password" onChange={this.passwordHandler} className="form-control mb-3" placeholder="Password" required />
          <div className="d-flex justify-content-between">
            <button onClick={this.onLoginHandler} type="button" className="btn btn-lg btn-primary ">Войти</button>
            <button onClick={this.onRegisterHandler} type="button" className="btn btn-lg btn-success ">Регистрация</button>
          </div>
        </div>
      </div>
    )
  }
}

export default LogIn;

