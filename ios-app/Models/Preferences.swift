import Foundation

struct Preferences: Codable {
    var voice: String
    var language: String
    
    init(voice: String = "male", language: String = "portuguese") {
        self.voice = voice
        self.language = language
    }
}