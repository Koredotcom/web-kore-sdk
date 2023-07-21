import './menu.scss';
import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import IconsManager from '../iconsManager';
export function Menu(props: any) {
    const iconHelper = new IconsManager();
    const hostInstance = props.hostInstance;
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        console.log('Branding Data: ', event.brandingData);
        updateBrandingInfo({ ...event.brandingData })
    });

    const closeMenu = () => {
        hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');        
        }, 150);
    }

    const handleButtonEvent = (e: any) => {
        if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
            hostInstance.sendMessage(e.value, { renderMsg: e.title });
            closeMenu();
        } else if (e.type == 'url' || e.type == 'web_url') {
            let link = e.value;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        }
    }

    return (
        <div className="menu-wrapper-data-actions">
            <div className="actions-slider-header-menu">
                <h1>Menu</h1>
                <button className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <figure>
                        <img src={iconHelper.getIcon('close_icon')} alt="close" />
                    </figure>
                </button>
            </div>
            <div className="iner-data-scroll-wraper">
                {/* <div class="button-template-container">
                    <div class="button-temp full-width-buttons button-variation-3">
                        {
                            brandingInfo.footer.buttons.menu.actions.map((ele: any) => (
                                <button class="kr-btn" onClick={() => handleButtonEvent(ele)}><span>{ ele.title }</span></button>
                            ))
                        }
                    </div>
                </div> */}
                <section className="card-info-more-details" aria-label="card template sdk">
                    <div className="top-sec-card">
                        <h1>John Paul</h1>
                        <span className="tag-name">1043693</span>
                    </div>
                    <div className="middle-sec-card">
                        <div class="img-with-text">
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9IkZpYXQgNTAwIj4KPHBhdGggaWQ9IlZlY3RvciIgZD0iTTUuNjkxNDEgM0M0LjMyMDc3IDMgMy4zMjUzMyAzLjg4MTQ3IDIuNjk5MjIgNC42OTUzMUMyLjI2ODEgNS4yNTU3IDIuMDQxNCA1LjcxMDAxIDEuOTA4MiA2LjAwMzkxTDEuODQxOCA2LjAyNTM5QzEuODQxOCA2LjAyNTM5IDEuMzUwMDUgNi4xOTI5MiAwLjg5NjQ4NCA2LjY0NjQ4QzAuNDQyOTE3IDcuMTAwMDUgMCA3Ljg3NSAwIDlDMCA5LjkxNjY3IDAuNTMzMDg3IDEwLjUxMjYgMS4wMjczNCAxMC43NTk4QzEuNTIxNiAxMS4wMDY5IDIgMTEgMiAxMUMyIDEyLjA5ODYgMi45MDEzNSAxMyA0IDEzQzUuMDk4NjUgMTMgNiAxMi4wOTg2IDYgMTFIMTFDMTEgMTIuMDk4NiAxMS45MDE0IDEzIDEzIDEzQzE0LjA5ODYgMTMgMTUgMTIuMDk4NiAxNSAxMUgxNS41QzE1LjYzMjYgMTEgMTUuNzU5OCAxMC45NDczIDE1Ljg1MzUgMTAuODUzNUMxNS45NDczIDEwLjc1OTggMTYgMTAuNjMyNiAxNiAxMC41VjguODc1QzE2IDguMTUzNDcgMTUuNzE2OSA3LjU1NzY3IDE1LjMxMDUgNy4xNDI1OEMxNC45MDQyIDYuNzI3NDkgMTQuMzk0NCA2LjQ3NzY3IDEzLjkwODIgNi4zMTQ0NUMxMy4wNzk5IDYuMDM2MzcgMTIuNDk5NiA2LjA1MDE5IDEyLjI3OTMgNi4wNDY4OEwxMS4wODIgNC41MzcxMUMxMC4wMyAzLjA1NjY0IDguNjAzIDMgOCAzSDUuNjkxNDFaTTUuNjkxNDEgNEg2VjZIMy4wMzcxMUMzLjE1OSA1Ljc4NTI0IDMuMzAzMDEgNS41NTA1OSAzLjQ5MjE5IDUuMzA0NjlDNC4wMjAwNyA0LjYxODUzIDQuNzU0MDQgNCA1LjY5MTQxIDRaTTcgNEg4QzguNjAzIDQgOS40MzE2OCAzLjk0MzY2IDEwLjI2NTYgNS4xMTcxOUMxMC4yNzA3IDUuMTIzODMgMTAuMjc1OSA1LjEzMDM0IDEwLjI4MTIgNS4xMzY3MkwxMC45NjQ4IDZIN1Y0Wk0yLjEyMTA5IDdIMTJIMTIuMDAzOUMxMi4wMDM5IDcgMTIuODE0MiA3LjAwMDY2IDEzLjU5MTggNy4yNjE3MkMxMy45ODA2IDcuMzkyMjUgMTQuMzQ1OCA3LjU4NjU3IDE0LjU5NTcgNy44NDE4QzE0Ljg0NTYgOC4wOTcwMiAxNSA4LjM5NjUzIDE1IDguODc1VjEwSDE0LjcxODhDMTQuMzcwNSA5LjQwNjQ1IDEzLjczMzIgOSAxMyA5QzEyLjI2NjggOSAxMS42Mjk1IDkuNDA2NDUgMTEuMjgxMiAxMEg1LjcxODc1QzUuMzcwNTQgOS40MDY0NSA0LjczMzE1IDkgNCA5QzMuMjY2ODUgOSAyLjYyOTQ2IDkuNDA2NDUgMi4yODEyNSAxMEgyQzIgMTAgMS43Mjg0IDkuOTkzMTEgMS40NzI2NiA5Ljg2NTIzQzEuMjE2OTEgOS43MzczNiAxIDkuNTgzMzMgMSA5QzEgOC4xMjUgMS4zMDcwOCA3LjY0OTk1IDEuNjAzNTIgNy4zNTM1MkMxLjg4MDExIDcuMDc2OTMgMi4wODk3NyA3LjAxMDg5IDIuMTIxMDkgN1pNNCAxMEM0LjU1ODIxIDEwIDUgMTAuNDQxOCA1IDExQzUgMTEuNTU4MiA0LjU1ODIxIDEyIDQgMTJDMy40NDE3OSAxMiAzIDExLjU1ODIgMyAxMUMzIDEwLjQ0MTggMy40NDE3OSAxMCA0IDEwWk0xMyAxMEMxMy41NTgyIDEwIDE0IDEwLjQ0MTggMTQgMTFDMTQgMTEuNTU4MiAxMy41NTgyIDEyIDEzIDEyQzEyLjQ0MTggMTIgMTIgMTEuNTU4MiAxMiAxMUMxMiAxMC40NDE4IDEyLjQ0MTggMTAgMTMgMTBaIiBmaWxsPSJibGFjayIvPgo8L2c+Cjwvc3ZnPgo=" />
                            <p>Tesla, Cybertruck, 2023</p>
                        </div>
                        <div class="right-title">
                            <p>TXS0987</p>
                        </div>
                    </div>
                    <div className="middle-sec-card m-b-10">
                        <div class="img-with-text">
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9IkNhciBJbnN1cmFuY2UiPgo8cGF0aCBpZD0iVmVjdG9yIiBkPSJNMi41IDEuOTY0ODRDMS42Nzc0NyAxLjk2NDg0IDEgMi42NDIzMSAxIDMuNDY0ODRWMTIuNDY0OEMxIDEzLjI4NzQgMS42Nzc0NyAxMy45NjQ4IDIuNSAxMy45NjQ4SDE0LjVDMTUuMzIyNSAxMy45NjQ4IDE2IDEzLjI4NzQgMTYgMTIuNDY0OFYzLjQ2NDg0QzE2IDIuNjQyMzEgMTUuMzIyNSAxLjk2NDg0IDE0LjUgMS45NjQ4NEgyLjVaTTIuNSAyLjk2NDg0SDE0LjVDMTQuNzgxNSAyLjk2NDg0IDE1IDMuMTgzMzggMTUgMy40NjQ4NFYxMi40NjQ4QzE1IDEyLjc0NjMgMTQuNzgxNSAxMi45NjQ4IDE0LjUgMTIuOTY0OEgyLjVDMi4yMTg1MyAxMi45NjQ4IDIgMTIuNzQ2MyAyIDEyLjQ2NDhWMy40NjQ4NEMyIDMuMTgzMzggMi4yMTg1MyAyLjk2NDg0IDIuNSAyLjk2NDg0Wk05IDZWN0gxNFY2SDlaTTQuNSA2QzQuMjUgNiA0LjAyMzc4IDYuMTE5NzMgMy45MjU3OCA2LjMwMjczTDMuMDUwNzggOEMzLjAxNjc4IDguMDYyIDMgOC4xMjkyNyAzIDguMTk3MjdWOVY5LjVDMyA5Ljc3NiAzLjE3OTM0IDEwIDMuNDAyMzQgMTBINFY5SDdWMTBINy41OTc2NkM3LjgyMDY2IDEwIDggOS43NzYgOCA5LjVWOC41VjguMTI1QzggOC4wNTggNy45ODMxNyA3Ljk5MjY0IDcuOTUxMTcgNy45MzE2NEw3LjA3NjE3IDYuMzA2NjRDNi45NzkxNyA2LjEyMTY0IDYuNzUyIDYgNi41IDZINC41Wk05IDhWOUgxMlY4SDlaIiBmaWxsPSJibGFjayIvPgo8L2c+Cjwvc3ZnPgo=" />
                            <p>VIN</p>
                        </div>
                        <div class="right-title">
                            <p>82763847458456876</p>
                        </div>
                    </div>
                    <div className="middle-sec-card small-font-sec">
                        <div class="img-with-text">
                            <p>Effective</p>
                        </div>
                        <div class="right-title">
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBEYXRlIFRpbWUiPgo8cGF0aCBpZD0iZGF0ZSB0aW1lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIuMzk4MzYgMkMxLjYzMTU2IDIgMSAyLjYyODI5IDEgMy4zOTExMVYxMC44MTA0QzEgMTEuNTczMiAxLjYzMTU2IDEyLjIwMTUgMi4zOTgzNiAxMi4yMDE1SDYuODYyOTJDNy40MzgwNiAxMy44MjQ4IDguOTgwMDYgMTUgMTAuODA0OSAxNUMxMy4xMTYzIDE1IDE1IDEzLjEyNiAxNSAxMC44MjY3QzE1IDkuODM0NzUgMTQuNjM1NiA4LjkzMzgyIDE0LjA1MTQgOC4yMTY1M1YzLjM5MTExQzE0LjA1MTQgMi42MjgyOSAxMy40MTk4IDIgMTIuNjUzIDJIMi4zOTgzNlpNMi4zOTgzNiAyLjkyNzQxSDEyLjY1M0MxMi45MTU0IDIuOTI3NDEgMTMuMTE5MSAzLjEzMDA3IDEzLjExOTEgMy4zOTExMVYzLjg1NDgxSDEuOTMyMjRWMy4zOTExMUMxLjkzMjI0IDMuMTMwMDcgMi4xMzU5NiAyLjkyNzQxIDIuMzk4MzYgMi45Mjc0MVpNMS45MzIyNCA0Ljc4MjIySDEzLjExOTFWNy4zNTA3QzEyLjU3MzggNi45ODk5NyAxMS45MzcxIDYuNzYxNTcgMTEuMjU0NiA2LjY4Nzc1VjYuNjM3MDNINi4xMjQ5MUM1Ljg2ODgxIDYuNjM3MDMgNS42NjEyIDYuODQ0NjQgNS42NjEyIDcuMTAwNzRDNS42NjEyIDcuMzU2ODMgNS44Njg4MSA3LjU2NDQ0IDYuMTI0OTEgNy41NjQ0NEg4LjIyMTIzQzcuODgyMTQgNy44MzA5OCA3LjU3MzkyIDguMTM1MzMgNy4zMzA4NiA4LjQ5MTg1SDYuMTI0OTFDNS44Njg4MSA4LjQ5MTg1IDUuNjYxMiA4LjY5OTQ2IDUuNjYxMiA4Ljk1NTU1QzUuNjYxMiA5LjIxMTY1IDUuODY4ODEgOS40MTkyNiA2LjEyNDkxIDkuNDE5MjZINi44NzIwM0M2LjcxMTQ1IDkuODYwOTkgNi42MDk4MyAxMC4zMzA4IDYuNjA5ODMgMTAuODI2N0M2LjYwOTgzIDEwLjk4IDYuNjM5MDMgMTEuMTI1IDYuNjU1MzUgMTEuMjc0MUgyLjM5ODM2QzIuMTM1OTYgMTEuMjc0MSAxLjkzMjI0IDExLjA3MTQgMS45MzIyNCAxMC44MTA0VjQuNzgyMjJaTTQuMjYyODQgNi42MzcwM0M0LjAwNjc1IDYuNjM3MDMgMy43OTY3MiA2Ljg0NDY0IDMuNzk2NzIgNy4xMDA3NEMzLjc5NjcyIDcuMzU2ODMgNC4wMDY3NSA3LjU2NDQ0IDQuMjYyODQgNy41NjQ0NEM0LjUxODk0IDcuNTY0NDQgNC43Mjg5NiA3LjM1NjgzIDQuNzI4OTYgNy4xMDA3NEM0LjcyODk2IDYuODQ0NjQgNC41MTg5NCA2LjYzNzAzIDQuMjYyODQgNi42MzcwM1pNMTAuODA0OSA3LjU4MDc0QzEyLjYxMjUgNy41ODA3NCAxNC4wNjc4IDkuMDI4NSAxNC4wNjc4IDEwLjgyNjdDMTQuMDY3OCAxMi42MjQ4IDEyLjYxMjUgMTQuMDcyNiAxMC44MDQ5IDE0LjA3MjZDOC45OTczOCAxNC4wNzI2IDcuNTQyMDcgMTIuNjI0OCA3LjU0MjA3IDEwLjgyNjdDNy41NDIwNyA5LjAyODUgOC45OTczOCA3LjU4MDc0IDEwLjgwNDkgNy41ODA3NFpNNC4yNjI4NCA4LjQ5MTg1QzQuMDA2NzUgOC40OTE4NSAzLjc5NjcyIDguNjk5NDYgMy43OTY3MiA4Ljk1NTU1QzMuNzk2NzIgOS4yMTE2NSA0LjAwNjc1IDkuNDE5MjYgNC4yNjI4NCA5LjQxOTI2QzQuNTE4OTQgOS40MTkyNiA0LjcyODk2IDkuMjExNjUgNC43Mjg5NiA4Ljk1NTU1QzQuNzI4OTYgOC42OTk0NiA0LjUxODk0IDguNDkxODUgNC4yNjI4NCA4LjQ5MTg1Wk0xMC44MDQ5IDguNTA4MTVDMTAuNTQ3NSA4LjUwODE1IDEwLjMzODggOC43MTY4NCAxMC4zMzg4IDguOTc0MjdWMTAuOTc5NkMxMC4zMzg4IDExLjE1MTIgMTAuNDc3OSAxMS4yOTA0IDEwLjY0OTUgMTEuMjkwNEgxMS43Mzk2QzExLjk5NTcgMTEuMjkwNCAxMi4yMDMzIDExLjA4MjggMTIuMjAzMyAxMC44MjY3QzEyLjIwMzMgMTAuNTcwNiAxMS45OTU3IDEwLjM2MyAxMS43Mzk2IDEwLjM2M0gxMS4yNzFWOC45NzQyN0MxMS4yNzEgOC43MTY4NCAxMS4wNjIzIDguNTA4MTUgMTAuODA0OSA4LjUwODE1WiIgZmlsbD0iIzVGNjM2OCIvPgo8L2c+Cjwvc3ZnPgo=" />
                            <p>Oct-26-2022</p>
                        </div>
                    </div>
                    <div className="middle-sec-card small-font-sec">
                        <div class="img-with-text">
                            <p>Expiration</p>
                        </div>
                        <div class="right-title">
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBEYXRlIFRpbWUiPgo8cGF0aCBpZD0iZGF0ZSB0aW1lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIuMzk4MzYgMkMxLjYzMTU2IDIgMSAyLjYyODI5IDEgMy4zOTExMVYxMC44MTA0QzEgMTEuNTczMiAxLjYzMTU2IDEyLjIwMTUgMi4zOTgzNiAxMi4yMDE1SDYuODYyOTJDNy40MzgwNiAxMy44MjQ4IDguOTgwMDYgMTUgMTAuODA0OSAxNUMxMy4xMTYzIDE1IDE1IDEzLjEyNiAxNSAxMC44MjY3QzE1IDkuODM0NzUgMTQuNjM1NiA4LjkzMzgyIDE0LjA1MTQgOC4yMTY1M1YzLjM5MTExQzE0LjA1MTQgMi42MjgyOSAxMy40MTk4IDIgMTIuNjUzIDJIMi4zOTgzNlpNMi4zOTgzNiAyLjkyNzQxSDEyLjY1M0MxMi45MTU0IDIuOTI3NDEgMTMuMTE5MSAzLjEzMDA3IDEzLjExOTEgMy4zOTExMVYzLjg1NDgxSDEuOTMyMjRWMy4zOTExMUMxLjkzMjI0IDMuMTMwMDcgMi4xMzU5NiAyLjkyNzQxIDIuMzk4MzYgMi45Mjc0MVpNMS45MzIyNCA0Ljc4MjIySDEzLjExOTFWNy4zNTA3QzEyLjU3MzggNi45ODk5NyAxMS45MzcxIDYuNzYxNTcgMTEuMjU0NiA2LjY4Nzc1VjYuNjM3MDNINi4xMjQ5MUM1Ljg2ODgxIDYuNjM3MDMgNS42NjEyIDYuODQ0NjQgNS42NjEyIDcuMTAwNzRDNS42NjEyIDcuMzU2ODMgNS44Njg4MSA3LjU2NDQ0IDYuMTI0OTEgNy41NjQ0NEg4LjIyMTIzQzcuODgyMTQgNy44MzA5OCA3LjU3MzkyIDguMTM1MzMgNy4zMzA4NiA4LjQ5MTg1SDYuMTI0OTFDNS44Njg4MSA4LjQ5MTg1IDUuNjYxMiA4LjY5OTQ2IDUuNjYxMiA4Ljk1NTU1QzUuNjYxMiA5LjIxMTY1IDUuODY4ODEgOS40MTkyNiA2LjEyNDkxIDkuNDE5MjZINi44NzIwM0M2LjcxMTQ1IDkuODYwOTkgNi42MDk4MyAxMC4zMzA4IDYuNjA5ODMgMTAuODI2N0M2LjYwOTgzIDEwLjk4IDYuNjM5MDMgMTEuMTI1IDYuNjU1MzUgMTEuMjc0MUgyLjM5ODM2QzIuMTM1OTYgMTEuMjc0MSAxLjkzMjI0IDExLjA3MTQgMS45MzIyNCAxMC44MTA0VjQuNzgyMjJaTTQuMjYyODQgNi42MzcwM0M0LjAwNjc1IDYuNjM3MDMgMy43OTY3MiA2Ljg0NDY0IDMuNzk2NzIgNy4xMDA3NEMzLjc5NjcyIDcuMzU2ODMgNC4wMDY3NSA3LjU2NDQ0IDQuMjYyODQgNy41NjQ0NEM0LjUxODk0IDcuNTY0NDQgNC43Mjg5NiA3LjM1NjgzIDQuNzI4OTYgNy4xMDA3NEM0LjcyODk2IDYuODQ0NjQgNC41MTg5NCA2LjYzNzAzIDQuMjYyODQgNi42MzcwM1pNMTAuODA0OSA3LjU4MDc0QzEyLjYxMjUgNy41ODA3NCAxNC4wNjc4IDkuMDI4NSAxNC4wNjc4IDEwLjgyNjdDMTQuMDY3OCAxMi42MjQ4IDEyLjYxMjUgMTQuMDcyNiAxMC44MDQ5IDE0LjA3MjZDOC45OTczOCAxNC4wNzI2IDcuNTQyMDcgMTIuNjI0OCA3LjU0MjA3IDEwLjgyNjdDNy41NDIwNyA5LjAyODUgOC45OTczOCA3LjU4MDc0IDEwLjgwNDkgNy41ODA3NFpNNC4yNjI4NCA4LjQ5MTg1QzQuMDA2NzUgOC40OTE4NSAzLjc5NjcyIDguNjk5NDYgMy43OTY3MiA4Ljk1NTU1QzMuNzk2NzIgOS4yMTE2NSA0LjAwNjc1IDkuNDE5MjYgNC4yNjI4NCA5LjQxOTI2QzQuNTE4OTQgOS40MTkyNiA0LjcyODk2IDkuMjExNjUgNC43Mjg5NiA4Ljk1NTU1QzQuNzI4OTYgOC42OTk0NiA0LjUxODk0IDguNDkxODUgNC4yNjI4NCA4LjQ5MTg1Wk0xMC44MDQ5IDguNTA4MTVDMTAuNTQ3NSA4LjUwODE1IDEwLjMzODggOC43MTY4NCAxMC4zMzg4IDguOTc0MjdWMTAuOTc5NkMxMC4zMzg4IDExLjE1MTIgMTAuNDc3OSAxMS4yOTA0IDEwLjY0OTUgMTEuMjkwNEgxMS43Mzk2QzExLjk5NTcgMTEuMjkwNCAxMi4yMDMzIDExLjA4MjggMTIuMjAzMyAxMC44MjY3QzEyLjIwMzMgMTAuNTcwNiAxMS45OTU3IDEwLjM2MyAxMS43Mzk2IDEwLjM2M0gxMS4yNzFWOC45NzQyN0MxMS4yNzEgOC43MTY4NCAxMS4wNjIzIDguNTA4MTUgMTAuODA0OSA4LjUwODE1WiIgZmlsbD0iIzVGNjM2OCIvPgo8L2c+Cjwvc3ZnPgo=" />
                            <p>Apr-26-2022</p>
                        </div>
                    </div>
                    <div className="middle-sec-card small-font-sec">
                        <div class="img-with-text">
                            <p>6th installment due date</p>
                        </div>
                        <div class="right-title">
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBEYXRlIFRpbWUiPgo8cGF0aCBpZD0iZGF0ZSB0aW1lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIuMzk4MzYgMkMxLjYzMTU2IDIgMSAyLjYyODI5IDEgMy4zOTExMVYxMC44MTA0QzEgMTEuNTczMiAxLjYzMTU2IDEyLjIwMTUgMi4zOTgzNiAxMi4yMDE1SDYuODYyOTJDNy40MzgwNiAxMy44MjQ4IDguOTgwMDYgMTUgMTAuODA0OSAxNUMxMy4xMTYzIDE1IDE1IDEzLjEyNiAxNSAxMC44MjY3QzE1IDkuODM0NzUgMTQuNjM1NiA4LjkzMzgyIDE0LjA1MTQgOC4yMTY1M1YzLjM5MTExQzE0LjA1MTQgMi42MjgyOSAxMy40MTk4IDIgMTIuNjUzIDJIMi4zOTgzNlpNMi4zOTgzNiAyLjkyNzQxSDEyLjY1M0MxMi45MTU0IDIuOTI3NDEgMTMuMTE5MSAzLjEzMDA3IDEzLjExOTEgMy4zOTExMVYzLjg1NDgxSDEuOTMyMjRWMy4zOTExMUMxLjkzMjI0IDMuMTMwMDcgMi4xMzU5NiAyLjkyNzQxIDIuMzk4MzYgMi45Mjc0MVpNMS45MzIyNCA0Ljc4MjIySDEzLjExOTFWNy4zNTA3QzEyLjU3MzggNi45ODk5NyAxMS45MzcxIDYuNzYxNTcgMTEuMjU0NiA2LjY4Nzc1VjYuNjM3MDNINi4xMjQ5MUM1Ljg2ODgxIDYuNjM3MDMgNS42NjEyIDYuODQ0NjQgNS42NjEyIDcuMTAwNzRDNS42NjEyIDcuMzU2ODMgNS44Njg4MSA3LjU2NDQ0IDYuMTI0OTEgNy41NjQ0NEg4LjIyMTIzQzcuODgyMTQgNy44MzA5OCA3LjU3MzkyIDguMTM1MzMgNy4zMzA4NiA4LjQ5MTg1SDYuMTI0OTFDNS44Njg4MSA4LjQ5MTg1IDUuNjYxMiA4LjY5OTQ2IDUuNjYxMiA4Ljk1NTU1QzUuNjYxMiA5LjIxMTY1IDUuODY4ODEgOS40MTkyNiA2LjEyNDkxIDkuNDE5MjZINi44NzIwM0M2LjcxMTQ1IDkuODYwOTkgNi42MDk4MyAxMC4zMzA4IDYuNjA5ODMgMTAuODI2N0M2LjYwOTgzIDEwLjk4IDYuNjM5MDMgMTEuMTI1IDYuNjU1MzUgMTEuMjc0MUgyLjM5ODM2QzIuMTM1OTYgMTEuMjc0MSAxLjkzMjI0IDExLjA3MTQgMS45MzIyNCAxMC44MTA0VjQuNzgyMjJaTTQuMjYyODQgNi42MzcwM0M0LjAwNjc1IDYuNjM3MDMgMy43OTY3MiA2Ljg0NDY0IDMuNzk2NzIgNy4xMDA3NEMzLjc5NjcyIDcuMzU2ODMgNC4wMDY3NSA3LjU2NDQ0IDQuMjYyODQgNy41NjQ0NEM0LjUxODk0IDcuNTY0NDQgNC43Mjg5NiA3LjM1NjgzIDQuNzI4OTYgNy4xMDA3NEM0LjcyODk2IDYuODQ0NjQgNC41MTg5NCA2LjYzNzAzIDQuMjYyODQgNi42MzcwM1pNMTAuODA0OSA3LjU4MDc0QzEyLjYxMjUgNy41ODA3NCAxNC4wNjc4IDkuMDI4NSAxNC4wNjc4IDEwLjgyNjdDMTQuMDY3OCAxMi42MjQ4IDEyLjYxMjUgMTQuMDcyNiAxMC44MDQ5IDE0LjA3MjZDOC45OTczOCAxNC4wNzI2IDcuNTQyMDcgMTIuNjI0OCA3LjU0MjA3IDEwLjgyNjdDNy41NDIwNyA5LjAyODUgOC45OTczOCA3LjU4MDc0IDEwLjgwNDkgNy41ODA3NFpNNC4yNjI4NCA4LjQ5MTg1QzQuMDA2NzUgOC40OTE4NSAzLjc5NjcyIDguNjk5NDYgMy43OTY3MiA4Ljk1NTU1QzMuNzk2NzIgOS4yMTE2NSA0LjAwNjc1IDkuNDE5MjYgNC4yNjI4NCA5LjQxOTI2QzQuNTE4OTQgOS40MTkyNiA0LjcyODk2IDkuMjExNjUgNC43Mjg5NiA4Ljk1NTU1QzQuNzI4OTYgOC42OTk0NiA0LjUxODk0IDguNDkxODUgNC4yNjI4NCA4LjQ5MTg1Wk0xMC44MDQ5IDguNTA4MTVDMTAuNTQ3NSA4LjUwODE1IDEwLjMzODggOC43MTY4NCAxMC4zMzg4IDguOTc0MjdWMTAuOTc5NkMxMC4zMzg4IDExLjE1MTIgMTAuNDc3OSAxMS4yOTA0IDEwLjY0OTUgMTEuMjkwNEgxMS43Mzk2QzExLjk5NTcgMTEuMjkwNCAxMi4yMDMzIDExLjA4MjggMTIuMjAzMyAxMC44MjY3QzEyLjIwMzMgMTAuNTcwNiAxMS45OTU3IDEwLjM2MyAxMS43Mzk2IDEwLjM2M0gxMS4yNzFWOC45NzQyN0MxMS4yNzEgOC43MTY4NCAxMS4wNjIzIDguNTA4MTUgMTAuODA0OSA4LjUwODE1WiIgZmlsbD0iIzVGNjM2OCIvPgo8L2c+Cjwvc3ZnPgo=" />
                            <p>Apr-25-2022</p>
                        </div>
                    </div>
                    <div className="middle-sec-card medium-font-sec">
                        <div class="img-with-text">
                            <p>6th installment</p>
                        </div>
                        <div class="right-title">
                            <p>$49</p>
                        </div>
                    </div>
                </section>
                <div className="accordion-wrapper" id="accordion">
                    <div className="accordion_item">
                        <button className="accordion_heading" aria-expanded="true">
                            <p>Listed Driver(s)</p>
                            <div className="arrow-icon">
                                <i className="sdkv3-cheveron-right"></i>
                            </div>
                        </button>
                        <div className="accordion_collapse collapse_data">
                            <div className="accordion_body">
                                <div className="card-acc-temp-sec">
                                    <div className="card-acc-temp">
                                        <div className="left-data">
                                            <h1>John Paul</h1>
                                            <p>Male, 45 years</p>
                                        </div>
                                        <div className="right-data">
                                            <p>2343434345</p>
                                        </div>
                                    </div>
                                    <div className="card-acc-temp">
                                        <div className="left-data">
                                            <h1>John Paul</h1>
                                            <p>Male, 45 years</p>
                                        </div>
                                        <div className="right-data">
                                            <p>2343434345</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion_item">
                        <button className="accordion_heading" aria-expanded="false">
                            <p>Listed Driver(s)</p>
                            <div className="arrow-icon">
                                <i className="sdkv3-cheveron-right"></i>
                            </div>
                        </button>
                        <div className="accordion_collapse">
                            <div className="accordion_body">
                                <div className="card-acc-temp-sec">
                                    <div className="card-acc-temp">
                                        <div className="left-data">
                                            <h1>John Paul</h1>
                                            <p>Male, 45 years</p>
                                        </div>
                                        <div className="right-data">
                                            <p>2343434345</p>
                                        </div>
                                    </div>
                                    <div className="card-acc-temp">
                                        <div className="left-data">
                                            <h1>John Paul</h1>
                                            <p>Male, 45 years</p>
                                        </div>
                                        <div className="right-data">
                                            <p>2343434345</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion_item">
                        <button className="accordion_heading" aria-expanded="false">
                            <p>Listed Driver(s)</p>
                            <div className="arrow-icon">
                                <i className="sdkv3-cheveron-right"></i>
                            </div>
                        </button>
                        <div className="accordion_collapse">
                            <div className="accordion_body">
                                <div className="card-acc-temp-sec">
                                    <div className="card-acc-temp">
                                        <div className="left-data">
                                            <h1>John Paul</h1>
                                            <p>Male, 45 years</p>
                                        </div>
                                        <div className="right-data">
                                            <p>2343434345</p>
                                        </div>
                                    </div>
                                    <div className="card-acc-temp">
                                        <div className="left-data">
                                            <h1>John Paul</h1>
                                            <p>Male, 45 years</p>
                                        </div>
                                        <div className="right-data">
                                            <p>2343434345</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion_item">
                        <button className="accordion_heading" aria-expanded="false">
                            <p>Listed Driver(s)</p>
                            <div className="arrow-icon">
                                <i className="sdkv3-cheveron-right"></i>
                            </div>
                        </button>
                        <div className="accordion_collapse">
                            <div className="accordion_body">
                                <div className="card-acc-temp-sec">
                                    <div className="card-acc-temp">
                                        <div className="left-data">
                                            <h1>John Paul</h1>
                                            <p>Male, 45 years</p>
                                        </div>
                                        <div className="right-data">
                                            <p>2343434345</p>
                                        </div>
                                    </div>
                                    <div className="card-acc-temp">
                                        <div className="left-data">
                                            <h1>John Paul</h1>
                                            <p>Male, 45 years</p>
                                        </div>
                                        <div className="right-data">
                                            <p>2343434345</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion_item">
                        <button className="accordion_heading" aria-expanded="false">
                            <p>Listed Driver(s)</p>
                            <div className="arrow-icon">
                                <i className="sdkv3-cheveron-right"></i>
                            </div>
                        </button>
                        <div className="accordion_collapse">
                            <div className="accordion_body">
                                <div className="card-acc-temp-sec">
                                    <div className="card-acc-temp">
                                        <div className="left-data">
                                            <h1>John Paul</h1>
                                            <p>Male, 45 years</p>
                                        </div>
                                        <div className="right-data">
                                            <p>2343434345</p>
                                        </div>
                                    </div>
                                    <div className="card-acc-temp">
                                        <div className="left-data">
                                            <h1>John Paul</h1>
                                            <p>Male, 45 years</p>
                                        </div>
                                        <div className="right-data">
                                            <p>2343434345</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion_item">
                        <button className="accordion_heading" aria-expanded="false">
                            <p>Listed Driver(s)</p>
                            <div className="arrow-icon">
                                <i className="sdkv3-cheveron-right"></i>
                            </div>
                        </button>
                        <div className="accordion_collapse">
                            <div className="accordion_body">
                                <div className="card-acc-temp-sec">
                                    <div className="card-acc-temp">
                                        <div className="left-data">
                                            <h1>John Paul</h1>
                                            <p>Male, 45 years</p>
                                        </div>
                                        <div className="right-data">
                                            <p>2343434345</p>
                                        </div>
                                    </div>
                                    <div className="card-acc-temp">
                                        <div className="left-data">
                                            <h1>John Paul</h1>
                                            <p>Male, 45 years</p>
                                        </div>
                                        <div className="right-data">
                                            <p>2343434345</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}