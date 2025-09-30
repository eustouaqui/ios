import Foundation
import StoreKit

struct Subscription: Codable {
    let productID: String
    let expirationDate: Date?
    let isTrial: Bool
    let platform: String // "apple" or "google"
    let validatedAt: Date
    
    init(productID: String, expirationDate: Date?, isTrial: Bool, platform: String, validatedAt: Date) {
        self.productID = productID
        self.expirationDate = expirationDate
        self.isTrial = isTrial
        self.platform = platform
        self.validatedAt = validatedAt
    }
    
    var isActive: Bool {
        if platform == "apple" {
            if let expiryDate = expirationDate {
                return expiryDate > Date()
            }
            return true // Active subscription without expiration
        } else if platform == "google" {
            if let expiryTime = expirationDate {
                return expiryTime > Date()
            }
        }
        return false
    }
}