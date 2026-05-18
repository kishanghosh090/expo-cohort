import React, { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../../theme/ThemeProvider";

type SettingItem = {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
};

export default function SettingsScreen() {
  const { theme } = useAppTheme();
  const [selectedItem, setSelectedItem] = useState<SettingItem | null>(null);

  const settingGroups = useMemo(
    () => [
      {
        heading: "Account",
        items: [
          {
            id: "profile",
            title: "Edit Profile",
            subtitle: "Update name, avatar, and contact info",
            badge: "Basic",
          },
          {
            id: "address",
            title: "Delivery Address",
            subtitle: "Manage your saved places",
            badge: "3 saved",
          },
        ],
      },
      {
        heading: "Preferences",
        items: [
          {
            id: "notifications",
            title: "Push Notifications",
            subtitle: "Order alerts, deals, and updates",
            badge: "On",
          },
          {
            id: "payment",
            title: "Payment Methods",
            subtitle: "Cards, UPI, and wallet preferences",
            badge: "2 cards",
          },
        ],
      },
      {
        heading: "Support",
        items: [
          {
            id: "help",
            title: "Help Center",
            subtitle: "FAQs and support contact options",
            badge: "24/7",
          },
          {
            id: "privacy",
            title: "Privacy & Security",
            subtitle: "Permissions and account safety",
            badge: "Secure",
          },
        ],
      },
    ],
    [],
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.hero,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text style={[styles.heroEyebrow, { color: theme.colors.accent }]}>
            MY SPACE
          </Text>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Settings
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>
            Fine-tune your app experience with style.
          </Text>

          <View style={styles.profileRow}>
            <View
              style={[
                styles.avatar,
                {
                  backgroundColor: theme.colors.accentSoft,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Text style={[styles.avatarText, { color: theme.colors.accent }]}>
                KR
              </Text>
            </View>
            <View style={styles.profileMeta}>
              <Text style={[styles.profileName, { color: theme.colors.text }]}>
                KRG User
              </Text>
              <Text
                style={[styles.profileHint, { color: theme.colors.textMuted }]}
              >
                Premium member
              </Text>
            </View>
          </View>
        </View>

        {settingGroups.map((group) => (
          <View key={group.heading} style={styles.groupBlock}>
            <Text
              style={[styles.groupHeading, { color: theme.colors.textMuted }]}
            >
              {group.heading}
            </Text>

            {group.items.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setSelectedItem(item)}
                style={[
                  styles.settingCard,
                  {
                    backgroundColor: theme.colors.surfaceAlt,
                    borderColor: theme.colors.border,
                  },
                ]}
              >
                <View style={styles.settingTextWrap}>
                  <Text
                    style={[styles.settingTitle, { color: theme.colors.text }]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.settingSubtitle,
                      { color: theme.colors.textMuted },
                    ]}
                  >
                    {item.subtitle}
                  </Text>
                </View>

                <View
                  style={[
                    styles.badge,
                    { backgroundColor: theme.colors.accentSoft },
                  ]}
                >
                  <Text
                    style={[styles.badgeText, { color: theme.colors.accent }]}
                  >
                    {item.badge}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>

      <Modal visible={!!selectedItem} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.modalPage,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text style={[styles.modalEyebrow, { color: theme.colors.accent }]}>
              UI PREVIEW
            </Text>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              {selectedItem?.title}
            </Text>
            <Text
              style={[styles.modalSubtitle, { color: theme.colors.textMuted }]}
            >
              {selectedItem?.subtitle}
            </Text>

            <View style={styles.mockFieldStack}>
              <View
                style={[
                  styles.mockField,
                  {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.border,
                  },
                ]}
              >
                <Text
                  style={[styles.mockLabel, { color: theme.colors.textMuted }]}
                >
                  Option
                </Text>
                <Text style={[styles.mockValue, { color: theme.colors.text }]}>
                  Sample UI control
                </Text>
              </View>

              <View
                style={[
                  styles.mockField,
                  {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.border,
                  },
                ]}
              >
                <Text
                  style={[styles.mockLabel, { color: theme.colors.textMuted }]}
                >
                  Status
                </Text>
                <Text style={[styles.mockValue, { color: theme.colors.text }]}>
                  This is visual-only
                </Text>
              </View>
            </View>

            <Pressable
              style={[
                styles.closeBtn,
                { backgroundColor: theme.colors.accent },
              ]}
              onPress={() => setSelectedItem(null)}
            >
              <Text
                style={[styles.closeBtnText, { color: theme.colors.accentOn }]}
              >
                Close Preview
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 36,
    gap: 18,
  },
  hero: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  heroEyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
  },
  profileRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "800",
  },
  profileMeta: {
    gap: 2,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
  },
  profileHint: {
    fontSize: 13,
  },
  groupBlock: {
    gap: 10,
  },
  groupHeading: {
    fontSize: 12,
    letterSpacing: 0.8,
    fontWeight: "700",
    textTransform: "uppercase",
    marginLeft: 2,
  },
  settingCard: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  settingTextWrap: {
    flex: 1,
    gap: 4,
    paddingRight: 10,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  settingSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  modalPage: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    minHeight: "62%",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
  },
  modalEyebrow: {
    fontSize: 11,
    letterSpacing: 1,
    fontWeight: "800",
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    lineHeight: 21,
  },
  mockFieldStack: {
    marginTop: 20,
    gap: 12,
  },
  mockField: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 4,
  },
  mockLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  mockValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  closeBtn: {
    marginTop: 24,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  closeBtnText: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
});
