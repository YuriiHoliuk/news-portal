import React, { Component, Fragment } from 'react';

import Modal from 'react-modal';

interface IWithRemoveModalState {
    isModalOpened: boolean;
    data: any;
    afterRemove: (...args) => any;
}

export interface IWithRemoveModalProps {
    remove: () => void;
}

export function withRemoveModal(InnerComponent: any, removePropName: string = 'remove'): any {
    return class extends Component<IWithRemoveModalProps, IWithRemoveModalState> {
        state = {
            isModalOpened: false,
            data: null,
            afterRemove: null,
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

        openRemoveModal = (data?, afterRemove?) => this.setState({ isModalOpened: true, data, afterRemove });

        accept = () => {
            this.setState({ isModalOpened: false });
            this.props[removePropName](this.state.data);
            if (this.state.afterRemove && typeof this.state.afterRemove === 'function') {
                this.state.afterRemove();
            }
            this.setState({ data: null, afterRemove: null });
        }

        decline = () => this.setState({ isModalOpened: false });

        render() {
            const { isModalOpened } = this.state;
            const props = { ...this.props, [removePropName]: this.openRemoveModal };

            return (
                <Fragment>
                    <InnerComponent {...props} />

                    <Modal ariaHideApp={false} style={this.modalStyles} isOpen={isModalOpened}>
                        <div className='uk-modal-body'>
                            <p className='uk-modal-title uk-margin-large-bottom'>
                                Are you sure you want to remove it?
                            </p>

                            <button
                                type='button'
                                className='uk-button uk-button-default uk-margin-right'
                                onClick={this.decline}
                            >
                                Decline
                            </button>

                            <button
                                type='button'
                                className='uk-button uk-button-primary'
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
