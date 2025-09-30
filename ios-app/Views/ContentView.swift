import SwiftUI

struct ContentView: View {
    @State private var subscriptionsManager = SubscriptionsManager()
    @State private var showAds = true
    
    var body: some View {
        NavigationView {
            if subscriptionsManager.isPremiumUser {
                PremiumView(subscriptionsManager: subscriptionsManager)
            } else {
                PaywallView(subscriptionsManager: subscriptionsManager)
            }
        }
        .environmentObject(subscriptionsManager)
        .onAppear {
            // Show ads for trial users
            showAds = !subscriptionsManager.isPremiumUser || subscriptionsManager.isInTrial()
        }
    }
}

struct PremiumView: View {
    @ObservedObject var subscriptionsManager: SubscriptionsManager
    
    var body: some View {
        VStack(spacing: 20) {
            // Header with premium badge
            HStack {
                Spacer()
                Text("PREMIUM")
                    .font(.caption)
                    .fontWeight(.bold)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 5)
                    .background(Color.orange)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
            
            Image(systemName: "crown.fill")
                .font(.largeTitle)
                .foregroundColor(.yellow)
            
            Text("Acesso Premium")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            Text("Você tem acesso completo a todos os recursos!")
                .multilineTextAlignment(.center)
                .padding()
            
            // Add your premium features here
            VStack(alignment: .leading, spacing: 10) {
                FeatureRow(icon: "checkmark.circle.fill", text: "Conteúdo exclusivo")
                FeatureRow(icon: "checkmark.circle.fill", text: "Sem anúncios")
                FeatureRow(icon: "checkmark.circle.fill", text: "Suporte prioritário")
                FeatureRow(icon: "checkmark.circle.fill", text: "Novos recursos primeiro")
                // Add link to affirmation form
                NavigationLink(destination: AffirmationFormView()) {
                    FeatureRow(icon: "brain", text: "Gerador de Afirmações Personalizadas")
                }
            }
            .padding()
            
            // Show trial expiration if in trial
            if subscriptionsManager.isInTrial() {
                VStack(spacing: 10) {
                    Text("Período de teste gratuito")
                        .font(.headline)
                        .foregroundColor(.orange)
                    
                    Text("Seu teste gratuito expira em:")
                        .font(.subheadline)
                    
                    Text(subscriptionsManager.remainingTrialTime())
                        .font(.title)
                        .fontWeight(.bold)
                        .monospaced()
                    
                    Text("Assine agora para continuar desfrutando dos recursos premium")
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                }
                .padding()
                .background(Color.orange.opacity(0.1))
                .cornerRadius(10)
            }
            
            Button("Gerenciar Assinatura") {
                // Implement subscription management
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
        .navigationTitle("Premium")
    }
}

struct PaywallView: View {
    @ObservedObject var subscriptionsManager: SubscriptionsManager
    
    var body: some View {
        ScrollView {
            VStack(spacing: 30) {
                headerSection
                featureSection
                subscriptionSection
                restorePurchasesSection
            }
            .padding()
        }
        .navigationTitle("Assinatura")
        .alert("Erro", isPresented: .constant(!subscriptionsManager.errorMessage.isEmpty)) {
            Button("OK") {
                // Clear error message
            }
        } message: {
            Text(subscriptionsManager.errorMessage)
        }
    }
    
    private var headerSection: some View {
        VStack(spacing: 10) {
            Image(systemName: "crown")
                .font(.system(size: 50))
                .foregroundColor(.orange)
            
            Text("Desbloqueie recursos premium")
                .font(.title)
                .fontWeight(.bold)
                .multilineTextAlignment(.center)
            
            Text("Obtenha acesso a todos os recursos exclusivos do app")
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
    }
    
    private var featureSection: some View {
        VStack(alignment: .leading, spacing: 15) {
            Text("Recursos Premium")
                .font(.headline)
            
            FeatureRow(icon: "sparkles", text: "Conteúdo exclusivo")
            FeatureRow(icon: "photo", text: "Sem anúncios")
            FeatureRow(icon: "paperplane", text: "Exportação ilimitada")
            FeatureRow(icon: "clock", text: "Histórico estendido")
            FeatureRow(icon: "star", text: "Novos recursos primeiro")
        }
        .padding()
        .background(.ultraThinMaterial)
        .cornerRadius(15)
    }
    
    private var subscriptionSection: some View {
        VStack(spacing: 20) {
            Text("Escolha seu plano")
                .font(.headline)
            
            // Show trial info
            VStack(spacing: 10) {
                Text("_experimente gratuitamente por 1 dia_")
                    .font(.subheadline)
                    .italic()
                    .foregroundColor(.orange)
                
                Text("Após o período de teste, escolha um plano de assinatura:")
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
            }
            
            ForEach(subscriptionsManager.products, id: \.id) { product in
                SubscriptionButton(product: product) {
                    Task {
                        do {
                            try await subscriptionsManager.purchase(product)
                        } catch {
                            print("Erro na compra: \(error)")
                        }
                    }
                }
            }
            
            Text("Ao assinar, você concorda com os Termos de Uso e a Política de Privacidade. A assinatura é renovada automaticamente, a menos que seja cancelada com pelo menos 24 horas de antecedência.")
                .font(.caption)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
    }
    
    private var restorePurchasesSection: some View {
        VStack(spacing: 10) {
            Button("Restaurar Compras") {
                Task {
                    await subscriptionsManager.restorePurchases()
                }
            }
            .buttonStyle(.bordered)
            
            Text("Se você já comprou uma assinatura, toque em \"Restaurar Compras\" para recuperar o acesso.")
                .font(.caption)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
    }
}

#Preview {
    ContentView()
}