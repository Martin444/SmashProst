import React, { Component } from 'react';

class Editar extends Component {
    
    /**
     * Crear Ref
     */
    tituloRef = React.createRef();
    contenidoRef = React.createRef();

    editarPost = (e) => {
        
        e.preventDefault();

        /**Estp se envia desde Router */
        const {id} = this.props.post;

        /**
         * Leer Los Ref
         */
        const post = {
            title: this.tituloRef.current.value,
            body: this.contenidoRef.current.value,
            userId:1,
            id
        }

         /**
          * Enviar por props o peticion axios, this.props.crearPost viene de Router.js
          */

        this.props.editarPost(post);
    }

    cargarFormulario = () => {
        
        if(!this.props.post){
            return null;
        }
        /**Estp se envia desde Router */
        const {title, body} = this.props.post;

        return (
            <form onSubmit={this.editarPost} className="col-8">
                <legend className="text-center">Editar Post</legend>

                <div className="form-group">
                    <label>Titulo del Post</label>
                    <input ref={this.tituloRef} type="text" className="form-control" defaultValue={title} />
                </div>

                <div className="form-group">
                    <label>Contenido</label>
                    <textarea ref={this.contenidoRef} className="form-control" defaultValue={body} ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" > Guardar Cambios </button>
            </form>
        )
    }
    
    render() {

        
        return (
            <React.Fragment>
                { this.cargarFormulario() }
            </React.Fragment>
        );
    }
}

export default Editar;