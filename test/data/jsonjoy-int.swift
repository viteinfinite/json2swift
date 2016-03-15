import JSONJoy

struct Root : JSONJoy {
	var integer : Int

	init(_ decoder: JSONDecoder) throws {
		self.integer = try decoder["integer"].getInt()
	}
}
