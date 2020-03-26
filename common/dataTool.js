module.exports = {
	inputData: (e, _this) => {
		let {dataset, value} = e.target;
		let id = dataset.id;
		_this[id] = value;
	}
}