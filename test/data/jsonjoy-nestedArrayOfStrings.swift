import JSONJoy

struct Root : JSONJoy {
	var nested : [String]

	init(_ decoder: JSONDecoder) throws {
		var nestedArray = [String]()
		guard let nestedDecoders = decoder["nested"].array else { throw JSONError.WrongType }
		for decoder in nestedDecoders {
			nestedArray.append(try decoder.getString())
		}
		self.nested = nestedArray

	}
}
