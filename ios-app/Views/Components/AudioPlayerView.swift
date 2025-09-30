import SwiftUI
import AVFoundation

struct AudioPlayerView: View {
    @Binding var isPlaying: Bool
    @Binding var affirmationText: String
    @Binding var binauralFrequency: String
    @State private var isScreenDimmed = false
    @State private var errorMessage = ""
    @State private var showAlert = false
    @State private var progress: Float = 0.0
    @State private var audioService = AudioService.shared
    
    let onDismiss: () -> Void
    
    var body: some View {
        VStack(spacing: 30) {
            // Header with dismiss button
            HStack {
                Spacer()
                Button(action: {
                    audioService.stopAudio()
                    onDismiss()
                }) {
                    Image(systemName: "xmark.circle.fill")
                        .font(.title2)
                        .foregroundColor(.gray)
                }
            }
            .padding(.horizontal)
            
            // Title
            Text("Binaural Affirmation")
                .font(.title2)
                .fontWeight(.bold)
            
            // Affirmation text display
            ScrollView {
                Text(affirmationText)
                    .font(.body)
                    .italic()
                    .padding()
                    .background(Color.gray.opacity(0.1))
                    .cornerRadius(10)
                    .frame(maxWidth: .infinity, alignment: .leading)
            }
            .frame(maxHeight: 200)
            
            // Binaural frequency info
            VStack(alignment: .leading, spacing: 10) {
                Text("Binaural Frequency:")
                    .font(.headline)
                
                Text(binauralFrequency)
                    .padding()
                    .background(Color.blue.opacity(0.1))
                    .cornerRadius(8)
                
                Text("This frequency was chosen to optimize your affirmation experience.")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            // Progress bar
            VStack(spacing: 5) {
                ProgressView(value: Double(progress))
                    .progressViewStyle(LinearProgressViewStyle())
                
                HStack {
                    Text("0:00")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    
                    Spacer()
                    
                    Text("5:00")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }
            .padding(.horizontal)
            
            // Player controls
            VStack(spacing: 20) {
                // Play/Pause button
                Button(action: {
                    togglePlayback()
                }) {
                    Image(systemName: isPlaying ? "pause.circle.fill" : "play.circle.fill")
                        .font(.system(size: 60))
                        .foregroundColor(.blue)
                }
                
                // Screen dimming option
                Toggle("Dim screen for sleep mode", isOn: $isScreenDimmed)
                    .padding(.horizontal)
                
                // Volume control
                HStack {
                    Image(systemName: "speaker")
                    Slider(value: .constant(0.5), in: 0...1) { _ in
                        // Volume control would be implemented here
                    }
                    .accentColor(.blue)
                    Image(systemName: "speaker.wave.3")
                }
                .padding(.horizontal)
            }
            
            // Security note
            VStack(spacing: 10) {
                Image(systemName: "lock.shield")
                    .font(.title3)
                    .foregroundColor(.green)
                
                Text("Audio files are securely stored and cannot be accessed outside this app.")
                    .font(.caption)
                    .multilineTextAlignment(.center)
                    .foregroundColor(.secondary)
            }
            .padding()
        }
        .padding()
        .background(isScreenDimmed ? Color.black : Color.white)
        .foregroundColor(isScreenDimmed ? Color.white : Color.primary)
        .onAppear {
            setupAudioPlayer()
        }
        .onDisappear {
            audioService.stopAudio()
        }
        .alert("Error", isPresented: $showAlert) {
            Button("OK") { }
        } message: {
            Text(errorMessage)
        }
    }
    
    private func setupAudioPlayer() {
        // In a real implementation, this would:
        // 1. Call the backend to generate the binaural audio file
        // 2. Download the audio file securely
        // 3. Set up the AVAudioPlayer with the file
        
        // For now, we'll simulate the setup
        print("Setting up audio player for: \(binauralFrequency)")
        print("Affirmation text: \(affirmationText)")
        
        // Create a temporary binaural audio file
        createTemporaryBinauralAudio()
    }
    
    private func createTemporaryBinauralAudio() {
        // This would normally call the backend API to generate the audio
        // For demonstration, we'll create a simple binaural audio file
        
        // In a real implementation, you would:
        // 1. Call your backend API to generate the personalized audio
        // 2. Download the audio file to a secure location
        // 3. Initialize the AVAudioPlayer with the downloaded file
        
        print("Creating temporary binaural audio...")
    }
    
    private func togglePlayback() {
        if isPlaying {
            pauseAudio()
        } else {
            playAudio()
        }
    }
    
    private func playAudio() {
        // In a real implementation, this would:
        // 1. Check if audio file exists
        // 2. Start playing the audio
        // 3. Handle looping
        
        do {
            // For demonstration, we'll simulate playing
            print("Playing binaural audio...")
            isPlaying = true
            
            // Simulate audio completion after 10 seconds
            DispatchQueue.main.asyncAfter(deadline: .now() + 10) {
                if isPlaying {
                    isPlaying = false
                }
            }
        } catch {
            errorMessage = "Failed to play audio: \(error.localizedDescription)"
            showAlert = true
        }
    }
    
    private func pauseAudio() {
        // In a real implementation, this would pause the audio player
        print("Pausing audio...")
        isPlaying = false
        audioService.pauseAudio()
    }
    
    private func stopAudio() {
        // In a real implementation, this would:
        // 1. Stop the audio player
        // 2. Release resources
        // 3. Clean up temporary files
        
        print("Stopping audio...")
        isPlaying = false
        audioService.stopAudio()
    }
}

#Preview {
    AudioPlayerView(
        isPlaying: .constant(false),
        affirmationText: .constant("Sample affirmation text for preview"),
        binauralFrequency: .constant("binaural_6hz.wav"),
        onDismiss: {}
    )
}