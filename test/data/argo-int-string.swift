import Argo

struct Root {
	let integer : Int
	let string : String
}

extension Root : Decodable {
	static func create(integer: Int)(string: String) -> Root {
		return Root(integer: integer, string: string)
	}

	static func decode(j: JSON) -> Decoded<Root> {
		return self.create
			<^> j <| "integer"
			<*> j <| "string"
	}
}


