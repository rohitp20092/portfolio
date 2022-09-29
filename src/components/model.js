import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const PortfolioModal = ({
  formValues,
  open,
  toggle,
}) => {
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>Portfolio Detials</ModalHeader>
        <ModalBody>
          <div>
            <label className='me-4'>Invest Money:</label>
            <b>{formValues.money}</b>
          </div>
          <div>
            <label className='me-4'>Year:</label>
            <b>{formValues.year}</b>
          </div>
          <div>
            <label className='me-4'>Risk:</label>
            <b>{formValues.risk}</b>
          </div>
          <div>
            <label className='me-4'>Email:</label>
            <b>{formValues.email}</b>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default PortfolioModal;