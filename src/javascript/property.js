export default class Property {
	constructor(name, value) {
		this.name = name;
		this.type = this.resolveType(value);
	}

	resolveType(value) {
		if (typeof(value) == "string") {
			return "String";
		}
		else if (typeof(value) == "number") {
			if (String(value).indexOf(".") != -1) {
				return "Float";
			}
			if (value < 0) {
				return "Int";
			}
			return "UInt";
		}
		else if (typeof(value) == "object") {
			if (Array.isArray(value)) {
				if (value.length > 0) {
					return "[" + this.resolveType(value[0]) + "]";
				} else {
					return "[" + this.name.capitalizeFirstLetter() + "]";
				}
			} else {
				return this.name.capitalizeFirstLetter();
			}
		}
	}
}