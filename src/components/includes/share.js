import React from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';

const ShareFeatures = ({ link }) => {
    return (
       <div className='row ' >
        <p className='text-gray-700 text-sm text-center font-semibold mb-1'>Partager sur</p>
        <div className='share-buttons  d-flex gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-300 justify-content-center'>
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
        </div>
    );
};

export default ShareFeatures;
