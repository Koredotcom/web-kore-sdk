import BaseChatTemplate from '../baseChatTemplate';
import './listView.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function ListView(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'listView') {
        return (
            <div>
                <div className="list-view-action-template-wrapper">
                    <h1>Best Collections</h1>
                    <div className="list-content-details">
                        <div className="list-data-temp">
                            <div className="img-with-content-block">
                                <div className="img-block">
                                    <figure>
                                    <img src="https://s3-alpha-sig.figma.com/img/423b/534f/3aa4840a12f7afcfe730a0975369ef30?Expires=1692576000&Signature=FocUzBZdjWMKYt6MnKZ1VXV8V9QL71zy4BuTmP78yo1NwA3D5g3niZ2unGHV2qAcSlF6lzFzJorAsD4Zc6pgz~PjaNVFqNpbJMftbmsN3-n1dXQ07daJ3y9x-UcoHu3ApCVKq8wl6tUsOw6SxhB0bYdW9qOZ~GHRpehyMCUl9C1R1~02IZjgYjqo82e8rUjZfqCZytO20qcBng3-NGiLwcD5bASbhIzmZ9G5G3QLxHIq-nn5GsGuVo~0Efi8l6z2VD6d9KgkyqgPFqCs9l3eQplF7u0O1G16D5Bd2VuJ6SO3iLdqEeq3d72W5EYuyRB-K0vHTyyBhkzQvxUgGLXOlw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                                    </figure>
                                </div>
                                <div className="content-details">
                                    <h1>Classic white T-shirt</h1>
                                    <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor.</p>
                                </div>
                            </div>
                            <button className="kr-button-blue-light">Buy now</button>
                        </div>
                        <div className="list-data-temp">
                            <div className="img-with-content-block">
                                <div className="img-block">
                                    <figure>
                                    <img src="https://s3-alpha-sig.figma.com/img/423b/534f/3aa4840a12f7afcfe730a0975369ef30?Expires=1692576000&Signature=FocUzBZdjWMKYt6MnKZ1VXV8V9QL71zy4BuTmP78yo1NwA3D5g3niZ2unGHV2qAcSlF6lzFzJorAsD4Zc6pgz~PjaNVFqNpbJMftbmsN3-n1dXQ07daJ3y9x-UcoHu3ApCVKq8wl6tUsOw6SxhB0bYdW9qOZ~GHRpehyMCUl9C1R1~02IZjgYjqo82e8rUjZfqCZytO20qcBng3-NGiLwcD5bASbhIzmZ9G5G3QLxHIq-nn5GsGuVo~0Efi8l6z2VD6d9KgkyqgPFqCs9l3eQplF7u0O1G16D5Bd2VuJ6SO3iLdqEeq3d72W5EYuyRB-K0vHTyyBhkzQvxUgGLXOlw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                                    </figure>
                                </div>
                                <div className="content-details">
                                    <h1>Classic white T-shirt</h1>
                                    <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor.</p>
                                </div>
                            </div>
                            <button className="kr-button-blue-light">Buy now</button>
                        </div>
                        <div className="list-data-temp">
                            <div className="img-with-content-block">
                                <div className="img-block">
                                    <figure>
                                    <img src="https://s3-alpha-sig.figma.com/img/423b/534f/3aa4840a12f7afcfe730a0975369ef30?Expires=1692576000&Signature=FocUzBZdjWMKYt6MnKZ1VXV8V9QL71zy4BuTmP78yo1NwA3D5g3niZ2unGHV2qAcSlF6lzFzJorAsD4Zc6pgz~PjaNVFqNpbJMftbmsN3-n1dXQ07daJ3y9x-UcoHu3ApCVKq8wl6tUsOw6SxhB0bYdW9qOZ~GHRpehyMCUl9C1R1~02IZjgYjqo82e8rUjZfqCZytO20qcBng3-NGiLwcD5bASbhIzmZ9G5G3QLxHIq-nn5GsGuVo~0Efi8l6z2VD6d9KgkyqgPFqCs9l3eQplF7u0O1G16D5Bd2VuJ6SO3iLdqEeq3d72W5EYuyRB-K0vHTyyBhkzQvxUgGLXOlw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                                    </figure>
                                </div>
                                <div className="content-details">
                                    <h1>Classic white T-shirt</h1>
                                    <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor.</p>
                                </div>
                            </div>
                            <button className="kr-button-blue-light">Buy now</button>
                        </div>
                        <div className="list-data-temp">
                            <div className="img-with-content-block">
                                <div className="img-block">
                                    <figure>
                                    <img src="https://s3-alpha-sig.figma.com/img/423b/534f/3aa4840a12f7afcfe730a0975369ef30?Expires=1692576000&Signature=FocUzBZdjWMKYt6MnKZ1VXV8V9QL71zy4BuTmP78yo1NwA3D5g3niZ2unGHV2qAcSlF6lzFzJorAsD4Zc6pgz~PjaNVFqNpbJMftbmsN3-n1dXQ07daJ3y9x-UcoHu3ApCVKq8wl6tUsOw6SxhB0bYdW9qOZ~GHRpehyMCUl9C1R1~02IZjgYjqo82e8rUjZfqCZytO20qcBng3-NGiLwcD5bASbhIzmZ9G5G3QLxHIq-nn5GsGuVo~0Efi8l6z2VD6d9KgkyqgPFqCs9l3eQplF7u0O1G16D5Bd2VuJ6SO3iLdqEeq3d72W5EYuyRB-K0vHTyyBhkzQvxUgGLXOlw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                                    </figure>
                                </div>
                                <div className="content-details">
                                    <h1>Classic white T-shirt</h1>
                                    <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor.</p>
                                </div>
                            </div>
                            <a className="link-exteranl-list" href="#" target="_blank">www.google.co.in/search?q=data&tbm=isch&ved=2ah</a>
                        </div>
                        <div className="list-data-temp">
                            <div className="img-with-content-block">
                                <div className="img-block">
                                    <figure>
                                    <img src="https://s3-alpha-sig.figma.com/img/423b/534f/3aa4840a12f7afcfe730a0975369ef30?Expires=1692576000&Signature=FocUzBZdjWMKYt6MnKZ1VXV8V9QL71zy4BuTmP78yo1NwA3D5g3niZ2unGHV2qAcSlF6lzFzJorAsD4Zc6pgz~PjaNVFqNpbJMftbmsN3-n1dXQ07daJ3y9x-UcoHu3ApCVKq8wl6tUsOw6SxhB0bYdW9qOZ~GHRpehyMCUl9C1R1~02IZjgYjqo82e8rUjZfqCZytO20qcBng3-NGiLwcD5bASbhIzmZ9G5G3QLxHIq-nn5GsGuVo~0Efi8l6z2VD6d9KgkyqgPFqCs9l3eQplF7u0O1G16D5Bd2VuJ6SO3iLdqEeq3d72W5EYuyRB-K0vHTyyBhkzQvxUgGLXOlw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                                    </figure>
                                </div>
                                <div className="content-details">
                                    <h1>Classic white T-shirt</h1>
                                    <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor.</p>
                                </div>
                            </div>
                            <a className="link-exteranl-list" href="#" target="_blank">www.google.co.in/search?q=data&tbm=isch&ved=2ah</a>
                        </div>
                    </div>
                </div>
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
                <div className="list-view-action-template-wrapper">
                    <h1>Recent Transactions</h1>
                    <div className="list-content-details">
                        <div className="list-data-temp">
                            <div className="img-with-content-block">
                                <div className="img-block small-img">
                                    <figure>
                                        <img src="https://s3-alpha-sig.figma.com/img/423b/534f/3aa4840a12f7afcfe730a0975369ef30?Expires=1692576000&Signature=FocUzBZdjWMKYt6MnKZ1VXV8V9QL71zy4BuTmP78yo1NwA3D5g3niZ2unGHV2qAcSlF6lzFzJorAsD4Zc6pgz~PjaNVFqNpbJMftbmsN3-n1dXQ07daJ3y9x-UcoHu3ApCVKq8wl6tUsOw6SxhB0bYdW9qOZ~GHRpehyMCUl9C1R1~02IZjgYjqo82e8rUjZfqCZytO20qcBng3-NGiLwcD5bASbhIzmZ9G5G3QLxHIq-nn5GsGuVo~0Efi8l6z2VD6d9KgkyqgPFqCs9l3eQplF7u0O1G16D5Bd2VuJ6SO3iLdqEeq3d72W5EYuyRB-K0vHTyyBhkzQvxUgGLXOlw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                                    </figure>
                                </div>
                                <div className="content-details">
                                    <h1>Amazon</h1>
                                    <p>17 Mon June</p>
                                </div>
                                <div className="price-tag">$34.88</div>
                            </div>
                        </div>
                        <div className="list-data-temp">
                            <div className="img-with-content-block">
                                <div className="img-block small-img">
                                    <figure>
                                        <img src="https://s3-alpha-sig.figma.com/img/423b/534f/3aa4840a12f7afcfe730a0975369ef30?Expires=1692576000&Signature=FocUzBZdjWMKYt6MnKZ1VXV8V9QL71zy4BuTmP78yo1NwA3D5g3niZ2unGHV2qAcSlF6lzFzJorAsD4Zc6pgz~PjaNVFqNpbJMftbmsN3-n1dXQ07daJ3y9x-UcoHu3ApCVKq8wl6tUsOw6SxhB0bYdW9qOZ~GHRpehyMCUl9C1R1~02IZjgYjqo82e8rUjZfqCZytO20qcBng3-NGiLwcD5bASbhIzmZ9G5G3QLxHIq-nn5GsGuVo~0Efi8l6z2VD6d9KgkyqgPFqCs9l3eQplF7u0O1G16D5Bd2VuJ6SO3iLdqEeq3d72W5EYuyRB-K0vHTyyBhkzQvxUgGLXOlw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                                    </figure>
                                </div>
                                <div className="content-details">
                                    <h1>Amazon</h1>
                                    <p>17 Mon June</p>
                                </div>
                                <div className="price-tag">$34.88</div>
                            </div>
                        </div>
                        <div className="list-data-temp">
                            <div className="img-with-content-block">
                                <div className="img-block small-img">
                                    <figure>
                                        <img src="https://s3-alpha-sig.figma.com/img/423b/534f/3aa4840a12f7afcfe730a0975369ef30?Expires=1692576000&Signature=FocUzBZdjWMKYt6MnKZ1VXV8V9QL71zy4BuTmP78yo1NwA3D5g3niZ2unGHV2qAcSlF6lzFzJorAsD4Zc6pgz~PjaNVFqNpbJMftbmsN3-n1dXQ07daJ3y9x-UcoHu3ApCVKq8wl6tUsOw6SxhB0bYdW9qOZ~GHRpehyMCUl9C1R1~02IZjgYjqo82e8rUjZfqCZytO20qcBng3-NGiLwcD5bASbhIzmZ9G5G3QLxHIq-nn5GsGuVo~0Efi8l6z2VD6d9KgkyqgPFqCs9l3eQplF7u0O1G16D5Bd2VuJ6SO3iLdqEeq3d72W5EYuyRB-K0vHTyyBhkzQvxUgGLXOlw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                                    </figure>
                                </div>
                                <div className="content-details">
                                    <h1>Amazon</h1>
                                    <p>17 Mon June</p>
                                </div>
                                <div className="price-tag">$34.88</div>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        );
    }
}

class TemplateListView extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(ListView, msgData, this.hostInstance);
    }
}

export default TemplateListView;

