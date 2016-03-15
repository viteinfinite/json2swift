import JSONJoy

struct Nested : JSONJoy {
	var uinteger : UInt

	init(_ decoder: JSONDecoder) throws {
		self.uinteger = try decoder["uinteger"].getUnsigned()
	}
}

import JSONJoy

struct Root : JSONJoy {
	var nested : Nested

	init(_ decoder: JSONDecoder) throws {
		self.nested = try Nested(decoder["nested"])
	}
}
