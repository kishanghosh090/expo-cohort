#!/bin/bash

# Update Profile screen
cat > src/screens/profile/Profile.tsx << 'PROFILE_EOF'
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../../theme/ThemeProvider";

export default function ProfileScreen() {
  const { theme } = useAppTheme();

  const handlePress = () => {
    Alert.alert("UI only", "This is only UI.");
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.headerWrap}>
        <View
          style={[
            styles.headerGlow,
            {
              backgroundColor: theme.isDark
                ? "rgba(255, 159, 107, 0.1)"
                : "rgba(255, 122, 61, 0.2)",
            },
          ]}
        />
        <View
          style={[
            styles.headerCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.avatarWrap,
              { backgroundColor: theme.colors.accentSoft },
            ]}
          >
            <Text style={[styles.avatarText, { color: theme.colors.accent }]}>
              KG
            </Text>
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.name, { color: theme.colors.text }]}>
              Kishan Rana GHosh
            </Text>
            <Text style={[styles.email, { color: theme.colors.textMuted }]}>
              kishanghosh090@gmail.com
            </Text>
          </View>
          <Pressable
            style={[
              styles.editButton,
              {
                backgroundColor: theme.isDark
                  ? "rgba(255, 159, 107, 0.2)"
                  : "#1b1b1f",
              },
            ]}
            onPress={handlePress}
          >
            <Text
              style={[
                styles.editButtonText,
                {
                  color: theme.isDark
                    ? theme.colors.accent
                    : theme.colors.surface,
                },
              ]}
            >
              Edit
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View
          style={[
            styles.statCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text style={[styles.statValue, { color: theme.colors.text }]}>
            24
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>
            Orders
          </Text>
        </View>
        <View
          style={[
            styles.statCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text style={[styles.statValue, { color: theme.colors.text }]}>
            4.8
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>
            Rating
          </Text>
        </View>
        <View
          style={[
            styles.statCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text style={[styles.statValue, { color: theme.colors.text }]}>
            3
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>
            Addresses
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Account
        </Text>
        <View
          style={[
            styles.listCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Pressable style={styles.listItem} onPress={handlePress}>
            <View style={[styles.listDot]} />
            <View style={styles.listText}>
              <Text style={[styles.listTitle, { color: theme.colors.text }]}>
                Payment Methods
              </Text>
              <Text
                style={[
                  styles.listSubtitle,
                  { color: theme.colors.textMuted },
                ]}
              >
                Cards, UPI, wallet
              </Text>
            </View>
            <Text style={[styles.listArrow, { color: theme.colors.placeholder }]}>
              ›
            </Text>
          </Pressable>
          <View
            style={[styles.listDivider, { backgroundColor: theme.colors.border }]}
          />
          <Pressable style={styles.listItem} onPress={handlePress}>
            <View style={[styles.listDot, styles.listDotAlt]} />
            <View style={styles.listText}>
              <Text style={[styles.listTitle, { color: theme.colors.text }]}>
                Saved Addresses
              </Text>
              <Text
                style={[
                  styles.listSubtitle,
                  { color: theme.colors.textMuted },
                ]}
              >
                Home, work, other
              </Text>
            </View>
            <Text style={[styles.listArrow, { color: theme.colors.placeholder }]}>
              ›
            </Text>
          </Pressable>
          <View
            style={[styles.listDivider, { backgroundColor: theme.colors.border }]}
          />
          <Pressable style={styles.listItem} onPress={handlePress}>
            <View style={[styles.listDot, styles.listDotDark]} />
            <View style={styles.listText}>
              <Text style={[styles.listTitle, { color: theme.colors.text }]}>
                Notifications
              </Text>
              <Text
                style={[
                  styles.listSubtitle,
                  { color: theme.colors.textMuted },
                ]}
              >
                Order updates
              </Text>
            </View>
            <Text style={[styles.listArrow, { color: theme.colors.placeholder }]}>
              ›
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Support
        </Text>
        <View
          style={[
            styles.listCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Pressable style={styles.listItem} onPress={handlePress}>
            <View style={[styles.listDot, styles.listDotSoft]} />
            <View style={styles.listText}>
              <Text style={[styles.listTitle, { color: theme.colors.text }]}>
                Help Center
              </Text>
              <Text
                style={[
                  styles.listSubtitle,
                  { color: theme.colors.textMuted },
                ]}
              >
                FAQs and chat
              </Text>
            </View>
            <Text style={[styles.listArrow, { color: theme.colors.placeholder }]}>
              ›
            </Text>
          </Pressable>
          <View
            style={[styles.listDivider, { backgroundColor: theme.colors.border }]}
          />
          <Pressable style={styles.listItem} onPress={handlePress}>
            <View style={[styles.listDot, styles.listDotWarn]} />
            <View style={styles.listText}>
              <Text style={[styles.listTitle, { color: theme.colors.text }]}>
                Privacy & Security
              </Text>
              <Text
                style={[
                  styles.listSubtitle,
                  { color: theme.colors.textMuted },
                ]}
              >
                Control your data
              </Text>
            </View>
            <Text style={[styles.listArrow, { color: theme.colors.placeholder }]}>
              ›
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
  },
  headerCard: {
    borderRadius: 22,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
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
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
  },
  email: {
    fontSize: 12,
    marginTop: 2,
  },
  editButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  editButtonText: {
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
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },
  listCard: {
    borderRadius: 18,
    borderWidth: 1,
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
  },
  listSubtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  listArrow: {
    fontSize: 18,
  },
  listDivider: {
    height: 1,
  },
});
PROFILE_EOF

echo "Profile updated"
