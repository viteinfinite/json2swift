import JSONJoy

struct Root : JSONJoy {
	var nested : [Double]

	init(_ decoder: JSONDecoder) throws {
		var nestedArray = [Double]()
		guard let nestedDecoders = decoder["nested"].array else { throw JSONError.WrongType }
		for decoder in nestedDecoders {
			nestedArray.append(try decoder.getDouble())
		}
		self.nested = nestedArray

	}
}
