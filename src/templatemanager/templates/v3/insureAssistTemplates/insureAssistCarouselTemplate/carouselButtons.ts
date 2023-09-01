class CarouselButtons {
    hostInstance: any;
    id: any;
    classToHideDisable: any;
    rightSlideWidth: any;
    leftSlideWidth: any;
    widthToSlide: any;

    constructor(config: any) {
        this.hostInstance = config.hostInstance;
        this.id = config.id;
        this.classToHideDisable = config.class;
        this.rightSlideWidth = config.rsWidth;
        this.leftSlideWidth = config.lsWidth;
    }

    init() {
        const btnsParentDiv: any = this.hostInstance.chatEle.querySelector(`[c-parent-id='${this.id}']`);
        const leftScrollBtn = this.hostInstance.chatEle.querySelector(`[c-left-button-id='${this.id}']`);
        const rightScrollBtn = this.hostInstance.chatEle.querySelector(`[c-right-button-id='${this.id}']`);
        if (btnsParentDiv && btnsParentDiv.hasChildNodes()) {
            if (leftScrollBtn) {
                if (btnsParentDiv.scrollLeft > 0) {
                    leftScrollBtn.classList.remove(this.classToHideDisable);
                } else {
                    leftScrollBtn.classList.add(this.classToHideDisable);
                }
            }
            if (rightScrollBtn) {
                if (btnsParentDiv.offsetWidth < btnsParentDiv.scrollWidth) {
                    rightScrollBtn.classList.remove(this.classToHideDisable);
                } else {
                    rightScrollBtn.classList.add(this.classToHideDisable);
                }
            }
        }

        leftScrollBtn.addEventListener('click', () => {
            const btnsParentDivWidth = btnsParentDiv.scrollLeft;
            const qButtons = btnsParentDiv.querySelectorAll(`[c-items-id='${this.id}']`);
            let curWidth = 0;
            if (qButtons.length > 0) {
                qButtons.forEach((ele: any) => {
                    curWidth = curWidth + ele.offsetWidth + 10;
                    if (curWidth > btnsParentDivWidth) {
                        btnsParentDiv.scrollTo({
                            left: btnsParentDiv.offsetHeight - ele.offsetHeight - this.leftSlideWidth,
                            behavior: 'smooth'
                        });
                        rightScrollBtn.classList.remove(this.classToHideDisable);
                        if (btnsParentDiv.scrollLeft <= 0) {
                            leftScrollBtn.classList.add(this.classToHideDisable);
                        }
                    }

                })
            }
        })
        rightScrollBtn.addEventListener('click', () => {
            const btnsParentDivWidth = btnsParentDiv.offsetWidth;
            const qButtons = btnsParentDiv.querySelectorAll(`[c-items-id='${this.id}']`);
            let curWidth = 0;
            if (qButtons.length > 0) {
                qButtons.forEach((ele: any) => {
                    curWidth = curWidth + ele.offsetWidth + 10;
                    if (curWidth > btnsParentDivWidth) {
                        btnsParentDiv.scrollTo({
                            left: btnsParentDiv.scrollLeft + ele.offsetWidth + this.rightSlideWidth,
                            behavior: 'smooth'
                        });
                        leftScrollBtn.classList.remove(this.classToHideDisable);;
                        if (btnsParentDiv.scrollLeft + btnsParentDivWidth + 10 >= btnsParentDiv.scrollWidth) {
                            rightScrollBtn.classList.add(this.classToHideDisable);
                        }
                    }

                })
            }
        })
    }
}

export default CarouselButtons