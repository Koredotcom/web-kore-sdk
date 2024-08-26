import './actionsModal.scss';
import { h } from 'preact';

export function ActionsModal(props: any) {
    const hostInstance = props.hostInstance;
    const closeModal = () => {
        hostInstance.chatEle.querySelector('.full-action-modal-wrapper').remove();
    }

    return (
        <div class="full-action-modal-wrapper">
            <div className="modal_backdrop"></div>
            <div className="modal-dialog-action">
                <div className="modal-content-action">
                    <div className="modal_header">
                        <h1></h1>
                        <button className="close_modal" onClick={closeModal}>
                            <svg version="1.1" width="auto" height="auto" viewBox="0 0 1024 1024"><title></title><g id="icomoon-ignore"></g><path fill="#697586" d="M557.251 512.005l265.375-265.378c12.498-12.497 12.498-32.758 0-45.255-12.493-12.497-32.758-12.497-45.251 0l-265.381 265.379-265.367-265.355c-12.497-12.497-32.758-12.496-45.255 0.001s-12.496 32.758 0.001 45.255l265.366 265.353-265.367 265.37c-12.497 12.498-12.497 32.758 0 45.256 12.497 12.493 32.758 12.493 45.255 0l265.368-265.37 265.38 265.37c12.498 12.493 32.758 12.493 45.256-0.005 12.493-12.493 12.493-32.758-0.005-45.251l-265.375-265.37z"></path></svg>
                        </button>
                    </div>
                    <div className="modal_body_actions">
                    </div>
                </div>
            </div>
        </div>
    );
}