import SwiftUI
import StoreKit

struct SubscriptionButton: View {
    let product: Product
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack {
                VStack(alignment: .leading, spacing: 5) {
                    Text(product.displayName)
                        .font(.headline)
                        .foregroundColor(.primary)
                    
                    Text(product.description)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                
                Spacer()
                
                Text(product.displayPrice)
                    .font(.headline)
                    .fontWeight(.bold)
                    .foregroundColor(.orange)
            }
            .padding()
            .frame(maxWidth: .infinity)
            .background(
                RoundedRectangle(cornerRadius: 10)
                    .fill(.ultraThinMaterial)
            )
        }
    }
}

#Preview {
    // This is a placeholder preview since we can't create a real Product in preview
    Text("Subscription Button")
}