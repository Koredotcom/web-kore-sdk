declare class stackedCards {
    config: any;
    defaults: any;
    els: any;
    parent: any | null;
    hostInstance: any;
    constructor(options: any);
    private bind;
    init(): void;
    private draw;
    private setActiveElement;
    private reCalculateTransformsOnClick;
    private detectSwipe;
    private extend;
    private nodelistToArray;
    private loopNodeList;
    private scrolledIn;
    private detectSwipeDir;
}
export default stackedCards;
