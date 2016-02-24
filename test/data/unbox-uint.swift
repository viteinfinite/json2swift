import Unbox

struct Root : Unboxable {
	let uinteger : UInt

	init(unboxer: Unboxer) {
		self.uinteger = unboxer.unbox("uinteger")
	}
}


