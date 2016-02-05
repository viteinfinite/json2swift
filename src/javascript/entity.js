export default class Entity {
	constructor(name, properties) {
		this.name = name;
		this.properties = properties;
	}

	write(writer) {
		var result = writer.writeEntityHeader(this);
		result += writer.writeOpenDeclaration(this);
		for (var property of this.properties) {
			result += writer.writeProperty(property) + "\n";
		}
		result += writer.writeOpenInit(this);
		result += writer.writeInitBeforeBody(this);
		result += writer.writeInitBody(this);
		result += writer.writeInitAfterBody(this);
		result += writer.writeCloseInit(this);
		result += writer.writeCloseDeclaration(this);
		result += writer.writeEntityFooter(this);
		result += writer.writeSpacer();
		return result;
	}
}
