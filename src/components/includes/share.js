import React from 'react';
import { FacebookShareButton,TelegramShareButton, TwitterShareButton, WhatsappShareButton, EmailShareButton,  FacebookIcon, TelegramIcon, TwitterIcon, WhatsappIcon, EmailIcon } from 'react-share';
import '../styles/share.css';

const ShareFeatures = ({ link }) => {
    return (
       
       
            
        <div className='row bg-gray-50 rounded-lg m-2 py-1'>
        <div className='share-buttons   '>
           
            <FacebookShareButton url={link}>
                <FacebookIcon size={24  } round={true} />
            </FacebookShareButton>
            <TelegramShareButton url={link}>
                <TelegramIcon size={24} round={true} />
            </TelegramShareButton>
            <TwitterShareButton url={link}>
                <TwitterIcon size={24} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton url={link}>
                <WhatsappIcon size={24} round={true} />
            </WhatsappShareButton>
            <EmailShareButton url={link}>
                <EmailIcon size={24} round={true} />
            </EmailShareButton>
        </div>
       
        <span className='partager'>Partager</span>
        </div>
        
    );
};

export default ShareFeatures;
