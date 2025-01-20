import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const OrderModal = ({ show, handleClose, message, title, variant, route }) => {
    const navigate = useNavigate();
  
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-danger '>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='font-semibold'>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='bg-danger text-white' onClick={() => navigate(`/${route}`)}>
            Masquer
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

export default OrderModal;