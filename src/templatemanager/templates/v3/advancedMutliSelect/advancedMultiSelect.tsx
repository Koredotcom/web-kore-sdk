import BaseChatTemplate from '../baseChatTemplate';
import './advancedMultiSelect.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function AdvancedMultiSelect(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'advanced_multi_select') {
        return (
            <div className="list-view-action-template-wrapper">
                <h1>Best Collections</h1>
                <div className="checkbox-item select-all">
                    <input id="checkbox-selectall" className="checkbox-input" type="checkbox" value="" />
                    <label for="checkbox-selectall" className="checkbox-label">
                        <div className="title">Select All</div>
                    </label>
                </div>
                <div className="list-content-details if-checkbox-select-all">
                    <div className="list-data-temp">
                        <div className="img-with-content-block">
                            <div className="checkbox-item select-all">
                                <input id="checkbox-1" className="checkbox-input" type="checkbox" value="" />
                                <label for="checkbox-1" className="checkbox-label"></label>
                            </div>
                            <div className="img-block medium-img">
                                <figure>
                                    <img src="https://s3-alpha-sig.figma.com/img/423b/534f/3aa4840a12f7afcfe730a0975369ef30?Expires=1692576000&Signature=FocUzBZdjWMKYt6MnKZ1VXV8V9QL71zy4BuTmP78yo1NwA3D5g3niZ2unGHV2qAcSlF6lzFzJorAsD4Zc6pgz~PjaNVFqNpbJMftbmsN3-n1dXQ07daJ3y9x-UcoHu3ApCVKq8wl6tUsOw6SxhB0bYdW9qOZ~GHRpehyMCUl9C1R1~02IZjgYjqo82e8rUjZfqCZytO20qcBng3-NGiLwcD5bASbhIzmZ9G5G3QLxHIq-nn5GsGuVo~0Efi8l6z2VD6d9KgkyqgPFqCs9l3eQplF7u0O1G16D5Bd2VuJ6SO3iLdqEeq3d72W5EYuyRB-K0vHTyyBhkzQvxUgGLXOlw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                                </figure>
                            </div>
                            <div className="content-details">
                                <h1>Classic white T-shirt</h1>
                                <p>German company</p>
                            </div>
                        </div>
                    </div>
                    <div className="list-data-temp">
                        <div className="img-with-content-block">
                            <div className="checkbox-item select-all">
                                <input id="checkbox-1" className="checkbox-input" type="checkbox" value="" />
                                <label for="checkbox-1" className="checkbox-label"></label>
                            </div>
                            <div className="img-block medium-img">
                                <figure>
                                    <img src="https://s3-alpha-sig.figma.com/img/423b/534f/3aa4840a12f7afcfe730a0975369ef30?Expires=1692576000&Signature=FocUzBZdjWMKYt6MnKZ1VXV8V9QL71zy4BuTmP78yo1NwA3D5g3niZ2unGHV2qAcSlF6lzFzJorAsD4Zc6pgz~PjaNVFqNpbJMftbmsN3-n1dXQ07daJ3y9x-UcoHu3ApCVKq8wl6tUsOw6SxhB0bYdW9qOZ~GHRpehyMCUl9C1R1~02IZjgYjqo82e8rUjZfqCZytO20qcBng3-NGiLwcD5bASbhIzmZ9G5G3QLxHIq-nn5GsGuVo~0Efi8l6z2VD6d9KgkyqgPFqCs9l3eQplF7u0O1G16D5Bd2VuJ6SO3iLdqEeq3d72W5EYuyRB-K0vHTyyBhkzQvxUgGLXOlw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                                </figure>
                            </div>
                            <div className="content-details">
                                <h1>Classic white T-shirt</h1>
                                <p>German company</p>
                            </div>
                        </div>
                    </div>
                    <div className="list-data-temp">
                        <div className="img-with-content-block">
                            <div className="checkbox-item select-all">
                                <input id="checkbox-1" className="checkbox-input" type="checkbox" value="" />
                                <label for="checkbox-1" className="checkbox-label"></label>
                            </div>
                            <div className="img-block medium-img">
                                <figure>
                                    <img src="https://s3-alpha-sig.figma.com/img/423b/534f/3aa4840a12f7afcfe730a0975369ef30?Expires=1692576000&Signature=FocUzBZdjWMKYt6MnKZ1VXV8V9QL71zy4BuTmP78yo1NwA3D5g3niZ2unGHV2qAcSlF6lzFzJorAsD4Zc6pgz~PjaNVFqNpbJMftbmsN3-n1dXQ07daJ3y9x-UcoHu3ApCVKq8wl6tUsOw6SxhB0bYdW9qOZ~GHRpehyMCUl9C1R1~02IZjgYjqo82e8rUjZfqCZytO20qcBng3-NGiLwcD5bASbhIzmZ9G5G3QLxHIq-nn5GsGuVo~0Efi8l6z2VD6d9KgkyqgPFqCs9l3eQplF7u0O1G16D5Bd2VuJ6SO3iLdqEeq3d72W5EYuyRB-K0vHTyyBhkzQvxUgGLXOlw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                                </figure>
                            </div>
                            <div className="content-details">
                                <h1>Classic white T-shirt</h1>
                                <p>German company</p>
                            </div>
                        </div>
                    </div>
                    <div className="list-data-temp">
                        <div className="img-with-content-block">
                            <div className="checkbox-item select-all">
                                <input id="checkbox-1" className="checkbox-input" type="checkbox" value="" />
                                <label for="checkbox-1" className="checkbox-label"></label>
                            </div>
                            <div className="img-block medium-img">
                                <figure>
                                    <img src="https://s3-alpha-sig.figma.com/img/423b/534f/3aa4840a12f7afcfe730a0975369ef30?Expires=1692576000&Signature=FocUzBZdjWMKYt6MnKZ1VXV8V9QL71zy4BuTmP78yo1NwA3D5g3niZ2unGHV2qAcSlF6lzFzJorAsD4Zc6pgz~PjaNVFqNpbJMftbmsN3-n1dXQ07daJ3y9x-UcoHu3ApCVKq8wl6tUsOw6SxhB0bYdW9qOZ~GHRpehyMCUl9C1R1~02IZjgYjqo82e8rUjZfqCZytO20qcBng3-NGiLwcD5bASbhIzmZ9G5G3QLxHIq-nn5GsGuVo~0Efi8l6z2VD6d9KgkyqgPFqCs9l3eQplF7u0O1G16D5Bd2VuJ6SO3iLdqEeq3d72W5EYuyRB-K0vHTyyBhkzQvxUgGLXOlw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                                </figure>
                            </div>
                            <div className="content-details">
                                <h1>Classic white T-shirt</h1>
                                <p>German company</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class TemplateAdvancedMultiSelect extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(AdvancedMultiSelect, msgData, this.hostInstance);
    }
}

export default TemplateAdvancedMultiSelect;

