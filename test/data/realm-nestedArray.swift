import RealmSwift

class Nested : Object {
	dynamic var uinteger : Int = 0
}

import RealmSwift

class Root : Object {
	let nested : List<Nested> = List<Nested>()
}
