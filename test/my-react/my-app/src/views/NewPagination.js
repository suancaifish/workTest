import React from 'react'
import { Pagination } from 'antd';

export default class NewPagination extends React.Component {

     ClickBtn(page, pageSize) {
        console.log(page, pageSize);
    }

    render() {
        return (
            <Pagination defaultCurrent={1} total={50} onChange={(page, pageSize) => {
                this.ClickBtn(page, pageSize)
            }} />
        )
    }
}
