import Unbox

class Nested : NSObject, Unboxable {
	let uinteger : UInt

	init(unboxer: Unboxer) {
		self.uinteger = unboxer.unbox("uinteger")
		super.init()
	}
}


import Unbox

class Root : NSObject, Unboxable {
	let nested : Nested

	init(unboxer: Unboxer) {
		self.nested = unboxer.unbox("nested")
		super.init()
	}
}


