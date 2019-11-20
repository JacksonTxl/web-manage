function testTable(isTestTable) {
  return function(target) {
    target.isTestTable = isTestTable
  }
}

@testTable(true)
class MyTestTableClass {}
MyTestTableClass.isTestTable
