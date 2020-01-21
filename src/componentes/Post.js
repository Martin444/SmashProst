import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'

class Post extends Component {
    
    confirmacionBorrar = () => {
        
        /**Esto viene desde Listado this.props.info, this.props.borrarPost(id)*/
        const {id} = this.props.info;

        Swal.fire({
            title: 'Estas segudor?',
            text: "Esta acción no se puede deshacer!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                
                this.props.borrarPost(id);
                
                Swal.fire(
                    'Eliminado!',
                    'El post ha sido eliminado.',
                    'success'
                );
            }
        });

    }

    render() {
        /**Esto viene desde Listado this.props.info, this.props.borrarPost(id)*/
        const {id, title} = this.props.info;
        return (
            <tr>
                <td>{id}</td>
                <td>{title}</td>
                <td>    
                    <Link to={`/post/${id}`} className="btn btn-primary">
                        Ver
                    </Link>

                    <Link to={`/editar/${id}`} className="btn btn-warning">
                        Editar
                    </Link>

                    <button type="button" className="btn btn-danger" onClick={ this.confirmacionBorrar } >
                        Borrar
                    </button>
                </td>
            </tr>
        );
    }

    /**
     * Antes del mensaje
     * <button type="button" className="btn btn-danger" onClick={ () => this.props.borrarPost(id)  } >
            Borrar
        </button>
     */
}

export default Post;