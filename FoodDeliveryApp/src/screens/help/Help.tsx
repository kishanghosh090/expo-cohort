
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../../theme/ThemeProvider";

const HelpScreen = () => {
  const { theme } = useAppTheme();

  const quickActions = [
    {
      id: "chat",
      title: "Live Chat",
      subtitle: "Connect with support in under 2 mins",
      icon: "chatbubbles-outline" as const,
    },
    {
      id: "call",
      title: "Call Support",
      subtitle: "Talk to an expert from 9am - 11pm",
      icon: "call-outline" as const,
    },
    {
      id: "mail",
      title: "Email Us",
      subtitle: "Get detailed responses by email",
      icon: "mail-outline" as const,
    },
  ];

  const faqs = [
    {
      id: "track",
      q: "How do I track my order?",
      a: "Open Orders tab and tap your active order for real-time updates.",
    },
    {
      id: "refund",
      q: "How can I request a refund?",
      a: "In Orders, open the order and choose Report issue to start a request.",
    },
    {
      id: "address",
      q: "Can I edit my delivery address after ordering?",
      a: "Yes, before preparation starts. Use the order details quick actions.",
    },
  ];

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View
          style={[
            styles.heroCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text style={[styles.heroEyebrow, { color: theme.colors.accent }]}>
            SUPPORT HUB
          </Text>
          <Text style={[styles.heroTitle, { color: theme.colors.text }]}>
            How can we help?
          </Text>
          <Text
            style={[styles.heroSubtitle, { color: theme.colors.textMuted }]}
          >
            Get quick assistance, explore frequent answers, and solve issues
            fast.
          </Text>

          <View
            style={[
              styles.statusPill,
              { backgroundColor: theme.colors.accentSoft },
            ]}
          >
            <View
              style={[styles.dot, { backgroundColor: theme.colors.accent }]}
            />
            <Text style={[styles.statusText, { color: theme.colors.accent }]}>
              Support agents online now
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[styles.sectionHeading, { color: theme.colors.textMuted }]}
          >
            QUICK ACTIONS
          </Text>

          {quickActions.map((action) => (
            <Pressable
              key={action.id}
              style={[
                styles.actionCard,
                {
                  backgroundColor: theme.colors.surfaceAlt,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: theme.colors.accentSoft },
                ]}
              >
                <Ionicons
                  name={action.icon}
                  size={18}
                  color={theme.colors.accent}
                />
              </View>

              <View style={styles.actionTextWrap}>
                <Text
                  style={[styles.actionTitle, { color: theme.colors.text }]}
                >
                  {action.title}
                </Text>
                <Text
                  style={[
                    styles.actionSubtitle,
                    { color: theme.colors.textMuted },
                  ]}
                >
                  {action.subtitle}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color={theme.colors.textMuted}
              />
            </Pressable>
          ))}
        </View>

        <View style={styles.section}>
          <Text
            style={[styles.sectionHeading, { color: theme.colors.textMuted }]}
          >
            FREQUENTLY ASKED
          </Text>

          {faqs.map((item) => (
            <View
              key={item.id}
              style={[
                styles.faqCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Text style={[styles.faqQuestion, { color: theme.colors.text }]}>
                {item.q}
              </Text>
              <Text
                style={[styles.faqAnswer, { color: theme.colors.textMuted }]}
              >
                {item.a}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
    gap: 18,
  },
  heroCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  heroEyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    lineHeight: 21,
  },
  statusPill: {
    marginTop: 16,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  section: {
    gap: 10,
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginLeft: 2,
  },
  actionCard: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  actionTextWrap: {
    flex: 1,
    gap: 2,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  actionSubtitle: {
    fontSize: 12,
    lineHeight: 17,
  },
  faqCard: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 6,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: "700",
  },
  faqAnswer: {
    fontSize: 13,
    lineHeight: 19,
  },
});

export default HelpScreen;


