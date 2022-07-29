import BaseSTT from "../BaseSTT";
declare class GoogleSTT extends BaseSTT {
    name: string;
    config: {};
    constructor(mainconfig: any);
    onHostCreate(): void;
    onInit(): void;
    testMethod(): void;
}
export default GoogleSTT;
