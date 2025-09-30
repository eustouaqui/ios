import Foundation

struct Constants {
    // API Configuration
    static let apiBaseURL = "http://localhost:3000/api" // Change to your production URL
    static let apiKey = "your-api-key" // Replace with your actual API key
    
    // Subscription Product IDs
    static let weeklySubscriptionID = "weekly_sub"
    static let monthlySubscriptionID = "monthly_sub"
    static let yearlySubscriptionID = "yearly_sub"
    
    // UserDefaults Keys
    static let authTokenKey = "authToken"
    static let userDataKey = "userData"
    static let subscriptionDataKey = "subscriptionData"
    
    // Notification Names
    static let subscriptionStatusChanged = Notification.Name("subscriptionStatusChanged")
    static let userDidLogin = Notification.Name("userDidLogin")
    static let userDidLogout = Notification.Name("userDidLogout")
    
    // App Configuration
    static let appName = "Mind Reprogramming"
    static let appVersion = "1.0.0"
    static let supportEmail = "support@mindreprogramming.com" // Replace with your support email
    
    // Colors
    static let primaryColor = "FF9500" // Orange
    static let secondaryColor = "4A90E2" // Blue
    
    // Trial Configuration
    static let trialDurationDays = 1
}