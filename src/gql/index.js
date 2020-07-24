const getGQL = (headers) => 
    (query="", variables={}) => 
        fetch("http://localhost:4000/graphql", 
                      {method: 'POST',
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                              ...headers  
                            },
                           body: JSON.stringify({query,variables})
                          })
        .then(res => res.json())

export {getGQL} ;

    //     getGQL(headers={token:'daasda'})
    // (`query Authorization($login:String, $password:String){
  
    //     login(login:$login, password:$password)
    //   }`, {login, password}).then(data => store.dispatch(actionToken(data.data.login)))

    // return {
    //     type:'LOGIN'
    // }
