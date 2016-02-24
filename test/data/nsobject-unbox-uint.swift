import Unbox

class Root : NSObject, Unboxable {
	let uinteger : UInt

	init(unboxer: Unboxer) {
		self.uinteger = unboxer.unbox("uinteger")
		super.init()
	}
}


