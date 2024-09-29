import React from 'react';
import styles from '../../../styles/performance.module.css';

const Modal = ({ openModal, videoStarted, video }) => {
    const modalStyles = {
        transform: "translate(-50%, -50%) scale(1)"
    };

    // Check if the video prop has a valid value
    const youtubeEmbedLink = video ? `https://www.youtube.com/embed/${video}` : '';

    return (
        <>
            <div className={styles.back} onClick={openModal}></div>
            <div className={styles.modal} style={modalStyles}>
                    <iframe
                        width="100%"
                        height="100%"
                        src={ youtubeEmbedLink}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="YouTube Video"
                    />
            </div>
        </>
    );
};

export default Modal;
