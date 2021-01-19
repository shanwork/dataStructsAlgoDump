class Queue {
    constructor(initList, maxLength = -100) {
       this.maxLength = maxLength ;
       this.head  = { num: null, next: null} ;
       this.tail = this.head;
       this.length = -1;
       this.initialLength = -1 ;
       if (maxLength !== -100) {
           this.length = maxLength;
        } 
        if (initList.length > 0) {  
            this.head.num = parseInt(initList[0]) ;
            let i = 1;
            let listLength =  initList.length
            if (listLength > maxLength && maxLength > 0) {
                listLength = maxLength ;
            }
            this.length = listLength ;

           this.initialLength = listLength;
            for (i = i ; i < listLength;i++){
                let newNode = {num: initList[i], next: null};
                this.tail.next = newNode ;
                this.tail = this.tail.next ;
            }
        }
    }
    enqueue(newNum, parent = null, childType = null) {
        if (this.head.num === null) {
            this.head.num = newNum;
            alert(this.head.num);
            return;
        }
        if (this.maxLength > 0 && this.length >= this.maxLength) {
            return ;
        }
        const newNode = {num: newNum, next: null};
        this.tail.next = newNode ;
        this.tail = this.tail.next ;
        if (parent !== null && childType !== null) {
            // this.display(parent, childType, newNum);
            this.displayRefresh(parent, childType);
        }
        this.length++;
    }
    dequeue(parent=null, childType=null) {
        if (this.length === 0) {
            return null ;
        }
        let deq = this.head ;
        let ret = deq.num;

        this.head = this.head.next ;
        deq = null ;
        this.length--;
        if (parent !== null && childType !== null) {
            this.displayRefresh(parent, childType);
        }
        return ret ;
    }
    // both display functions are aligned for a table type
    getQueueContent() {
        
        let queueDetail = { list:[], maxLength: this.maxLength };
        // return queueDetail;
        let traversal = this.head ;
        while(traversal !== null) {
            queueDetail.list.push(traversal.num);
            traversal = traversal.next ;
        }        
        return queueDetail ;
    }
    displayContinuous(parent, childType, idPrefix='leaf', zeroth=null, zid=null ) {
        let childId = 0 ;
        console.log(`display Refresh ${this.length}`);
         
        let traversal = this.head ;
        let currentTail = this.length ;
        if (zeroth) {
            const zId = zid? zid:'intro';
            let zerothCell = document.getElementById(zId)
            if (!zerothCell) {
                zerothCell = document.createElement(childType);
                zerothCell.setAttribute("id",zId);
                zerothCell.innerHTML = zeroth.toString();
                parent.appendChild(zerothCell);
            }
        }
        let counter=0;
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
            counter++;
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
    // both display functions are aligned for a table type
    addParent(grandParent, parentId, parentElementType) {
        let parent = document.getElementById(parentId) ;
        if (!parent){
            parent = document.createElement(parentElementType);
            parent.setAttribute('id',parentId);
            grandParent.appendChild(parent);
        }
        return parent;
    }
    displayInterval(grandParent, parentElementType, parent, childType, intervalSpecs, idPrefix='leaf', zeroth=null, zid=null ) {
        // ### COMPONENTIZE
        console.log(`display Refresh ${this.length}`);
        if (intervalSpecs) {
            let intervalChildId = 0;
            if (intervalSpecs.fillDummyRow) {
                let fillerUI = document.getElementById('intervalSpecs') ;
                if (!fillerUI) {
                    fillerUI = document.createElement(parentElementType);
                    fillerUI.setAttribute('id','intervalSpecs');
                    grandParent.appendChild(fillerUI);
                    if (zeroth) {
                        let zerothCell1 = document.createElement(childType);
                        zerothCell1.setAttribute("id","tetetet");
                        zerothCell1.innerHTML = zeroth.toString();
                        fillerUI.appendChild(zerothCell1);
                    }
                    for (let fillerCellIndex = 0; fillerCellIndex < intervalSpecs.interval; fillerCellIndex++) {
                        let leafFiller = document.createElement(childType);
                        leafFiller.setAttribute("id",`fillerCell${fillerCellIndex}`);
                        leafFiller.innerHTML = intervalSpecs.dummyRowElement ;
                        fillerUI.appendChild(leafFiller);
                    }
                }
            }
            let intervalCellCount = 0, intervalRowCount = 0 ;
            let intervalRow = this.addParent(grandParent, `intervalRow${intervalRowCount}`,parentElementType) ;/* document.createElement(parentElementType);
            intervalRow.setAttribute('id',`intervalRow${intervalRowCount}`);
            grandParent.appendChild(intervalRow);
            */
            if (zeroth) {
                let zerothCell2 = document.createElement(childType);
                zerothCell2.setAttribute("id",`tetetet${intervalCellCount}`);
                zerothCell2.innerHTML = ' '
                intervalRow.appendChild(zerothCell2);
            }
            let traversal = this.head ;
            let currentTail = this.length ;
            let cellIndex = 0 ;
            while (traversal !== null) {
                let bulkLeaf = document.getElementById(`bulk${idPrefix}${intervalChildId}`);
                if (!bulkLeaf) {
                    // alert(`bulk${idPrefix}${intervalChildId}`);
                    bulkLeaf = document.createElement(childType);
                    bulkLeaf.setAttribute("id",`bulk${idPrefix}${intervalChildId}`);
                    bulkLeaf.value = '___'
                    intervalRow.appendChild(bulkLeaf);
                }
                bulkLeaf.innerHTML = traversal.num.toString(); // `${traversal.num.toString()}, ${this.length}` ;
                traversal = traversal.next;
                cellIndex++ ;
                // alert(traversal.num);
                intervalChildId++;
                if (intervalChildId % intervalSpecs.interval === 0) {
                    intervalRowCount++ ;
                    intervalRow = this.addParent(grandParent, `intervalRow${intervalRowCount}`,parentElementType) ;
                    cellIndex = 0 ;
                    /*document.createElement(parentElementType);
                    intervalRow.setAttribute('id',`intervalRow${intervalRowCount}`);
                    grandParent.appendChild(intervalRow);
                    */
                   if (zeroth) {
                        let zerothCell2 = document.createElement(childType);
                        zerothCell2.setAttribute("id",`tetetet${intervalCellCount}`);
                        zerothCell2.innerHTML = ' '
                        intervalRow.appendChild(zerothCell2);
                    }
                    
                }
            }
            if (cellIndex > 0 && cellIndex < intervalSpecs.interval) {
                while(cellIndex < intervalSpecs.interval) {
                    let bulkLeafBlank = document.getElementById(`bulk${idPrefix}${intervalChildId}`)
                    if (!bulkLeafBlank) {
                        bulkLeafBlank = document.createElement(childType);
                        bulkLeafBlank.setAttribute("id",`bulk${idPrefix}${intervalChildId}`);
                        intervalRow.appendChild(bulkLeafBlank);
                    }
                    bulkLeafBlank.innerHTML = '-' ;
                    cellIndex++;
                    intervalChildId++ ;
                }
            }
            if (this.initialLength > this.length) {
                const extraLength = this.initialLength - this.length ;
                const numExtraRows = Math.round(extraLength / intervalSpecs.interval) ;
                // alert(`${numExtraRows}, ${extraLength}`);
                for (let k = 0 ; k < numExtraRows; k++) {
                    const extraRow = document.getElementById(`intervalRow${intervalRowCount}`);
                    if (extraRow) {
                        // document.removeChild(extraRow);
                        intervalRowCount++ ;
                    }
                }
            }
            return ;
        }
        let childId = 0 ;
        
        /*
          fillDummyRow: true,
            dummyRowElement:' - ',
            dummyRowTitle: 'Bulk Queue:',
            interval: this.subQueueLength,
        let bulkUI = document.getElementById('bulkList') ;
        if (!bulkUI) {
            console.log(parentElementType);
            bulkUI = document.createElement(parentElementType);
            bulkUI.setAttribute('id','bulkList');
   
            grandParentElement.appendChild(bulkUI);
        }
        */ 
        let traversal = this.head ;
        let currentTail = this.length ;
        if (zeroth) {
            const zId = zid? zid:'intro';
            let zerothCell = document.getElementById(zId)
            if (!zerothCell) {
                zerothCell = document.createElement(childType);
                zerothCell.setAttribute("id",zId);
                zerothCell.innerHTML = zeroth.toString();
                parent.appendChild(zerothCell);
            }
        }
        let counter=0;
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
            counter++;
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
}