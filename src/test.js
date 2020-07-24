import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

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

const gql = getGQL('/graphql')


const MenuItem = ({name, url}) =>
<li>
    <a href={url}>{name}</a>
</li>

const Header = ({superAttribute, children}) =>
<header>
    <ul>
    {children.map(link => <MenuItem {...link}/>)}
    </ul>
</header>

const defaultCats = JSON.parse(`[{"_id":"5dc45acf5df9d670df48cc48","name":"TV's"},{"_id":"5dc49f4d5df9d670df48cc64","name":"Airconditions"},{"_id":"5dc458985df9d670df48cc47","name":"Smartphones"},{"_id":"5dc4b2553f23b553bf3540fc","name":"Холодильники"},{"_id":"5dc4b2553f23b553bf3540fd","name":"Стиральные машины"},{"_id":"5dc4b2553f23b553bf3540fe","name":"Стирально-сушильные машины"},{"_id":"5dc4b2553f23b553bf3540ff","name":"Стиральные машины"},{"_id":"5dc4b2553f23b553bf354100","name":"Духовые шкафы"},{"_id":"5dc4b2553f23b553bf354101","name":"Крупная бытовая техника"},{"_id":"5dcac1b56d09c45440d14cf8","name":"Pasta"},{"_id":"5dcac6cf6d09c45440d14cfd","name":"Drinks"},{"_id":"5dcacaeb6d09c45440d14d04","name":"Салаты"},{"_id":"5dc94bd00e36db246e3049ee","name":"Пицца"},{"_id":"5dcabeeb6d09c45440d14cf6","name":"Макароны"},{"_id":"5dcadc906d09c45440d14d11","name":"Сушка"}]`)


gql(`
query cat{
    CategoryFind(query: "[{}]"){
        _id name
    }
}
`)

const CategoryLink = ({category:{name, _id}}) =>
<a href={`/category/${_id}`}>
    {name}
</a>

const AsideMenu = ({}) => {
    const [categories, setCategories] = useState([])

    gql(`
    query cat{
        CategoryFind(query: "[{}]"){
            _id name
        }
    }
    `).then(result => setCategories(result.data.CategoryFind))
    return (
        <aside>
        {!categories.length ? 
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQMq4PSPYIDuiUPWUFlYgJZSW4xxXJFCY-PAQ&usqp=CAU' /> :
            categories.map(category => <CategoryLink category={category} />)}
        </aside>
    )
}

const Content = () =>
<content>
    контент
</content>

const Main = ({children}) =>
<div className='Main'>
    {children}
    <AsideMenu />
    <Content />
</div>

const Footer = () =>
<footer>
    подвал
</footer>

const MyComp =({i}) =>
<>
    {console.log(i)}
</>

const Counter = () => {
    const [i, setI] = useState(0)
    return (
        <>
            <MyComp i={i} />
            <button style={{fontSize: `${i/10}em`}} onClick={() => {
                setI(i +1)
            }}>{i}</button>
        </>
    )
}

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

const App = () =>
<>
    <Counter />
    <Counter />
    <Counter />
    <LoginForm onLogin={(login, password) => console.log(login, password)}/>
    <Header superAttribute={2 * Math.random()}>
        {[{name: 'главная', url: '/'},
            {name: 'о нас', url: '/about'}
          ]}
    </Header>
    <Main />
    <Footer/>
</>

export default App;
