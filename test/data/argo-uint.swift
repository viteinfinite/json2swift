import Argo

struct Root {
	let uinteger : UInt
}

extension Root : Decodable {
	static func create(uinteger: UInt) -> Root {
		return Root(uinteger: uinteger)
	}

	static func decode(j: JSON) -> Decoded<Root> {
		return self.create
			<^> j <| "uinteger"
	}
}
