class ZipQProto1 {
    constructor(zipQueueInstance, tableRootElement) {
        this.zipQueue = JSON.parse(JSON.stringify(zipQueueInstance)) ;
        this.QData = this.zipQueue.getZipQueueContent() ;
        this.tableRootElement = tableRootElement ;
        this.windowInterval = -1 ;

    }
    showDumpQState() {
        if (this.tableRootElement) {
            populateMain(this.QData) ;
            // populateSubQueues(QData);
        }
    }
    populateMain(QData) {
        if(QData.mainQueueElements.list.length === 0) {
            if (this.windowInterval !== -1 ) {
                window.clearInterval(k);
                alert('queue is empty');
            }
        }

        let zipQueueRow = document.getElementById('zipQRow');
        if (!zipQueueRow) {
            zipQueueRow = document.createElement('tr');
            zipQueueRow.setAttribute('id','zipQRow');
            
            let zipQueueRow = document.getElementById('zipQRow');
            if (!zipQueueRow) {
                zipQueueRow = document.createElement('tr');
                zipQueueRow.setAttribute('id','zipQRow');
                this.tableRootElement.appendChild(zipQueueRow);
            }
            if (QData.mainQueueElements && QData.mainQueueElements.list) {
                populateCellAndList(zipQueueRow, `zipQMainCell`, `zipQMainCellList`, QData.mainQueueElements.list, QData.mainQueueLength) ;
                for (let i = 0 ; i < QData.mainQueueLength; i++) {
                    let mainQueueULCell = document.getElementById(`zipQMainCellListItem${i}`);
                    if (mainQueueULCell) {
                        if (i === QData.mainQueueLength - 1 ) {
                            mainQueueULCell.setAttribute('class',`nextInMain`);
                        } else {
                            mainQueueULCell.setAttribute('class','zipMainClass');
                        }
                    }
                }
                return ;
            }
        }
        if (QData.mainQueueElements && QData.mainQueueElements.list) {
            populateCellAndList(zipQueueRow, `zipQMainCell`, `zipQMainCellList`, QData.mainQueueElements.list, QData.mainQueueLength) ;
            for (let i = 0 ; i < QData.mainQueueLength; i++) {
                let mainQueueULCell = document.getElementById(`zipQMainCellListItem${i}`);
                if (mainQueueULCell) {
                    if (i === QData.mainQueueLength - 1 ) {
                        mainQueueULCell.setAttribute('class',`nextInMain`);
                    } else {
                        mainQueueULCell.setAttribute('class','zipMainClass');
                    }
                }
            }
            return ;
        }
    }
    populateSubQueues(QData) {

    }
    manualProcessZipQueue() {
       
    }
    autoProcessZipQueue(interval = 0, aiFunction = null) {
        if (interval  > 0) {
            this.windowInterval = 
                    window.setInterval(this.manualProcessZipQueue, interval);
        }
    }
}