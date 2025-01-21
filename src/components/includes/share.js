import React from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';

const ShareFeatures = ({ link }) => {
    return (
       
       
            
        
        <div className='share-buttons  d-flex gap-2  p-2 justify-content-center opacity-75 '>
           
            <FacebookShareButton url={link}>
                <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <TwitterShareButton url={link}>
                <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton url={link}>
                <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
        </div>
     
        
    );
};

export default ShareFeatures;
