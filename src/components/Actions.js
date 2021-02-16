import React from 'react';

import Button from '@material-ui/core/Button';

function Actions(props) {

    const {actions} = {...props};

    return (
        <div>
            {
                actions.map(action => {
                    return (
                        <Button variant="outlined" onClick={action.fnc} >{action.title}</Button>
                    )
                })
            }
        </div >
    )
}

export default Actions;