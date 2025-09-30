import SwiftUI

struct FeatureRow: View {
    let icon: String
    let text: String
    
    var body: some View {
        HStack {
            Image(systemName: icon)
                .foregroundColor(.orange)
            Text(text)
            Spacer()
        }
    }
}

#Preview {
    FeatureRow(icon: "checkmark.circle.fill", text: "Feature")
}