import Argo

struct Root {
	let uinteger : Int
}

extension Root : Decodable {
	static func create(uinteger: Int) -> Root {
		return Root(uinteger: uinteger)
	}

	static func decode(j: JSON) -> Decoded<Root> {
		return self.create
			<^> j <| "uinteger"
	}
}
