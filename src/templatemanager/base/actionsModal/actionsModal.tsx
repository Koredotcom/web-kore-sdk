import './actionsModal.scss';
import { h } from 'preact';

export function ActionsModal(props: any) {
    return (
        <div class="full-action-modal-wrapper">
            <div className="modal_backdrop"></div>
            <div className="modal-dialog-action">
                <div className="modal-content-action">
                    <div className="modal_header">
                        <h1>Title</h1>
                        <button className="close_modal">
                            <i className="sdkv3-close"></i>
                        </button>
                    </div>
                    <div className="modal_body_actions">
                        <h1>bala</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}