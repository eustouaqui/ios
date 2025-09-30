import StoreKit
import Observation

@Observable
class SubscriptionsManager: ObservableObject {
    var products: [Product] = []
    var purchasedSubscriptions: [Transaction] = []
    var isPremiumUser: Bool = false
    var errorMessage: String = ""
    var trialEndDate: Date?
    
    // Product identifiers for subscriptions
    private let productIdentifiers = ["weekly_sub", "monthly_sub", "yearly_sub"]
    
    init() {
        Task {
            await updatePurchasedSubscriptions()
            await fetchProducts()
            listenForTransactions()
            checkTrialStatus()
        }
    }
    
    /// Fetch available subscription products from the App Store
    func fetchProducts() async {
        do {
            products = try await Product.products(for: productIdentifiers)
        } catch {
            print("Erro ao fetch produtos: \(error)")
            errorMessage = "Falha ao carregar produtos: \(error.localizedDescription)"
        }
    }
    
    /// Purchase a subscription product
    func purchase(_ product: Product) async throws {
        let result = try await product.purchase()
        switch result {
        case .success(let verificationResult):
            let transaction = try checkVerified(verificationResult)
            await transaction.finish() // Finalize a transação
            await updatePurchasedSubscriptions()
        case .userCancelled:
            errorMessage = "Compra cancelada pelo usuário"
        case .pending:
            errorMessage = "Compra pendente de aprovação"
        default:
            errorMessage = "Erro desconhecido na compra"
        }
    }
    
    /// Update the list of purchased subscriptions
    func updatePurchasedSubscriptions() async {
        purchasedSubscriptions.removeAll()
        
        for await result in Transaction.currentEntitlements {
            do {
                let transaction = try checkVerified(result)
                purchasedSubscriptions.append(transaction)
            } catch {
                print("Erro ao verificar transação: \(error)")
            }
        }
        
        // Update premium status
        isPremiumUser = checkPremiumStatus()
        checkTrialStatus()
    }
    
    /// Check if the user has an active premium subscription
    func checkPremiumStatus() -> Bool {
        // Verifique se há transação ativa para assinaturas auto-renováveis
        return purchasedSubscriptions.contains { transaction in
            return transaction.productType == .autoRenewable && 
            (transaction.expirationDate == nil || transaction.expirationDate! > Date())
        }
    }
    
    /// Check trial status
    func checkTrialStatus() {
        // Check if user has any active subscription (including trial)
        let hasActiveSubscription = purchasedSubscriptions.contains { transaction in
            return transaction.productType == .autoRenewable && 
            (transaction.expirationDate == nil || transaction.expirationDate! > Date())
        }
        
        // If user has no active subscription, check for trial eligibility
        if !hasActiveSubscription {
            // For demo purposes, we'll set a 1-day trial from first app launch
            // In a real app, you would track this with UserDefaults or a backend service
            if trialEndDate == nil {
                trialEndDate = Calendar.current.date(byAdding: .day, value: 1, to: Date())
            }
        }
        
        // Update premium status based on trial
        if let trialEndDate = trialEndDate, Date() < trialEndDate {
            isPremiumUser = true
        } else {
            isPremiumUser = checkPremiumStatus()
        }
    }
    
    /// Check if user is in trial period
    func isInTrial() -> Bool {
        if let trialEndDate = trialEndDate {
            return Date() < trialEndDate
        }
        return false
    }
    
    /// Get remaining trial time
    func remainingTrialTime() -> String {
        guard let trialEndDate = trialEndDate else { return "00:00:00" }
        
        let now = Date()
        let components = Calendar.current.dateComponents([.hour, .minute, .second], from: now, to: trialEndDate)
        
        let hours = components.hour ?? 0
        let minutes = components.minute ?? 0
        let seconds = components.second ?? 0
        
        return String(format: "%02d:%02d:%02d", hours, minutes, seconds)
    }
    
    /// Listen for transaction updates (renewals, cancellations, etc.)
    func listenForTransactions() {
        Task {
            for await result in Transaction.updates {
                do {
                    let transaction = try checkVerified(result)
                    await updatePurchasedSubscriptions()
                } catch {
                    print("Erro ao processar atualização de transação: \(error)")
                }
            }
        }
    }
    
    /// Check verification result and throw if not verified
    private func checkVerified<T>(_ result: VerificationResult<T>) throws -> T {
        switch result {
        case .verified(let value):
            return value
        case .unverified(_, let error):
            throw error
        }
    }
    
    /// Restore purchases
    func restorePurchases() async {
        do {
            try await AppStore.sync()
            await updatePurchasedSubscriptions()
        } catch {
            print("Erro ao restaurar compras: \(error)")
            errorMessage = "Falha ao restaurar compras: \(error.localizedDescription)"
        }
    }
    
    /// Get the most expensive product (usually yearly)
    var bestValueProduct: Product? {
        products.sorted { $0.price > $1.price }.first
    }
    
    /// Get the least expensive product (usually weekly)
    var basicProduct: Product? {
        products.sorted { $0.price < $1.price }.first
    }
}