class ZipQueue {
    constructor(initList, maxSubQueues, mainQMaxLength, subQueueLength) {
        this.nextSubQueueIndex = 0 ;
        this.maxSubQueues = parseInt(maxSubQueues) ;
        this.mainQMaxLength = parseInt(mainQMaxLength) ;
        this.subQueueLength = parseInt(subQueueLength) ;
        this.mainQueue = new Queue(initList.slice(0,mainQMaxLength), mainQMaxLength );
        let startIndex = mainQMaxLength ;
        this.totalQueueLength = initList.length ;
        this.queueCapacity = this.mainQMaxLength + this.maxSubQueues * this.subQueueLength ;
        this.currentLength = initList.length ;
        if (initList.length > this.mainQMaxLength) {
            this.subQueues = [];
            this.subQueuesUsed  = 1 ;
            while(this.subQueuesUsed <= this.maxSubQueues) { // startIndex <= initList.length) {
                this.subQueues.push(new Queue(initList.slice(startIndex,startIndex + subQueueLength), subQueueLength) );
                this.subQueuesUsed++ ;
                startIndex += subQueueLength ;
                if (startIndex >= initList.length) {
                    break;
                }
            }
        }
        if (startIndex < initList.length){
            this.bulk = new Queue(initList.slice(startIndex));
        }
    }
    addQueue(grandParentElement, parentElementType, elementType, singleElement = null, multiList = null, refresh = false ) {
        if (singleElement !== null) {
            if (this.totalQueueLength > this.queueCapacity) {
                this.bulk.enqueue(singleElement);
            } else {
                for (subQ in this.subQueues) {
                    if (this.subQ.length < this.subQueueLength) {

                    }
                }
            }
        }
        this.display(grandParentElement, parentElementType, elementType);
    }
    processQueue(grandParentElement, parentElementType, elementType) {
        if (this.totalQueueLength <= 0) {
            return ;
        }
        this.totalQueueLength-- ;
        let mango = this.mainQueue.dequeue();
        if (this.subQueues[this.nextSubQueueIndex].length > 0){
            let tango = this.subQueues[this.nextSubQueueIndex].dequeue() ;
            this.mainQueue.enqueue(tango);
            if(this.bulk) {
                let mocambo = this.bulk.dequeue();
                if(mocambo) {
                    this.subQueues[this.nextSubQueueIndex].enqueue(mocambo);  
                }
            }
        }
        this.nextSubQueueIndex++ ;
        if (this.nextSubQueueIndex >= this.subQueues.length) {
            this.nextSubQueueIndex = 0;
        }
        this.display(grandParentElement, parentElementType, elementType);
    }
    getZipQueueContent() {
        const zipQDetail = {
            mainQueueLength: this.mainQMaxLength,
            numberSubQueues: this.maxSubQueues,
            mainQueueElements: this.mainQueue.getQueueContent(),
            subQueueLength: this.subQueueLength,
            subQueueElements: this.subQueueContent(),
            bulkQContent: this.bulk ? this.bulk.getQueueContent() : null
        }
        return zipQDetail ;
    }
    subQueueContent() {
        let subQs = [] ;
        for (let subQ of this.subQueues) {
            subQs.push(subQ.getQueueContent());
        }
        return subQs ;
    }
    
    // currently oriented to table
    display(grandParentElement, 
            parentElementType, elementType, 
            parentElementPrefix='Branch', // mainBranch, subBranch1, subBranch2...
            elementPrefix='leaf'  ) { // <parentName>leafindex
    
     // main branch, then subbranches - componentize once working
     let mainUI = document.getElementById(`main${parentElementPrefix}`) ;
     if (!mainUI) {
         console.log(parentElementType);
         mainUI = document.createElement(parentElementType);
         mainUI.setAttribute('id',`main${parentElementPrefix}`)

         grandParentElement.appendChild(mainUI);
     }
     this.mainQueue.displayContinuous(mainUI,elementType,`main${parentElementPrefix}leaf`, "Main Queue:", 'mq');
     for (let m = 0 ; m < this.subQueues.length; m++){
        
        let branchUI = document.getElementById(`sub${parentElementPrefix}${m}`) ;
        if (!branchUI) {
            console.log(parentElementType);
            branchUI = document.createElement(parentElementType);
            branchUI.setAttribute('id',`sub${parentElementPrefix}${m}`);
   
            grandParentElement.appendChild(branchUI);
        }
        this.subQueues[m].displayContinuous(branchUI,elementType,`sub${parentElementPrefix}${m}leaf`, "Sub Queue:",`sq${m}`);
     
     }
     if (this.bulk && this.bulk.length > 0) {
        const intervalSpecs = {  // seek a more appropriate name
            fillDummyRow: true,
            dummyRowElement:' - ',
            dummyRowTitle: 'Bulk Queue:',
            interval: this.subQueueLength,

        }
        let bulkUI = document.getElementById('bulkList') ;
        if (!bulkUI) {
            console.log(parentElementType);
            bulkUI = document.createElement(parentElementType);
            bulkUI.setAttribute('id','bulkList');
   
            grandParentElement.appendChild(bulkUI);
        }
        this.bulk.displayInterval(grandParentElement, parentElementType, bulkUI,elementType, intervalSpecs, ' ', "Bulk =>");
     }
        /*
        displayContinuous(parent, childType, idPrefix='leaf' ) {
        let childId = 0 ;

        let traversal = this.head ;
        let currentTail = this.length ;
        while(traversal !== null) {
            let leaf = document.getElementById(`${idPrefix}${childId}`)
            if (!leaf) {
                leaf = document.createElement(childType);
                leaf.setAttribute("id",`${idPrefix}${childId}`);
                leaf.value = '___'
                parent.appendChild(leaf);
            }
            // alert(traversal.num);
            // leaf.innerHTML = '_'
            //let newContent = document.createTextNode(traversal.num.toString());
            leaf.innerHTML = traversal.num.toString() ; // appendChild(newContent);
            // leaf.value = traversal.num.toString();
            traversal = traversal.next;
            childId++;
        }        
        while (currentTail < this.maxLength) {
            let leafBlank = document.getElementById(`${idPrefix}${childId}`)
            if (!leafBlank) {
                leafBlank = document.createElement(childType);
                leafBlank.setAttribute("id",`${idPrefix}${childId}`);
                parent.appendChild(leafBlank);
            }
            leafBlank.innerHTML = '-' ;
            currentTail++;
            childId++ ;
        }
      }
        */
    }
}