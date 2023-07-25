class stackedCards {
    config: any;
    defaults: any = {
        layout: 'slide', // slide, fanOut
        onClick: undefined, // onclick event provided
        transformOrigin: "center", // css transformOrigin
    }
    element: any;
    els: any;
    parent: any | null;

    constructor(options: any) {
        if (options == null) {
            options = {};
        }

        this.draw = this.bind(this.draw, this);
        this.config = this.extend(options, this.defaults);
    }

    private bind(fn: any, me: any) {
        return function () {
            return fn.apply(me, arguments);
        };
    }

    init() {
        // this.element = window.document.documentElement;
        if (document.readyState === "interactive" || document.readyState === "complete") {
            this.draw();
        } else {
            document.addEventListener('DOMContentLoaded', this.draw);
        }
    }

    private draw() {
        var me = this;
        var selector = this.config.selector;

        this.els = document.querySelectorAll(selector + " li");
        var els = this.els;

        this.parent = els[0]?.parentNode;

        var getItemHeight: any = els[0]?.getBoundingClientRect().height;

        /*var liWidth = 0;
        for(var q = 0;q<els.length; q++) {
            liWidth = liWidth + els[q].getBoundingClientRect().width;
        }*/

        if (els && els[0]?.parentNode) {
          els[0].parentNode.style.height = parseInt(getItemHeight) + "px";
        }

        // to get the active element's position, we will have to know if elements are in even/odd count
        var lenAdjust = (els.length % 2 == 0 ? -2 : -1)

        // oneHalf if the centerPoint - things go left and right from here
        var oneHalf = (els.length + lenAdjust) / 2;

        var activeTransform = "translate(" + -50 + "%, 0%)  scale(1)";

        this.detectSwipe();


        Array.prototype.forEach.call(els, function (el) {

            el.style.transformOrigin = me.config.transformOrigin;

            el.addEventListener("click", function () {

                var clickedEl = el;
                var nextCnt = 0;
                var prevCnt = 0;

                do {
                    // While there is a next sibling, loop
                    var next = clickedEl.nextElementSibling;
                    nextCnt = nextCnt + 1;

                } while (clickedEl = clickedEl.nextElementSibling);

                // re-initialize the clickedEl to do the same for prev elements
                clickedEl = el;

                do {
                    // While there is a prev sibling, loop
                    var prev = clickedEl.previousElementSibling;
                    prevCnt = prevCnt + 1;
                } while (clickedEl = clickedEl.previousElementSibling);

                me.reCalculateTransformsOnClick(nextCnt - 1, prevCnt - 1)

                me.loopNodeList(els, function (el: any) {
                    el.classList.remove("active");
                })

                el.classList.add("active");
                el.classList.add(me.config.layout)



                el.style.zIndex = els.length * 5;
                el.style.transform = activeTransform;

                if (me.config.onClick !== undefined) {
                    me.config.onClick(el);
                }

            });
        });

        els[oneHalf]?.click();

    }

    private reCalculateTransformsOnClick(nextCnt: any, prevCnt: any) {

        var z = 10;

        var els = this.nodelistToArray(this.els);

        var scale = 1,
            translateX = 0,
            rotateVal = 0,
            rotate = "";
        var rotateNegStart = 0 // ((75 / els.length) * (oneHalf))*-1;

        var transformArr = [];
        var zIndexArr = [];
        var relArr = [];

        var layout = this.config.layout;

        var maxCntDivisor = Math.max(prevCnt, nextCnt);
        var prevDivisor = 100 / (maxCntDivisor);
        var nextDivisor = 100 / (maxCntDivisor);

        if (prevCnt > nextCnt) {
            scale = 0 + (100 / (prevCnt + 1)) / 100;
        } else {
            scale = 1 - ((prevCnt) * (1 / (nextCnt + 1)));
        }

        var rotatePrevStart = ((prevCnt * 10 / (prevCnt) * prevCnt)) * -1;
        var rotateNextStart = ((nextCnt * 10 / (nextCnt)));

        for (var i = 0; i < prevCnt; i++) {
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

            var styleStr = "translate(" + translateX + "%, 0%)  scale(" + scale + ") " + rotate;

            z = z + 1;

            els[i].style.transform = styleStr;
            els[i].style.zIndex = z;

        }

        // we are going for active element, so make it higher
        z = z - 1;

        var j = 0;

        rotateNegStart = 0;
        scale = 1;
        for (var i: number = prevCnt + 1; i < nextCnt + prevCnt + 1; i++) {
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

            var styleStr = "translate(" + translateX + "%, 0%)  scale(" + scale + ") " + rotate;

            els[i].style.transform = styleStr;
            els[i].style.zIndex = z;
        }



    }

    private detectSwipe() {
        var me = this;
        var regionEl = document.querySelector(me.config.selector);

        me.detectSwipeDir(regionEl, function (swipedir: any) {
            var activeEl: any = document.querySelector(me.config.selector + " li.active");
            if (swipedir == 'left') {
                activeEl.nextElementSibling.click();
            } else if (swipedir == "right") {
                activeEl.previousElementSibling.click();
            }
        })

    }

    private extend(custom: any, defaults: any) {
        var key, value;
        for (key in defaults) {
            value = defaults[key];
            if (custom[key] == null) {
                custom[key] = value;
            }
        }
        return custom;
    }

    private nodelistToArray(nodelist: any) {
        var results: any = [];
        var i, element;
        for (i = 0; i < nodelist.length; i++) {
            element = nodelist[i];
            results.push(element);
        }
        return results;
    }

    private loopNodeList(els: any, callback: any, scope?: any) {
        for (var i = 0; i < els.length; i++) {
            callback.call(scope, els[i])
        }
    }


    private scrolledIn(el: any, offset: any) {
        if (typeof el == 'undefined') return;

        var elemTop = el.getBoundingClientRect().top;
        var elemBottom = el.getBoundingClientRect().bottom;

        var scrolledInEl = (elemTop >= 0) && (elemTop <= window.innerHeight);
        return scrolledInEl;

    }

    private detectSwipeDir(el: any, callback: any) {
        var touchsurface: any = el,
            swipedir: any,
            startX: any,
            startY: any,
            distX: any,
            distY: any,
            threshold: number= 75, //required min distance traveled to be considered swipe
            restraint: number = 100, // maximum distance allowed at the same time in perpendicular direction
            allowedTime: number = 300, // maximum time allowed to travel that distance
            elapsedTime: any,
            startTime: any,
            handleswipe: any = callback || function (swipedir: any) { }

        touchsurface?.addEventListener('touchstart', function (e: any) {
            var touchobj = e.changedTouches[0]
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
            var touchobj = e.changedTouches[0]
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

// var stackedCard = new stackedCards({
//     selector: '.featured',
//     layout: "slide",
//     transformOrigin: "center",
// });
// stackedCard.init();