import React from 'react';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
            userPassword: '',
            userPasswordRepeat: '',
            emailInfo: '',
            passInfo: '',
            passCopyInfo: '',
            passCompareSucess:false,
            passInputSucess:false,
        };
    }

    emailHandler = (e) => {
        if (e.target.value === "") {
            this.setState({
                userEmail: e.target.value,
                emailInfo: ""
            })
        } else if (this.validateEmail(e.target.value)) {
            this.setState({
                userEmail: e.target.value,
                emailInfo: ""
            })
        } else {
            this.setState({
                emailInfo: "Email должен быть формата email@email.com",
            })
        }
    }

    passwordHandler = (e) => {
        if (!e.target.value) {
            this.setState({
                passInputSucess:false,
                userPassword: e.target.value,
                passwordInfo: ""
            })
        } else if (e.target.value.length<8) {
            this.setState({
                passInputSucess:false,
                // userPassword: e.target.value,
                passwordInfo: "Короткий пароль. Минимум 8 символов."
            })
        } else if (e.target.value === e.target.value.toLowerCase()) {
            this.setState({
                passInputSucess:false,
                // userPassword: e.target.value,
                passwordInfo: "В пароле должны быть заглавные и строчные символы."
            })
        }else if (e.target.value.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)) {
            this.setState({
                passInputSucess:true,
                userPassword: e.target.value,
                passwordInfo: "Суперпароль ."
            })
        } else if (this.validatePassword(e.target.value)) {
            this.setState({
                passInputSucess:true,
                userPassword: e.target.value,
                passwordInfo: "Надежный пароль"
            })
        }
        // else {
        //     this.setState({
        //         passInputSucess:false,
        //         userPassword: e.target.value,
        //         passwordInfo: "Пароль должен содержать заглавные и строчные буквы, длиной минимум восемь знаков"
        //     })
        // }
    }

    onRegisterHandler = (e) => {
        if (this.state.userEmail && this.state.userPassword && this.state.userPasswordRepeat){
            try {
                this.props.onRegister(this.state.userEmail, this.state.userPassword)
                    .then(() =>this.props.registrationResponse? window.location.replace('/profile/my_settings'):console.log("wrong++++++"))
                    .catch((e) => console.log(e))
            } catch (e) {

            }
        } else {
            console.log("++++++++++++ bug =+++++++++")
        }


    }

    passwordRepeatHandler = (e) => {
        if (e.target.value ==="") {
            this.setState({ passCopyInfo: "",
                            passCompareSucess:false,
        })
        } else if (this.state.userPassword === e.target.value) {
            this.setState({ passCompareSucess:true,
                            passCopyInfo: "Пароли совпали",
                            userPasswordRepeat:e.target.value                           
        })
        } else if(this.state.userPassword !== e.target.value) {
            this.setState({passCopyInfo:"Пароли должны быть одинаковые",
                            passCompareSucess:false
        })
        }
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

    render() {
        return (
            <div className="bg-light p-5 mb-5">
                <div className="form_signin form-check">
                    <p className={this.state.emailInfo ? "inputWarning mb-1" : "mb-1 text-muted"}>{this.state.emailInfo ? this.state.emailInfo : "Ваш email"}</p>
                    <label htmlFor="inputEmail" className="sr-only"></label>
                    {/* <small>{this.state.emailInfo}</small> */}
                    <input onChange={this.emailHandler.bind(this)} type="email" className="form-control mb-3" placeholder="Email" required autoFocus />
                    <p className={this.state.passInputSucess?"inputSucess mb-1":this.state.passwordInfo ? "inputWarning mb-1" : "mb-1 text-muted"}>{this.state.passwordInfo ? this.state.passwordInfo : "Ваш пароль"}</p>
                    <label htmlFor="inputPassword" className="sr-only"></label>
                    {/* <small>{this.state.passInfo}</small> */}
                    <input type="password" onChange={this.passwordHandler.bind(this)} className="form-control mb-3" placeholder="Пароль" required />
                    <p className={this.state.passCompareSucess ?"inputSucess mb-1":this.state.passCopyInfo ? "inputWarning mb-1" : "mb-1 text-muted"}>{this.state.passCopyInfo ? this.state.passCopyInfo : "Повторите пароль"}</p>
                    <label htmlFor="inputPassword" className="sr-only"></label>
                    {/* <small>{this.state.passCopyInfo}</small> */}
                    <input type="password" onChange={this.passwordRepeatHandler.bind(this)} className="form-control mb-3" placeholder="Пароль" required />
                    <div className="d-flex justify-content-between">
                        <button onClick={this.onRegisterHandler} type="button" className="btn btn-lg btn-primary btn-block">Регистрация</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Registration;