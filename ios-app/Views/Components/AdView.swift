import SwiftUI

struct AdView: View {
    var body: some View {
        VStack {
            Rectangle()
                .fill(LinearGradient(
                    gradient: Gradient(colors: [.blue, .purple]),
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                ))
                .frame(height: 50)
                .cornerRadius(8)
            
            Text("Anúncio")
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .padding(.horizontal)
    }
}

#Preview {
    AdView()
}