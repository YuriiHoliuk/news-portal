import React, { Component, Fragment } from 'react';

import Modal from 'react-modal';

interface IWithRemoveModalState {
    isModalOpened: boolean;
}

export interface IWithRemoveModalProps {
    remove: () => void;
}

export function withRemoveModal(InnerComponent: any): any {
    return class extends Component<IWithRemoveModalProps, IWithRemoveModalState> {
        state = {
            isModalOpened: false,
        };

        openRemoveModal = () => this.setState({ isModalOpened: true });

        accept = () => {
            this.setState({ isModalOpened: false });
            this.props.remove();
        }

        decline = () => this.setState({ isModalOpened: false });

        render() {
            const { isModalOpened } = this.state;

            return (
                <Fragment>
                    <InnerComponent {...this.props} remove={this.openRemoveModal}/>

                    <Modal ariaHideApp={false} isOpen={isModalOpened}>
                        <p>Are you sure you want to remove it?</p>

                        <button type='button' onClick={this.decline}>Decline</button>
                        <button type='button' onClick={this.accept}>Accept</button>
                    </Modal>
                </Fragment>
            );
        }
    };
}
