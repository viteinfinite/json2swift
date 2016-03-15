import JSONJoy

struct Root : JSONJoy {
	var nested : [UInt]

	init(_ decoder: JSONDecoder) throws {
		var nestedArray = [UInt]()
		guard let nestedDecoders = decoder["nested"].array else { throw JSONError.WrongType }
		for decoder in nestedDecoders {
			nestedArray.append(try decoder.getUnsigned())
		}
		self.nested = nestedArray

	}
}
