import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

const OrderModal = ({ show, handleClose, message, title, variant = 'danger', route }) => {
  const navigate = useNavigate();
  
  // Configuration des variants
  const variants = {
    danger: {
      color: '#dc3545',
      icon: <FiAlertCircle className="mb-2" size={32} />,
      buttonClass: 'btn-danger'
    },
    success: {
      color: '#28a745',
      icon: <FiCheckCircle className="mb-2" size={32} />,
      buttonClass: 'btn-success'
    }
  };

  const currentVariant = variants[variant] || variants.danger;

  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      centered
      backdrop="static"
      aria-labelledby="modal-title"
    >
      <Modal.Header className="border-0 position-relative">
        <div className="w-100 text-center">
          <div style={{ color: currentVariant.color }}>
            {currentVariant.icon}
            <Modal.Title 
              id="modal-title" 
              className="h4 mb-0"
              style={{ color: currentVariant.color }}
            >
              {title}
            </Modal.Title>
          </div>
          <Button 
            variant="link" 
            onClick={handleClose}
            className="position-absolute top-0 end-0 p-2"
            aria-label="Fermer"
          >
            <FiX size={24} />
          </Button>
        </div>
      </Modal.Header>
      
      <Modal.Body className="text-center py-4 px-5">
        <div className="lead" style={{ color: '#4a5568' }}>
          {message}
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0 justify-content-center pb-4">
        <Button 
          variant={variant} 
          onClick={() => navigate(`/${route}`)}
          className={`${currentVariant.buttonClass} px-5 py-2 rounded-pill`}
        >
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;