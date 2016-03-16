import RealmSwift

class Nested : Object {
	dynamic var key : String = ""
}

import RealmSwift

class Root : Object {
	let nested : List<Nested> = List<Nested>()
}
