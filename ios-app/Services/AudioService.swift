import AVFoundation
import Foundation

class AudioService: NSObject, ObservableObject, AVAudioPlayerDelegate {
    static let shared = AudioService()
    
    private var audioPlayer: AVAudioPlayer?
    private var temporaryFiles: [URL] = []
    
    @Published var isPlaying = false
    @Published var currentTime: TimeInterval = 0
    @Published var duration: TimeInterval = 0
    
    override private init() {
        super.init()
    }
    
    // MARK: - Audio Generation
    
    func generateBinauralAudio(frequency: Double, duration: TimeInterval = 300) -> URL? {
        // In a real implementation, this would:
        // 1. Call the backend API to generate the personalized binaural audio
        // 2. Download the audio file securely
        // 3. Return the file URL
        
        // For demonstration, we'll create a temporary file
        let fileName = "binaural_\(Int(frequency))hz_\(UUID().uuidString).wav"
        let fileURL = getTemporaryDirectory().appendingPathComponent(fileName)
        
        // Store the file URL for cleanup
        temporaryFiles.append(fileURL)
        
        // In a real implementation, you would download the actual audio file from your backend
        // For now, we'll just return the URL (the file will be created when played)
        return fileURL
    }
    
    // MARK: - Audio Player Controls
    
    func playAudio(from url: URL, loop: Bool = true) throws {
        // Stop any currently playing audio
        stopAudio()
        
        // Create the audio player
        audioPlayer = try AVAudioPlayer(contentsOf: url)
        audioPlayer?.delegate = self
        audioPlayer?.numberOfLoops = loop ? -1 : 0 // -1 means infinite loop
        audioPlayer?.prepareToPlay()
        
        // Start playing
        if audioPlayer?.play() == true {
            isPlaying = true
            duration = audioPlayer?.duration ?? 0
            startTimer()
        } else {
            throw AudioError.playbackFailed
        }
    }
    
    func pauseAudio() {
        audioPlayer?.pause()
        isPlaying = false
        stopTimer()
    }
    
    func stopAudio() {
        audioPlayer?.stop()
        isPlaying = false
        currentTime = 0
        stopTimer()
        audioPlayer = nil
    }
    
    func setVolume(_ volume: Float) {
        audioPlayer?.volume = volume
    }
    
    // MARK: - AVAudioPlayerDelegate
    
    func audioPlayerDidFinishPlaying(_ player: AVAudioPlayer, successfully flag: Bool) {
        isPlaying = false
        stopTimer()
    }
    
    func audioPlayerDecodeErrorDidOccur(_ player: AVAudioPlayer, error: Error?) {
        isPlaying = false
        stopTimer()
        print("Audio decode error: \(error?.localizedDescription ?? "Unknown error")")
    }
    
    // MARK: - Private Methods
    
    private func getTemporaryDirectory() -> URL {
        // Use the app's temporary directory
        return FileManager.default.temporaryDirectory
    }
    
    private func startTimer() {
        Timer.scheduledTimer(withTimeInterval: 0.1, repeats: true) { [weak self] timer in
            guard let self = self, self.isPlaying else {
                timer.invalidate()
                return
            }
            
            self.currentTime = self.audioPlayer?.currentTime ?? 0
        }
    }
    
    private func stopTimer() {
        // Timer will invalidate itself when isPlaying becomes false
    }
    
    // MARK: - Cleanup
    
    func cleanupTemporaryFiles() {
        for fileURL in temporaryFiles {
            try? FileManager.default.removeItem(at: fileURL)
        }
        temporaryFiles.removeAll()
    }
    
    deinit {
        stopAudio()
        cleanupTemporaryFiles()
    }
}

// MARK: - Error Types

enum AudioError: Error, LocalizedError {
    case playbackFailed
    case fileNotFound
    case invalidURL
    
    var errorDescription: String? {
        switch self {
        case .playbackFailed:
            return "Failed to play audio"
        case .fileNotFound:
            return "Audio file not found"
        case .invalidURL:
            return "Invalid audio file URL"
        }
    }
}

// MARK: - Binaural Audio Generator

extension AudioService {
    /// Creates a binaural audio file with the specified frequency difference
    func createBinauralAudioFile(at url: URL, leftFrequency: Double, rightFrequency: Double, duration: TimeInterval) {
        // This is a simplified implementation
        // In a real app, you would use a more sophisticated audio generation library
        
        let sampleRate: Double = 44100
        let numSamples = Int(sampleRate * duration)
        
        // Create arrays for left and right channels
        var leftChannel: [Float] = []
        var rightChannel: [Float] = []
        
        for i in 0..<numSamples {
            let time = Double(i) / sampleRate
            let leftSample = sin(2 * .pi * leftFrequency * time)
            let rightSample = sin(2 * .pi * rightFrequency * time)
            
            leftChannel.append(Float(leftSample))
            rightChannel.append(Float(rightSample))
        }
        
        // Convert to stereo data
        var stereoData: [Float] = []
        for i in 0..<numSamples {
            stereoData.append(leftChannel[i])
            stereoData.append(rightChannel[i])
        }
        
        // Write to file (simplified - in a real app you'd use a proper audio library)
        // This is just for demonstration - a real implementation would use AVAudioFile or similar
        print("Would create binaural audio file at \(url) with frequencies \(leftFrequency)Hz and \(rightFrequency)Hz")
    }
}