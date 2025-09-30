import Foundation

struct Profile: Codable {
    var religion: String
    var maritalStatus: String
    var profession: String
    var ambitions: String
    var fears: String
    var dreams: String
    
    init(religion: String = "", maritalStatus: String = "", profession: String = "", 
         ambitions: String = "", fears: String = "", dreams: String = "") {
        self.religion = religion
        self.maritalStatus = maritalStatus
        self.profession = profession
        self.ambitions = ambitions
        self.fears = fears
        self.dreams = dreams
    }
}