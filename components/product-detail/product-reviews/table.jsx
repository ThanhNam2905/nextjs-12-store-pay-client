import React, { useState } from 'react';
import styles from './styles.module.scss';
import usePagination from '../../../hooks/usePagination';
import { Pagination } from '@mui/material';
import ReviewCard from './review-card';
import TablesHeader from './tables-header';

const Table = ({ reviews, allSizes, colors }) => {

    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 3;
    const count = Math.ceil(reviews.length / ITEMS_PER_PAGE);
    const _DATA = usePagination(reviews, ITEMS_PER_PAGE);

    const handleChange = (e, page) => {
        setPage(page);
        _DATA.jump(page);
    }

    return (
        <div className={styles.tables}>
            <TablesHeader 
                reviews={reviews}
                allSizes={allSizes}
                colors={colors}
            />
            <div className={styles.tables__data}>
                { _DATA.currentData().map((review, index) => (
                    <ReviewCard
                        key={index}
                        review={review}
                    />
                ))

                }
            </div>
            <div className={styles.pagination}>
                <Pagination
                    page={page}
                    count={count}
                    variant='round'
                    shape='rounded'
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default Table