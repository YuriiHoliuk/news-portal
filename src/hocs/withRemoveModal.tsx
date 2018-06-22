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

        modalStyles = {
            content: {
                maxWidth: '600px',
                maxHeight: '200px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            },
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

                    <Modal ariaHideApp={false} style={this.modalStyles} isOpen={isModalOpened}>
                        <div className={'uk-modal-body'}>
                            <p className={'uk-modal-title uk-margin-large-bottom'}>
                                Are you sure you want to remove it?
                            </p>

                            <button
                                type='button'
                                className={'uk-button uk-button-default uk-margin-right'}
                                onClick={this.decline}
                            >
                                Decline
                            </button>

                            <button
                                type='button'
                                className={'uk-button uk-button-primary'}
                                onClick={this.accept}
                            >
                                Accept
                            </button>
                        </div>
                    </Modal>
                </Fragment>
            );
        }
    };
}
