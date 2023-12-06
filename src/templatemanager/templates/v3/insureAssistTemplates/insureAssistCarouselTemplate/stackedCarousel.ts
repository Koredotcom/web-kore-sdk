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

        /*const liWidth = 0;
        for(const q = 0;q<els.length; q++) {
            liWidth = liWidth + els[q].getBoundingClientRect().width;
        }*/

        if (els && els[0]?.parentNode) {
            els[0].parentNode.style.height = parseInt(getItemHeight) + "px";
        }

        const lenAdjust = (els.length % 2 == 0 ? -2 : -1)

        const oneHalf = (els.length + lenAdjust) / 2;
        let currentEleIndex = oneHalf;

        const activeTransform = "translate(" + -50 + "%, 0%)  scale(1)";

        if (me.config.buttons) {
            let nextCount: any = 0;
            let prevCount: any = els.length;

            prevCount = oneHalf;
            // nextCount = (oneHalf + 1) % 2 == 0 ? oneHalf + 1 : oneHalf;
            nextCount = oneHalf === 0 ? 1 : 0;

            me.setActiveElement(els, els[oneHalf], nextCount, prevCount, activeTransform);
            const leftButton = this.hostInstance.chatEle.querySelector('.' + me.config.id + ' .left-click');
            const rightButton = this.hostInstance.chatEle.querySelector('.' + me.config.id + ' .right-click');
            leftButton?.addEventListener('click', () => {
                let currentEle = els[currentEleIndex - 1];
                if (prevCount >= 0) {
                  nextCount = nextCount + 1;
                  prevCount = prevCount - 1;
                  currentEleIndex = currentEleIndex - 1;
                  me.setActiveElement(els, currentEle, nextCount, prevCount, activeTransform);
                  if (prevCount === 0) {
                    leftButton.classList.add('disabled-click');
                  }
                  if (nextCount > 0) {
                    rightButton.classList.remove('disabled-click');
                  }
                }
              });
              
              rightButton?.addEventListener('click', () => {
                let currentEle = els[currentEleIndex + 1];
                if (nextCount >= 0) {
                  nextCount = nextCount - 1;
                  prevCount = prevCount + 1;
                  currentEleIndex = currentEleIndex + 1;
                  me.setActiveElement(els, currentEle, nextCount, prevCount, activeTransform);
                  if (nextCount === 0) {
                    rightButton.classList.add('disabled-click');
                  }
                  if (prevCount > 0) {
                    leftButton.classList.remove('disabled-click');
                  }
                }
              });
              
        } else {
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
        me.reCalculateTransformsOnClick(nextCount, prevCount)

        me.loopNodeList(els, function (el: any) {
            el.classList.remove("active");
        })

        if (el) {
            el.classList.add("active");
            el.classList.add(me.config.layout)
            el.style.zIndex = els.length * 5;
            el.style.transform = activeTransform;
        }
        if (me.config.onClick !== undefined) {
            me.config.onClick(el);
        }
    }

    private reCalculateTransformsOnClick(nextCnt: any, prevCnt: any) {
        let z = 10;
        const els = this.nodelistToArray(this.els);

        let scale = 1,
            translateX = 0,
            rotateVal = 0,
            rotate = "";
        let rotateNegStart = 0 // ((75 / els.length) * (oneHalf))*-1;

        const transformArr = [];
        const zIndexArr = [];
        const relArr = [];

        let layout = 'slide' || this.config.layout;

        const maxCntDivisor = Math.max(prevCnt, nextCnt);
        const prevDivisor = 100 / (maxCntDivisor);
        const nextDivisor = 100 / (maxCntDivisor);

        if (prevCnt > nextCnt) {
            scale = 0 + (100 / (prevCnt + 1)) / 100;
        } else {
            scale = 1 - ((prevCnt) * (1 / (nextCnt + 1)));
        }

        let rotatePrevStart = ((prevCnt * 10 / (prevCnt) * prevCnt)) * -1;
        let rotateNextStart = ((nextCnt * 10 / (nextCnt)));

        for (let i = 0; i < prevCnt; i++) {
            switch (layout) {
                case "slide":
                    if (i > 0) {
                        scale = scale + (100 / (maxCntDivisor + 1)) / 100;
                    }

                    translateX = (-50 - ((prevDivisor) * (prevCnt - i)));

                    rotate = "rotate(0deg)";
                    break;
                case "fanOut":
                    rotateVal = rotatePrevStart;

                    if (i > 0) {
                        scale = scale + (100 / (maxCntDivisor + 1)) / 100;
                    }
                    translateX = (-50 - ((prevDivisor) * (prevCnt - i)));
                    rotate = "rotate(" + rotateVal + "deg)";

                    rotatePrevStart = rotatePrevStart + ((prevCnt * 10) / prevCnt);

                    break;
                default:
                    translateX = (150 - ((prevDivisor * 2) * i)) * -1;
                    rotate = "rotate(0deg)";

            }

            const styleStr = "translate(" + translateX + "%, 0%)  scale(" + scale + ") " + rotate;
            z = z + 1;

            els[i].style.transform = styleStr;
            els[i].style.zIndex = z;

        }

        z = z - 1;
        let j = 0;

        rotateNegStart = 0;
        scale = 1;
        for (let i: number = prevCnt + 1; i < nextCnt + prevCnt + 1; i++) {
            j = j + 1;
            switch (layout) {
                case "slide":
                    scale = scale - (100 / (maxCntDivisor + 1)) / 100;
                    translateX = (50 - ((nextDivisor) * (j))) * -1;
                    rotate = "rotate(0deg)";
                    break;
                case "fanOut":
                    rotateVal = rotateNextStart;

                    scale = scale - (100 / (maxCntDivisor + 1)) / 100;
                    translateX = (50 - ((nextDivisor) * (j))) * -1;
                    rotate = "rotate(" + rotateVal + "deg)";

                    rotateNextStart = rotateNextStart + ((nextCnt * 10) / nextCnt);
                    break;
                default:
                    translateX = (50 - ((prevDivisor * 2) * i)) * -1;
                    rotate = "rotate(0deg)";

            }

            z = z - 1;

            const styleStr = "translate(" + translateX + "%, 0%)  scale(" + scale + ") " + rotate;

            if (els[i]) {
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