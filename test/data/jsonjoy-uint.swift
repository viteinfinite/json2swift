import JSONJoy

struct Root : JSONJoy {
	var uinteger : UInt

	init(_ decoder: JSONDecoder) throws {
		self.uinteger = try decoder["uinteger"].getUnsigned()
	}
}


