import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Actions from './Actions';
import './Header.css';

function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Actions />
                <Typography variant="h6" className="list-title">
                    Categories List
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;