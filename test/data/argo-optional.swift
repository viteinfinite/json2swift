import Argo

struct Root {
	let optional : Any?
}

extension Root : Decodable {
	static func create(optional: Any?) -> Root {
		return Root(optional: optional)
	}

	static func decode(j: JSON) -> Decoded<Root> {
		return self.create
			<^> j <|? "optional"
	}
}


