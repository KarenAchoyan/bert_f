import React from 'react';
import Header from "./header";

const AnimationHeader = ({show}) => {
    return (
        <div className={`${show ? "show":null} animation-header`}>
            <Header/>
        </div>
    );
};

export default AnimationHeader;