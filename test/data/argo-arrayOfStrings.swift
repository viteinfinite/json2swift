import Argo

struct Root {
	let array : [String]
}

extension Root : Decodable {
	static func create(array: [String]) -> Root {
		return Root(array: array)
	}

	static func decode(j: JSON) -> Decoded<Root> {
		return self.create
			<^> j <|| "array"
	}
}


