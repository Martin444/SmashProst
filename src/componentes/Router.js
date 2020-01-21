import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import Header from './Header';
import Navegacion from './Navegacion';
import Posts from './Posts';
import SinglePost from './SinglePost';
import Formulario from './Formulario';
import Editar from './Editar';

class Router extends Component {
    
    state = {
        posts:[]
    }

    componentDidMount(){
        this.obtenerPost();
    }

    obtenerPost = () => {
        
        const url = `https://jsonplaceholder.typicode.com/posts`;
        
        axios.get(url)
            .then( resp => {
                this.setState({
                    posts:resp.data
                })
            } )
    }

    borrarPost = (id) => {

        const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        
        axios.delete(url)
            .then( resp => {
                /*this.setState({
                    posts:resp.data
                })*/
                console.log(resp); 

                if(resp.status === 200){

                    const posts =  [...this.state.posts];

                    let resultado = posts.filter( post => {
                        return post.id !== id
                    });

                    this.setState({
                        posts:resultado
                    })


                }
            } )
    }

    crearPost = (post) => {

        const url = `https://jsonplaceholder.typicode.com/posts/ `;
        
        axios.post(url, {post})
            .then( resp => {

                if(resp.status === 201){

                    Swal.fire(
                        'Post Creado!',
                        'Se creo correctamente!',
                        'success'
                    );

                    const posts =  [...this.state.posts];

                    let postId = {id: resp.data.id};

                    /**
                     * Unir objetos
                     */
                    let nuevoPost = Object.assign( {}, resp.data.post, postId )

                    /**
                     * Obtenemos el state anterior
                     * con spread operator le concatenamos el nuevo post
                     */
                    this.setState( prevState => ({
                        posts: [...prevState.posts, nuevoPost]
                    }));


                }
            } )
    }

    editarPost = (postActualizado) => {
        console.log(postActualizado);

        const {id} = postActualizado;

        const url = `https://jsonplaceholder.typicode.com/posts/${id} `;
        
        axios.put(url, {postActualizado})
            .then( resp => {

                if(resp.status === 200){

                    let postId = resp.data.id;

                    const posts =  [...this.state.posts];
                    
                    /**
                     * Esto me retorna el indice donde esta ubicado el array que necesito
                     */
                    const postEditar = posts.findIndex( post => post.id === postId );

                    posts[ postEditar ] = postActualizado;

                    this.setState({
                        posts
                    });

                    Swal.fire(
                        'Post Actualizado!',
                        'Se creo correctamente!',
                        'success'
                    );

                }
            } )
    }


    
    render() {
        return (
            <BrowserRouter>

                <div className="container">
                    <div className="row justify-content-center">
                        <Header/>

                        <Navegacion/>

                        <Switch>
                            <Route exact path='/' render={ () => {
                                return (
                                    <Posts
                                        posts={this.state.posts}
                                        borrarPost={this.borrarPost}
                                    />
                                )
                            } } />

                            <Route exact path='/post/:postId' render={ (props) => {
                                
                                let idPost = props.location.pathname.replace('/post/','');

                                const posts = this.state.posts;

                                let filtro;
                                filtro = posts.filter( post => {
                                    return post.id === Number(idPost)
                                });

                                return (
                                    <SinglePost
                                        post = {filtro[0]}
                                    />
                                )
                            }}/>

                            <Route exact path='/crear' render={ () => {
                                return (
                                    <Formulario
                                        crearPost={this.crearPost}
                                    />
                                )
                            } } />


                            <Route exact path='/editar/:postId' render={ (props) => {
                                
                                let idPost = props.location.pathname.replace('/editar/','');

                                const posts = this.state.posts;

                                let filtro;
                                filtro = posts.filter( post => {
                                    return post.id === Number(idPost) 
                                });

                                return (
                                    <Editar
                                        post = {filtro[0]}
                                        editarPost = {this.editarPost}
                                    />
                                )
                            }}/>

                        </Switch>
                    </div>
                </div>
            
            </BrowserRouter>
        );
    }
}

export default Router;