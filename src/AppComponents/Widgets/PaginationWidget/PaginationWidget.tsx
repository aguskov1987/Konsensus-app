import React from "react";
import ReactPaginate from 'react-paginate';
import './PaginationWidget.scss'
import {YardState} from "../../../AppState/YardState";


class PaginationWidget extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.handlePageClick = this.handlePageClick.bind(this);

        this.state = {
            totalPages: 100
        }
    }

    render() {
        return (
            <ReactPaginate
                previousLabel={'<'} nextLabel={'>'} breakLabel={'...'}
                breakClassName={'break-me'}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageCount={this.state.totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
            />
        );
    }

    private handlePageClick(data) {
        YardState.currentPage.updateOption(data.selected);
    }
}

export default PaginationWidget;