export default class Property {
	constructor(name, value) {
		this.name = name;
		this.type = Property.resolveType(name, value);
		this.isArray = Array.isArray(value);
		this.isOptional = value == null;
	}

	static resolveType(name, value) {
		if (value === null) {
			return "Any";
		} else if (typeof(value) === "string") {
			return "String";
		} else if (typeof(value) === "boolean") {
			return "Bool";
		} else if (typeof(value) === "number") {
			if (String(value).indexOf(".") != -1) {
				return "Double";
			}
			if (value < 0) {
				return "Int";
			}
			return "UInt";
		} else if (typeof(value) === "object") {
			if (Array.isArray(value)) {
				if (value.length > 0) {
					return Property.resolveType(name, value[0]);
				} else {
					return name.capitalizeFirstLetter();
				}
			} else {
				return name.capitalizeFirstLetter();
			}
		}
	}
}