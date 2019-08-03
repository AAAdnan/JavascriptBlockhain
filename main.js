var sha256 = require('js-sha256');

class Block{
    constructor(index,data, prevHash) {
        this.index = index;
            this.timestamp = Math.floor(Date.now() / 1000);
        this.data = data;
        this.prevHash = prevHash;
    }

    getHash () {
        return sha256(JSON.stringify(this.data + this.prevHash + this.index + this.timestamp));
    }
}

class BlockChain {
    constructor() {
        this.chain = [];
    }

    addBlock(data) {
        let index = this.chain.length;
        let prevHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : 0;
        let block = new Block(index, data, prevHash);

        this.chain.push(block);
    }

    chainIsValid () {
        for (var i=0; i<this.chain.length; i++) {
            if(this.chain[i].hash !== this.chain[i].getHash()) {
                return false;
            }
            if(i>0 && this.chain[i].prevHash !==this.chain[i-1].hash) {
                return false;
            }
        }

        return true;
    }
}

const CILCoin = new BlockChain();

CILCoin.addBlock({sender: "Bruce wayne", receiver: "Tony stark", amount: 100});

CILCoin.addBlock({sender: "Harrison wells", receiver: "Han solo", amount: 50});

CILCoin.addBlock({sender: "Tony stark", receiver: "Ned stark", amount: 75});

CILCoin.addBlock({sender: "Adnan", receiver: "Leon", amount: 75});

 
console.log(JSON.stringify(CILCoin, null, 4));

console.log('Validity: ', CILCoin.chainIsValid());