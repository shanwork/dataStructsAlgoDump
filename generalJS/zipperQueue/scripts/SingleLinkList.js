class SingleLinkList {
    constructor(initVal = null) {
        if (initVal === null) {
            this.head  = { name: initVal.toString(), next: null} ;
            this.tail = this.head;
            this.length = 1;
        } else {
            this.head =  null ;
            this.tail = null ;
            this.length = 0 ;
        }
    }
    push(newVal) {
        if (this.head === null) {
            this.head = { name: newVal, next: null };
            this.tail = this.head ;
            this.length  = 1 ;
        } else {
            let indexer = this.head ;
            while (indexer.next !== null){
                indexer = indexer.next ;
            }
            const newNode = {name: newVal, next: null};
            this.tail.next = newNode ;
            this.tail = this.tail.next ;
            // alert(newVal);
            //indexer.next = newNode ;
            // this.tail = newNode ;
            this.length += 1 ;
        }
        console.log(`${this.stringedOutput()}`);
    }
    pop() {
        let retVal = '';
        if (this.head === null || !this.head || this.head === this.tail) {
            retVal = this.head  ? this.head.name : 'empty';
            this.head = null ;
            this.tail = null ;
            this.length = 0;
        } else {
            let lastExist = this.head;
            let indexer = this.head.next ;
            while (indexer.next !== null) {
                lastExist = indexer ;
                indexer = indexer.next ;
            }
            retVal = indexer.name;
            this.tail = lastExist;
            this.tail.next = null ;
            this.length -= 1;
        }
        return retVal ;
    }
    unshift(newVal) {
        if (this.head === null) {
            this.head = { name: newVal, next: null };
            this.tail = this.head ;
            this.length = 1 ;
        } else {
            const newNode = {name: newVal, next: this.head};
            this.head = newNode ;
            // alert(newVal);
            //indexer.next = newNode ;
            // this.tail = newNode ;
            this.length +=1 ;
        }
        console.log(`${this.stringedOutput()}`);
    }
    shift() {
        let retVal = '';
        if (this.head === null || !this.head || this.head === this.tail) {
            retVal = this.head  ? this.head.name : 'empty';
            this.head = null ;
            this.tail = null ;
            this.length = 0;
        } else {
           const singleNode = this.head.next === null ? true : false ;
           retVal = this.head.name ;
           if (singleNode) {
            this.head = null ;
            this.tail = null ;
            this.length = 0;
           } else {
               this.head = this.head.next ;
               this.length -= 1;
           }
        }
        return retVal ;
    }
    searchReplace(index, newVal = '') {
        // assume index is 1 based
        if(index < 1 || index > this.length) {
            return 'out of bounds' ;
        } 
        let extractedVal = '';
        if (index === 1) { 
            extractedVal = this.head.name ;
            if (newVal !== '') {
                this.head.name = newVal ;
                extractedVal = `${extractedVal}, new value ${this.head.name}` ;
            }
            return extractedVal ;
        }
        if (index === this.length) { 
            extractedVal = this.tail.name ;
            if (newVal !== '') {
                this.tail.name  = newVal ;
                extractedVal = `${extractedVal}, new value ${this.tail.name}` ;
            }
            return extractedVal ;
        }
        let node = this.head.next ;
        const zIndex = index - 1 ;
        for (let i = 1 ; i < zIndex ; i++) {
            node = node.next ;
        }
        extractedVal = node.name ;
        if (newVal !== '') {
            node.name = newVal ;
            extractedVal = `${extractedVal}, new value ${node.name}` ;
        }
        return extractedVal ;
    }
    delete(index) {
        // assume index is 1 based
        if(index < 1 || index > this.length || this.length === 0) {
            return 'out of bounds' ;
        } 
        let extractedVal = '';
        if (index === 1) { 
            extractedVal =  this.shift();
            return extractedVal ;
        }
        if (index === this.length) { 
            extractedVal = this.pop();
            return extractedVal ;
        }
        let node = this.head.next ;
        let nodePrev = this.head ;
        const zIndex = index - 1 ;
        for (let i = 1 ; i < zIndex ; i++) {
            nodePrev = node ;
            node = node.next ;
        }
        extractedVal = node.name ;
        nodePrev.next = node.next ;
        node = null ;
        return extractedVal ;
    }
    insert(index, newVal) {
        // assume index is 1 based
        if(index < 1 || index > (this.length +1)) {
            return 'out of bounds' ;
        } 
        let extractedVal = '';
        if (index === 1) { 
            this.unshift(newVal);
            return ;
        }
        if (index === (this.length + 1)) { 
           this.push(newVal) ;
           return ;
        }
        let node = this.head.next ;
        let nodePrev = this.head ;
        const zIndex = index - 1 ;
        for (let i = 1 ; i < zIndex ; i++) {
            nodePrev = node ;
            node = node.next ;
        }
        const newNode = { name: newVal, next: node }
        nodePrev.next = newNode ;
    }
    reverse() {
        // assume index is 1 based
        if(this.length < 2) {
            return 'zero or one node.. reverse not applicable' ;
        }
        
        for (let i = 1, j = this.length; i < j; i += 1, j -= 1) {
            const fNodeVal = this.searchReplace(i);
            const rNodeVal = this.searchReplace(j);
            const tt = this.searchReplace(i, rNodeVal);
            const tt2 = this.searchReplace(j, fNodeVal);
            console.log(`${this.stringedOutput()}`)
        }
    }
    stringedOutput(pop = false, returnVal = null ) {
        if (pop && this.head === this.tail) {
            returnVal = { poppedVal: this.head.name };
            this.head = null ;
            this.tail = null;
            this.length = 0;
            return 'Empty List';
        }
        if(this.head === null) {
            return 'Empty List';
        } 
        let stringedRep =    `List: ${this.head.name} =>`;
        let indexer = this.head.next ;
        while (indexer !== null){
            if (pop === true && indexer.next === this.tail){
                returnVal = { poppedVal: this.tail.name };
                this.tail = null ;
                this.tail = this.indexer ;
                break ;
            }
            stringedRep = `${stringedRep} ${indexer.name} =>`;
            indexer = indexer.next ;
        }
        stringedRep = `${stringedRep} END.`;
        return stringedRep ;
    }
}