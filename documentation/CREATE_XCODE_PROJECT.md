# Criando um Projeto Xcode Real

## Passo 1: Criar novo projeto Xcode

1. Abra o Xcode
2. Selecione "Create a new Xcode project"
3. Escolha "App" under the iOS tab
4. Preencha as informações:
   - Product Name: "MindReprogramming" (ou nome desejado)
   - Team: Selecione sua conta Apple Developer
   - Interface: SwiftUI
   - Language: Swift
   - Desmarque "Use Core Data" e "Include Tests" por enquanto
   - Bundle Identifier: com.seunome.MindReprogramming (substitua "seunome")

## Passo 2: Configurar estrutura de pastas

Após criar o projeto, organize a estrutura da seguinte forma:

```
MindReprogramming/
├── MindReprogrammingApp.swift
├── Views/
│   ├── ContentView.swift
│   ├── PremiumView.swift
│   ├── PaywallView.swift
│   ├── AffirmationFormView.swift
│   └── Components/
│       ├── FeatureRow.swift
│       ├── SubscriptionButton.swift
│       └── AdView.swift
├── Models/
│   ├── Subscription.swift
│   ├── Profile.swift
│   ├── Goals.swift
│   └── Preferences.swift
├── Services/
│   ├── SubscriptionsManager.swift
│   ├── APIService.swift
│   └── AuthenticationService.swift
├── Utils/
│   ├── Constants.swift
│   └── Extensions.swift
└── Resources/
    ├── Assets.xcassets
    ├── Preview Content/
    └── Info.plist
```

## Passo 3: Migrar arquivos existentes

Copie o conteúdo dos arquivos existentes para o novo projeto:

1. SubscriptionsManager.swift → Services/SubscriptionsManager.swift
2. ContentView.swift → Views/ContentView.swift
3. AffirmationFormView.swift → Views/AffirmationFormView.swift

## Passo 4: Atualizar imports e referências

Certifique-se de que todos os imports estão corretos e as referências entre arquivos estão atualizadas.