import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

type CatalogCategoryHeaderProps = {
  title: string;
  category: string;
  pathname: string;
  count?: number;
  accent: string;
};

const CatalogCategoryHeader = ({
  title,
  category,
  pathname,
  count,
  accent,
}: CatalogCategoryHeaderProps) => (
  <View style={styles.container}>
    <View style={styles.titleGroup}>
      <View style={[styles.accentBar, { backgroundColor: accent }]} />
      <View style={styles.titleCopy}>
        <View style={styles.labelRow}>
          <Text style={styles.kicker}>EXPLORE</Text>
          {typeof count === "number" ? (
            <Text style={styles.count}>{count} titles</Text>
          ) : null}
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
    <Link
      href={{
        pathname: pathname as any,
        params: { title, category },
      }}
      accessibilityLabel={`See all ${title.toLowerCase()} titles`}
      style={styles.seeAll}
    >
      <Text style={[styles.seeAllText, { color: accent }]}>See all</Text>
      <Ionicons name="chevron-forward-outline" size={15} color={accent} />
    </Link>
  </View>
);

export default CatalogCategoryHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  titleGroup: { alignItems: "center", flexDirection: "row", flex: 1 },
  accentBar: { borderRadius: 2, height: 31, marginRight: 11, width: 3 },
  titleCopy: { flex: 1 },
  labelRow: { alignItems: "center", flexDirection: "row", gap: 8 },
  kicker: {
    color: Colors.Secondary200,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.4,
  },
  count: { color: "#777780", fontSize: 9, fontWeight: "600" },
  title: {
    color: Colors.Secondary300,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 2,
  },
  seeAll: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
    // padding: 8,
  },
  seeAllText: { fontSize: 11, fontWeight: "700" },
});
