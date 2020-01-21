import React from 'react';
import {Link} from 'react-router-dom';
import './Navegacion.css';

import { Button } from 'semantic-ui-react'


const Navegacion = () => {
    return (
        <nav className="col-12 col-md-8 nav">
            <Link to={'/'}>
                <Button>Todos los post</Button>
            </Link>

            <Link to={'/crear'}>
                <Button positive>Nuevo post</Button>
            </Link>
        </nav>
    );
};

export default Navegacion;