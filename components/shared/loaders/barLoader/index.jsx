import React from 'react';
import styles from './styles.module.scss';
import BarLoader from 'react-spinners/BarLoader';

const BarLoaderSpinner = ({ loading }) => {
    return (
        <div className={styles.loader__wrapper}>
            <BarLoader
                color='#2980b9'
                loading={loading}
                height={5}
                width={120}
            />
        </div>
    )
}

export default BarLoaderSpinner;