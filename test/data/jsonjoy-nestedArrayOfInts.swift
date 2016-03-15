import JSONJoy

struct Root : JSONJoy {
	var nested : [Int]

	init(_ decoder: JSONDecoder) throws {
		var nestedArray = [Int]()
		guard let nestedDecoders = decoder["nested"].array else { throw JSONError.WrongType }
		for decoder in nestedDecoders {
			nestedArray.append(try decoder.getInt())
		}
		self.nested = nestedArray

	}
}
