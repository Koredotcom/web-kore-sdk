class stackedCards {
    config: any;
    defaults: any = {
        layout: 'slide', // slide, fanOut
        onClick: undefined, // onclick event provided
        transformOrigin: "center", // css transformOrigin
        id: '',
        hostInstance: '',
        buttons: false
    }
    els: any;
    parent: any | null;
    hostInstance: any;

    constructor(options: any) {
        if (options == null) {
            options = {};
        }

        this.draw = this.bind(this.draw, this);
        this.config = this.extend(options, this.defaults);
        this.hostInstance = this.config.hostInstance;
    }

    private bind(fn: any, me: any) {
        return function () {
            return fn.apply(me, arguments);
        };
    }

    init() {
        if (document.readyState === "interactive" || document.readyState === "complete") {
            this.draw();
        } else {
            document.addEventListener('DOMContentLoaded', this.draw);
        }
    }

    private draw() {
        const me = this;
        const selector = this.config.selector;

        this.els = this.hostInstance.chatEle.querySelectorAll(selector + " li");
        const els = this.els;

        this.parent = els[0]?.parentNode;

        const getItemHeight: any = els[0]?.getBoundingClientRect().height;
        if (els && els[0]?.parentNode) {
            els[0].parentNode.style.height = parseInt(getItemHeight) + "px";
        }
        const lenAdjust = (els.length % 2 == 0 ? -2 : -1)
        const oneHalf = (els.length + lenAdjust) / 2;
        const activeTransform = "translate(" + -50 + "%, 0%)  scale(1)";
        if (me.config.buttons) {
            let nextCount: any = 0;
            let prevCount: any = els.length;
            let currentEleIndex = els.length === 2 ? Math.floor((els.length + lenAdjust) / 2) : Math.floor((els.length + lenAdjust) / 2) - 1; // Adjusted index to start at the second slide

            me.setActiveElement(els, els[currentEleIndex], nextCount, prevCount, activeTransform);
            const leftButton = this.hostInstance.chatEle.querySelector('.' + me.config.id + ' .left-click');
            const rightButton = this.hostInstance.chatEle.querySelector('.' + me.config.id + ' .right-click');

            // Initial state: Disable left button if there is only one slide
            if (els.length <= 1 || currentEleIndex === 0) {
                leftButton.classList.add('disabled-click');
            }


            leftButton?.addEventListener('click', () => {
                if (currentEleIndex > 0) {
                    let currentEle = els[--currentEleIndex];
                    me.setActiveElement(els, currentEle, nextCount, prevCount, activeTransform);
                    rightButton.classList.remove('disabled-click');
                    if (currentEleIndex === 0) {
                        leftButton.classList.add('disabled-click');
                    }
                }
            });

            rightButton?.addEventListener('click', () => {
                if (currentEleIndex < els.length - 1) {
                    let currentEle = els[++currentEleIndex];
                    me.setActiveElement(els, currentEle, nextCount, prevCount, activeTransform);
                    leftButton.classList.remove('disabled-click');
                    if (currentEleIndex === els.length - 1) {
                        rightButton.classList.add('disabled-click');
                    }
                }
            });
        }
        else {
            this.detectSwipe();
            Array.prototype.forEach.call(els, function (el) {
                el.style.transformOrigin = me.config.transformOrigin;

                el?.addEventListener("click", function () {
                    let clickedEl = el;
                    let nextCnt = 0;
                    let prevCnt = 0;

                    do {
                        // While there is a next sibling, loop
                        const next = clickedEl.nextElementSibling;
                        nextCnt = nextCnt + 1;

                    } while (clickedEl = clickedEl.nextElementSibling);

                    // re-initialize the clickedEl to do the same for prev elements
                    clickedEl = el;

                    do {
                        // While there is a prev sibling, loop
                        const prev = clickedEl.previousElementSibling;
                        prevCnt = prevCnt + 1;
                    } while (clickedEl = clickedEl.previousElementSibling);

                    me.reCalculateTransformsOnClick(nextCnt - 1, prevCnt - 1)
                    me.setActiveElement(els, el, nextCnt - 1, prevCnt - 1, activeTransform)
                });
            });
            els[oneHalf]?.click();
        }

    }

    private setActiveElement(els: any, el: any, nextCount: any, prevCount: any, activeTransform: any) {
        const me: any = this;
        me.reCalculateTransformsOnClick(nextCount, prevCount);

        me.loopNodeList(els, function (el: any) {
            el.classList.remove("active");
        });

        if (el) {
            el.classList?.add("active");
            el.classList?.add(me.config.layout);

            if (el.style) {
                el.style.zIndex = els.length * 5;
                el.style.transform = activeTransform;
            }

            if (me.config.onClick !== undefined) {
                me.config.onClick(el);
            }
        }
    }

    private reCalculateTransformsOnClick(nextCnt: any, prevCnt: any) {
        const els = this.nodelistToArray(this.els);
        const totalSlides = els.length;
        let z = 10; // Initial z-index value for non-active slides
        if (totalSlides === 2) {
            els.forEach((el: any, index: number) => {
                const zIndex = index === 0 ? 10 : 9; // Assign different z-index values for the two slides
                const scale = index === 0 ? 1 : 0.7; // Assign different scales for the two slides
    
                const translateX = index === 0 ? 0 : 10; // Assign different translation factors for the two slides
                const styleStr = `translate(${translateX}%, 0%) scale(${scale}) rotate(0deg)`;
    
                el.style.transform = styleStr;
                el.style.zIndex = zIndex.toString();
            });
        }

        else {
            const els = this.nodelistToArray(this.els);
            let z = 10;

            const layout = 'slide' || this.config.layout;
            const maxCntDivisor = Math.max(prevCnt, nextCnt);
            const prevDivisor = 10 / (maxCntDivisor);
            const nextDivisor = 10 / (maxCntDivisor);

            for (let i = 0; i < prevCnt; i++) {
                let scale = 0.7 + (50 / (maxCntDivisor + 1)) / 100; // Adjusted scale factor
                let translateX = (5 - (prevDivisor * (prevCnt - i))) * -1; // Adjusted translation factor
                let rotate = "rotate(0deg)";

                const styleStr = `translate(${translateX}%, 0%) scale(${scale}) ${rotate}`;
                z++;
                els[i].style.transform = styleStr;
                els[i].style.zIndex = z;
            }
            z--;
            for (let i = prevCnt + 1; i < nextCnt + prevCnt + 1; i++) {
                let scale = 1 - (50 / (maxCntDivisor + 1)) / 100; // Adjusted scale factor
                let translateX = (-5 + (nextDivisor * (i - prevCnt))) * -1; // Adjusted translation factor
                let rotate = "rotate(0deg)";

                z--;
                const styleStr = `translate(${translateX}%, 0%) scale(${scale}) ${rotate}`;
                els[i].style.transform = styleStr;
                els[i].style.zIndex = z;
            }
        }
    }

    private detectSwipe() {
        const me = this;
        const regionEl = this.hostInstance.chatEle.querySelector(me.config.selector);

        me.detectSwipeDir(regionEl, function (swipedir: any) {
            const activeEl: any = me.config.hostInstance.chatEle.querySelector(me.config.selector + " li.active");
            if (swipedir == 'left') {
                activeEl.nextElementSibling.click();
            } else if (swipedir == "right") {
                activeEl.previousElementSibling.click();
            }
        })
    }

    private extend(custom: any, defaults: any) {
        let key, value;
        for (key in defaults) {
            value = defaults[key];
            if (custom[key] == null) {
                custom[key] = value;
            }
        }
        return custom;
    }

    private nodelistToArray(nodelist: any) {
        const results: any = [];
        let i, element;
        for (i = 0; i < nodelist.length; i++) {
            element = nodelist[i];
            results.push(element);
        }
        return results;
    }

    private loopNodeList(els: any, callback: any, scope?: any) {
        for (let i = 0; i < els.length; i++) {
            callback.call(scope, els[i])
        }
    }


    private scrolledIn(el: any, offset: any) {
        if (typeof el == 'undefined') return;

        const elemTop = el.getBoundingClientRect().top;
        const elemBottom = el.getBoundingClientRect().bottom;

        const scrolledInEl = (elemTop >= 0) && (elemTop <= window.innerHeight);
        return scrolledInEl;

    }

    private detectSwipeDir(el: any, callback: any) {
        let touchsurface: any = el,
            swipedir: any,
            startX: any,
            startY: any,
            distX: any,
            distY: any,
            threshold: number = 75, //required min distance traveled to be considered swipe
            restraint: number = 100, // maximum distance allowed at the same time in perpendicular direction
            allowedTime: number = 300, // maximum time allowed to travel that distance
            elapsedTime: any,
            startTime: any,
            handleswipe: any = callback || function (swipedir: any) { }

        touchsurface?.addEventListener('touchstart', function (e: any) {
            const touchobj = e.changedTouches[0]
            swipedir = 'none'
            // dist = 0
            startX = touchobj.pageX
            startY = touchobj.pageY
            startTime = new Date().getTime() // record time when finger first makes contact with surface
            e.preventDefault()
        }, false)

        touchsurface?.addEventListener('touchmove', function (e: any) {
            // e.preventDefault() // prevent scrolling when inside DIV
        }, false)

        touchsurface?.addEventListener('touchend', function (e: any) {
            const touchobj = e.changedTouches[0]
            distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
            distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
            elapsedTime = new Date().getTime() - startTime // get time elapsed
            if (elapsedTime <= allowedTime) { // first condition for awipe met
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                    swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
                } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                    swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
                }
            }
            handleswipe(swipedir)
            e.preventDefault()
        }, false)

    }

}

export default stackedCards