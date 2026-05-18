import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../../theme/ThemeProvider";

export function OrdersScreen() {
  const { theme } = useAppTheme();

  const activeOrders = [
    {
      id: "A1024",
      restaurant: "Chai Code Cafe",
      eta: "18 mins",
      total: "$21.98",
      status: "Preparing",
      items: "2 items",
    },
  ];

  const recentOrders = [
    {
      id: "A1018",
      restaurant: "Foodizen",
      when: "Today, 12:40 PM",
      total: "$15.50",
      status: "Delivered",
      items: "1 item",
    },
    {
      id: "A1002",
      restaurant: "Pizza Hut",
      when: "Yesterday, 8:15 PM",
      total: "$28.10",
      status: "Delivered",
      items: "3 items",
    },
    {
      id: "A0991",
      restaurant: "Burger King",
      when: "May 14, 6:32 PM",
      total: "$12.20",
      status: "Cancelled",
      items: "1 item",
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
            styles.hero,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text style={[styles.heroEyebrow, { color: theme.colors.accent }]}>
            MY ORDERS
          </Text>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Track and reorder
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>
            Keep an eye on active deliveries and your recent favorites.
          </Text>
        </View>

        <View style={styles.section}>
          <Text
            style={[styles.sectionHeading, { color: theme.colors.textMuted }]}
          >
            ACTIVE
          </Text>
          {activeOrders.map((order) => (
            <View
              key={order.id}
              style={[
                styles.activeCard,
                {
                  backgroundColor: theme.colors.surfaceAlt,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <View style={styles.rowBetween}>
                <Text style={[styles.resName, { color: theme.colors.text }]}>
                  {order.restaurant}
                </Text>
                <Text style={[styles.total, { color: theme.colors.accent }]}>
                  {order.total}
                </Text>
              </View>

              <View style={styles.metaRow}>
                <Ionicons
                  name="time-outline"
                  size={14}
                  color={theme.colors.accent}
                />
                <Text
                  style={[styles.metaText, { color: theme.colors.textMuted }]}
                >
                  ETA {order.eta}
                </Text>
                <View
                  style={[styles.dot, { backgroundColor: theme.colors.border }]}
                />
                <Text
                  style={[styles.metaText, { color: theme.colors.textMuted }]}
                >
                  {order.items}
                </Text>
              </View>

              <View
                style={[
                  styles.statusPill,
                  { backgroundColor: theme.colors.accentSoft },
                ]}
              >
                <Text
                  style={[
                    styles.statusPillText,
                    { color: theme.colors.accent },
                  ]}
                >
                  {order.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text
            style={[styles.sectionHeading, { color: theme.colors.textMuted }]}
          >
            RECENT
          </Text>
          {recentOrders.map((order) => {
            const isCancelled = order.status === "Cancelled";
            return (
              <View
                key={order.id}
                style={[
                  styles.recentCard,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
              >
                <View style={styles.rowBetween}>
                  <Text
                    style={[styles.recentName, { color: theme.colors.text }]}
                  >
                    {order.restaurant}
                  </Text>
                  <Text
                    style={[styles.recentTotal, { color: theme.colors.text }]}
                  >
                    {order.total}
                  </Text>
                </View>

                <View style={styles.rowBetween}>
                  <Text
                    style={[styles.whenText, { color: theme.colors.textMuted }]}
                  >
                    {order.when}
                  </Text>
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color: isCancelled ? "#ef4444" : theme.colors.accent,
                      },
                    ]}
                  >
                    {order.status}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 28,
    gap: 16,
  },
  hero: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  heroEyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
  },
  section: {
    gap: 10,
  },
  sectionHeading: {
    marginLeft: 2,
    fontSize: 12,
    letterSpacing: 0.8,
    fontWeight: "700",
  },
  activeCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    gap: 10,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resName: {
    fontSize: 17,
    fontWeight: "700",
  },
  total: {
    fontSize: 16,
    fontWeight: "700",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    fontWeight: "600",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 4,
  },
  statusPill: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  recentCard: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },
  recentName: {
    fontSize: 15,
    fontWeight: "700",
  },
  recentTotal: {
    fontSize: 14,
    fontWeight: "700",
  },
  whenText: {
    fontSize: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
});
