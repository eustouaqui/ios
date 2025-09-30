import Foundation

struct Goals: Codable {
    var mainGoal: String
    
    init(mainGoal: String = "") {
        self.mainGoal = mainGoal
    }
}