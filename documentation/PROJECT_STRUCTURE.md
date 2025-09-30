# iOS Subscription App Project Structure

```
SubscriptionApp/
├── Package.swift
├── README.md
├── PROJECT_STRUCTURE.md
├── NATIVE_IOS_IMPLEMENTATION.md
├── build.bat
├── SubscriptionApp/
│   ├── SubscriptionAppApp.swift
│   ├── ContentView.swift
│   ├── SubscriptionsManager.swift
│   ├── AffirmationFormView.swift
│   └── Info.plist
└── SubscriptionApp.xcodeproj/
    └── project.pbxproj
```

## File Descriptions

### Root Level
- **Package.swift**: Swift Package Manager configuration file
- **README.md**: Project documentation and setup instructions
- **PROJECT_STRUCTURE.md**: This file describing the project structure
- **NATIVE_IOS_IMPLEMENTATION.md**: Documentation for the native iOS implementation
- **build.bat**: Windows batch script for building the project

### SubscriptionApp Directory
- **SubscriptionAppApp.swift**: Main app entry point
- **ContentView.swift**: Main UI with premium/paywall views and ad display logic
- **SubscriptionsManager.swift**: Core subscription management logic with trial functionality
- **AffirmationFormView.swift**: Native iOS implementation of the affirmation form
- **Info.plist**: App configuration file

### SubscriptionApp.xcodeproj Directory
- **project.pbxproj**: Xcode project configuration (placeholder)

## Key Components

### SubscriptionsManager.swift
- Implements 1-day free trial period
- Manages weekly, monthly, and annual subscriptions
- Handles StoreKit 2 integration for modern subscription management
- Provides methods for checking trial status and remaining time

### ContentView.swift
- Displays premium content for subscribed users or trial users
- Shows paywall for non-subscribed, non-trial users
- Includes ad display logic for trial users
- Provides subscription purchase UI
- Includes navigation link to affirmation form for premium users

### AffirmationFormView.swift
- Native iOS implementation of the multi-step affirmation form
- Replicates all functionality from the web-based form
- Includes profile collection, goals selection, and voice preferences
- Implements subscription validation for affirmation generation
- Provides loading states and error handling

### Additional Features
- Trial period management with countdown timer
- Ad display for trial users only
- Premium badge for subscribed users
- Comprehensive error handling
- Multi-step form navigation with progress indication