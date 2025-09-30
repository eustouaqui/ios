import SwiftUI

struct AffirmationFormView: View {
    @State private var currentStep = 0
    @State private var profileData = ProfileData()
    @State private var goalsData = GoalsData()
    @State private var preferencesData = PreferencesData()
    @State private var affirmationText = ""
    @State private var binauralFrequency = ""
    @State private var isLoading = false
    @State private var showError = false
    @State private var errorMessage = ""
    @State private var showSubscriptionRequired = false
    @State private var showResult = false
    
    // Religion options
    @State private var selectedReligions: Set<String> = []
    @State private var showOtherReligion = false
    @State private var otherReligionText = ""
    
    // Goal options
    @State private var selectedGoals: Set<String> = []
    @State private var showOtherGoal = false
    @State private var otherGoalText = ""
    
    let religions = [
        "Catholic", "Evangelical", "Muslim", "Buddhist",
        "Hindu", "Jewish", "Spiritualist", "Atheist"
    ]
    
    let goals = [
        "Study better", "Be more productive", "Be happier",
        "Reduce anxiety", "Spiritual connection"
    ]
    
    let maritalStatusOptions = [
        "", "Single", "Married", "Divorced", "Widowed", "Other"
    ]
    
    var body: some View {
        NavigationView {
            VStack {
                // Progress indicator
                ProgressView("Step \(currentStep + 1) of 4", value: Double(currentStep), total: 3.0)
                    .padding()
                
                // Step content
                Group {
                    if currentStep == 0 {
                        ProfileStepView(
                            profileData: $profileData,
                            selectedReligions: $selectedReligions,
                            showOtherReligion: $showOtherReligion,
                            otherReligionText: $otherReligionText,
                            religions: religions,
                            maritalStatusOptions: maritalStatusOptions
                        )
                    } else if currentStep == 1 {
                        GoalsStepView(
                            selectedGoals: $selectedGoals,
                            showOtherGoal: $showOtherGoal,
                            otherGoalText: $otherGoalText,
                            goals: goals
                        )
                    } else if currentStep == 2 {
                        PreferencesStepView(preferencesData: $preferencesData)
                    } else {
                        ResultStepView(
                            affirmationText: $affirmationText,
                            binauralFrequency: $binauralFrequency,
                            isLoading: $isLoading,
                            showSubscriptionRequired: $showSubscriptionRequired,
                            showResult: $showResult
                        )
                    }
                }
                
                // Navigation buttons
                HStack {
                    if currentStep > 0 {
                        Button("Previous") {
                            currentStep -= 1
                        }
                        .buttonStyle(.bordered)
                    }
                    
                    Spacer()
                    
                    if currentStep < 3 {
                        Button("Next") {
                            handleNext()
                        }
                        .buttonStyle(.borderedProminent)
                    } else {
                        Button("Generate Audio") {
                            generateAudio()
                        }
                        .buttonStyle(.borderedProminent)
                    }
                }
                .padding()
            }
            .navigationTitle("Personalized Affirmation")
            .navigationBarTitleDisplayMode(.inline)
            .alert("Error", isPresented: $showError) {
                Button("OK") { }
            } message: {
                Text(errorMessage)
            }
        }
    }
    
    private func handleNext() {
        if currentStep == 2 {
            // Save preferences and generate affirmation
            savePreferencesAndGenerate()
        } else {
            currentStep += 1
        }
    }
    
    private func saveProfile() {
        // Save religion selections
        var religionList = Array(selectedReligions)
        if showOtherReligion && !otherReligionText.isEmpty {
            religionList.append(otherReligionText)
        }
        profileData.religion = religionList.joined(separator: ", ")
        
        // Save profile data to backend (would need actual implementation)
        print("Saving profile: \(profileData)")
    }
    
    private func saveGoals() {
        // Save goal selections
        var goalList = Array(selectedGoals)
        if showOtherGoal && !otherGoalText.isEmpty {
            goalList.append(otherGoalText)
        }
        goalsData.mainGoal = goalList.joined(separator: ", ")
        
        // Save goals data to backend (would need actual implementation)
        print("Saving goals: \(goalsData)")
    }
    
    private func savePreferences() {
        // Save preferences data to backend (would need actual implementation)
        print("Saving preferences: \(preferencesData)")
    }
    
    private func savePreferencesAndGenerate() {
        savePreferences()
        isLoading = true
        
        // Simulate API call to generate affirmation
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            isLoading = false
            
            // Check if user has subscription (in a real app, this would check with backend)
            let hasSubscription = UserDefaults.standard.bool(forKey: "isPremiumUser")
            
            if hasSubscription {
                showSubscriptionRequired = false
                showResult = true
                
                // Generate sample affirmation text
                affirmationText = """
                Eu sou capaz... Eu sou competente... Eu sou vitorioso...

                Na minha jornada como \(profileData.profession), cada dia traz novas oportunidades.
                Hoje, avanço em direção ao meu crescimento e realização em \(goalsData.mainGoal).

                Estou sentindo agora... a confiança fluir através de cada passo que dou.
                Estou vendo... as oportunidades se abrirem à minha volta.
                Estou ouvindo... minha intuição me guiar com sabedoria.

                Me mantenho focado... alinhado com meus propósitos mais profundos.
                A cada respiração... me torno mais capaz de realizar meus sonhos.
                Confio... no processo da vida e na minha própria capacidade.

                [Elemento espiritual apropriado ao contexto religioso]
                Sou o criador da minha realidade... o arquiteto do meu destino.

                Agora... respire fundo... sinta essa energia positiva...
                Eu sou capaz. Eu sou competente. Eu sou vitorioso.
                """
                
                binauralFrequency = "binaural_6hz.wav"
            } else {
                showSubscriptionRequired = true
                showResult = false
            }
            
            currentStep += 1
        }
    }
    
    private func generateAudio() {
        // Generate audio from affirmation text
        print("Generating audio for: \(affirmationText)")
        
        // In a real implementation, this would call the backend API
        // to generate the audio file with the selected voice and binaural frequency
    }
}

// MARK: - Data Models
struct ProfileData {
    var religion = ""
    var maritalStatus = ""
    var profession = ""
    var ambitions = ""
    var fears = ""
    var dreams = ""
}

struct GoalsData {
    var mainGoal = ""
}

struct PreferencesData {
    var voice = "male"
}

// MARK: - Step Views
struct ProfileStepView: View {
    @Binding var profileData: ProfileData
    @Binding var selectedReligions: Set<String>
    @Binding var showOtherReligion: Bool
    @Binding var otherReligionText: String
    let religions: [String]
    let maritalStatusOptions: [String]
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                Text("User Profile")
                    .font(.title2)
                    .fontWeight(.bold)
                
                Text("Please provide information about yourself to personalize your affirmations.")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                
                // Religion/Spiritual Belief
                VStack(alignment: .leading, spacing: 10) {
                    Text("Religion/Spiritual Belief:")
                        .font(.headline)
                    
                    ForEach(religions, id: \.self) { religion in
                        HStack {
                            Toggle(religion, isOn: Binding(
                                get: { selectedReligions.contains(religion) },
                                set: { isSelected in
                                    if isSelected {
                                        selectedReligions.insert(religion)
                                    } else {
                                        selectedReligions.remove(religion)
                                    }
                                }
                            ))
                        }
                    }
                    
                    HStack {
                        Toggle("Other", isOn: $showOtherReligion)
                    }
                    
                    if showOtherReligion {
                        TextField("Specify other religion", text: $otherReligionText)
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                    }
                }
                
                // Marital Status
                VStack(alignment: .leading, spacing: 10) {
                    Text("Marital Status:")
                        .font(.headline)
                    
                    Picker("Marital Status", selection: $profileData.maritalStatus) {
                        ForEach(maritalStatusOptions, id: \.self) { status in
                            Text(status.isEmpty ? "Select" : status).tag(status)
                        }
                    }
                    .pickerStyle(MenuPickerStyle())
                }
                
                // Profession
                VStack(alignment: .leading, spacing: 10) {
                    Text("Profession:")
                        .font(.headline)
                    
                    TextField("Enter your profession", text: $profileData.profession)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                }
                
                // Main Ambitions
                VStack(alignment: .leading, spacing: 10) {
                    Text("Main Ambitions:")
                        .font(.headline)
                    
                    TextEditor(text: $profileData.ambitions)
                        .frame(height: 100)
                        .overlay(
                            RoundedRectangle(cornerRadius: 8)
                                .stroke(Color.gray.opacity(0.3), lineWidth: 1)
                        )
                        .padding(.top, 2)
                }
                
                // Biggest Fears
                VStack(alignment: .leading, spacing: 10) {
                    Text("Biggest Fears:")
                        .font(.headline)
                    
                    TextEditor(text: $profileData.fears)
                        .frame(height: 100)
                        .overlay(
                            RoundedRectangle(cornerRadius: 8)
                                .stroke(Color.gray.opacity(0.3), lineWidth: 1)
                        )
                        .padding(.top, 2)
                }
                
                // Most Important Dreams
                VStack(alignment: .leading, spacing: 10) {
                    Text("Most Important Dreams:")
                        .font(.headline)
                    
                    TextEditor(text: $profileData.dreams)
                        .frame(height: 100)
                        .overlay(
                            RoundedRectangle(cornerRadius: 8)
                                .stroke(Color.gray.opacity(0.3), lineWidth: 1)
                        )
                        .padding(.top, 2)
                }
            }
            .padding()
        }
    }
}

struct GoalsStepView: View {
    @Binding var selectedGoals: Set<String>
    @Binding var showOtherGoal: Bool
    @Binding var otherGoalText: String
    let goals: [String]
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                Text("Personal Goals")
                    .font(.title2)
                    .fontWeight(.bold)
                
                Text("What are your goals for using this program? (Select all that apply):")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                
                ForEach(goals, id: \.self) { goal in
                    HStack {
                        Toggle(goal, isOn: Binding(
                            get: { selectedGoals.contains(goal) },
                            set: { isSelected in
                                if isSelected {
                                    selectedGoals.insert(goal)
                                } else {
                                    selectedGoals.remove(goal)
                                }
                            }
                        ))
                    }
                }
                
                HStack {
                    Toggle("Other", isOn: $showOtherGoal)
                }
                
                if showOtherGoal {
                    TextField("Specify another goal", text: $otherGoalText)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                }
            }
            .padding()
        }
    }
}

struct PreferencesStepView: View {
    @Binding var preferencesData: PreferencesData
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                Text("Voice Preferences")
                    .font(.title2)
                    .fontWeight(.bold)
                
                // Voice selection
                VStack(alignment: .leading, spacing: 10) {
                    Text("What type of voice do you prefer?")
                        .font(.headline)
                    
                    Picker("Voice Type", selection: $preferencesData.voice) {
                        Text("Male voice").tag("male")
                        Text("Female voice").tag("female")
                    }
                    .pickerStyle(SegmentedPickerStyle())
                }
                
                // Voice samples
                VStack(alignment: .leading, spacing: 15) {
                    Text("Voice Samples:")
                        .font(.headline)
                    
                    VStack(alignment: .leading, spacing: 10) {
                        Text("Male voice sample:")
                            .font(.subheadline)
                            .fontWeight(.medium)
                        
                        Text("\"You are capable. Access your hidden potential.\"")
                            .italic()
                            .padding()
                            .background(Color.gray.opacity(0.1))
                            .cornerRadius(8)
                    }
                    
                    VStack(alignment: .leading, spacing: 10) {
                        Text("Female voice sample:")
                            .font(.subheadline)
                            .fontWeight(.medium)
                        
                        Text("\"You are capable. Access your hidden potential.\"")
                            .italic()
                            .padding()
                            .background(Color.gray.opacity(0.1))
                            .cornerRadius(8)
                    }
                }
            }
            .padding()
        }
    }
}

struct ResultStepView: View {
    @Binding var affirmationText: String
    @Binding var binauralFrequency: String
    @Binding var isLoading: Bool
    @Binding var showSubscriptionRequired: Bool
    @Binding var showResult: Bool
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                Text("Your Personalized Affirmation")
                    .font(.title2)
                    .fontWeight(.bold)
                
                if isLoading {
                    VStack {
                        ProgressView("Generating your personalized affirmation...")
                            .progressViewStyle(CircularProgressViewStyle())
                            .padding()
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else if showSubscriptionRequired {
                    VStack(spacing: 20) {
                        Image(systemName: "lock.shield")
                            .font(.largeTitle)
                            .foregroundColor(.orange)
                        
                        Text("Subscription Required")
                            .font(.title2)
                            .fontWeight(.bold)
                        
                        Text("You need an active subscription to generate personalized affirmations.")
                            .multilineTextAlignment(.center)
                            .foregroundColor(.secondary)
                        
                        Button("Subscribe Now") {
                            // Navigate to subscription screen
                        }
                        .buttonStyle(.borderedProminent)
                    }
                    .padding()
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else if showResult {
                    VStack(alignment: .leading, spacing: 20) {
                        VStack(alignment: .leading, spacing: 10) {
                            Text("Personalized Affirmation:")
                                .font(.headline)
                            
                            Text(affirmationText)
                                .italic()
                                .padding()
                                .background(Color.gray.opacity(0.1))
                                .cornerRadius(8)
                        }
                        
                        VStack(alignment: .leading, spacing: 10) {
                            Text("Selected binaural frequency:")
                                .font(.headline)
                            
                            Text(binauralFrequency)
                                .padding()
                                .background(Color.blue.opacity(0.1))
                                .cornerRadius(8)
                            
                            Text("This frequency was chosen based on your goals to optimize the benefits of your affirmation.")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                        }
                    }
                    .padding()
                }
            }
        }
    }
}

#Preview {
    AffirmationFormView()
}