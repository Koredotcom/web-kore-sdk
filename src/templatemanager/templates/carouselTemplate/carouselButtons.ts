class CarouselButtons {
    hostInstance: any;
    id: any;
    classToHideDisable: any;
    rightSlideWidth: any;
    leftSlideWidth: any;
    widthToSlide: any;
    classToRemove: any;

    constructor(config: any) {
        this.hostInstance = config.hostInstance;
        this.id = config.id;
        this.classToHideDisable = config.class;
        this.rightSlideWidth = config.rsWidth;
        this.leftSlideWidth = config.lsWidth;
        this.classToRemove = config?.classToRemove || '';
    }

    init() {
        const btnsParentDiv: any = this.hostInstance.chatEle.querySelector(`[c-parent-id='${this.id}']`);
        const leftScrollBtn = this.hostInstance.chatEle.querySelector(`[c-left-button-id='${this.id}']`);
        const rightScrollBtn = this.hostInstance.chatEle.querySelector(`[c-right-button-id='${this.id}']`);
    
        const updateButtons = () => {
            const isVisible = btnsParentDiv?.offsetWidth && btnsParentDiv?.scrollWidth;
            if (!isVisible) {
                return;
            }
    
            if (btnsParentDiv.offsetWidth >= btnsParentDiv.scrollWidth && this.id != 'welcome_screen_carousel') {
                rightScrollBtn.classList.add(this.classToRemove);
                leftScrollBtn.classList.add(this.classToRemove);
            } else if (btnsParentDiv.offsetWidth >= btnsParentDiv.scrollWidth && this.id == 'welcome_screen_carousel') {
                if (btnsParentDiv.children.length === 1) {
                    rightScrollBtn.classList.add(this.classToRemove);
                    leftScrollBtn.classList.add(this.classToRemove);
                }
            }
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
        };
    
        updateButtons();
    
        leftScrollBtn?.addEventListener('click', () => {
            const btnsParentDivWidth = btnsParentDiv.scrollLeft;
            const qButtons = btnsParentDiv.querySelectorAll(`[c-items-id='${this.id}']`);
            let curWidth = 0;
            if (qButtons.length > 0) {
                qButtons.forEach((ele: any) => {
                    curWidth = curWidth + ele.offsetWidth + 10;
                    if (curWidth > btnsParentDivWidth) {
                        btnsParentDiv.scrollTo({
                            left: btnsParentDiv.scrollLeft - ele.offsetWidth - this.leftSlideWidth,
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
        rightScrollBtn?.addEventListener('click', () => {
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
                });
            }
        });
    
        const checkForButtonsVisibility = setInterval(() => {
            if (btnsParentDiv && btnsParentDiv.offsetWidth > 0) {
                updateButtons();
                clearInterval(checkForButtonsVisibility);
            }
        }, 300);
    }
}

export default CarouselButtons