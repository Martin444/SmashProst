import React, { Component } from 'react';

class Formulario extends Component {
    
    /**
     * Crear Ref
     */
    tituloRef = React.createRef();
    contenidoRef = React.createRef();

    crearPost = (e) => {
        
        e.preventDefault();

        /**
         * Leer Los Ref
         */
        const post = {
            title: this.tituloRef.current.value,
            body: this.contenidoRef.current.value,
            userId:1
        }

         /**
          * Enviar por props o peticion axios, this.props.crearPost viene de Router.js
          */

        this.props.crearPost(post);
    }
    
    render() {
        return (
            <form onSubmit={this.crearPost} className="col-8">
                <legend className="text-center">Crear Nuevo Post</legend>

                <div className="form-group">
                    <label>Titulo del Post</label>
                    <input ref={this.tituloRef} type="text" className="form-control" placeholder="Titulo del Post" />
                </div>

                <div className="form-group">
                    <label>Contenido</label>
                    <textarea ref={this.contenidoRef} className="form-control" placeholder="Contenido" ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" > Crear </button>
            </form>
        );
    }
}

export default Formulario;