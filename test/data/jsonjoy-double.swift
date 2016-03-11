import JSONJoy

struct Root : JSONJoy {
	var double : Double

	init(_ decoder: JSONDecoder) throws {
		self.double = try decoder["double"].getDouble()
	}
}


