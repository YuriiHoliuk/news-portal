import React, { Component, Fragment } from 'react';
import Modal from 'react-modal';

interface IWithRemoveModalState {
    isModalOpened: boolean;
    removed: boolean;
}

export function withRemoveModal(InnerComponent: any): any {
    return class extends Component<{}, IWithRemoveModalState> {
        state = {
            isModalOpened: false,
            removed: false,
        };

        openRemoveModal = () => this.setState({ isModalOpened: true });

        accept = () => this.setState({ isModalOpened: false, removed: true });
        decline = () => this.setState({ isModalOpened: false });

        render() {
            const { isModalOpened, removed } = this.state;

            return (
                <Fragment>
                    {!removed && <InnerComponent {...this.props} openRemoveModal={this.openRemoveModal}/>}

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
