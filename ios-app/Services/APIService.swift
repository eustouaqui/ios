import Foundation
import Combine

class APIService: ObservableObject {
    static let shared = APIService()
    
    private init() {}
    
    private let baseURL = "http://localhost:3000/api" // Change to your production URL
    private let session = URLSession.shared
    
    // MARK: - Authentication
    
    func register(email: String, password: String, name: String) async throws -> AuthResponse {
        let endpoint = "\(baseURL)/register"
        let body = [
            "email": email,
            "password": password,
            "name": name
        ]
        
        return try await makeRequest(to: endpoint, method: "POST", body: body)
    }
    
    func login(email: String, password: String) async throws -> AuthResponse {
        let endpoint = "\(baseURL)/login"
        let body = [
            "email": email,
            "password": password
        ]
        
        return try await makeRequest(to: endpoint, method: "POST", body: body)
    }
    
    // MARK: - Profile
    
    func saveProfile(_ profile: Profile, token: String) async throws -> ProfileResponse {
        let endpoint = "\(baseURL)/save-profile"
        let headers = ["Authorization": "Bearer \(token)"]
        
        return try await makeRequest(to: endpoint, method: "POST", body: profile, headers: headers)
    }
    
    // MARK: - Goals
    
    func saveGoals(_ goals: Goals, token: String) async throws -> GoalsResponse {
        let endpoint = "\(baseURL)/save-goals"
        let headers = ["Authorization": "Bearer \(token)"]
        
        return try await makeRequest(to: endpoint, method: "POST", body: goals, headers: headers)
    }
    
    // MARK: - Preferences
    
    func savePreferences(_ preferences: Preferences, token: String) async throws -> PreferencesResponse {
        let endpoint = "\(baseURL)/save-preferences"
        let headers = ["Authorization": "Bearer \(token)"]
        
        return try await makeRequest(to: endpoint, method: "POST", body: preferences, headers: headers)
    }
    
    // MARK: - Affirmations
    
    func generateAffirmation(token: String) async throws -> AffirmationResponse {
        let endpoint = "\(baseURL)/generate-affirmation"
        let headers = ["Authorization": "Bearer \(token)"]
        
        return try await makeRequest(to: endpoint, method: "POST", headers: headers)
    }
    
    // MARK: - Subscriptions
    
    func validateAppleReceipt(receiptData: String, password: String, token: String) async throws -> SubscriptionValidationResponse {
        let endpoint = "\(baseURL)/validate-apple-receipt"
        let body = [
            "receiptData": receiptData,
            "password": password
        ]
        let headers = ["Authorization": "Bearer \(token)"]
        
        return try await makeRequest(to: endpoint, method: "POST", body: body, headers: headers)
    }
    
    func checkSubscriptionStatus(token: String) async throws -> SubscriptionStatusResponse {
        let endpoint = "\(baseURL)/subscription-status"
        let headers = ["Authorization": "Bearer \(token)"]
        
        return try await makeRequest(to: endpoint, method: "GET", headers: headers)
    }
    
    // MARK: - Private Methods
    
    private func makeRequest<T: Codable>(to url: String, method: String, body: Encodable? = nil, headers: [String: String] = [:]) async throws -> T {
        guard let url = URL(string: url) else {
            throw APIError.invalidURL
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        // Add custom headers
        for (key, value) in headers {
            request.setValue(value, forHTTPHeaderField: key)
        }
        
        // Add body if provided
        if let body = body {
            request.httpBody = try JSONEncoder().encode(body)
        }
        
        let (data, response) = try await session.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse else {
            throw APIError.invalidResponse
        }
        
        guard 200...299 ~= httpResponse.statusCode else {
            throw APIError.httpError(statusCode: httpResponse.statusCode, data: data)
        }
        
        do {
            return try JSONDecoder().decode(T.self, from: data)
        } catch {
            throw APIError.decodingError(error)
        }
    }
    
    private func makeRequest<T: Codable>(to url: String, method: String, body: [String: Any], headers: [String: String] = [:]) async throws -> T {
        guard let url = URL(string: url) else {
            throw APIError.invalidURL
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        // Add custom headers
        for (key, value) in headers {
            request.setValue(value, forHTTPHeaderField: key)
        }
        
        // Add body
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        
        let (data, response) = try await session.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse else {
            throw APIError.invalidResponse
        }
        
        guard 200...299 ~= httpResponse.statusCode else {
            throw APIError.httpError(statusCode: httpResponse.statusCode, data: data)
        }
        
        do {
            return try JSONDecoder().decode(T.self, from: data)
        } catch {
            throw APIError.decodingError(error)
        }
    }
}

// MARK: - Error Types

enum APIError: Error, LocalizedError {
    case invalidURL
    case invalidResponse
    case httpError(statusCode: Int, data: Data)
    case decodingError(Error)
    
    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return "Invalid URL"
        case .invalidResponse:
            return "Invalid response"
        case .httpError(let statusCode, _):
            return "HTTP Error \(statusCode)"
        case .decodingError(let error):
            return "Decoding error: \(error.localizedDescription)"
        }
    }
}

// MARK: - Response Models

struct AuthResponse: Codable {
    let message: String
    let user: User?
    let token: String?
    let error: String?
}

struct User: Codable {
    let email: String
    let name: String
}

struct ProfileResponse: Codable {
    let message: String
    let profile: Profile?
    let error: String?
}

struct GoalsResponse: Codable {
    let message: String
    let goals: Goals?
    let error: String?
}

struct PreferencesResponse: Codable {
    let message: String
    let preferences: Preferences?
    let error: String?
}

struct AffirmationResponse: Codable {
    let message: String
    let affirmation: String?
    let binauralFrequency: String?
    let error: String?
}

struct SubscriptionValidationResponse: Codable {
    let valid: Bool
    let subscription: SubscriptionData?
    let message: String?
    let error: String?
}

struct SubscriptionData: Codable {
    let bundleId: String?
    let appId: String?
    let originalPurchaseDate: String?
    let expiresDate: String?
    let isInTrialPeriod: Bool?
    let productId: String?
    let transactionId: String?
    let platform: String?
    let validatedAt: String?
}

struct SubscriptionStatusResponse: Codable {
    let isSubscribed: Bool
    let isInTrial: Bool
    let subscription: SubscriptionData?
    let message: String?
}