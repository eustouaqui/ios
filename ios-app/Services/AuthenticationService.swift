import Foundation
import Combine

class AuthenticationService: ObservableObject {
    static let shared = AuthenticationService()
    
    @Published var isAuthenticated = false
    @Published var user: User?
    @Published var token: String?
    
    private init() {
        // Load saved credentials if available
        loadSavedCredentials()
    }
    
    func register(email: String, password: String, name: String) async throws {
        let response = try await APIService.shared.register(email: email, password: password, name: name)
        
        if let token = response.token {
            self.token = token
            self.user = response.user
            self.isAuthenticated = true
            saveCredentials()
        } else {
            throw AuthError.registrationFailed
        }
    }
    
    func login(email: String, password: String) async throws {
        let response = try await APIService.shared.login(email: email, password: password)
        
        if let token = response.token {
            self.token = token
            self.user = response.user
            self.isAuthenticated = true
            saveCredentials()
        } else {
            throw AuthError.loginFailed
        }
    }
    
    func logout() {
        self.token = nil
        self.user = nil
        self.isAuthenticated = false
        clearSavedCredentials()
    }
    
    private func saveCredentials() {
        if let token = token {
            UserDefaults.standard.set(token, forKey: "authToken")
        }
        if let userData = try? JSONEncoder().encode(user) {
            UserDefaults.standard.set(userData, forKey: "userData")
        }
    }
    
    private func loadSavedCredentials() {
        if let token = UserDefaults.standard.string(forKey: "authToken") {
            self.token = token
            self.isAuthenticated = true
        }
        
        if let userData = UserDefaults.standard.data(forKey: "userData") {
            do {
                self.user = try JSONDecoder().decode(User.self, from: userData)
            } catch {
                print("Error decoding user data: \(error)")
            }
        }
    }
    
    private func clearSavedCredentials() {
        UserDefaults.standard.removeObject(forKey: "authToken")
        UserDefaults.standard.removeObject(forKey: "userData")
    }
}

enum AuthError: Error, LocalizedError {
    case registrationFailed
    case loginFailed
    
    var errorDescription: String? {
        switch self {
        case .registrationFailed:
            return "Registration failed"
        case .loginFailed:
            return "Login failed"
        }
    }
}