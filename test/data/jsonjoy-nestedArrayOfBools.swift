import JSONJoy

struct Root : JSONJoy {
	var nested : [Bool]

	init(_ decoder: JSONDecoder) throws {
		var nestedArray = [Bool]()
		guard let nestedDecoders = decoder["nested"].array else { throw JSONError.WrongType }
		for decoder in nestedDecoders {
			nestedArray.append(decoder.bool)
		}
		self.nested = nestedArray

	}
}


