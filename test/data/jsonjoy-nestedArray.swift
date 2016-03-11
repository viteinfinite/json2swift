import JSONJoy

struct Nested : JSONJoy {
	var uinteger : UInt

	init(_ decoder: JSONDecoder) throws {
		self.uinteger = try decoder["uinteger"].getUnsigned()
	}
}


import JSONJoy

struct Root : JSONJoy {
	var nested : [Nested]

	init(_ decoder: JSONDecoder) throws {
		var nestedArray = [Nested]()
		guard let nestedDecoders = decoder["nested"].array else { throw JSONError.WrongType }
		for decoder in nestedDecoders {
			nestedArray.append(try Nested(decoder))
		}
		self.nested = nestedArray

	}
}


