declare class stackedCards {
    config: any;
    defaults: any;
    element: any;
    els: any;
    parent: any | null;
    constructor(options: any);
    private bind;
    init(): void;
    private draw;
    private reCalculateTransformsOnClick;
    private detectSwipe;
    private extend;
    private nodelistToArray;
    private loopNodeList;
    private scrolledIn;
    private detectSwipeDir;
}
export default stackedCards;
