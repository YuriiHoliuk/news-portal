import React, { SFC } from 'react';

import { IPaginationInfo } from '../../interfaces';
import { If } from '../../utils';

export interface IPaginationProps extends IPaginationInfo {
    changePage: (page: number) => any;
}

const Pagination: SFC<IPaginationProps> = ({ changePage, pages, currentPage, lastPage, showFirst, showLast }) => {
    const toPage = (page: number) => () => page !== currentPage && changePage(page);

    return (
        <ul className='uk-pagination' uk-margin=''>
            <If condition={showFirst}>
                <li>
                    <a onClick={toPage(1)}><span uk-pagination-previous=''/></a>
                </li>
                <span>...</span>
            </If>

            {pages.map(page => (<li
                key={page}
                className={page === currentPage ? 'uk-active' : ''}
            >
                <a onClick={toPage(page)}>{page}</a>
            </li>))}

            <If condition={showLast}>
                <span>...</span>
                <li>
                    <a onClick={toPage(lastPage)}><span uk-pagination-next=''/></a>
                </li>
            </If>

        </ul>
    );
};

export default Pagination;
