import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

type CatalogScreenHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  accent: string;
};

const CatalogScreenHeader = ({
  eyebrow,
  title,
  description,
  icon,
  accent,
}: CatalogScreenHeaderProps) => (
  <LinearGradient
    colors={["#1d1b17", "#131317", "#101014"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={[styles.container, { borderColor: `${accent}55` }]}
  >
    <View style={[styles.accentGlow, { backgroundColor: `${accent}18` }]} />
    <View style={styles.copy}>
      <View style={styles.eyebrowRow}>
        <View style={[styles.eyebrowMark, { backgroundColor: accent }]} />
        <Text style={[styles.eyebrow, { color: accent }]}>{eyebrow}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.collectionPill}>
        <Ionicons name="sparkles-outline" size={12} color={accent} />
        <Text style={styles.collectionText}>4 CURATED COLLECTIONS</Text>
      </View>
    </View>
    <View style={[styles.iconDisc, { borderColor: `${accent}45` }]}>
      <View style={[styles.iconDiscInner, { backgroundColor: `${accent}1c` }]}>
        <Ionicons name={icon} size={34} color={accent} />
      </View>
    </View>
  </LinearGradient>
);

export default CatalogScreenHeader;

const styles = StyleSheet.create({
  container: {
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 26,
    minHeight: 190,
    overflow: "hidden",
    padding: 20,
    position: "relative",
  },
  accentGlow: {
    borderRadius: 100,
    height: 170,
    position: "absolute",
    right: -60,
    top: -70,
    width: 170,
  },
  copy: { flex: 1, justifyContent: "center", paddingRight: 6 },
  eyebrowRow: { alignItems: "center", flexDirection: "row", marginBottom: 9 },
  eyebrowMark: { borderRadius: 2, height: 6, marginRight: 7, width: 6 },
  eyebrow: { fontSize: 9, fontWeight: "800", letterSpacing: 1.5 },
  title: {
    color: Colors.Secondary300,
    fontSize: 29,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  description: {
    color: "#b7b7c0",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 6,
    maxWidth: 240,
  },
  collectionPill: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    marginTop: 14,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  collectionText: {
    color: "#dedee3",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  iconDisc: {
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 40,
    borderWidth: 1,
    height: 72,
    justifyContent: "center",
    marginLeft: 6,
    width: 72,
  },
  iconDiscInner: {
    alignItems: "center",
    borderRadius: 30,
    height: 58,
    justifyContent: "center",
    width: 58,
  },
});
