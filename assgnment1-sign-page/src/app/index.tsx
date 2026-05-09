import GreenPlusLogo from "@/components/GreenPlus";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={[styles.card]}>
      {/* <View style={styles.card}> */}
      <View style={styles.logoWrap}>
        <GreenPlusLogo size={64} />
      </View>

      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>
        Let&apos;s experience the joy of telecare AI.
      </Text>

      <View>
        <Text style={styles.label}>Email Address</Text>
        <View style={[styles.inputRow, styles.inputRowActive]}>
          <View style={styles.iconBubble}>
            <Feather name="mail" size={16} color="#2F2F2F" />
          </View>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#9AA19B"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputRow}>
          <View style={styles.iconBubble}>
            <Feather name="lock" size={16} color="#2F2F2F" />
          </View>
          <TextInput
            placeholder="Enter your password..."
            placeholderTextColor="#9AA19B"
            style={styles.input}
            secureTextEntry
          />
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
            <MaterialIcons name="visibility-off" size={18} color="#9AA19B" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.signInButton} activeOpacity={0.85}>
        <Text style={styles.signInText}>Sign In</Text>
        <Text style={styles.signInArrow}>→</Text>
      </TouchableOpacity>

      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialButton} activeOpacity={0.85}>
          <Text style={styles.socialText}>f</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} activeOpacity={0.85}>
          <Text style={styles.socialText}>G</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} activeOpacity={0.85}>
          <Text style={styles.socialText}>IG</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.footerMuted}>Don&apos;t have an account? </Text>
        <Text style={styles.footerLink}>Sign Up.</Text>
      </View>
      <Text style={styles.footerLink}>Forgot your password?</Text>
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F2",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    // backgroundColor: "#FFFFFF",
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 22,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
    flex: 1,
    justifyContent: "space-evenly",
  },
  logoWrap: {
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2B2D2A",
    textAlign: "center",
    marginTop: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#7E857F",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 18,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2E2F2D",
    marginBottom: 8,
    marginTop: 6,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F8F5",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E1E5DE",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  inputRowActive: {
    borderColor: "#9BD12C",
    shadowColor: "#9BD12C",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  iconBubble: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  iconButton: {
    padding: 6,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: "#2B2D2A",
  },
  signInButton: {
    marginTop: 8,
    backgroundColor: "#9BD12C",
    borderRadius: 22,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signInText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1B1E18",
    marginRight: 8,
  },
  signInArrow: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B1E18",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 12,
    gap: 14,
  },
  socialButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DADFD6",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  socialText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2B2D2A",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  footerMuted: {
    fontSize: 12,
    color: "#7E857F",
  },
  footerLink: {
    fontSize: 12,
    color: "#9BD12C",
    fontWeight: "600",
    textAlign: "center",
  },
});
