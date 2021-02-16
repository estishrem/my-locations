import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DataGrid } from '@material-ui/data-grid';

import { CATEGORY_TYPE, LOCATION_TYPE } from '../../redux/reducers/common';
import { selectItem } from '../../redux/actions';

function ShowList() {

    const selectedType = useSelector(state => state.common.selectedType);
    const list = useSelector(state => selectedType === CATEGORY_TYPE ?
        state.categories.categories : state.locations.locations);
    const dispatch = useDispatch();

    const handleSelectItem = (item) => {
        dispatch(selectItem(item, selectedType))
    }

    const getColumns = () => {
        const columnArr = [{ field: 'name', headerName: 'NAME', width: 250, disableColumnMenu: true }];
        selectedType === LOCATION_TYPE &&
            columnArr.push(
                { field: 'address', headerName: 'ADDRESS', width: 250, disableColumnMenu: true, sortable: false, disableColumnSelector: true },
                { field: 'lat', headerName: 'LATITUDE', width: 250, disableColumnMenu: true, sortable: false },
                { field: 'lng', headerName: 'LONGITUDE', width: 250, disableColumnMenu: true, sortable: false },
                { field: 'category', headerName: 'CATEGORY', width: 250, sortable: false },
            );
        return columnArr;
    }

    const getRows = () => {
        const rowsArr = [];
        list.map(item => rowsArr.push(
            selectedType === CATEGORY_TYPE ?
                { id: item.id, name: item.name } :
                { id: item.id, name: item.name, address: item.address, lat: item.lat, lng: item.lng, category: item.category }
        ));
        return rowsArr;
    }

    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid rows={getRows()} columns={getColumns()}
               onRowClick={(e) => handleSelectItem(e.row)} pageSize={9} />
        </div>
    )
}

export default ShowList;
