import Unbox

struct Nested : Unboxable {
	let uinteger : UInt

	init(unboxer: Unboxer) {
		self.uinteger = unboxer.unbox("uinteger")
	}
}

import Unbox

struct Root : Unboxable {
	let nested : Nested

	init(unboxer: Unboxer) {
		self.nested = unboxer.unbox("nested")
	}
}
