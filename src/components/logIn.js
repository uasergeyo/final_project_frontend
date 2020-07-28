import React from 'react';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      userPassword: '',
      loginWarning: "",
    };
  }
  emailHandler = (e) => {
    this.setState({ userEmail: e.target.value })
  }

  passwordHandler = (e) => {
    this.setState({ userPassword: e.target.value })
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(pass) {
    let lowerPass = pass.toLowerCase()
    if (pass.length > 7 && lowerPass !== pass) {
      return true
    } else {
      return false
    }
  }

  onLoginHandler = (e) => {
    if (this.validateEmail(this.state.userEmail) && this.validatePassword(this.state.userPassword)) {
      this.setState({ loginWarning: "" })
      try {
        this.props.onLogin(this.state.userEmail, this.state.userPassword)
          .then(() => this.props.token ?
            (this.setState({
              userEmail: '',
              userPassword: '',
              loginWarning: "",
            }),
              this.props.history.push(this.props.previousURL ? this.props.previousURL : "/profile")) :
            this.props.logInErr ?
            (this.props.onRedirect(this.props.previousURL),
              this.setState({ loginWarning: this.props.logInErr[0].message })) :
              this.setState({ loginWarning: "" }))
      } catch (error) {
        console.log(error)
        window.location.replace(this.props.previousURL)
      }
    } else {
      this.setState({ loginWarning: "Оба поля должны быть заполнены сответствующими значениями." })
    }
  }

  onRegisterHandler = () => {
    this.props.history.push("/registration")
  }

  render() {

    return (
      <div className="bg-light mb-5 p-5 min-vw-100 min-vh-100">
        <div className="form_signin form-check">
          <p className="inputWarning">{this.state.loginWarning}</p>
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

