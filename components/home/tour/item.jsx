import React from 'react';
import styles from '../../../styles/tour.module.css'

const Item = ({item}) => {
    return (
        <div>
            <div className={styles.aboutItem}>
                <div>
                    <div className={styles.upSide}>
                        <h2>{item.title}</h2>
                    </div>
                    <div className={styles.downSide}>
                        <span>{item.date}</span>
                        <div className={styles.btn}>
                            <a href={item.url}><button>Գնել տոմս</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Item;