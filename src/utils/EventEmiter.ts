function off(node: { cb?: any; next?: any; prev?: any; }){
    if(node.next){
        node.next.prev = node.prev
    }else{
        let firstNode = node.prev
        while(firstNode.prev) firstNode = firstNode.prev
        firstNode.lastNode = node.prev
    }
    node.prev.next = node.next;
}

function run(node: { next: any; cb: (arg0: any, arg1: any) => void; once: any[]; }, data: any, event: any){
    node && (node = node.next)
    while(node){
        node.cb(data, event)
        if(node.once){
            if(Array.isArray(node.once))
                node.once.forEach((n: any) => off(n))
            else
                off(node)
        }
        node = node.next
    }
}
declare let cb:any;

class EventEmiter{
    parentEmitter: any;
    runByEvent: any;
    runInAnyEvent: any;
    // Event parentEmitter is provided than every event will be also emitted to parentEmitter
    constructor(parentEmitter: any){
        //if(parentEmitter && !parentEmitter.emit) throw "parentEmitter has to be an EventEmitter";
        this.parentEmitter = parentEmitter;
        //First node in chain is not real node, so nodes with cb always has previous node
        this.runByEvent = {} //{id:id++}
        this.runInAnyEvent = {} //{id:id++}
    }

    addNode(event: any, cb:any, once:any){
        let where;
        if(event){
            if(!this.runByEvent[event]) this.runByEvent[event] = {} //{id:id++};
            where = this.runByEvent[event];
        }else{
            where = this.runInAnyEvent;
        }
        let last = where.lastNode ? where.lastNode : where;
        let node:any = {cb};
        once && (node.once = once);
        node.prev = last;
        // node.id = id++
        last.next = node;
        where.lastNode = node;
        return node;
    }
    // If second parameter is not given first one has to be callback and it will run on any event.
    // If event parameter is an array then it will add cb to all members of array
    on(event: any, cb: any, once:any){
        if(!cb){
            cb = event;
            event = false;
        }
        if(typeof cb != 'function') throw TypeError("Callback parameter has to be a function.");
        if(event === false){
            let node = this.addNode(false, cb, once);
            return () => off(node);
        }else if(typeof event == 'string'){
            let node = this.addNode(event, cb, once);
            return () => off(node);
        }else if(Array.isArray(event)){
            let nodes: any = [];
            once && (once = nodes);
            event.forEach( e => {
                if(typeof e != 'string') return;
                nodes.push(this.addNode(e, cb, once));
            });
            if(nodes.length > 1){
                return () => nodes.forEach((n:any) => off(n));
            }else if(nodes.length == 1){
                return () => off(nodes[0]);
            }else{
                return () => {};
            }
            
        }
        throw TypeError("Event has to be string or array of strings or false/undefined to receive all events.");
    }

    once(event: any, cb: any){
        return this.on(event, cb, true);
    }

    emit(event: string | number, data: any){
        this.parentEmitter && this.parentEmitter.emit(event, data);
        run(this.runInAnyEvent, data, event);
        run(this.runByEvent[event], data, event);
    }
}

export default EventEmiter;