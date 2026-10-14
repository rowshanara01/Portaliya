import React from 'react';
import not from '../../assets/others/not.gif';

const NotFound = () => {
    return (
        <div className='container mx-auto flex justify-center'>
            <br /><br />
            <img className='w-100 mb-10 mt-10' src={not} alt="notfound" />
            <br /><br />
        </div>
    );
};

export default NotFound;