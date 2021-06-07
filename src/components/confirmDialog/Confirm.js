import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { render } from 'react-dom';

let resolve;

class Confirm extends React.Component {

  constructor() {
    super();

    this.state = {
      isOpen: false,
      showConfirmProps: {}
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.show = this.show.bind(this);
  }

  static create() {
    const containerElement = document.createElement('div');
    document.body.appendChild(containerElement);
    return render(<Confirm />, containerElement);
  }

  handleCancel() {
    this.setState({ isOpen: false });
    resolve(false);
  }

  handleConfirm() {
    this.setState({ isOpen: false });
    resolve(true);
  }

  show(props = {}) {
    const showConfirmProps = { ...this.props.createConfirmProps, ...props };
    this.setState({ isOpen: true, showConfirmProps });

    return new Promise((res) => {
      resolve = res;
    });
  }

  render() {
    const { isOpen } = this.state;


    return (
      <Modal show={isOpen} onHide={this.handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Deseja realmente excluir este registro?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="btn-outline-danger" onClick={this.handleCancel} >Não</Button>
          <Button variant="btn-outline-success" onClick={this.handleConfirm}>Sim</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


export default Confirm;