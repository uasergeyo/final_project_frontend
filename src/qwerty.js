import React from 'react';

const LoginForm = ({onLogin}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div>
            <input value={login} onChange={e => setLogin(e.target.value)}/>
            <input value={password} onChange={e => setPassword(e.target.value)} type='password'/>
            <button onClick={e => {
                onLogin && typeof onLogin === 'function' && onLogin(login, password)
            }} disabled={!login || !password} >Login</button>
        </div>
    )
}


export default LoginForm;

const store = createStore((state, {type, token}) => {
    if (!state) return {}
    
    if (type === 'LOGOUT') {
        return {}
    }
    if (type === 'LOGIN') {
        return {pending:true}
    }
    if (type === 'TOKEN') {
        console.log("decoded token",decode(token))
        return {
            jwt_token:token,
            data: decode(token)
        }
    }
    return state;
})

function actionLogin (login, password){

    getGQL('http://shop-roles.asmer.fs.a-level.com.ua/graphql')
    (`query Authorization($login:String, $password:String){
  
        login(login:$login, password:$password)
      }`, {login, password}).then(data => store.dispatch(actionToken(data.data.login)))

    return {
        type:'LOGIN'
    }
}
function actionToken(token){
    return {
        type:'TOKEN',
        token
    }
}

const getGQL = (url, headers={}) => 
    (query="", variables={}) => 
        fetch(url, 
                      {method: 'POST',
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                              ...headers  
                            },
                           body: JSON.stringify({query,variables})
                          })
        .then(res => res.json())


store.subscribe(() => console.log(store.getState()));
store.dispatch(actionLogin('tst', '123'))

