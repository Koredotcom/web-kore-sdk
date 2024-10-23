import { h } from "preact";

export function ImageCarouselSvgIcons(props: any): any {
    const propsIconType = props.type;
    let svgIcon;
    switch (propsIconType) {
        case 'zoom-in':
            svgIcon = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 16.5L12.875 12.875M8.16667 5.66667V10.6667M5.66667 8.16667H10.6667M14.8333 8.16667C14.8333 11.8486 11.8486 14.8333 8.16667 14.8333C4.48477 14.8333 1.5 11.8486 1.5 8.16667C1.5 4.48477 4.48477 1.5 8.16667 1.5C11.8486 1.5 14.8333 4.48477 14.8333 8.16667Z" stroke="#344054" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>;
            break;
        case 'zoom-out':
            svgIcon = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 16.5L12.875 12.875M5.66667 8.16667H10.6667M14.8333 8.16667C14.8333 11.8486 11.8486 14.8333 8.16667 14.8333C4.48477 14.8333 1.5 11.8486 1.5 8.16667C1.5 4.48477 4.48477 1.5 8.16667 1.5C11.8486 1.5 14.8333 4.48477 14.8333 8.16667Z" stroke="#344054" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>;
            break;
        case 'left-arrow':
            svgIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 8H1M1 8L8 15M1 8L8 1" stroke="#101828" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>;
            break;
        case 'expand':
            svgIcon = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5 6.5L16.5 1.5M16.5 1.5H11.5M16.5 1.5V6.5M6.5 6.5L1.5 1.5M1.5 1.5L1.5 6.5M1.5 1.5L6.5 1.5M6.5 11.5L1.5 16.5M1.5 16.5H6.5M1.5 16.5L1.5 11.5M11.5 11.5L16.5 16.5M16.5 16.5V11.5M16.5 16.5H11.5" stroke="#155EEF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>;
            break;
        case 'left-btn-arrow':
            svgIcon = <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 9L1 5L5 1" stroke="#155EEF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>;
            break;
        case 'right-btn-arrow':
            svgIcon = <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 9L5 5L1 1" stroke="#155EEF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>;
            break;
       default:
            svgIcon =
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="20" height="20" rx="10" fill="#F2F4F7" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9193 5H7.08073C6.81716 4.99999 6.58977 4.99998 6.40249 5.01529C6.20481 5.03144 6.00821 5.06709 5.81902 5.16349C5.53677 5.3073 5.3073 5.53677 5.16349 5.81902C5.06709 6.00821 5.03144 6.20481 5.01529 6.40249C4.99998 6.58977 4.99999 6.81714 5 7.08071V12.9193C4.99999 13.1828 4.99998 13.4102 5.01529 13.5975C5.03144 13.7952 5.06709 13.9918 5.16349 14.181C5.3073 14.4632 5.53677 14.6927 5.81902 14.8365C6.00821 14.9329 6.20481 14.9686 6.40249 14.9847C6.58977 15 6.81715 15 7.08072 15H12.9193C13.1829 15 13.4102 15 13.5975 14.9847C13.7952 14.9686 13.9918 14.9329 14.181 14.8365C14.4632 14.6927 14.6927 14.4632 14.8365 14.181C14.9329 13.9918 14.9686 13.7952 14.9847 13.5975C15 13.4102 15 13.1829 15 12.9193V7.08072C15 6.81715 15 6.58977 14.9847 6.40249C14.9686 6.20481 14.9329 6.00821 14.8365 5.81902C14.6927 5.53677 14.4632 5.3073 14.181 5.16349C13.9918 5.06709 13.7952 5.03144 13.5975 5.01529C13.4102 4.99998 13.1828 4.99999 12.9193 5Z" fill="#F04438" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.75 8.25H7.88929C8.12965 8.25 8.31152 8.28975 8.4349 8.36925C8.55829 8.44875 8.64161 8.56493 8.68488 8.71782C8.72814 8.8707 8.74977 9.07861 8.74977 9.34157C8.74977 9.58924 8.72974 9.78951 8.68968 9.94239C8.64962 10.0953 8.5679 10.2153 8.44452 10.3024C8.32113 10.3896 8.13606 10.4331 7.88929 10.4331H7.51914V11.75H6.75V8.25ZM7.6922 9.80939C7.78514 9.80939 7.84923 9.80022 7.88449 9.78187C7.91974 9.76352 7.94377 9.72377 7.95659 9.66262C7.96941 9.60147 7.97582 9.49445 7.97582 9.34157C7.97582 9.18869 7.97021 9.08167 7.959 9.02052C7.94778 8.95937 7.92374 8.91962 7.88689 8.90127C7.85003 8.88293 7.78674 8.87376 7.69701 8.87376H7.51914V9.80939H7.6922ZM9.16836 8.25H10.101C10.4503 8.25 10.6994 8.29663 10.8485 8.38989C10.9975 8.48314 11.0896 8.62914 11.1249 8.82789C11.1601 9.02664 11.1778 9.35992 11.1778 9.82773C11.1778 10.2925 11.1601 10.9695 11.1249 11.1698C11.0896 11.3701 10.9975 11.5169 10.8485 11.6101C10.6994 11.7034 10.4503 11.75 10.101 11.75H9.16836V8.25ZM10.0961 11.1217C10.2115 11.1217 10.2876 11.1071 10.3245 11.0781C10.3613 11.049 10.3966 10.8102 10.3966 10.5157C10.3966 10.2212 10.4134 10.1702 10.4134 9.82773C10.4134 9.48834 10.4078 9.25978 10.3966 9.14206C10.3854 9.02434 10.3605 8.95096 10.3221 8.92191C10.2836 8.89287 10.2083 8.87834 10.0961 8.87834H9.9327V11.1217H10.0961ZM11.6733 11.75V8.25H13.25V8.87834H12.4424V9.57548H13.149V10.2038H12.4424V11.75H11.6733Z" fill="white" />
                </svg>
            break;
    }
    return svgIcon
}

export default ImageCarouselSvgIcons;