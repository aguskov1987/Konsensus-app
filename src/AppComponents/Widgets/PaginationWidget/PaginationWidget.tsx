import React from "react";
import ReactPaginate from 'react-paginate';
import './PaginationWidget.scss'
import {YardState} from "../../../AppState/YardState";
import {Subscription} from "rxjs";


class PaginationWidget extends React.Component<any, any> {
    private pagesSub: Subscription = new Subscription();

    constructor(props: any) {
        super(props);

        this.handlePageClick = this.handlePageClick.bind(this);

        this.state = {
            totalPages: 1
        }
    }

    componentDidMount() {
        this.pagesSub = YardState.hives.valueUpdatedEvent.subscribe((set) => {
            if (set === null) {
                return;
            }
            this.setState({
                totalPages: set.totalPages
            })
        })
    }

    componentWillUnmount() {
        this.pagesSub.unsubscribe();
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
        YardState.currentPage.updateOption(data.selected + 1);
    }
}

export default PaginationWidget;
