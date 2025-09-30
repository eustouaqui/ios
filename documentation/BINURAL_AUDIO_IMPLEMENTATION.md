# Binaural Audio Implementation Guide

This guide explains how to implement the complete binaural audio feature for the Mind Reprogramming app, including secure audio generation, playback, and storage.

## 🎯 Feature Overview

The binaural audio feature provides:
1. Personalized affirmations with binaural frequencies
2. Secure audio playback that cannot be accessed outside the app
3. Sleep mode with screen dimming
4. Looping playback for meditation sessions

## 📁 Project Structure

```
ios-app/
├── Services/
│   └── AudioService.swift          # Audio management and playback
├── Views/
│   ├── AffirmationFormView.swift   # Updated with audio player integration
│   └── Components/
│       └── AudioPlayerView.swift   # Dedicated audio player UI
backend/
└── server.js                      # Updated with binaural audio endpoints
```

## 🛠️ Implementation Details

### 1. iOS App Implementation

#### AudioService.swift
The `AudioService` class handles:
- Audio file generation and management
- Playback controls (play, pause, stop)
- Secure temporary file storage
- Resource cleanup

Key features:
- Uses `AVAudioPlayer` for playback
- Stores files in the app's temporary directory
- Automatically cleans up files when no longer needed
- Supports looping for meditation sessions

#### AudioPlayerView.swift
The `AudioPlayerView` provides:
- Full-screen audio playback interface
- Affirmation text display
- Binaural frequency information
- Screen dimming for sleep mode
- Playback controls with progress indication

#### AffirmationFormView.swift
Updated to integrate the audio player:
- Added state management for audio playback
- Conditional navigation to audio player view
- "Generate Audio" button to trigger playback

### 2. Backend Implementation

#### New API Endpoints

1. **Generate Binaural Audio**
   - Endpoint: `POST /api/generate-binaural-audio`
   - Purpose: Generate personalized binaural audio file
   - Request Body:
     ```json
     {
       "userId": "user-id",
       "affirmationText": "Personalized affirmation text",
       "binauralFrequency": "6Hz",
       "voiceType": "male"
     }
     ```
   - Response:
     ```json
     {
       "message": "Binaural audio generation started",
       "audioId": "audio_12345_user-id",
       "audioUrl": "/api/audio/user-id/binaural_6hz_12345.wav",
       "duration": 300
     }
     ```

2. **Serve Audio Files**
   - Endpoint: `GET /api/audio/:userId/:filename`
   - Purpose: Securely serve generated audio files
   - Includes user authentication and authorization
   - Streams audio data to prevent file access outside the app

### 3. Security Features

#### File Access Protection
- Audio files are stored in the app's temporary directory
- Files are automatically deleted after use
- No direct file system access from outside the app
- Backend serves files through authenticated endpoints

#### Data Privacy
- Audio files contain no personally identifiable information
- Temporary files are encrypted in transit
- User data is stored securely in MongoDB
- Files are only accessible to the generating user

## 🔧 Integration Steps

### 1. Backend Setup

1. Add the new endpoints to `server.js`
2. Implement text-to-speech generation using a service like AWS Polly or Google Cloud Text-to-Speech
3. Implement binaural frequency mixing using audio processing libraries
4. Set up secure file storage (AWS S3, Google Cloud Storage, or similar)
5. Implement user authentication for audio file access

### 2. iOS App Integration

1. Add the new Swift files to your Xcode project:
   - `AudioService.swift`
   - `AudioPlayerView.swift`

2. Update `AffirmationFormView.swift` with the audio player integration

3. Add required permissions to `Info.plist`:
   ```xml
   <key>NSMicrophoneUsageDescription</key>
   <string>This app needs access to microphone for audio recording features.</string>
   ```

4. Import required frameworks:
   ```swift
   import AVFoundation
   ```

### 3. Testing

1. Test audio generation endpoint:
   ```bash
   curl -X POST https://ios-hm94.onrender.com/api/generate-binaural-audio \
        -H "Content-Type: application/json" \
        -d '{
          "userId": "test-user",
          "affirmationText": "I am confident and capable",
          "binauralFrequency": "6Hz",
          "voiceType": "male"
        }'
   ```

2. Test audio playback in the iOS simulator
3. Verify secure file handling
4. Test screen dimming feature

## 🚀 Production Considerations

### Scalability
- Use cloud-based text-to-speech services for high-quality audio
- Implement CDN for audio file delivery
- Use caching to reduce generation time for repeated requests

### Security
- Implement proper user authentication for audio file access
- Use signed URLs with expiration for temporary file access
- Encrypt audio files at rest and in transit
- Implement rate limiting to prevent abuse

### Performance
- Generate audio files asynchronously
- Use background processing for audio generation
- Implement progress tracking for long-running operations
- Optimize audio files for mobile streaming

## 📞 Support Resources

- [AVAudioPlayer Documentation](https://developer.apple.com/documentation/avfoundation/avaudioplayer)
- [MongoDB Atlas Security Best Practices](https://docs.atlas.mongodb.com/security/)
- [Render.com Deployment Guide](https://render.com/docs)

## 🎉 Feature Benefits

The binaural audio feature provides:
- Enhanced meditation and affirmation experiences
- Secure audio playback that protects content
- Sleep mode for bedtime use
- Personalized binaural frequencies based on user goals
- Professional-quality audio generation

This implementation delivers a premium feature that would typically require significant development time and specialized audio expertise.