var crypto = require('crypto');

module.exports = class Merkle {
	#tree = [];
	#nodesCount = 0;
	#depth = 0;

	constructor(leafArray, algo = 'sha256') {
		this.algo = algo;
		this.supportedAlgorithms = {
			md5: "^[0-9a-f]{32}$",
			sha1: "^[0-9a-f]{40}$",
			ripemd160: "^[0-9a-f]{40}$",
			sha256: "^[0-9a-f]{64}$",
			sha512: "^[0-9a-f]{128}$",
			whirlpool: "^[0-9a-f]{128}$",
		}
		if (!(this.algo in this.supportedAlgorithms))
			throw new Error(`Unsupported hash algorithm '${this.algo}'`);

		this.leafArray = [];
		this.#generate(leafArray);
	}

	#processLeaf(leaf) {
		if (!this.#checkIfLeafIsHash(leaf)) {
			this.leafArray.push(this.#calculateHash(leaf));
		} else {
			this.leafArray.push(Buffer.from(leaf, 'hex'));
		}
		return;
	}

	#checkIfLeafIsHash(data) {
		return RegExp(this.supportedAlgorithms[this.algo]).test(data);
	}

	#generate(leafArray) {
		if (!Array.isArray(leafArray)) return;
		leafArray.forEach((leaf) => {
			this.#processLeaf(leaf);
		});
		this.#compute();
	}

	getDepth(leavesCount = this.leafArray.length) {
		if (!this.#depth) {
			var depth = 0;
			while (Math.pow(2, depth) < leavesCount) depth++;
			this.#depth = depth;
		}
		return this.#depth;
	}

	getLevels() {
		return this.#depth + 1;
	}

	#compute() {
		var depth = this.getDepth();
		for (var i = 0; i < depth; i++) this.#tree.push([]);
		this.#tree[depth] = this.leafArray;
		for (var j = depth - 1; j >= 0; j--) {
			this.#tree[j] = this.#createNodes(this.#tree[j + 1]);
			this.#nodesCount += this.#tree[j].length;
		}
	}

	#createNodes(leaves) {
		var remainder = leaves.length % 2;
		var nodes = [];
		var hash;
		for (var i = 0; i < leaves.length - 1; i = i + 2) {
			hash = this.#calculateHash(
				Buffer.concat([
					leaves[i],
					leaves[i + 1]
				]));
			nodes[i / 2] = hash;
		}
		if (remainder === 1) {
			nodes[((leaves.length - remainder) / 2)] = leaves[leaves.length - 1];
		}
		return nodes;
	}

	#calculateHash(data, algo = this.algo) {
		return crypto.createHash(algo).update(data).digest();
	}

	getFullTree(format) {
		if (!format) return this.#tree;
		var ntree = [];
		for (let i = 0; i < this.#tree.length; i++) {
			ntree.push([]);
			for (let j = 0; j < this.#tree[i].length; j++) {
				ntree[i][j] = this.#tree[i][j].toString(format);
			}
		}
		return ntree;
	}

	getRoot(format) {
		if (!format)
			return this.#tree[0][0];
		return this.#tree[0][0].toString(format);
	}

	getNodes() {
		return this.#nodesCount;
	}

	getLevel(index, format) {
		if (index > this.#depth) return []
		if (!format) return this.#tree[index];
		var ntree = [];
		for (let j = 0; j < this.#tree[index].length; j++) {
			ntree.push(this.#tree[index][j].toString(format));
		}
		return ntree;
	}
}
