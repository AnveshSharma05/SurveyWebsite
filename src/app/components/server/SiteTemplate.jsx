import React from 'react';
import Header from '../client/Header';
import Footer from './Footer';

const SiteTemplate = (props) => {
    
    const { children } = props;
    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    );
}

export default SiteTemplate;

