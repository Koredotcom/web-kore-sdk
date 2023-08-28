import BaseChatTemplate from '../baseChatTemplate';
import './datePicker.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function DatePicker(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'dateTemplate' && !msgData.formHistory) {
        return (
            <div className="padding-wrapper-content">
                <div className="adv-parent-temp-wrapper">
                    <div className="adv-parent-acc-list">
                        <div className="advanced-list-template-wrapper">
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="adv-parent-temp-wrapper">
                    <div className="adv-parent-acc-list">
                        <div className="advanced-list-template-wrapper">
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                                <p>Description</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="adv-parent-temp-wrapper">
                    <div className="adv-parent-acc-list">
                        <div className="advanced-list-template-wrapper">
                            <div className="img-block">
                                <figure>
                                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                                </figure>                            
                            </div>
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="adv-parent-temp-wrapper">
                    <div className="adv-parent-acc-list">
                        <div className="advanced-list-template-wrapper">
                            <div className="img-block">
                                <figure>
                                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                                </figure>                            
                            </div>
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                            </div>
                            <div className="right-actions-content">
                                <button className="kr-button-blue-light">Button</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="adv-parent-temp-wrapper">
                    <div className="adv-parent-acc-list">
                        <div className="advanced-list-template-wrapper">
                            <div className="img-block">
                                <figure>
                                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                                </figure>                            
                            </div>
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                                <p>Description</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="adv-parent-temp-wrapper">
                    <div className="adv-parent-acc-list">
                        <div className="advanced-list-template-wrapper">
                            <div className="img-block">
                                <figure>
                                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                                </figure>                            
                            </div>
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                                <p>Description</p>
                            </div>
                            <div className="right-actions-content">
                                <h1>$42.77</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="adv-parent-temp-wrapper">
                    <div className="adv-parent-acc-list">
                        <div className="advanced-list-template-wrapper">
                            <div className="img-block">
                                <figure>
                                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                                </figure>                            
                            </div>
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                                <p>Description</p>
                            </div>
                            <div className="right-actions-content">
                                <button className="kr-button-blue-light">Button</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="adv-parent-temp-wrapper">
                    <div className="adv-parent-acc-list">
                        <div className="advanced-list-template-wrapper">
                            <div className="img-block">
                                <figure>
                                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                                </figure>                            
                            </div>
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                                <p>Description</p>
                            </div>
                            <div className="right-actions-content">
                                <button className="arrow-icon">
                                    <i className="sdkv3-cheveron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="adv-parent-temp-wrapper">
                    <div className="adv-parent-acc-list">
                        <div className="advanced-list-template-wrapper">
                            <div className="img-block">
                                <figure>
                                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                                </figure>                            
                            </div>
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                                <p>Description</p>
                            </div>
                            <div className="right-actions-content">
                                <div className="dropdown-list-wrapper">
                                    <button className="elipse-dropdown">
                                        <i className="sdkv3-elipse"></i>
                                    </button>
                                    <ul className="drp-content-menu">
                                        <button className="close-drp-down">
                                            <i className="sdkv3-close"></i>
                                        </button>
                                    <li>
                                            <button className="kr-button-blue-light">Option 1</button>
                                    </li>
                                    <li>
                                            <button className="kr-button-blue-light">Option 1</button>
                                    </li>
                                    <li>
                                            <button className="kr-button-blue-light">Option 1</button>
                                    </li>
                                    <li>
                                            <button className="kr-button-blue-light">Option 1</button>
                                    </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="adv-parent-temp-wrapper">
                    <div className="adv-parent-acc-list">
                        <div className="advanced-list-template-wrapper">
                            <div className="img-block">
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                            </div>
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                                <p>Description</p>
                            </div>
                            <div className="right-actions-content">
                                <button className="arrow-icon">
                                    <i className="sdkv3-cheveron-right"></i>
                                </button>
                            </div>
                        </div>
                        <div className="adv-list-temp-accordion">
                            <div className="list-of-rows">
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBUaW1lIj4KPGcgaWQ9InRpbWUiPgo8cGF0aCBkPSJNOC41MTY0IDMuNDE1NzdDOC40OTI1NiAzLjE1MTUyIDguMjcwNDYgMi45NDQ0NCA4IDIuOTQ0NDRDNy43MTM2MyAyLjk0NDQ0IDcuNDgxNDggMy4xNzY1OSA3LjQ4MTQ4IDMuNDYyOTZWOC4zNjM4N0w3LjQ4MzYgOC40MTEwNkM3LjUwNzQ0IDguNjc1MzEgNy43Mjk1NCA4Ljg4MjM4IDggOC44ODIzOEgxMi4wNzI3TDEyLjExOTkgOC44ODAyN0MxMi4zODQyIDguODU2NDIgMTIuNTkxMyA4LjYzNDMzIDEyLjU5MTMgOC4zNjM4N0wxMi41ODkxIDguMzE2NjdDMTIuNTY1MyA4LjA1MjQyIDEyLjM0MzIgNy44NDUzNSAxMi4wNzI3IDcuODQ1MzVMOC41MTg1MiA3Ljg0NTA5VjMuNDYyOTZMOC41MTY0IDMuNDE1NzdaIiBmaWxsPSIjNUY2MzY4Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOCAxQzQuMTM0MDEgMSAxIDQuMTM0MDEgMSA4QzEgMTEuODY2IDQuMTM0MDEgMTUgOCAxNUMxMS44NjYgMTUgMTUgMTEuODY2IDE1IDhDMTUgNC4xMzQwMSAxMS44NjYgMSA4IDFaTTggMi4wMzcwNEMxMS4yOTMzIDIuMDM3MDQgMTMuOTYzIDQuNzA2NzUgMTMuOTYzIDhDMTMuOTYzIDExLjI5MzMgMTEuMjkzMyAxMy45NjMgOCAxMy45NjNDNC43MDY3NSAxMy45NjMgMi4wMzcwNCAxMS4yOTMzIDIuMDM3MDQgOEMyLjAzNzA0IDQuNzA2NzUgNC43MDY3NSAyLjAzNzA0IDggMi4wMzcwNFoiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L2c+Cjwvc3ZnPgo=" />
                                    </figure>
                                    <p>Oct 9, 9:00am - 9:30am (Day 1/2)</p>
                                </div>
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBTdHlsZSAvIExpbmsiPgo8ZyBpZD0ibGluayI+CjxwYXRoIGQ9Ik0xMy4wNDE1IDIuOTYwMUMxMS43NzggMS42OTU2NyA5LjczNTE1IDEuNjc3OTEgOC40NDk5NSAyLjkyMDE3TDcuNDk2MzQgMy44Njg4OUw3LjQ2MjU4IDMuOTA1ODRDNy4yOTM3MSA0LjEwOTM0IDcuMzA0MDUgNC40MTE4NSA3LjQ5NDIgNC42MDMyN0M3LjY5NjI1IDQuODA2NjUgOC4wMjQ3OCA0LjgwNzYxIDguMjI4IDQuNjA1NDFMOS4xNzYyNSAzLjY2MTk0TDkuMjM3OTcgMy42MDQ0OEMxMC4xMTM1IDIuODE5NTUgMTEuNDY0NiAyLjg1MDc1IDEyLjMwNzcgMy42OTQ0N0MxMy4xNzA4IDQuNTU4MjkgMTMuMTgyOSA1Ljk1NTAyIDEyLjMzNDkgNi44MzM3MUwxMC42ODczIDguNDgyNDlMMTAuNjIwNiA4LjU0NjYzQzEwLjE2NzcgOC45NjQwNSA5LjU2MTYyIDkuMTc3MjMgOC45NDQ4NyA5LjEzMzAzQzguMjk3MjkgOS4wODY2MSA3LjcwMTc3IDguNzYxIDcuMzEyODkgOC4yNDA3QzcuMTQxMjQgOC4wMTEwNSA2LjgxNjA3IDcuOTY0MTMgNi41ODY1OSA4LjEzNTkxQzYuMzU3MTIgOC4zMDc3IDYuMzEwMjQgOC42MzMxMiA2LjQ4MTg5IDguODYyNzhDNy4wNTExMyA5LjYyNDM4IDcuOTIyODIgMTAuMTAxIDguODcwNzQgMTAuMTY4OUM5LjgxODY2IDEwLjIzNjkgMTAuNzQ5MyA5Ljg4OTQ0IDExLjQyMTIgOS4yMTY4TDEzLjA3NTEgNy41NjE2NUwxMy4xNDE4IDcuNDkwNDFDMTQuMzIxNiA2LjE5NDkyIDE0LjI4MTkgNC4yMDE1MyAxMy4wNDE1IDIuOTYwMVoiIGZpbGw9IiM1RjYzNjgiLz4KPHBhdGggZD0iTTcuMTI5MjYgNS44MzEwNkM2LjE4MTM0IDUuNzYzMTIgNS4yNTA2NyA2LjExMDU2IDQuNTc4OCA2Ljc4MzJMMi45MjQ5NSA4LjQzODM1TDIuODU4MTUgOC41MDk1OUMxLjY3ODQgOS44MDUwOCAxLjcxODA3IDExLjc5ODUgMi45NTg1MyAxMy4wMzk5QzQuMjIxOTYgMTQuMzA0MyA2LjI2NDg1IDE0LjMyMjEgNy41NTAwNSAxMy4wNzk4TDguNDk5MjEgMTIuMTNMOC41MzI4NyAxMi4wOTNDOC43MDExNSAxMS44ODkgOC42ODk5MyAxMS41ODY1IDguNDk5MjEgMTEuMzk1N0M4LjI5NjU4IDExLjE5MjkgNy45NjgwNSAxMS4xOTI5IDcuNzY1NDEgMTEuMzk1N0w2LjgyMjY4IDEyLjMzOTFMNi43NjEwNCAxMi4zOTY1QzUuODg2NDggMTMuMTgwNSA0LjUzNTM5IDEzLjE0OTMgMy42OTIzMyAxMi4zMDU1QzIuODI5MTkgMTEuNDQxNyAyLjgxNzA2IDEwLjA0NSAzLjY2NTA3IDkuMTY2MjlMNS4zMTI2NyA3LjUxNzUxTDUuMzc5NDMgNy40NTMzN0M1LjgzMjMyIDcuMDM1OTUgNi40MzgzOCA2LjgyMjc3IDcuMDU1MTMgNi44NjY5N0M3LjcwMjcxIDYuOTEzMzkgOC4yOTgyMyA3LjIzOSA4LjY4NzExIDcuNzU5M0M4Ljg1ODc2IDcuOTg4OTUgOS4xODM5MyA4LjAzNTg3IDkuNDEzNDEgNy44NjQwOUM5LjY0Mjg4IDcuNjkyMyA5LjY4OTc2IDcuMzY2ODggOS41MTgxMSA3LjEzNzIyQzguOTQ4ODcgNi4zNzU2MiA4LjA3NzE4IDUuODk5IDcuMTI5MjYgNS44MzEwNloiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L2c+Cjwvc3ZnPgo=" />
                                    </figure>
                                    <p>WebEx</p>
                                </div>
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBNYWxlIFVzZXIiPgo8cGF0aCBpZD0iVmVjdG9yIiBkPSJNOCAxLjVDNC40MTc5NyAxLjUgMS41IDQuNDE3OTcgMS41IDhDMS41IDExLjU4MiA0LjQxNzk3IDE0LjUgOCAxNC41QzExLjU4MiAxNC41IDE0LjUgMTEuNTgyIDE0LjUgOEMxNC41IDQuNDE3OTcgMTEuNTgyIDEuNSA4IDEuNVpNOCAyLjVDMTEuMDQzIDIuNSAxMy41IDQuOTU3MDMgMTMuNSA4QzEzLjUgOS4zMzk4NCAxMy4wMjM0IDEwLjU2MjUgMTIuMjM0NCAxMS41MTU2QzExLjgwNDcgMTAuMjk2OSAxMC44NzUgOS4zMTY0MSA5LjY4NzUgOC44MzIwM0MxMC4xODM2IDguMzc1IDEwLjUgNy43MjI2NiAxMC41IDdDMTAuNSA1LjYyNSA5LjM3NSA0LjUgOCA0LjVDNi42MjUgNC41IDUuNSA1LjYyNSA1LjUgN0M1LjUgNy43MjI2NiA1LjgxNjQxIDguMzc1IDYuMzEyNSA4LjgzMjAzQzUuMTI1IDkuMzE2NDEgNC4xOTkyMiAxMC4yOTY5IDMuNzY5NTMgMTEuNTE1NkMyLjk3NjU2IDEwLjU2MjUgMi41IDkuMzM5ODQgMi41IDhDMi41IDQuOTU3MDMgNC45NTcwMyAyLjUgOCAyLjVaTTggNS41QzguODM1OTQgNS41IDkuNSA2LjE2NDA2IDkuNSA3QzkuNSA3LjgzNTk0IDguODM1OTQgOC41IDggOC41QzcuMTY0MDYgOC41IDYuNSA3LjgzNTk0IDYuNSA3QzYuNSA2LjE2NDA2IDcuMTY0MDYgNS41IDggNS41Wk04IDkuNUM5LjY5OTIyIDkuNSAxMS4wOTM4IDEwLjcwNyAxMS40MTggMTIuMzA4NkMxMC40NzY2IDEzLjA1NDcgOS4yOTI5NyAxMy41IDggMTMuNUM2LjcwNzAzIDEzLjUgNS41MjM0NCAxMy4wNTQ3IDQuNTg1OTQgMTIuMzA4NkM0LjkwNjI1IDEwLjcwNyA2LjMwMDc4IDkuNSA4IDkuNVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L3N2Zz4K" />
                                    </figure>
                                    <p>Santiago, Brian, Felix and 5 others</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="adv-parent-temp-wrapper">
                    <div className="adv-parent-acc-list">
                        <div className="advanced-list-template-wrapper">
                            <div className="img-block">
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                            </div>
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                                <p>Description</p>
                            </div>
                            <div className="right-actions-content">
                                <p className="tag-status">Shortlisted</p>
                                <button className="arrow-icon">
                                    <i className="sdkv3-cheveron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="adv-parent-temp-wrapper">
                    <div className="adv-parent-acc-list open-acc-adv-temp">
                        <div className="advanced-list-template-wrapper">
                            <div className="img-block">
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                            </div>
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                                <p>Description</p>
                            </div>
                            <div className="right-actions-content">
                                <button className="arrow-icon">
                                    <i className="sdkv3-cheveron-right"></i>
                                </button>
                            </div>
                        </div>
                        <div className="adv-list-temp-accordion">
                            <div className="list-of-rows">
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBUaW1lIj4KPGcgaWQ9InRpbWUiPgo8cGF0aCBkPSJNOC41MTY0IDMuNDE1NzdDOC40OTI1NiAzLjE1MTUyIDguMjcwNDYgMi45NDQ0NCA4IDIuOTQ0NDRDNy43MTM2MyAyLjk0NDQ0IDcuNDgxNDggMy4xNzY1OSA3LjQ4MTQ4IDMuNDYyOTZWOC4zNjM4N0w3LjQ4MzYgOC40MTEwNkM3LjUwNzQ0IDguNjc1MzEgNy43Mjk1NCA4Ljg4MjM4IDggOC44ODIzOEgxMi4wNzI3TDEyLjExOTkgOC44ODAyN0MxMi4zODQyIDguODU2NDIgMTIuNTkxMyA4LjYzNDMzIDEyLjU5MTMgOC4zNjM4N0wxMi41ODkxIDguMzE2NjdDMTIuNTY1MyA4LjA1MjQyIDEyLjM0MzIgNy44NDUzNSAxMi4wNzI3IDcuODQ1MzVMOC41MTg1MiA3Ljg0NTA5VjMuNDYyOTZMOC41MTY0IDMuNDE1NzdaIiBmaWxsPSIjNUY2MzY4Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOCAxQzQuMTM0MDEgMSAxIDQuMTM0MDEgMSA4QzEgMTEuODY2IDQuMTM0MDEgMTUgOCAxNUMxMS44NjYgMTUgMTUgMTEuODY2IDE1IDhDMTUgNC4xMzQwMSAxMS44NjYgMSA4IDFaTTggMi4wMzcwNEMxMS4yOTMzIDIuMDM3MDQgMTMuOTYzIDQuNzA2NzUgMTMuOTYzIDhDMTMuOTYzIDExLjI5MzMgMTEuMjkzMyAxMy45NjMgOCAxMy45NjNDNC43MDY3NSAxMy45NjMgMi4wMzcwNCAxMS4yOTMzIDIuMDM3MDQgOEMyLjAzNzA0IDQuNzA2NzUgNC43MDY3NSAyLjAzNzA0IDggMi4wMzcwNFoiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L2c+Cjwvc3ZnPgo=" />
                                    </figure>
                                    <p>Oct 9, 9:00am - 9:30am (Day 1/2)</p>
                                </div>
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBTdHlsZSAvIExpbmsiPgo8ZyBpZD0ibGluayI+CjxwYXRoIGQ9Ik0xMy4wNDE1IDIuOTYwMUMxMS43NzggMS42OTU2NyA5LjczNTE1IDEuNjc3OTEgOC40NDk5NSAyLjkyMDE3TDcuNDk2MzQgMy44Njg4OUw3LjQ2MjU4IDMuOTA1ODRDNy4yOTM3MSA0LjEwOTM0IDcuMzA0MDUgNC40MTE4NSA3LjQ5NDIgNC42MDMyN0M3LjY5NjI1IDQuODA2NjUgOC4wMjQ3OCA0LjgwNzYxIDguMjI4IDQuNjA1NDFMOS4xNzYyNSAzLjY2MTk0TDkuMjM3OTcgMy42MDQ0OEMxMC4xMTM1IDIuODE5NTUgMTEuNDY0NiAyLjg1MDc1IDEyLjMwNzcgMy42OTQ0N0MxMy4xNzA4IDQuNTU4MjkgMTMuMTgyOSA1Ljk1NTAyIDEyLjMzNDkgNi44MzM3MUwxMC42ODczIDguNDgyNDlMMTAuNjIwNiA4LjU0NjYzQzEwLjE2NzcgOC45NjQwNSA5LjU2MTYyIDkuMTc3MjMgOC45NDQ4NyA5LjEzMzAzQzguMjk3MjkgOS4wODY2MSA3LjcwMTc3IDguNzYxIDcuMzEyODkgOC4yNDA3QzcuMTQxMjQgOC4wMTEwNSA2LjgxNjA3IDcuOTY0MTMgNi41ODY1OSA4LjEzNTkxQzYuMzU3MTIgOC4zMDc3IDYuMzEwMjQgOC42MzMxMiA2LjQ4MTg5IDguODYyNzhDNy4wNTExMyA5LjYyNDM4IDcuOTIyODIgMTAuMTAxIDguODcwNzQgMTAuMTY4OUM5LjgxODY2IDEwLjIzNjkgMTAuNzQ5MyA5Ljg4OTQ0IDExLjQyMTIgOS4yMTY4TDEzLjA3NTEgNy41NjE2NUwxMy4xNDE4IDcuNDkwNDFDMTQuMzIxNiA2LjE5NDkyIDE0LjI4MTkgNC4yMDE1MyAxMy4wNDE1IDIuOTYwMVoiIGZpbGw9IiM1RjYzNjgiLz4KPHBhdGggZD0iTTcuMTI5MjYgNS44MzEwNkM2LjE4MTM0IDUuNzYzMTIgNS4yNTA2NyA2LjExMDU2IDQuNTc4OCA2Ljc4MzJMMi45MjQ5NSA4LjQzODM1TDIuODU4MTUgOC41MDk1OUMxLjY3ODQgOS44MDUwOCAxLjcxODA3IDExLjc5ODUgMi45NTg1MyAxMy4wMzk5QzQuMjIxOTYgMTQuMzA0MyA2LjI2NDg1IDE0LjMyMjEgNy41NTAwNSAxMy4wNzk4TDguNDk5MjEgMTIuMTNMOC41MzI4NyAxMi4wOTNDOC43MDExNSAxMS44ODkgOC42ODk5MyAxMS41ODY1IDguNDk5MjEgMTEuMzk1N0M4LjI5NjU4IDExLjE5MjkgNy45NjgwNSAxMS4xOTI5IDcuNzY1NDEgMTEuMzk1N0w2LjgyMjY4IDEyLjMzOTFMNi43NjEwNCAxMi4zOTY1QzUuODg2NDggMTMuMTgwNSA0LjUzNTM5IDEzLjE0OTMgMy42OTIzMyAxMi4zMDU1QzIuODI5MTkgMTEuNDQxNyAyLjgxNzA2IDEwLjA0NSAzLjY2NTA3IDkuMTY2MjlMNS4zMTI2NyA3LjUxNzUxTDUuMzc5NDMgNy40NTMzN0M1LjgzMjMyIDcuMDM1OTUgNi40MzgzOCA2LjgyMjc3IDcuMDU1MTMgNi44NjY5N0M3LjcwMjcxIDYuOTEzMzkgOC4yOTgyMyA3LjIzOSA4LjY4NzExIDcuNzU5M0M4Ljg1ODc2IDcuOTg4OTUgOS4xODM5MyA4LjAzNTg3IDkuNDEzNDEgNy44NjQwOUM5LjY0Mjg4IDcuNjkyMyA5LjY4OTc2IDcuMzY2ODggOS41MTgxMSA3LjEzNzIyQzguOTQ4ODcgNi4zNzU2MiA4LjA3NzE4IDUuODk5IDcuMTI5MjYgNS44MzEwNloiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L2c+Cjwvc3ZnPgo=" />
                                    </figure>
                                    <p>WebEx</p>
                                </div>
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBNYWxlIFVzZXIiPgo8cGF0aCBpZD0iVmVjdG9yIiBkPSJNOCAxLjVDNC40MTc5NyAxLjUgMS41IDQuNDE3OTcgMS41IDhDMS41IDExLjU4MiA0LjQxNzk3IDE0LjUgOCAxNC41QzExLjU4MiAxNC41IDE0LjUgMTEuNTgyIDE0LjUgOEMxNC41IDQuNDE3OTcgMTEuNTgyIDEuNSA4IDEuNVpNOCAyLjVDMTEuMDQzIDIuNSAxMy41IDQuOTU3MDMgMTMuNSA4QzEzLjUgOS4zMzk4NCAxMy4wMjM0IDEwLjU2MjUgMTIuMjM0NCAxMS41MTU2QzExLjgwNDcgMTAuMjk2OSAxMC44NzUgOS4zMTY0MSA5LjY4NzUgOC44MzIwM0MxMC4xODM2IDguMzc1IDEwLjUgNy43MjI2NiAxMC41IDdDMTAuNSA1LjYyNSA5LjM3NSA0LjUgOCA0LjVDNi42MjUgNC41IDUuNSA1LjYyNSA1LjUgN0M1LjUgNy43MjI2NiA1LjgxNjQxIDguMzc1IDYuMzEyNSA4LjgzMjAzQzUuMTI1IDkuMzE2NDEgNC4xOTkyMiAxMC4yOTY5IDMuNzY5NTMgMTEuNTE1NkMyLjk3NjU2IDEwLjU2MjUgMi41IDkuMzM5ODQgMi41IDhDMi41IDQuOTU3MDMgNC45NTcwMyAyLjUgOCAyLjVaTTggNS41QzguODM1OTQgNS41IDkuNSA2LjE2NDA2IDkuNSA3QzkuNSA3LjgzNTk0IDguODM1OTQgOC41IDggOC41QzcuMTY0MDYgOC41IDYuNSA3LjgzNTk0IDYuNSA3QzYuNSA2LjE2NDA2IDcuMTY0MDYgNS41IDggNS41Wk04IDkuNUM5LjY5OTIyIDkuNSAxMS4wOTM4IDEwLjcwNyAxMS40MTggMTIuMzA4NkMxMC40NzY2IDEzLjA1NDcgOS4yOTI5NyAxMy41IDggMTMuNUM2LjcwNzAzIDEzLjUgNS41MjM0NCAxMy4wNTQ3IDQuNTg1OTQgMTIuMzA4NkM0LjkwNjI1IDEwLjcwNyA2LjMwMDc4IDkuNSA4IDkuNVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L3N2Zz4K" />
                                    </figure>
                                    <p>Santiago, Brian, Felix and 5 others</p>
                                </div>
                            </div>
                            <div className="buttons-wrapper-sec">
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-check"></i>
                                    <span>Button</span>
                                </button>
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-check"></i>
                                    <span>Button</span>
                                </button>
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-check"></i>
                                    <span>Button</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="adv-parent-temp-wrapper">
                    <div className="main-heading-wrapper">
                        <h1>Main Title Text</h1>
                        <div className="header-actions">
                            <button className="btn-action-filter">
                                <i className="sdkv3-filter"></i>
                            </button>
                            <button className="btn-action-filter">
                                <i className="sdkv3-search"></i>
                            </button>
                        </div>
                    </div>
                    <div className="adv-parent-acc-list open-acc-adv-temp">
                        <div className="advanced-list-template-wrapper">
                            <div className="img-block">
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                            </div>
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                                <p>Description</p>
                            </div>
                            <div className="right-actions-content">
                                <button className="arrow-icon">
                                    <i className="sdkv3-cheveron-right"></i>
                                </button>
                            </div>
                        </div>
                        <div className="adv-list-temp-accordion">
                            <div className="list-of-rows">
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBUaW1lIj4KPGcgaWQ9InRpbWUiPgo8cGF0aCBkPSJNOC41MTY0IDMuNDE1NzdDOC40OTI1NiAzLjE1MTUyIDguMjcwNDYgMi45NDQ0NCA4IDIuOTQ0NDRDNy43MTM2MyAyLjk0NDQ0IDcuNDgxNDggMy4xNzY1OSA3LjQ4MTQ4IDMuNDYyOTZWOC4zNjM4N0w3LjQ4MzYgOC40MTEwNkM3LjUwNzQ0IDguNjc1MzEgNy43Mjk1NCA4Ljg4MjM4IDggOC44ODIzOEgxMi4wNzI3TDEyLjExOTkgOC44ODAyN0MxMi4zODQyIDguODU2NDIgMTIuNTkxMyA4LjYzNDMzIDEyLjU5MTMgOC4zNjM4N0wxMi41ODkxIDguMzE2NjdDMTIuNTY1MyA4LjA1MjQyIDEyLjM0MzIgNy44NDUzNSAxMi4wNzI3IDcuODQ1MzVMOC41MTg1MiA3Ljg0NTA5VjMuNDYyOTZMOC41MTY0IDMuNDE1NzdaIiBmaWxsPSIjNUY2MzY4Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOCAxQzQuMTM0MDEgMSAxIDQuMTM0MDEgMSA4QzEgMTEuODY2IDQuMTM0MDEgMTUgOCAxNUMxMS44NjYgMTUgMTUgMTEuODY2IDE1IDhDMTUgNC4xMzQwMSAxMS44NjYgMSA4IDFaTTggMi4wMzcwNEMxMS4yOTMzIDIuMDM3MDQgMTMuOTYzIDQuNzA2NzUgMTMuOTYzIDhDMTMuOTYzIDExLjI5MzMgMTEuMjkzMyAxMy45NjMgOCAxMy45NjNDNC43MDY3NSAxMy45NjMgMi4wMzcwNCAxMS4yOTMzIDIuMDM3MDQgOEMyLjAzNzA0IDQuNzA2NzUgNC43MDY3NSAyLjAzNzA0IDggMi4wMzcwNFoiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L2c+Cjwvc3ZnPgo=" />
                                    </figure>
                                    <p>Oct 9, 9:00am - 9:30am (Day 1/2)</p>
                                </div>
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBTdHlsZSAvIExpbmsiPgo8ZyBpZD0ibGluayI+CjxwYXRoIGQ9Ik0xMy4wNDE1IDIuOTYwMUMxMS43NzggMS42OTU2NyA5LjczNTE1IDEuNjc3OTEgOC40NDk5NSAyLjkyMDE3TDcuNDk2MzQgMy44Njg4OUw3LjQ2MjU4IDMuOTA1ODRDNy4yOTM3MSA0LjEwOTM0IDcuMzA0MDUgNC40MTE4NSA3LjQ5NDIgNC42MDMyN0M3LjY5NjI1IDQuODA2NjUgOC4wMjQ3OCA0LjgwNzYxIDguMjI4IDQuNjA1NDFMOS4xNzYyNSAzLjY2MTk0TDkuMjM3OTcgMy42MDQ0OEMxMC4xMTM1IDIuODE5NTUgMTEuNDY0NiAyLjg1MDc1IDEyLjMwNzcgMy42OTQ0N0MxMy4xNzA4IDQuNTU4MjkgMTMuMTgyOSA1Ljk1NTAyIDEyLjMzNDkgNi44MzM3MUwxMC42ODczIDguNDgyNDlMMTAuNjIwNiA4LjU0NjYzQzEwLjE2NzcgOC45NjQwNSA5LjU2MTYyIDkuMTc3MjMgOC45NDQ4NyA5LjEzMzAzQzguMjk3MjkgOS4wODY2MSA3LjcwMTc3IDguNzYxIDcuMzEyODkgOC4yNDA3QzcuMTQxMjQgOC4wMTEwNSA2LjgxNjA3IDcuOTY0MTMgNi41ODY1OSA4LjEzNTkxQzYuMzU3MTIgOC4zMDc3IDYuMzEwMjQgOC42MzMxMiA2LjQ4MTg5IDguODYyNzhDNy4wNTExMyA5LjYyNDM4IDcuOTIyODIgMTAuMTAxIDguODcwNzQgMTAuMTY4OUM5LjgxODY2IDEwLjIzNjkgMTAuNzQ5MyA5Ljg4OTQ0IDExLjQyMTIgOS4yMTY4TDEzLjA3NTEgNy41NjE2NUwxMy4xNDE4IDcuNDkwNDFDMTQuMzIxNiA2LjE5NDkyIDE0LjI4MTkgNC4yMDE1MyAxMy4wNDE1IDIuOTYwMVoiIGZpbGw9IiM1RjYzNjgiLz4KPHBhdGggZD0iTTcuMTI5MjYgNS44MzEwNkM2LjE4MTM0IDUuNzYzMTIgNS4yNTA2NyA2LjExMDU2IDQuNTc4OCA2Ljc4MzJMMi45MjQ5NSA4LjQzODM1TDIuODU4MTUgOC41MDk1OUMxLjY3ODQgOS44MDUwOCAxLjcxODA3IDExLjc5ODUgMi45NTg1MyAxMy4wMzk5QzQuMjIxOTYgMTQuMzA0MyA2LjI2NDg1IDE0LjMyMjEgNy41NTAwNSAxMy4wNzk4TDguNDk5MjEgMTIuMTNMOC41MzI4NyAxMi4wOTNDOC43MDExNSAxMS44ODkgOC42ODk5MyAxMS41ODY1IDguNDk5MjEgMTEuMzk1N0M4LjI5NjU4IDExLjE5MjkgNy45NjgwNSAxMS4xOTI5IDcuNzY1NDEgMTEuMzk1N0w2LjgyMjY4IDEyLjMzOTFMNi43NjEwNCAxMi4zOTY1QzUuODg2NDggMTMuMTgwNSA0LjUzNTM5IDEzLjE0OTMgMy42OTIzMyAxMi4zMDU1QzIuODI5MTkgMTEuNDQxNyAyLjgxNzA2IDEwLjA0NSAzLjY2NTA3IDkuMTY2MjlMNS4zMTI2NyA3LjUxNzUxTDUuMzc5NDMgNy40NTMzN0M1LjgzMjMyIDcuMDM1OTUgNi40MzgzOCA2LjgyMjc3IDcuMDU1MTMgNi44NjY5N0M3LjcwMjcxIDYuOTEzMzkgOC4yOTgyMyA3LjIzOSA4LjY4NzExIDcuNzU5M0M4Ljg1ODc2IDcuOTg4OTUgOS4xODM5MyA4LjAzNTg3IDkuNDEzNDEgNy44NjQwOUM5LjY0Mjg4IDcuNjkyMyA5LjY4OTc2IDcuMzY2ODggOS41MTgxMSA3LjEzNzIyQzguOTQ4ODcgNi4zNzU2MiA4LjA3NzE4IDUuODk5IDcuMTI5MjYgNS44MzEwNloiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L2c+Cjwvc3ZnPgo=" />
                                    </figure>
                                    <p>WebEx</p>
                                </div>
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBNYWxlIFVzZXIiPgo8cGF0aCBpZD0iVmVjdG9yIiBkPSJNOCAxLjVDNC40MTc5NyAxLjUgMS41IDQuNDE3OTcgMS41IDhDMS41IDExLjU4MiA0LjQxNzk3IDE0LjUgOCAxNC41QzExLjU4MiAxNC41IDE0LjUgMTEuNTgyIDE0LjUgOEMxNC41IDQuNDE3OTcgMTEuNTgyIDEuNSA4IDEuNVpNOCAyLjVDMTEuMDQzIDIuNSAxMy41IDQuOTU3MDMgMTMuNSA4QzEzLjUgOS4zMzk4NCAxMy4wMjM0IDEwLjU2MjUgMTIuMjM0NCAxMS41MTU2QzExLjgwNDcgMTAuMjk2OSAxMC44NzUgOS4zMTY0MSA5LjY4NzUgOC44MzIwM0MxMC4xODM2IDguMzc1IDEwLjUgNy43MjI2NiAxMC41IDdDMTAuNSA1LjYyNSA5LjM3NSA0LjUgOCA0LjVDNi42MjUgNC41IDUuNSA1LjYyNSA1LjUgN0M1LjUgNy43MjI2NiA1LjgxNjQxIDguMzc1IDYuMzEyNSA4LjgzMjAzQzUuMTI1IDkuMzE2NDEgNC4xOTkyMiAxMC4yOTY5IDMuNzY5NTMgMTEuNTE1NkMyLjk3NjU2IDEwLjU2MjUgMi41IDkuMzM5ODQgMi41IDhDMi41IDQuOTU3MDMgNC45NTcwMyAyLjUgOCAyLjVaTTggNS41QzguODM1OTQgNS41IDkuNSA2LjE2NDA2IDkuNSA3QzkuNSA3LjgzNTk0IDguODM1OTQgOC41IDggOC41QzcuMTY0MDYgOC41IDYuNSA3LjgzNTk0IDYuNSA3QzYuNSA2LjE2NDA2IDcuMTY0MDYgNS41IDggNS41Wk04IDkuNUM5LjY5OTIyIDkuNSAxMS4wOTM4IDEwLjcwNyAxMS40MTggMTIuMzA4NkMxMC40NzY2IDEzLjA1NDcgOS4yOTI5NyAxMy41IDggMTMuNUM2LjcwNzAzIDEzLjUgNS41MjM0NCAxMy4wNTQ3IDQuNTg1OTQgMTIuMzA4NkM0LjkwNjI1IDEwLjcwNyA2LjMwMDc4IDkuNSA4IDkuNVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L3N2Zz4K" />
                                    </figure>
                                    <p>Santiago, Brian, Felix and 5 others</p>
                                </div>
                            </div>
                            <div className="buttons-wrapper-sec">
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-check"></i>
                                    <span>Button</span>
                                </button>
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-check"></i>
                                    <span>Button</span>
                                </button>
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-check"></i>
                                    <span>Button</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="adv-parent-temp-wrapper">
                    <div className="main-heading-wrapper">
                        <h1>Main Title Text</h1>
                        <div className="header-actions">
                            <button className="btn-action-filter">
                                <i className="sdkv3-filter"></i>
                            </button>
                            <button className="btn-action-filter">
                                <i className="sdkv3-search"></i>
                            </button>
                        </div>
                    </div>
                    <div className="adv-parent-acc-list open-acc-adv-temp">
                        <div className="advanced-list-template-wrapper">
                            <div className="img-block">
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                            </div>
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                                <p>Description</p>
                            </div>
                            <div className="right-actions-content">
                                <button className="arrow-icon">
                                    <i className="sdkv3-cheveron-right"></i>
                                </button>
                            </div>
                        </div>
                        <div className="adv-list-temp-accordion">
                            <div className="list-of-rows">
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBUaW1lIj4KPGcgaWQ9InRpbWUiPgo8cGF0aCBkPSJNOC41MTY0IDMuNDE1NzdDOC40OTI1NiAzLjE1MTUyIDguMjcwNDYgMi45NDQ0NCA4IDIuOTQ0NDRDNy43MTM2MyAyLjk0NDQ0IDcuNDgxNDggMy4xNzY1OSA3LjQ4MTQ4IDMuNDYyOTZWOC4zNjM4N0w3LjQ4MzYgOC40MTEwNkM3LjUwNzQ0IDguNjc1MzEgNy43Mjk1NCA4Ljg4MjM4IDggOC44ODIzOEgxMi4wNzI3TDEyLjExOTkgOC44ODAyN0MxMi4zODQyIDguODU2NDIgMTIuNTkxMyA4LjYzNDMzIDEyLjU5MTMgOC4zNjM4N0wxMi41ODkxIDguMzE2NjdDMTIuNTY1MyA4LjA1MjQyIDEyLjM0MzIgNy44NDUzNSAxMi4wNzI3IDcuODQ1MzVMOC41MTg1MiA3Ljg0NTA5VjMuNDYyOTZMOC41MTY0IDMuNDE1NzdaIiBmaWxsPSIjNUY2MzY4Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOCAxQzQuMTM0MDEgMSAxIDQuMTM0MDEgMSA4QzEgMTEuODY2IDQuMTM0MDEgMTUgOCAxNUMxMS44NjYgMTUgMTUgMTEuODY2IDE1IDhDMTUgNC4xMzQwMSAxMS44NjYgMSA4IDFaTTggMi4wMzcwNEMxMS4yOTMzIDIuMDM3MDQgMTMuOTYzIDQuNzA2NzUgMTMuOTYzIDhDMTMuOTYzIDExLjI5MzMgMTEuMjkzMyAxMy45NjMgOCAxMy45NjNDNC43MDY3NSAxMy45NjMgMi4wMzcwNCAxMS4yOTMzIDIuMDM3MDQgOEMyLjAzNzA0IDQuNzA2NzUgNC43MDY3NSAyLjAzNzA0IDggMi4wMzcwNFoiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L2c+Cjwvc3ZnPgo=" />
                                    </figure>
                                    <p>Oct 9, 9:00am - 9:30am (Day 1/2)</p>
                                </div>
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBTdHlsZSAvIExpbmsiPgo8ZyBpZD0ibGluayI+CjxwYXRoIGQ9Ik0xMy4wNDE1IDIuOTYwMUMxMS43NzggMS42OTU2NyA5LjczNTE1IDEuNjc3OTEgOC40NDk5NSAyLjkyMDE3TDcuNDk2MzQgMy44Njg4OUw3LjQ2MjU4IDMuOTA1ODRDNy4yOTM3MSA0LjEwOTM0IDcuMzA0MDUgNC40MTE4NSA3LjQ5NDIgNC42MDMyN0M3LjY5NjI1IDQuODA2NjUgOC4wMjQ3OCA0LjgwNzYxIDguMjI4IDQuNjA1NDFMOS4xNzYyNSAzLjY2MTk0TDkuMjM3OTcgMy42MDQ0OEMxMC4xMTM1IDIuODE5NTUgMTEuNDY0NiAyLjg1MDc1IDEyLjMwNzcgMy42OTQ0N0MxMy4xNzA4IDQuNTU4MjkgMTMuMTgyOSA1Ljk1NTAyIDEyLjMzNDkgNi44MzM3MUwxMC42ODczIDguNDgyNDlMMTAuNjIwNiA4LjU0NjYzQzEwLjE2NzcgOC45NjQwNSA5LjU2MTYyIDkuMTc3MjMgOC45NDQ4NyA5LjEzMzAzQzguMjk3MjkgOS4wODY2MSA3LjcwMTc3IDguNzYxIDcuMzEyODkgOC4yNDA3QzcuMTQxMjQgOC4wMTEwNSA2LjgxNjA3IDcuOTY0MTMgNi41ODY1OSA4LjEzNTkxQzYuMzU3MTIgOC4zMDc3IDYuMzEwMjQgOC42MzMxMiA2LjQ4MTg5IDguODYyNzhDNy4wNTExMyA5LjYyNDM4IDcuOTIyODIgMTAuMTAxIDguODcwNzQgMTAuMTY4OUM5LjgxODY2IDEwLjIzNjkgMTAuNzQ5MyA5Ljg4OTQ0IDExLjQyMTIgOS4yMTY4TDEzLjA3NTEgNy41NjE2NUwxMy4xNDE4IDcuNDkwNDFDMTQuMzIxNiA2LjE5NDkyIDE0LjI4MTkgNC4yMDE1MyAxMy4wNDE1IDIuOTYwMVoiIGZpbGw9IiM1RjYzNjgiLz4KPHBhdGggZD0iTTcuMTI5MjYgNS44MzEwNkM2LjE4MTM0IDUuNzYzMTIgNS4yNTA2NyA2LjExMDU2IDQuNTc4OCA2Ljc4MzJMMi45MjQ5NSA4LjQzODM1TDIuODU4MTUgOC41MDk1OUMxLjY3ODQgOS44MDUwOCAxLjcxODA3IDExLjc5ODUgMi45NTg1MyAxMy4wMzk5QzQuMjIxOTYgMTQuMzA0MyA2LjI2NDg1IDE0LjMyMjEgNy41NTAwNSAxMy4wNzk4TDguNDk5MjEgMTIuMTNMOC41MzI4NyAxMi4wOTNDOC43MDExNSAxMS44ODkgOC42ODk5MyAxMS41ODY1IDguNDk5MjEgMTEuMzk1N0M4LjI5NjU4IDExLjE5MjkgNy45NjgwNSAxMS4xOTI5IDcuNzY1NDEgMTEuMzk1N0w2LjgyMjY4IDEyLjMzOTFMNi43NjEwNCAxMi4zOTY1QzUuODg2NDggMTMuMTgwNSA0LjUzNTM5IDEzLjE0OTMgMy42OTIzMyAxMi4zMDU1QzIuODI5MTkgMTEuNDQxNyAyLjgxNzA2IDEwLjA0NSAzLjY2NTA3IDkuMTY2MjlMNS4zMTI2NyA3LjUxNzUxTDUuMzc5NDMgNy40NTMzN0M1LjgzMjMyIDcuMDM1OTUgNi40MzgzOCA2LjgyMjc3IDcuMDU1MTMgNi44NjY5N0M3LjcwMjcxIDYuOTEzMzkgOC4yOTgyMyA3LjIzOSA4LjY4NzExIDcuNzU5M0M4Ljg1ODc2IDcuOTg4OTUgOS4xODM5MyA4LjAzNTg3IDkuNDEzNDEgNy44NjQwOUM5LjY0Mjg4IDcuNjkyMyA5LjY4OTc2IDcuMzY2ODggOS41MTgxMSA3LjEzNzIyQzguOTQ4ODcgNi4zNzU2MiA4LjA3NzE4IDUuODk5IDcuMTI5MjYgNS44MzEwNloiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L2c+Cjwvc3ZnPgo=" />
                                    </figure>
                                    <p>WebEx</p>
                                </div>
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBNYWxlIFVzZXIiPgo8cGF0aCBpZD0iVmVjdG9yIiBkPSJNOCAxLjVDNC40MTc5NyAxLjUgMS41IDQuNDE3OTcgMS41IDhDMS41IDExLjU4MiA0LjQxNzk3IDE0LjUgOCAxNC41QzExLjU4MiAxNC41IDE0LjUgMTEuNTgyIDE0LjUgOEMxNC41IDQuNDE3OTcgMTEuNTgyIDEuNSA4IDEuNVpNOCAyLjVDMTEuMDQzIDIuNSAxMy41IDQuOTU3MDMgMTMuNSA4QzEzLjUgOS4zMzk4NCAxMy4wMjM0IDEwLjU2MjUgMTIuMjM0NCAxMS41MTU2QzExLjgwNDcgMTAuMjk2OSAxMC44NzUgOS4zMTY0MSA5LjY4NzUgOC44MzIwM0MxMC4xODM2IDguMzc1IDEwLjUgNy43MjI2NiAxMC41IDdDMTAuNSA1LjYyNSA5LjM3NSA0LjUgOCA0LjVDNi42MjUgNC41IDUuNSA1LjYyNSA1LjUgN0M1LjUgNy43MjI2NiA1LjgxNjQxIDguMzc1IDYuMzEyNSA4LjgzMjAzQzUuMTI1IDkuMzE2NDEgNC4xOTkyMiAxMC4yOTY5IDMuNzY5NTMgMTEuNTE1NkMyLjk3NjU2IDEwLjU2MjUgMi41IDkuMzM5ODQgMi41IDhDMi41IDQuOTU3MDMgNC45NTcwMyAyLjUgOCAyLjVaTTggNS41QzguODM1OTQgNS41IDkuNSA2LjE2NDA2IDkuNSA3QzkuNSA3LjgzNTk0IDguODM1OTQgOC41IDggOC41QzcuMTY0MDYgOC41IDYuNSA3LjgzNTk0IDYuNSA3QzYuNSA2LjE2NDA2IDcuMTY0MDYgNS41IDggNS41Wk04IDkuNUM5LjY5OTIyIDkuNSAxMS4wOTM4IDEwLjcwNyAxMS40MTggMTIuMzA4NkMxMC40NzY2IDEzLjA1NDcgOS4yOTI5NyAxMy41IDggMTMuNUM2LjcwNzAzIDEzLjUgNS41MjM0NCAxMy4wNTQ3IDQuNTg1OTQgMTIuMzA4NkM0LjkwNjI1IDEwLjcwNyA2LjMwMDc4IDkuNSA4IDkuNVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L3N2Zz4K" />
                                    </figure>
                                    <p>Santiago, Brian, Felix and 5 others</p>
                                </div>
                            </div>
                            <div className="buttons-wrapper-sec if-full-width-buttons">
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-check"></i>
                                    <span>Button</span>
                                </button>
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-check"></i>
                                    <span>Button</span>
                                </button>
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-elipse-horizantal"></i>
                                    <span>More</span>
                                </button>
                                <ul className="drp-content-menu">
                                    <button className="close-drp-down">
                                        <i className="sdkv3-close"></i>
                                    </button>
                                    <li>
                                        <button className="kr-button-blue-light">Option 1</button>
                                    </li>
                                    <li>
                                        <button className="kr-button-blue-light">Option 1</button>
                                    </li>
                                    <li>
                                        <button className="kr-button-blue-light">Option 1</button>
                                    </li>
                                    <li>
                                        <button className="kr-button-blue-light">Option 1</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="adv-parent-temp-wrapper">
                    <div className="main-heading-wrapper">
                        <h1>Main Title Text</h1>
                        <div className="header-actions">
                            <button className="btn-action-filter">
                                <i className="sdkv3-filter"></i>
                            </button>
                            <button className="btn-action-filter">
                                <i className="sdkv3-search"></i>
                            </button>
                            <input type="search" className="input-search" placeholder="Search"/>
                        </div>
                    </div>
                    <div className="tabs-sec-data">
                        <button className="tab-name active-tab">Jan</button>
                        <button className="tab-name">Feb</button>
                        <button className="tab-name">Mar</button>
                        <button className="tab-name">April</button>
                        <button className="tab-name">May</button>
                        <button className="tab-name">June</button>
                        <button className="tab-name">July</button>
                        <button className="tab-name">Aug</button>
                        <button className="tab-name">Sep</button>
                        <button className="tab-name">Oct</button>
                        <button className="tab-name">Nov</button>
                        <button className="tab-name">Dec</button>
                    </div>
                    <div className="adv-parent-acc-list open-acc-adv-temp">
                        <div className="advanced-list-template-wrapper">
                            <div className="img-block">
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                            </div>
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                                <p>Description</p>
                            </div>
                            <div className="right-actions-content">
                                <button className="arrow-icon">
                                    <i className="sdkv3-cheveron-right"></i>
                                </button>
                            </div>
                        </div>
                        <div className="adv-list-temp-accordion">
                            <div className="list-of-rows">
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBUaW1lIj4KPGcgaWQ9InRpbWUiPgo8cGF0aCBkPSJNOC41MTY0IDMuNDE1NzdDOC40OTI1NiAzLjE1MTUyIDguMjcwNDYgMi45NDQ0NCA4IDIuOTQ0NDRDNy43MTM2MyAyLjk0NDQ0IDcuNDgxNDggMy4xNzY1OSA3LjQ4MTQ4IDMuNDYyOTZWOC4zNjM4N0w3LjQ4MzYgOC40MTEwNkM3LjUwNzQ0IDguNjc1MzEgNy43Mjk1NCA4Ljg4MjM4IDggOC44ODIzOEgxMi4wNzI3TDEyLjExOTkgOC44ODAyN0MxMi4zODQyIDguODU2NDIgMTIuNTkxMyA4LjYzNDMzIDEyLjU5MTMgOC4zNjM4N0wxMi41ODkxIDguMzE2NjdDMTIuNTY1MyA4LjA1MjQyIDEyLjM0MzIgNy44NDUzNSAxMi4wNzI3IDcuODQ1MzVMOC41MTg1MiA3Ljg0NTA5VjMuNDYyOTZMOC41MTY0IDMuNDE1NzdaIiBmaWxsPSIjNUY2MzY4Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOCAxQzQuMTM0MDEgMSAxIDQuMTM0MDEgMSA4QzEgMTEuODY2IDQuMTM0MDEgMTUgOCAxNUMxMS44NjYgMTUgMTUgMTEuODY2IDE1IDhDMTUgNC4xMzQwMSAxMS44NjYgMSA4IDFaTTggMi4wMzcwNEMxMS4yOTMzIDIuMDM3MDQgMTMuOTYzIDQuNzA2NzUgMTMuOTYzIDhDMTMuOTYzIDExLjI5MzMgMTEuMjkzMyAxMy45NjMgOCAxMy45NjNDNC43MDY3NSAxMy45NjMgMi4wMzcwNCAxMS4yOTMzIDIuMDM3MDQgOEMyLjAzNzA0IDQuNzA2NzUgNC43MDY3NSAyLjAzNzA0IDggMi4wMzcwNFoiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L2c+Cjwvc3ZnPgo=" />
                                    </figure>
                                    <p>Oct 9, 9:00am - 9:30am (Day 1/2)</p>
                                </div>
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBTdHlsZSAvIExpbmsiPgo8ZyBpZD0ibGluayI+CjxwYXRoIGQ9Ik0xMy4wNDE1IDIuOTYwMUMxMS43NzggMS42OTU2NyA5LjczNTE1IDEuNjc3OTEgOC40NDk5NSAyLjkyMDE3TDcuNDk2MzQgMy44Njg4OUw3LjQ2MjU4IDMuOTA1ODRDNy4yOTM3MSA0LjEwOTM0IDcuMzA0MDUgNC40MTE4NSA3LjQ5NDIgNC42MDMyN0M3LjY5NjI1IDQuODA2NjUgOC4wMjQ3OCA0LjgwNzYxIDguMjI4IDQuNjA1NDFMOS4xNzYyNSAzLjY2MTk0TDkuMjM3OTcgMy42MDQ0OEMxMC4xMTM1IDIuODE5NTUgMTEuNDY0NiAyLjg1MDc1IDEyLjMwNzcgMy42OTQ0N0MxMy4xNzA4IDQuNTU4MjkgMTMuMTgyOSA1Ljk1NTAyIDEyLjMzNDkgNi44MzM3MUwxMC42ODczIDguNDgyNDlMMTAuNjIwNiA4LjU0NjYzQzEwLjE2NzcgOC45NjQwNSA5LjU2MTYyIDkuMTc3MjMgOC45NDQ4NyA5LjEzMzAzQzguMjk3MjkgOS4wODY2MSA3LjcwMTc3IDguNzYxIDcuMzEyODkgOC4yNDA3QzcuMTQxMjQgOC4wMTEwNSA2LjgxNjA3IDcuOTY0MTMgNi41ODY1OSA4LjEzNTkxQzYuMzU3MTIgOC4zMDc3IDYuMzEwMjQgOC42MzMxMiA2LjQ4MTg5IDguODYyNzhDNy4wNTExMyA5LjYyNDM4IDcuOTIyODIgMTAuMTAxIDguODcwNzQgMTAuMTY4OUM5LjgxODY2IDEwLjIzNjkgMTAuNzQ5MyA5Ljg4OTQ0IDExLjQyMTIgOS4yMTY4TDEzLjA3NTEgNy41NjE2NUwxMy4xNDE4IDcuNDkwNDFDMTQuMzIxNiA2LjE5NDkyIDE0LjI4MTkgNC4yMDE1MyAxMy4wNDE1IDIuOTYwMVoiIGZpbGw9IiM1RjYzNjgiLz4KPHBhdGggZD0iTTcuMTI5MjYgNS44MzEwNkM2LjE4MTM0IDUuNzYzMTIgNS4yNTA2NyA2LjExMDU2IDQuNTc4OCA2Ljc4MzJMMi45MjQ5NSA4LjQzODM1TDIuODU4MTUgOC41MDk1OUMxLjY3ODQgOS44MDUwOCAxLjcxODA3IDExLjc5ODUgMi45NTg1MyAxMy4wMzk5QzQuMjIxOTYgMTQuMzA0MyA2LjI2NDg1IDE0LjMyMjEgNy41NTAwNSAxMy4wNzk4TDguNDk5MjEgMTIuMTNMOC41MzI4NyAxMi4wOTNDOC43MDExNSAxMS44ODkgOC42ODk5MyAxMS41ODY1IDguNDk5MjEgMTEuMzk1N0M4LjI5NjU4IDExLjE5MjkgNy45NjgwNSAxMS4xOTI5IDcuNzY1NDEgMTEuMzk1N0w2LjgyMjY4IDEyLjMzOTFMNi43NjEwNCAxMi4zOTY1QzUuODg2NDggMTMuMTgwNSA0LjUzNTM5IDEzLjE0OTMgMy42OTIzMyAxMi4zMDU1QzIuODI5MTkgMTEuNDQxNyAyLjgxNzA2IDEwLjA0NSAzLjY2NTA3IDkuMTY2MjlMNS4zMTI2NyA3LjUxNzUxTDUuMzc5NDMgNy40NTMzN0M1LjgzMjMyIDcuMDM1OTUgNi40MzgzOCA2LjgyMjc3IDcuMDU1MTMgNi44NjY5N0M3LjcwMjcxIDYuOTEzMzkgOC4yOTgyMyA3LjIzOSA4LjY4NzExIDcuNzU5M0M4Ljg1ODc2IDcuOTg4OTUgOS4xODM5MyA4LjAzNTg3IDkuNDEzNDEgNy44NjQwOUM5LjY0Mjg4IDcuNjkyMyA5LjY4OTc2IDcuMzY2ODggOS41MTgxMSA3LjEzNzIyQzguOTQ4ODcgNi4zNzU2MiA4LjA3NzE4IDUuODk5IDcuMTI5MjYgNS44MzEwNloiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L2c+Cjwvc3ZnPgo=" />
                                    </figure>
                                    <p>WebEx</p>
                                </div>
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBNYWxlIFVzZXIiPgo8cGF0aCBpZD0iVmVjdG9yIiBkPSJNOCAxLjVDNC40MTc5NyAxLjUgMS41IDQuNDE3OTcgMS41IDhDMS41IDExLjU4MiA0LjQxNzk3IDE0LjUgOCAxNC41QzExLjU4MiAxNC41IDE0LjUgMTEuNTgyIDE0LjUgOEMxNC41IDQuNDE3OTcgMTEuNTgyIDEuNSA4IDEuNVpNOCAyLjVDMTEuMDQzIDIuNSAxMy41IDQuOTU3MDMgMTMuNSA4QzEzLjUgOS4zMzk4NCAxMy4wMjM0IDEwLjU2MjUgMTIuMjM0NCAxMS41MTU2QzExLjgwNDcgMTAuMjk2OSAxMC44NzUgOS4zMTY0MSA5LjY4NzUgOC44MzIwM0MxMC4xODM2IDguMzc1IDEwLjUgNy43MjI2NiAxMC41IDdDMTAuNSA1LjYyNSA5LjM3NSA0LjUgOCA0LjVDNi42MjUgNC41IDUuNSA1LjYyNSA1LjUgN0M1LjUgNy43MjI2NiA1LjgxNjQxIDguMzc1IDYuMzEyNSA4LjgzMjAzQzUuMTI1IDkuMzE2NDEgNC4xOTkyMiAxMC4yOTY5IDMuNzY5NTMgMTEuNTE1NkMyLjk3NjU2IDEwLjU2MjUgMi41IDkuMzM5ODQgMi41IDhDMi41IDQuOTU3MDMgNC45NTcwMyAyLjUgOCAyLjVaTTggNS41QzguODM1OTQgNS41IDkuNSA2LjE2NDA2IDkuNSA3QzkuNSA3LjgzNTk0IDguODM1OTQgOC41IDggOC41QzcuMTY0MDYgOC41IDYuNSA3LjgzNTk0IDYuNSA3QzYuNSA2LjE2NDA2IDcuMTY0MDYgNS41IDggNS41Wk04IDkuNUM5LjY5OTIyIDkuNSAxMS4wOTM4IDEwLjcwNyAxMS40MTggMTIuMzA4NkMxMC40NzY2IDEzLjA1NDcgOS4yOTI5NyAxMy41IDggMTMuNUM2LjcwNzAzIDEzLjUgNS41MjM0NCAxMy4wNTQ3IDQuNTg1OTQgMTIuMzA4NkM0LjkwNjI1IDEwLjcwNyA2LjMwMDc4IDkuNSA4IDkuNVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L3N2Zz4K" />
                                    </figure>
                                    <p>Santiago, Brian, Felix and 5 others</p>
                                </div>
                            </div>
                            <div className="buttons-wrapper-sec if-full-width-buttons">
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-check"></i>
                                    <span>Button</span>
                                </button>
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-check"></i>
                                    <span>Button</span>
                                </button>
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-elipse-horizantal"></i>
                                    <span>More</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="adv-parent-temp-wrapper if-table-list-acc-data list-with-border-multi-items">
                    <div className="main-heading-wrapper">
                        <h1>Main Title Text</h1>
                    </div>
                    <div className="adv-parent-acc-list open-acc-adv-temp">
                        <div className="advanced-list-template-wrapper">
                            <div className="img-block">
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                            </div>
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                                <p>Description</p>
                            </div>
                            <div className="right-actions-content">
                                <h1>$42.77</h1>
                                <button className="arrow-icon">
                                    <i className="sdkv3-cheveron-right"></i>
                                </button>
                            </div>
                        </div>
                        <div className="adv-list-temp-accordion">
                            <div className="table-list-data">
                                <div className="table-body-data">
                                    <div className="img_block">
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                                    </div>
                                    <div className="titles_info_block">
                                        <p>Label</p>
                                        <h1>Value</h1>
                                    </div>
                                </div>
                                <div className="table-body-data">
                                    <div className="img_block">
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                                    </div>
                                    <div className="titles_info_block">
                                        <p>Label</p>
                                        <h1>Value</h1>
                                    </div>
                                </div>
                                <div className="table-body-data">
                                    <div className="img_block">
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                                    </div>
                                    <div className="titles_info_block">
                                        <p>Label</p>
                                        <h1>Value</h1>
                                    </div>
                                </div>
                                <div className="table-body-data">
                                    <div className="img_block">
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                                    </div>
                                    <div className="titles_info_block">
                                        <p>Label</p>
                                        <h1>Value</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="adv-parent-acc-list">
                        <div className="advanced-list-template-wrapper">
                            <div className="img-block">
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                            </div>
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                                <p>Description</p>
                            </div>
                            <div className="right-actions-content">
                                <h1>$42.77</h1>
                                <button className="arrow-icon">
                                    <i className="sdkv3-cheveron-right"></i>
                                </button>
                            </div>
                        </div>
                        <div className="adv-list-temp-accordion">
                            <div className="list-of-rows">
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBUaW1lIj4KPGcgaWQ9InRpbWUiPgo8cGF0aCBkPSJNOC41MTY0IDMuNDE1NzdDOC40OTI1NiAzLjE1MTUyIDguMjcwNDYgMi45NDQ0NCA4IDIuOTQ0NDRDNy43MTM2MyAyLjk0NDQ0IDcuNDgxNDggMy4xNzY1OSA3LjQ4MTQ4IDMuNDYyOTZWOC4zNjM4N0w3LjQ4MzYgOC40MTEwNkM3LjUwNzQ0IDguNjc1MzEgNy43Mjk1NCA4Ljg4MjM4IDggOC44ODIzOEgxMi4wNzI3TDEyLjExOTkgOC44ODAyN0MxMi4zODQyIDguODU2NDIgMTIuNTkxMyA4LjYzNDMzIDEyLjU5MTMgOC4zNjM4N0wxMi41ODkxIDguMzE2NjdDMTIuNTY1MyA4LjA1MjQyIDEyLjM0MzIgNy44NDUzNSAxMi4wNzI3IDcuODQ1MzVMOC41MTg1MiA3Ljg0NTA5VjMuNDYyOTZMOC41MTY0IDMuNDE1NzdaIiBmaWxsPSIjNUY2MzY4Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOCAxQzQuMTM0MDEgMSAxIDQuMTM0MDEgMSA4QzEgMTEuODY2IDQuMTM0MDEgMTUgOCAxNUMxMS44NjYgMTUgMTUgMTEuODY2IDE1IDhDMTUgNC4xMzQwMSAxMS44NjYgMSA4IDFaTTggMi4wMzcwNEMxMS4yOTMzIDIuMDM3MDQgMTMuOTYzIDQuNzA2NzUgMTMuOTYzIDhDMTMuOTYzIDExLjI5MzMgMTEuMjkzMyAxMy45NjMgOCAxMy45NjNDNC43MDY3NSAxMy45NjMgMi4wMzcwNCAxMS4yOTMzIDIuMDM3MDQgOEMyLjAzNzA0IDQuNzA2NzUgNC43MDY3NSAyLjAzNzA0IDggMi4wMzcwNFoiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L2c+Cjwvc3ZnPgo=" />
                                    </figure>
                                    <p>Oct 9, 9:00am - 9:30am (Day 1/2)</p>
                                </div>
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBTdHlsZSAvIExpbmsiPgo8ZyBpZD0ibGluayI+CjxwYXRoIGQ9Ik0xMy4wNDE1IDIuOTYwMUMxMS43NzggMS42OTU2NyA5LjczNTE1IDEuNjc3OTEgOC40NDk5NSAyLjkyMDE3TDcuNDk2MzQgMy44Njg4OUw3LjQ2MjU4IDMuOTA1ODRDNy4yOTM3MSA0LjEwOTM0IDcuMzA0MDUgNC40MTE4NSA3LjQ5NDIgNC42MDMyN0M3LjY5NjI1IDQuODA2NjUgOC4wMjQ3OCA0LjgwNzYxIDguMjI4IDQuNjA1NDFMOS4xNzYyNSAzLjY2MTk0TDkuMjM3OTcgMy42MDQ0OEMxMC4xMTM1IDIuODE5NTUgMTEuNDY0NiAyLjg1MDc1IDEyLjMwNzcgMy42OTQ0N0MxMy4xNzA4IDQuNTU4MjkgMTMuMTgyOSA1Ljk1NTAyIDEyLjMzNDkgNi44MzM3MUwxMC42ODczIDguNDgyNDlMMTAuNjIwNiA4LjU0NjYzQzEwLjE2NzcgOC45NjQwNSA5LjU2MTYyIDkuMTc3MjMgOC45NDQ4NyA5LjEzMzAzQzguMjk3MjkgOS4wODY2MSA3LjcwMTc3IDguNzYxIDcuMzEyODkgOC4yNDA3QzcuMTQxMjQgOC4wMTEwNSA2LjgxNjA3IDcuOTY0MTMgNi41ODY1OSA4LjEzNTkxQzYuMzU3MTIgOC4zMDc3IDYuMzEwMjQgOC42MzMxMiA2LjQ4MTg5IDguODYyNzhDNy4wNTExMyA5LjYyNDM4IDcuOTIyODIgMTAuMTAxIDguODcwNzQgMTAuMTY4OUM5LjgxODY2IDEwLjIzNjkgMTAuNzQ5MyA5Ljg4OTQ0IDExLjQyMTIgOS4yMTY4TDEzLjA3NTEgNy41NjE2NUwxMy4xNDE4IDcuNDkwNDFDMTQuMzIxNiA2LjE5NDkyIDE0LjI4MTkgNC4yMDE1MyAxMy4wNDE1IDIuOTYwMVoiIGZpbGw9IiM1RjYzNjgiLz4KPHBhdGggZD0iTTcuMTI5MjYgNS44MzEwNkM2LjE4MTM0IDUuNzYzMTIgNS4yNTA2NyA2LjExMDU2IDQuNTc4OCA2Ljc4MzJMMi45MjQ5NSA4LjQzODM1TDIuODU4MTUgOC41MDk1OUMxLjY3ODQgOS44MDUwOCAxLjcxODA3IDExLjc5ODUgMi45NTg1MyAxMy4wMzk5QzQuMjIxOTYgMTQuMzA0MyA2LjI2NDg1IDE0LjMyMjEgNy41NTAwNSAxMy4wNzk4TDguNDk5MjEgMTIuMTNMOC41MzI4NyAxMi4wOTNDOC43MDExNSAxMS44ODkgOC42ODk5MyAxMS41ODY1IDguNDk5MjEgMTEuMzk1N0M4LjI5NjU4IDExLjE5MjkgNy45NjgwNSAxMS4xOTI5IDcuNzY1NDEgMTEuMzk1N0w2LjgyMjY4IDEyLjMzOTFMNi43NjEwNCAxMi4zOTY1QzUuODg2NDggMTMuMTgwNSA0LjUzNTM5IDEzLjE0OTMgMy42OTIzMyAxMi4zMDU1QzIuODI5MTkgMTEuNDQxNyAyLjgxNzA2IDEwLjA0NSAzLjY2NTA3IDkuMTY2MjlMNS4zMTI2NyA3LjUxNzUxTDUuMzc5NDMgNy40NTMzN0M1LjgzMjMyIDcuMDM1OTUgNi40MzgzOCA2LjgyMjc3IDcuMDU1MTMgNi44NjY5N0M3LjcwMjcxIDYuOTEzMzkgOC4yOTgyMyA3LjIzOSA4LjY4NzExIDcuNzU5M0M4Ljg1ODc2IDcuOTg4OTUgOS4xODM5MyA4LjAzNTg3IDkuNDEzNDEgNy44NjQwOUM5LjY0Mjg4IDcuNjkyMyA5LjY4OTc2IDcuMzY2ODggOS41MTgxMSA3LjEzNzIyQzguOTQ4ODcgNi4zNzU2MiA4LjA3NzE4IDUuODk5IDcuMTI5MjYgNS44MzEwNloiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L2c+Cjwvc3ZnPgo=" />
                                    </figure>
                                    <p>WebEx</p>
                                </div>
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBNYWxlIFVzZXIiPgo8cGF0aCBpZD0iVmVjdG9yIiBkPSJNOCAxLjVDNC40MTc5NyAxLjUgMS41IDQuNDE3OTcgMS41IDhDMS41IDExLjU4MiA0LjQxNzk3IDE0LjUgOCAxNC41QzExLjU4MiAxNC41IDE0LjUgMTEuNTgyIDE0LjUgOEMxNC41IDQuNDE3OTcgMTEuNTgyIDEuNSA4IDEuNVpNOCAyLjVDMTEuMDQzIDIuNSAxMy41IDQuOTU3MDMgMTMuNSA4QzEzLjUgOS4zMzk4NCAxMy4wMjM0IDEwLjU2MjUgMTIuMjM0NCAxMS41MTU2QzExLjgwNDcgMTAuMjk2OSAxMC44NzUgOS4zMTY0MSA5LjY4NzUgOC44MzIwM0MxMC4xODM2IDguMzc1IDEwLjUgNy43MjI2NiAxMC41IDdDMTAuNSA1LjYyNSA5LjM3NSA0LjUgOCA0LjVDNi42MjUgNC41IDUuNSA1LjYyNSA1LjUgN0M1LjUgNy43MjI2NiA1LjgxNjQxIDguMzc1IDYuMzEyNSA4LjgzMjAzQzUuMTI1IDkuMzE2NDEgNC4xOTkyMiAxMC4yOTY5IDMuNzY5NTMgMTEuNTE1NkMyLjk3NjU2IDEwLjU2MjUgMi41IDkuMzM5ODQgMi41IDhDMi41IDQuOTU3MDMgNC45NTcwMyAyLjUgOCAyLjVaTTggNS41QzguODM1OTQgNS41IDkuNSA2LjE2NDA2IDkuNSA3QzkuNSA3LjgzNTk0IDguODM1OTQgOC41IDggOC41QzcuMTY0MDYgOC41IDYuNSA3LjgzNTk0IDYuNSA3QzYuNSA2LjE2NDA2IDcuMTY0MDYgNS41IDggNS41Wk04IDkuNUM5LjY5OTIyIDkuNSAxMS4wOTM4IDEwLjcwNyAxMS40MTggMTIuMzA4NkMxMC40NzY2IDEzLjA1NDcgOS4yOTI5NyAxMy41IDggMTMuNUM2LjcwNzAzIDEzLjUgNS41MjM0NCAxMy4wNTQ3IDQuNTg1OTQgMTIuMzA4NkM0LjkwNjI1IDEwLjcwNyA2LjMwMDc4IDkuNSA4IDkuNVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L3N2Zz4K" />
                                    </figure>
                                    <p>Santiago, Brian, Felix and 5 others</p>
                                </div>
                            </div>
                            <div className="buttons-wrapper-sec if-full-width-buttons">
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-check"></i>
                                    <span>Button</span>
                                </button>
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-check"></i>
                                    <span>Button</span>
                                </button>
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-elipse-horizantal"></i>
                                    <span>More</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="see-more-link">
                        <button className="see-more-btn">
                            <span>See more</span>
                            <i className="sdkv3-cheveron-right"></i>
                        </button>
                    </div>
                </div>

                <div className="adv-parent-temp-wrapper if-table-list-acc-data list-with-border-multi-items">
                    <div className="main-heading-wrapper">
                        <h1>Main Title Text</h1>
                    </div>
                    <div className="adv-parent-acc-list open-acc-adv-temp">
                        <div className="advanced-list-template-wrapper">
                            <div className="img-block">
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                            </div>
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                                <p>Description</p>
                            </div>
                            <div className="right-actions-content">
                                <h1>$42.77</h1>
                                <button className="arrow-icon">
                                    <i className="sdkv3-cheveron-right"></i>
                                </button>
                            </div>
                        </div>
                        <div className="adv-list-temp-accordion">
                            <div className="checkbox-list-data-tems">
                                <div className="checkbox-item item-checked">
                                    <input id='one' className='checkbox-input' type="checkbox" checked/>
                                    <label for='one' className="checkbox-label">
                                        <div className="title">Lorem ipsum doller ammen</div>
                                        <div className="desc-text-checkbox">Checkbox item</div>
                                    </label>
                                </div>
                                <div className="checkbox-item item-checked">
                                    <input id='one3' className='checkbox-input' type="checkbox"/>
                                    <label for='one4' className="checkbox-label">
                                        <div className="title">Lorem ipsum doller ammen</div>
                                        <div className="desc-text-checkbox">Checkbox item</div>
                                    </label>
                                </div>
                                <div className="checkbox-item item-checked">
                                    <input id='one3' className='checkbox-input' type="checkbox"/>
                                    <label for='one3' className="checkbox-label">
                                        <div className="title">Lorem ipsum doller ammen</div>
                                        <div className="desc-text-checkbox">Checkbox item</div>
                                    </label>
                                </div>
                                <div className="checkbox-item item-checked">
                                    <input id='one1' className='checkbox-input' type="checkbox"/>
                                    <label for='one1' className="checkbox-label">
                                        <div className="title">Lorem ipsum doller ammen</div>
                                        <div className="desc-text-checkbox">Checkbox item</div>
                                    </label>
                                </div>
                                <div className="checkbox-item item-checked">
                                    <input id='one2' className='checkbox-input' type="checkbox"/>
                                    <label for='one2' className="checkbox-label">
                                        <div className="title">Lorem ipsum doller ammen</div>
                                        <div className="desc-text-checkbox">Checkbox item</div>
                                    </label>
                                </div>
                            </div>
                            <div className="buttons-wrapper-sec">
                                <button className="kr-button-primary">Confirm</button>
                                <button className="kr-button-secondary">Cancel</button>
                            </div>
                        </div>
                    </div>
                    <div className="adv-parent-acc-list">
                        <div className="advanced-list-template-wrapper">
                            <div className="img-block">
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                            </div>
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                                <p>Description</p>
                            </div>
                            <div className="right-actions-content">
                                <h1>$42.77</h1>
                                <button className="arrow-icon">
                                    <i className="sdkv3-cheveron-right"></i>
                                </button>
                            </div>
                        </div>
                        <div className="adv-list-temp-accordion">
                            <div className="list-of-rows">
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBUaW1lIj4KPGcgaWQ9InRpbWUiPgo8cGF0aCBkPSJNOC41MTY0IDMuNDE1NzdDOC40OTI1NiAzLjE1MTUyIDguMjcwNDYgMi45NDQ0NCA4IDIuOTQ0NDRDNy43MTM2MyAyLjk0NDQ0IDcuNDgxNDggMy4xNzY1OSA3LjQ4MTQ4IDMuNDYyOTZWOC4zNjM4N0w3LjQ4MzYgOC40MTEwNkM3LjUwNzQ0IDguNjc1MzEgNy43Mjk1NCA4Ljg4MjM4IDggOC44ODIzOEgxMi4wNzI3TDEyLjExOTkgOC44ODAyN0MxMi4zODQyIDguODU2NDIgMTIuNTkxMyA4LjYzNDMzIDEyLjU5MTMgOC4zNjM4N0wxMi41ODkxIDguMzE2NjdDMTIuNTY1MyA4LjA1MjQyIDEyLjM0MzIgNy44NDUzNSAxMi4wNzI3IDcuODQ1MzVMOC41MTg1MiA3Ljg0NTA5VjMuNDYyOTZMOC41MTY0IDMuNDE1NzdaIiBmaWxsPSIjNUY2MzY4Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOCAxQzQuMTM0MDEgMSAxIDQuMTM0MDEgMSA4QzEgMTEuODY2IDQuMTM0MDEgMTUgOCAxNUMxMS44NjYgMTUgMTUgMTEuODY2IDE1IDhDMTUgNC4xMzQwMSAxMS44NjYgMSA4IDFaTTggMi4wMzcwNEMxMS4yOTMzIDIuMDM3MDQgMTMuOTYzIDQuNzA2NzUgMTMuOTYzIDhDMTMuOTYzIDExLjI5MzMgMTEuMjkzMyAxMy45NjMgOCAxMy45NjNDNC43MDY3NSAxMy45NjMgMi4wMzcwNCAxMS4yOTMzIDIuMDM3MDQgOEMyLjAzNzA0IDQuNzA2NzUgNC43MDY3NSAyLjAzNzA0IDggMi4wMzcwNFoiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L2c+Cjwvc3ZnPgo=" />
                                    </figure>
                                    <p>Oct 9, 9:00am - 9:30am (Day 1/2)</p>
                                </div>
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBTdHlsZSAvIExpbmsiPgo8ZyBpZD0ibGluayI+CjxwYXRoIGQ9Ik0xMy4wNDE1IDIuOTYwMUMxMS43NzggMS42OTU2NyA5LjczNTE1IDEuNjc3OTEgOC40NDk5NSAyLjkyMDE3TDcuNDk2MzQgMy44Njg4OUw3LjQ2MjU4IDMuOTA1ODRDNy4yOTM3MSA0LjEwOTM0IDcuMzA0MDUgNC40MTE4NSA3LjQ5NDIgNC42MDMyN0M3LjY5NjI1IDQuODA2NjUgOC4wMjQ3OCA0LjgwNzYxIDguMjI4IDQuNjA1NDFMOS4xNzYyNSAzLjY2MTk0TDkuMjM3OTcgMy42MDQ0OEMxMC4xMTM1IDIuODE5NTUgMTEuNDY0NiAyLjg1MDc1IDEyLjMwNzcgMy42OTQ0N0MxMy4xNzA4IDQuNTU4MjkgMTMuMTgyOSA1Ljk1NTAyIDEyLjMzNDkgNi44MzM3MUwxMC42ODczIDguNDgyNDlMMTAuNjIwNiA4LjU0NjYzQzEwLjE2NzcgOC45NjQwNSA5LjU2MTYyIDkuMTc3MjMgOC45NDQ4NyA5LjEzMzAzQzguMjk3MjkgOS4wODY2MSA3LjcwMTc3IDguNzYxIDcuMzEyODkgOC4yNDA3QzcuMTQxMjQgOC4wMTEwNSA2LjgxNjA3IDcuOTY0MTMgNi41ODY1OSA4LjEzNTkxQzYuMzU3MTIgOC4zMDc3IDYuMzEwMjQgOC42MzMxMiA2LjQ4MTg5IDguODYyNzhDNy4wNTExMyA5LjYyNDM4IDcuOTIyODIgMTAuMTAxIDguODcwNzQgMTAuMTY4OUM5LjgxODY2IDEwLjIzNjkgMTAuNzQ5MyA5Ljg4OTQ0IDExLjQyMTIgOS4yMTY4TDEzLjA3NTEgNy41NjE2NUwxMy4xNDE4IDcuNDkwNDFDMTQuMzIxNiA2LjE5NDkyIDE0LjI4MTkgNC4yMDE1MyAxMy4wNDE1IDIuOTYwMVoiIGZpbGw9IiM1RjYzNjgiLz4KPHBhdGggZD0iTTcuMTI5MjYgNS44MzEwNkM2LjE4MTM0IDUuNzYzMTIgNS4yNTA2NyA2LjExMDU2IDQuNTc4OCA2Ljc4MzJMMi45MjQ5NSA4LjQzODM1TDIuODU4MTUgOC41MDk1OUMxLjY3ODQgOS44MDUwOCAxLjcxODA3IDExLjc5ODUgMi45NTg1MyAxMy4wMzk5QzQuMjIxOTYgMTQuMzA0MyA2LjI2NDg1IDE0LjMyMjEgNy41NTAwNSAxMy4wNzk4TDguNDk5MjEgMTIuMTNMOC41MzI4NyAxMi4wOTNDOC43MDExNSAxMS44ODkgOC42ODk5MyAxMS41ODY1IDguNDk5MjEgMTEuMzk1N0M4LjI5NjU4IDExLjE5MjkgNy45NjgwNSAxMS4xOTI5IDcuNzY1NDEgMTEuMzk1N0w2LjgyMjY4IDEyLjMzOTFMNi43NjEwNCAxMi4zOTY1QzUuODg2NDggMTMuMTgwNSA0LjUzNTM5IDEzLjE0OTMgMy42OTIzMyAxMi4zMDU1QzIuODI5MTkgMTEuNDQxNyAyLjgxNzA2IDEwLjA0NSAzLjY2NTA3IDkuMTY2MjlMNS4zMTI2NyA3LjUxNzUxTDUuMzc5NDMgNy40NTMzN0M1LjgzMjMyIDcuMDM1OTUgNi40MzgzOCA2LjgyMjc3IDcuMDU1MTMgNi44NjY5N0M3LjcwMjcxIDYuOTEzMzkgOC4yOTgyMyA3LjIzOSA4LjY4NzExIDcuNzU5M0M4Ljg1ODc2IDcuOTg4OTUgOS4xODM5MyA4LjAzNTg3IDkuNDEzNDEgNy44NjQwOUM5LjY0Mjg4IDcuNjkyMyA5LjY4OTc2IDcuMzY2ODggOS41MTgxMSA3LjEzNzIyQzguOTQ4ODcgNi4zNzU2MiA4LjA3NzE4IDUuODk5IDcuMTI5MjYgNS44MzEwNloiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L2c+Cjwvc3ZnPgo=" />
                                    </figure>
                                    <p>WebEx</p>
                                </div>
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBNYWxlIFVzZXIiPgo8cGF0aCBpZD0iVmVjdG9yIiBkPSJNOCAxLjVDNC40MTc5NyAxLjUgMS41IDQuNDE3OTcgMS41IDhDMS41IDExLjU4MiA0LjQxNzk3IDE0LjUgOCAxNC41QzExLjU4MiAxNC41IDE0LjUgMTEuNTgyIDE0LjUgOEMxNC41IDQuNDE3OTcgMTEuNTgyIDEuNSA4IDEuNVpNOCAyLjVDMTEuMDQzIDIuNSAxMy41IDQuOTU3MDMgMTMuNSA4QzEzLjUgOS4zMzk4NCAxMy4wMjM0IDEwLjU2MjUgMTIuMjM0NCAxMS41MTU2QzExLjgwNDcgMTAuMjk2OSAxMC44NzUgOS4zMTY0MSA5LjY4NzUgOC44MzIwM0MxMC4xODM2IDguMzc1IDEwLjUgNy43MjI2NiAxMC41IDdDMTAuNSA1LjYyNSA5LjM3NSA0LjUgOCA0LjVDNi42MjUgNC41IDUuNSA1LjYyNSA1LjUgN0M1LjUgNy43MjI2NiA1LjgxNjQxIDguMzc1IDYuMzEyNSA4LjgzMjAzQzUuMTI1IDkuMzE2NDEgNC4xOTkyMiAxMC4yOTY5IDMuNzY5NTMgMTEuNTE1NkMyLjk3NjU2IDEwLjU2MjUgMi41IDkuMzM5ODQgMi41IDhDMi41IDQuOTU3MDMgNC45NTcwMyAyLjUgOCAyLjVaTTggNS41QzguODM1OTQgNS41IDkuNSA2LjE2NDA2IDkuNSA3QzkuNSA3LjgzNTk0IDguODM1OTQgOC41IDggOC41QzcuMTY0MDYgOC41IDYuNSA3LjgzNTk0IDYuNSA3QzYuNSA2LjE2NDA2IDcuMTY0MDYgNS41IDggNS41Wk04IDkuNUM5LjY5OTIyIDkuNSAxMS4wOTM4IDEwLjcwNyAxMS40MTggMTIuMzA4NkMxMC40NzY2IDEzLjA1NDcgOS4yOTI5NyAxMy41IDggMTMuNUM2LjcwNzAzIDEzLjUgNS41MjM0NCAxMy4wNTQ3IDQuNTg1OTQgMTIuMzA4NkM0LjkwNjI1IDEwLjcwNyA2LjMwMDc4IDkuNSA4IDkuNVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L3N2Zz4K" />
                                    </figure>
                                    <p>Santiago, Brian, Felix and 5 others</p>
                                </div>
                            </div>
                            <div className="buttons-wrapper-sec">
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-check"></i>
                                    <span>Button</span>
                                </button>
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-check"></i>
                                    <span>Button</span>
                                </button>
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-elipse-horizantal"></i>
                                    <span>More</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="see-more-link">
                        <button className="see-more-btn">
                            <span>See more</span>
                            <i className="sdkv3-cheveron-right"></i>
                        </button>
                    </div>
                </div>
                <div className="adv-parent-temp-wrapper if-table-list-acc-data list-with-border-multi-items">
                    <div className="main-heading-wrapper">
                        <h1>Main Title Text</h1>
                    </div>
                    <div className="adv-parent-acc-list open-acc-adv-temp">
                        <div className="advanced-list-template-wrapper">
                            <div className="img-block">
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                            </div>
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                                <p>Description</p>
                            </div>
                            <div className="right-actions-content">
                                <h1>$42.77</h1>
                                <button className="arrow-icon">
                                    <i className="sdkv3-cheveron-right"></i>
                                </button>
                            </div>
                        </div>
                        <div className="adv-list-temp-accordion">
                            <div className="checkbox-list-data-tems">
                                <div className="radio-button-item">
                                    <input id='oneradio' name="radio" className="radio-input" type="radio" checked/>
                                    <label for='oneradio' className="radio-label">
                                        <div className="radio-title">Lorem ipsum doller ammen</div>
                                        <div className="radio-desc">Radio button item</div>
                                    </label>
                                </div>
                                <div className="radio-button-item">
                                    <input id='oneradio1' name="radio" className="radio-input" type="radio" checked/>
                                    <label for='oneradio1' className="radio-label">
                                        <div className="radio-title">Lorem ipsum doller ammen</div>
                                        <div className="radio-desc">Radio button item</div>
                                    </label>
                                </div>
                                <div className="radio-button-item">
                                    <input id='oneradio2' name="radio" className="radio-input" type="radio" />
                                    <label for='oneradio2' className="radio-label">
                                        <div className="radio-title">Lorem ipsum doller ammen</div>
                                        <div className="radio-desc">Radio button item</div>
                                    </label>
                                </div>
                                <div className="radio-button-item">
                                    <input id='oneradio3' name="radio" className="radio-input" type="radio" />
                                    <label for='oneradio3' className="radio-label">
                                        <div className="radio-title">Lorem ipsum doller ammen</div>
                                        <div className="radio-desc">Radio button item</div>
                                    </label>
                                </div>
                            </div>
                            <div className="buttons-wrapper-sec">
                                <button className="kr-button-primary">Confirm</button>
                                <button className="kr-button-secondary">Cancel</button>
                            </div>
                        </div>
                    </div>
                    <div className="adv-parent-acc-list">
                        <div className="advanced-list-template-wrapper">
                            <div className="img-block">
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9InNldHRpbmdzIj4KPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeT0iMC41IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjREZFN0Y1Ii8+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy42ODY3IDE5LjEzODdMMjguNzI5MyAxOS4zMzkzQzI4Ljg4NjcgMTkuMzY5MyAyOSAxOS41MDcgMjkgMTkuNjY2N1YyMS42NjY3QzI5IDIxLjgzMSAyOC44OCAyMS45NzEgMjguNzE3MyAyMS45OTU3TDI3LjYyMyAyMi4xNjRDMjcuMDA1MyAyMi4yNTkgMjYuNDg3MyAyMi42NTc3IDI2LjIzNzMgMjMuMjMwN0MyNS45ODczIDIzLjgwNCAyNi4wNDczIDI0LjQ1NSAyNi4zOTggMjQuOTcyN0wyNi45OTMzIDI1Ljg1MkMyNy4wODMgMjUuOTg0MyAyNy4wNjYgMjYuMTYxNyAyNi45NTMgMjYuMjc0N0wyNS41MzkgMjcuNjg4N0MyNS40MjMgMjcuODA0NyAyNS4yMzkzIDI3LjgxOTcgMjUuMTA2MyAyNy43MjJMMjQuNDc4MyAyNy4yNjE3QzI0LjE2MyAyNy4wMzAzIDIzLjc5NSAyNi45MDgzIDIzLjQxMyAyNi45MDgzQzIyLjYzNjcgMjYuOTA4MyAyMS43Njk3IDI3LjQzNyAyMS42MTQzIDI4LjQ0NzdMMjEuNDk2IDI5LjIxNzNDMjEuNDcxIDI5LjM4IDIxLjMzMTMgMjkuNSAyMS4xNjY3IDI5LjVIMTkuMTY2N0MxOS4wMDcgMjkuNSAxOC44NjkzIDI5LjM4NjMgMTguODM5MyAyOS4yMjk3TDE4LjYzODcgMjguMTg2N0MxOC40NzQ3IDI3LjMzMzcgMTcuNzIzMyAyNi43MTQ3IDE2Ljg1MjMgMjYuNzE0N0MxNi40NyAyNi43MTQ3IDE2LjEwMTMgMjYuODM3IDE1Ljc4NjcgMjcuMDY3N0wxNC44OTM3IDI3LjcyMjNDMTQuNzYwNyAyNy44MiAxNC41NzczIDI3LjgwNSAxNC40NjEgMjcuNjg5TDEzLjA0NyAyNi4yNzVDMTIuOTM0IDI2LjE2MiAxMi45MTcgMjUuOTg0MyAxMy4wMDY3IDI1Ljg1MjNMMTMuNjAyIDI0Ljk3M0MxMy45NTI3IDI0LjQ1NTMgMTQuMDEyNyAyMy44MDQzIDEzLjc2MjcgMjMuMjMxQzEzLjUxMyAyMi42NTggMTIuOTk0NyAyMi4yNTkzIDEyLjM3NyAyMi4xNjQzTDExLjI4MjcgMjEuOTk2QzExLjEyIDIxLjk3MSAxMSAyMS44MzEgMTEgMjEuNjY2N1YxOS42NjY3QzExIDE5LjUwNyAxMS4xMTMzIDE5LjM2OTMgMTEuMjcgMTkuMzM5N0wxMi4zMTI3IDE5LjEzOUMxMi45MjY3IDE5LjAyMSAxMy40MjkzIDE4LjYwMyAxMy42NTggMTguMDIxM0MxMy44ODYzIDE3LjQzOTMgMTMuODAyIDE2Ljc5MSAxMy40MzIzIDE2LjI4N0wxMi43Nzc3IDE1LjM5NEMxMi42ODA3IDE1LjI2MSAxMi42OTQ3IDE1LjA3NzMgMTIuODExIDE0Ljk2MUwxNC4yMjUzIDEzLjU0N0MxNC4zMzgzIDEzLjQzNCAxNC41MTU3IDEzLjQxNzMgMTQuNjQ4IDEzLjUwNjdMMTUuNzgzNyAxNC4yNzZDMTYuMDg2MyAxNC40ODEzIDE2LjQzNjMgMTQuNTg5NyAxNi43OTQ3IDE0LjU4OTdDMTcuNjY1IDE0LjU4OTcgMTguNDE2MyAxMy45NzA3IDE4LjU4MDMgMTMuMTE3N0wxOC44MzkzIDExLjc3MDdDMTguODY5MyAxMS42MTM3IDE5LjAwNyAxMS41IDE5LjE2NjcgMTEuNUgyMS4xNjY3QzIxLjMzMTMgMTEuNSAyMS40NzEzIDExLjYyIDIxLjQ5NTcgMTEuNzgyM0wyMS42NjQgMTIuODc2N0MyMS44MDE3IDEzLjc2ODcgMjIuNTU3MyAxNC40MTU3IDIzLjQ2MTcgMTQuNDE1N0MyMy44MiAxNC40MTU3IDI0LjE2OTMgMTQuMzA3IDI0LjQ3MjcgMTQuMTAxN0wyNS4zNTIgMTMuNTA2M0MyNS40ODQzIDEzLjQxNjcgMjUuNjYxNyAxMy40MzM3IDI1Ljc3NDcgMTMuNTQ2N0wyNy4xODg3IDE0Ljk2MDdDMjcuMzA1IDE1LjA3NyAyNy4zMTkzIDE1LjI2MSAyNy4yMjIgMTUuMzkzM0wyNi41NjczIDE2LjI4NjNDMjYuMTk3MyAxNi43OTA3IDI2LjExMyAxNy40MzkgMjYuMzQxNyAxOC4wMjA3QzI2LjU2OTcgMTguNjAzIDI3LjA3MjcgMTkuMDIwNyAyNy42ODY3IDE5LjEzODdaTTIwLjE2NjcgMjMuNUMyMS43MjkgMjMuNSAyMyAyMi4yMjkgMjMgMjAuNjY2N0MyMyAxOS4xMDQzIDIxLjcyOSAxNy44MzMzIDIwLjE2NjcgMTcuODMzM0MxOC42MDQzIDE3LjgzMzMgMTcuMzMzMyAxOS4xMDQzIDE3LjMzMzMgMjAuNjY2N0MxNy4zMzMzIDIyLjIyOSAxOC42MDQzIDIzLjUgMjAuMTY2NyAyMy41WiIgZmlsbD0iIzA3Mzc3RiIvPgo8L2c+Cjwvc3ZnPgo=" />
                            </div>
                            <div className="titles-info-block">
                                <h1>Title text</h1>
                                <p>Description</p>
                            </div>
                            <div className="right-actions-content">
                                <h1>$42.77</h1>
                                <button className="arrow-icon">
                                    <i className="sdkv3-cheveron-right"></i>
                                </button>
                            </div>
                        </div>
                        <div className="adv-list-temp-accordion">
                            <div className="list-of-rows">
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBUaW1lIj4KPGcgaWQ9InRpbWUiPgo8cGF0aCBkPSJNOC41MTY0IDMuNDE1NzdDOC40OTI1NiAzLjE1MTUyIDguMjcwNDYgMi45NDQ0NCA4IDIuOTQ0NDRDNy43MTM2MyAyLjk0NDQ0IDcuNDgxNDggMy4xNzY1OSA3LjQ4MTQ4IDMuNDYyOTZWOC4zNjM4N0w3LjQ4MzYgOC40MTEwNkM3LjUwNzQ0IDguNjc1MzEgNy43Mjk1NCA4Ljg4MjM4IDggOC44ODIzOEgxMi4wNzI3TDEyLjExOTkgOC44ODAyN0MxMi4zODQyIDguODU2NDIgMTIuNTkxMyA4LjYzNDMzIDEyLjU5MTMgOC4zNjM4N0wxMi41ODkxIDguMzE2NjdDMTIuNTY1MyA4LjA1MjQyIDEyLjM0MzIgNy44NDUzNSAxMi4wNzI3IDcuODQ1MzVMOC41MTg1MiA3Ljg0NTA5VjMuNDYyOTZMOC41MTY0IDMuNDE1NzdaIiBmaWxsPSIjNUY2MzY4Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOCAxQzQuMTM0MDEgMSAxIDQuMTM0MDEgMSA4QzEgMTEuODY2IDQuMTM0MDEgMTUgOCAxNUMxMS44NjYgMTUgMTUgMTEuODY2IDE1IDhDMTUgNC4xMzQwMSAxMS44NjYgMSA4IDFaTTggMi4wMzcwNEMxMS4yOTMzIDIuMDM3MDQgMTMuOTYzIDQuNzA2NzUgMTMuOTYzIDhDMTMuOTYzIDExLjI5MzMgMTEuMjkzMyAxMy45NjMgOCAxMy45NjNDNC43MDY3NSAxMy45NjMgMi4wMzcwNCAxMS4yOTMzIDIuMDM3MDQgOEMyLjAzNzA0IDQuNzA2NzUgNC43MDY3NSAyLjAzNzA0IDggMi4wMzcwNFoiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L2c+Cjwvc3ZnPgo=" />
                                    </figure>
                                    <p>Oct 9, 9:00am - 9:30am (Day 1/2)</p>
                                </div>
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBTdHlsZSAvIExpbmsiPgo8ZyBpZD0ibGluayI+CjxwYXRoIGQ9Ik0xMy4wNDE1IDIuOTYwMUMxMS43NzggMS42OTU2NyA5LjczNTE1IDEuNjc3OTEgOC40NDk5NSAyLjkyMDE3TDcuNDk2MzQgMy44Njg4OUw3LjQ2MjU4IDMuOTA1ODRDNy4yOTM3MSA0LjEwOTM0IDcuMzA0MDUgNC40MTE4NSA3LjQ5NDIgNC42MDMyN0M3LjY5NjI1IDQuODA2NjUgOC4wMjQ3OCA0LjgwNzYxIDguMjI4IDQuNjA1NDFMOS4xNzYyNSAzLjY2MTk0TDkuMjM3OTcgMy42MDQ0OEMxMC4xMTM1IDIuODE5NTUgMTEuNDY0NiAyLjg1MDc1IDEyLjMwNzcgMy42OTQ0N0MxMy4xNzA4IDQuNTU4MjkgMTMuMTgyOSA1Ljk1NTAyIDEyLjMzNDkgNi44MzM3MUwxMC42ODczIDguNDgyNDlMMTAuNjIwNiA4LjU0NjYzQzEwLjE2NzcgOC45NjQwNSA5LjU2MTYyIDkuMTc3MjMgOC45NDQ4NyA5LjEzMzAzQzguMjk3MjkgOS4wODY2MSA3LjcwMTc3IDguNzYxIDcuMzEyODkgOC4yNDA3QzcuMTQxMjQgOC4wMTEwNSA2LjgxNjA3IDcuOTY0MTMgNi41ODY1OSA4LjEzNTkxQzYuMzU3MTIgOC4zMDc3IDYuMzEwMjQgOC42MzMxMiA2LjQ4MTg5IDguODYyNzhDNy4wNTExMyA5LjYyNDM4IDcuOTIyODIgMTAuMTAxIDguODcwNzQgMTAuMTY4OUM5LjgxODY2IDEwLjIzNjkgMTAuNzQ5MyA5Ljg4OTQ0IDExLjQyMTIgOS4yMTY4TDEzLjA3NTEgNy41NjE2NUwxMy4xNDE4IDcuNDkwNDFDMTQuMzIxNiA2LjE5NDkyIDE0LjI4MTkgNC4yMDE1MyAxMy4wNDE1IDIuOTYwMVoiIGZpbGw9IiM1RjYzNjgiLz4KPHBhdGggZD0iTTcuMTI5MjYgNS44MzEwNkM2LjE4MTM0IDUuNzYzMTIgNS4yNTA2NyA2LjExMDU2IDQuNTc4OCA2Ljc4MzJMMi45MjQ5NSA4LjQzODM1TDIuODU4MTUgOC41MDk1OUMxLjY3ODQgOS44MDUwOCAxLjcxODA3IDExLjc5ODUgMi45NTg1MyAxMy4wMzk5QzQuMjIxOTYgMTQuMzA0MyA2LjI2NDg1IDE0LjMyMjEgNy41NTAwNSAxMy4wNzk4TDguNDk5MjEgMTIuMTNMOC41MzI4NyAxMi4wOTNDOC43MDExNSAxMS44ODkgOC42ODk5MyAxMS41ODY1IDguNDk5MjEgMTEuMzk1N0M4LjI5NjU4IDExLjE5MjkgNy45NjgwNSAxMS4xOTI5IDcuNzY1NDEgMTEuMzk1N0w2LjgyMjY4IDEyLjMzOTFMNi43NjEwNCAxMi4zOTY1QzUuODg2NDggMTMuMTgwNSA0LjUzNTM5IDEzLjE0OTMgMy42OTIzMyAxMi4zMDU1QzIuODI5MTkgMTEuNDQxNyAyLjgxNzA2IDEwLjA0NSAzLjY2NTA3IDkuMTY2MjlMNS4zMTI2NyA3LjUxNzUxTDUuMzc5NDMgNy40NTMzN0M1LjgzMjMyIDcuMDM1OTUgNi40MzgzOCA2LjgyMjc3IDcuMDU1MTMgNi44NjY5N0M3LjcwMjcxIDYuOTEzMzkgOC4yOTgyMyA3LjIzOSA4LjY4NzExIDcuNzU5M0M4Ljg1ODc2IDcuOTg4OTUgOS4xODM5MyA4LjAzNTg3IDkuNDEzNDEgNy44NjQwOUM5LjY0Mjg4IDcuNjkyMyA5LjY4OTc2IDcuMzY2ODggOS41MTgxMSA3LjEzNzIyQzguOTQ4ODcgNi4zNzU2MiA4LjA3NzE4IDUuODk5IDcuMTI5MjYgNS44MzEwNloiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L2c+Cjwvc3ZnPgo=" />
                                    </figure>
                                    <p>WebEx</p>
                                </div>
                                <div className="row-list-info">
                                    <figure>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Ikljb24gLyBNYWxlIFVzZXIiPgo8cGF0aCBpZD0iVmVjdG9yIiBkPSJNOCAxLjVDNC40MTc5NyAxLjUgMS41IDQuNDE3OTcgMS41IDhDMS41IDExLjU4MiA0LjQxNzk3IDE0LjUgOCAxNC41QzExLjU4MiAxNC41IDE0LjUgMTEuNTgyIDE0LjUgOEMxNC41IDQuNDE3OTcgMTEuNTgyIDEuNSA4IDEuNVpNOCAyLjVDMTEuMDQzIDIuNSAxMy41IDQuOTU3MDMgMTMuNSA4QzEzLjUgOS4zMzk4NCAxMy4wMjM0IDEwLjU2MjUgMTIuMjM0NCAxMS41MTU2QzExLjgwNDcgMTAuMjk2OSAxMC44NzUgOS4zMTY0MSA5LjY4NzUgOC44MzIwM0MxMC4xODM2IDguMzc1IDEwLjUgNy43MjI2NiAxMC41IDdDMTAuNSA1LjYyNSA5LjM3NSA0LjUgOCA0LjVDNi42MjUgNC41IDUuNSA1LjYyNSA1LjUgN0M1LjUgNy43MjI2NiA1LjgxNjQxIDguMzc1IDYuMzEyNSA4LjgzMjAzQzUuMTI1IDkuMzE2NDEgNC4xOTkyMiAxMC4yOTY5IDMuNzY5NTMgMTEuNTE1NkMyLjk3NjU2IDEwLjU2MjUgMi41IDkuMzM5ODQgMi41IDhDMi41IDQuOTU3MDMgNC45NTcwMyAyLjUgOCAyLjVaTTggNS41QzguODM1OTQgNS41IDkuNSA2LjE2NDA2IDkuNSA3QzkuNSA3LjgzNTk0IDguODM1OTQgOC41IDggOC41QzcuMTY0MDYgOC41IDYuNSA3LjgzNTk0IDYuNSA3QzYuNSA2LjE2NDA2IDcuMTY0MDYgNS41IDggNS41Wk04IDkuNUM5LjY5OTIyIDkuNSAxMS4wOTM4IDEwLjcwNyAxMS40MTggMTIuMzA4NkMxMC40NzY2IDEzLjA1NDcgOS4yOTI5NyAxMy41IDggMTMuNUM2LjcwNzAzIDEzLjUgNS41MjM0NCAxMy4wNTQ3IDQuNTg1OTQgMTIuMzA4NkM0LjkwNjI1IDEwLjcwNyA2LjMwMDc4IDkuNSA4IDkuNVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9nPgo8L3N2Zz4K" />
                                    </figure>
                                    <p>Santiago, Brian, Felix and 5 others</p>
                                </div>
                            </div>
                            <div className="buttons-wrapper-sec">
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-check"></i>
                                    <span>Button</span>
                                </button>
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-check"></i>
                                    <span>Button</span>
                                </button>
                                <button className="kr-button-blue-light">
                                    <i className="sdkv3-elipse-horizantal"></i>
                                    <span>More</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="see-more-link">
                        <button className="see-more-btn">
                            <span>See more</span>
                            <i className="sdkv3-cheveron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

class TemplateDatePicker extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(DatePicker, msgData, this.hostInstance);
    }
}

export default TemplateDatePicker;

