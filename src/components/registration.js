import React from 'react';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
            userEmail: '',
            userPassword: '',
            userPasswordRepeat:''
        };
    }

    emailHandler = (e) => {
        this.setState({ userEmail: e.target.value })
    }

    passwordHandler = (e) => {
        this.setState({ userPassword: e.target.value })
    }

    onRegisterHandler = (e) => {
        try{
            this.props.onRegister(this.state.userEmail,this.state.userPassword)
            .then(()=>window.location.replace('/profile/my_settings'))
            .catch((e)=>console.log(e))
        }catch(e){
           
        }
        
        
    }

    passwordRepeatHandler =(e) =>{
        if(this.state.userPassword !==this.state.userPasswordRepeat){
            e.target.style = "border:2px solid red"
        }
    }
    render() {
        return (
            <div className="bg-light p-5 mb-5">
                <div className="form_signin form-check">
                    <p className="mb-3 text-muted">Ваш email</p>
                    <label htmlFor="inputEmail" className="sr-only"></label>
                    <input onChange={this.emailHandler} type="email" className="form-control mb-3" placeholder="Email" required autoFocus />
                    <p className="mb-3 text-muted">Ваш пароль</p>
                    <label htmlFor="inputPassword" className="sr-only"></label>
                    <input type="password" onChange={this.passwordHandler} className="form-control mb-3" placeholder="Пароль" required />
                    <p className="mb-3 text-muted">Повторите пароль</p>
                    <label htmlFor="inputPassword" className="sr-only"></label>
                    <input type="password" onChange={this.passwordRepeatHandler} className="form-control mb-3" placeholder="Пароль" required />
                    <div className="d-flex justify-content-between">    
                        <button onClick={this.onRegisterHandler} type="button" className="btn btn-lg btn-primary btn-block">Регистрация</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Registration;