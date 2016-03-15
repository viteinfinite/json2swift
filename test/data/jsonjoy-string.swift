import JSONJoy

struct Root : JSONJoy {
	var string : String

	init(_ decoder: JSONDecoder) throws {
		self.string = try decoder["string"].getString()
	}
}
