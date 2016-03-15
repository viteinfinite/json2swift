import JSONJoy

struct Root : JSONJoy {
	var boolean : Bool

	init(_ decoder: JSONDecoder) throws {
		self.boolean = try decoder["boolean"].bool
	}
}
