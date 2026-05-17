import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const handlePress = () => {
    Alert.alert("UI only", "This is only UI.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWrap}>
        <View style={styles.headerGlow} />
        <View style={styles.headerCard}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarText}>KG</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.name}>Kishan Rana GHosh</Text>
            <Text style={styles.email}>kishanghosh090@gmail.com</Text>
          </View>
          <Pressable style={styles.editButton} onPress={handlePress}>
            <Text style={styles.editButtonText}>Edit</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>4.8</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>Addresses</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.listCard}>
          <Pressable style={styles.listItem} onPress={handlePress}>
            <View style={styles.listDot} />
            <View style={styles.listText}>
              <Text style={styles.listTitle}>Payment Methods</Text>
              <Text style={styles.listSubtitle}>Cards, UPI, wallet</Text>
            </View>
            <Text style={styles.listArrow}>›</Text>
          </Pressable>
          <View style={styles.listDivider} />
          <Pressable style={styles.listItem} onPress={handlePress}>
            <View style={[styles.listDot, styles.listDotAlt]} />
            <View style={styles.listText}>
              <Text style={styles.listTitle}>Saved Addresses</Text>
              <Text style={styles.listSubtitle}>Home, work, other</Text>
            </View>
            <Text style={styles.listArrow}>›</Text>
          </Pressable>
          <View style={styles.listDivider} />
          <Pressable style={styles.listItem} onPress={handlePress}>
            <View style={[styles.listDot, styles.listDotDark]} />
            <View style={styles.listText}>
              <Text style={styles.listTitle}>Notifications</Text>
              <Text style={styles.listSubtitle}>Order updates</Text>
            </View>
            <Text style={styles.listArrow}>›</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.listCard}>
          <Pressable style={styles.listItem} onPress={handlePress}>
            <View style={[styles.listDot, styles.listDotSoft]} />
            <View style={styles.listText}>
              <Text style={styles.listTitle}>Help Center</Text>
              <Text style={styles.listSubtitle}>FAQs and chat</Text>
            </View>
            <Text style={styles.listArrow}>›</Text>
          </Pressable>
          <View style={styles.listDivider} />
          <Pressable style={styles.listItem} onPress={handlePress}>
            <View style={[styles.listDot, styles.listDotWarn]} />
            <View style={styles.listText}>
              <Text style={styles.listTitle}>Privacy & Security</Text>
              <Text style={styles.listSubtitle}>Control your data</Text>
            </View>
            <Text style={styles.listArrow}>›</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f4ef",
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  headerWrap: {
    marginTop: 12,
    marginBottom: 18,
  },
  headerGlow: {
    position: "absolute",
    top: -10,
    right: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255, 122, 61, 0.2)",
  },
  headerCard: {
    backgroundColor: "#fffaf6",
    borderRadius: 22,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: "#f1e2d2",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  avatarWrap: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(255, 122, 61, 0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff7a3d",
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1b1b1f",
  },
  email: {
    fontSize: 12,
    color: "#7b7169",
    marginTop: 2,
  },
  editButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#1b1b1f",
  },
  editButtonText: {
    color: "#fffaf6",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fffaf6",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f1e2d2",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1b1b1f",
  },
  statLabel: {
    fontSize: 11,
    color: "#7b7169",
    marginTop: 2,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1b1b1f",
    marginBottom: 10,
  },
  listCard: {
    backgroundColor: "#fffaf6",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#f1e2d2",
    overflow: "hidden",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  listDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ff7a3d",
  },
  listDotAlt: {
    backgroundColor: "#3f8cff",
  },
  listDotDark: {
    backgroundColor: "#1b1b1f",
  },
  listDotSoft: {
    backgroundColor: "#ff9f1c",
  },
  listDotWarn: {
    backgroundColor: "#ef4444",
  },
  listText: {
    flex: 1,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1b1b1f",
  },
  listSubtitle: {
    fontSize: 11,
    color: "#7b7169",
    marginTop: 2,
  },
  listArrow: {
    fontSize: 18,
    color: "#b8aca2",
  },
  listDivider: {
    height: 1,
    backgroundColor: "#f1e2d2",
  },
});
