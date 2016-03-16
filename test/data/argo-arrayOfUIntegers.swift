import Argo

struct Root {
	let array : [Int]
}

extension Root : Decodable {
	static func create(array: [Int]) -> Root {
		return Root(array: array)
	}

	static func decode(j: JSON) -> Decoded<Root> {
		return self.create
			<^> j <|| "array"
	}
}
