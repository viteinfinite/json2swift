import RealmSwift

class Nested : Object {
	dynamic var uinteger : Int = 0
}

import RealmSwift

class Root : Object {
	dynamic var nested : Nested? = nil
}
