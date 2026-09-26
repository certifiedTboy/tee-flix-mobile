import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  ReactNode,
  useState,
} from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../../constants/Colors";

type ExploreCatalogLayoutProps = {
  title: string;
  eyebrow: string;
  description: string;
  accent: string;
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  suggestions: string[];
  resultCount: number;
  currentPage: number;
  totalPages: number;
  isSearching: boolean;
  isLoadingCategory: boolean;
  hasError: boolean;
  isSearchMode: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  children: ReactNode;
};

const ExploreCatalogLayout = ({
  title,
  eyebrow,
  description,
  accent,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  suggestions,
  resultCount,
  currentPage,
  totalPages,
  isSearching,
  isLoadingCategory,
  hasError,
  isSearchMode,
  onPreviousPage,
  onNextPage,
  children,
}: ExploreCatalogLayoutProps) => {
  const [focused, setFocused] = useState(false);
  const isLoading = isSearching || isLoadingCategory;
  const hasResults = resultCount > 0;
  const showSuggestions = searchValue.trim().length === 0;
  const pageCount = Math.max(totalPages, 1);

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[`${accent}38`, "#19191f", "#111115"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.hero, { borderColor: `${accent}45` }]}
        >
          <View style={[styles.heroGlow, { backgroundColor: `${accent}20` }]} />
          <Text style={[styles.eyebrow, { color: accent }]}>{eyebrow}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.heroFoot}>
            <View style={styles.heroPill}>
              <Ionicons name="sparkles-outline" size={13} color={accent} />
              <Text style={styles.heroPillText}>YOUR NEXT FAVORITE STARTS HERE</Text>
            </View>
            <Ionicons
              name="compass-outline"
              size={28}
              color={`${accent}bb`}
            />
          </View>
        </LinearGradient>

        <View
          style={[
            styles.searchBox,
            focused && { borderColor: accent },
          ]}
        >
          <Ionicons name="search" size={19} color={accent} />
          <TextInput
            accessibilityLabel={`Search ${title.toLowerCase()}`}
            value={searchValue}
            onChangeText={onSearchChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={searchPlaceholder}
            placeholderTextColor="#777780"
            returnKeyType="search"
            style={styles.searchInput}
          />
          {searchValue.length > 0 ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Clear search"
              hitSlop={10}
              onPress={() => onSearchChange("")}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={19} color="#85858e" />
            </Pressable>
          ) : (
            <View style={styles.searchHint}>
              <Text style={styles.searchHintText}>SEARCH</Text>
            </View>
          )}
        </View>

        {showSuggestions ? (
          <View style={styles.suggestionSection}>
            <Text style={styles.suggestionLabel}>QUICK SEARCHES</Text>
            <View style={styles.suggestionList}>
              {suggestions.map((suggestion) => (
                <Pressable
                  key={suggestion}
                  accessibilityRole="button"
                  onPress={() => onSearchChange(suggestion)}
                  style={({ pressed }) => [
                    styles.suggestionChip,
                    pressed && styles.suggestionPressed,
                  ]}
                >
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                  <Ionicons name="arrow-forward" size={12} color={accent} />
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        <View style={styles.resultsHeading}>
          <View style={styles.resultsCopy}>
            <Text style={styles.resultsTitle}>
              {isSearchMode
                ? searchValue.trim().length < 2
                  ? "Keep exploring"
                  : `Results for “${searchValue.trim()}”`
                : "Curated for you"}
            </Text>
            <Text style={styles.resultsSubtitle}>
              {isLoading
                ? "Finding the best matches…"
                : hasResults
                  ? `${resultCount.toLocaleString()} titles · Page ${currentPage} of ${pageCount}`
                  : "Discover something worth watching"}
            </Text>
          </View>
          <View style={[styles.resultIcon, { backgroundColor: `${accent}18` }]}>
            {isLoading ? (
              <ActivityIndicator size="small" color={accent} />
            ) : (
              <Ionicons
                name={isSearchMode ? "search-outline" : "film-outline"}
                size={17}
                color={accent}
              />
            )}
          </View>
        </View>

        {hasError ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="cloud-offline-outline"
                size={25}
                color={accent}
              />
            </View>
            <Text style={styles.emptyTitle}>Couldn’t load titles</Text>
            <Text style={styles.emptyDescription}>
              Check your connection and try searching again.
            </Text>
          </View>
        ) : isLoading && !hasResults ? (
          <View style={styles.loadingState}>
            <ActivityIndicator color={accent} size="large" />
            <Text style={styles.loadingText}>Curating your collection…</Text>
          </View>
        ) : hasResults ? (
          <View style={styles.grid}>{children}</View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name={isSearchMode ? "search-outline" : "film-outline"}
                size={25}
                color={accent}
              />
            </View>
            <Text style={styles.emptyTitle}>
              {isSearchMode && searchValue.trim().length < 2
                ? "Search for a title"
                : "No titles found"}
            </Text>
            <Text style={styles.emptyDescription}>
              {isSearchMode && searchValue.trim().length < 2
                ? "Enter at least two characters or try one of the quick searches."
                : "Try another search or explore a different collection."}
            </Text>
          </View>
        )}

        <View style={styles.pagination}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Previous page"
            disabled={currentPage <= 1 || isLoading}
            onPress={onPreviousPage}
            style={({ pressed }) => [
              styles.pageButton,
              currentPage <= 1 && styles.pageButtonDisabled,
              pressed && currentPage > 1 && styles.pageButtonPressed,
            ]}
          >
            <Ionicons
              name="chevron-back"
              size={17}
              color={currentPage <= 1 ? "#5c5c64" : accent}
            />
            <Text
              style={[
                styles.pageButtonText,
                currentPage <= 1 && styles.pageButtonTextDisabled,
              ]}
            >
              Previous
            </Text>
          </Pressable>
          <Text style={styles.pageIndicator}>
            {currentPage} <Text style={styles.pageDivider}>/</Text> {pageCount}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Next page"
            disabled={!hasResults || currentPage >= totalPages || isLoading}
            onPress={onNextPage}
            style={({ pressed }) => [
              styles.pageButton,
              (!hasResults || currentPage >= totalPages) &&
                styles.pageButtonDisabled,
              pressed &&
                hasResults &&
                currentPage < totalPages &&
                styles.pageButtonPressed,
            ]}
          >
            <Text
              style={[
                styles.pageButtonText,
                (!hasResults || currentPage >= totalPages) &&
                  styles.pageButtonTextDisabled,
              ]}
            >
              Next
            </Text>
            <Ionicons
              name="chevron-forward"
              size={17}
              color={!hasResults || currentPage >= totalPages ? "#5c5c64" : accent}
            />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default ExploreCatalogLayout;

const styles = StyleSheet.create({
  screen: { backgroundColor: Colors.Primary200, flex: 1 },
  scroll: { flex: 1 },
  content: { paddingBottom: 36 },
  hero: {
    borderRadius: 22,
    borderWidth: 1,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 18,
    minHeight: 178,
    overflow: "hidden",
    padding: 20,
  },
  heroGlow: {
    borderRadius: 100,
    height: 190,
    position: "absolute",
    right: -80,
    top: -80,
    width: 190,
  },
  eyebrow: { fontSize: 9, fontWeight: "800", letterSpacing: 1.8 },
  title: {
    color: Colors.Secondary300,
    fontSize: 29,
    fontWeight: "900",
    marginTop: 8,
  },
  description: {
    color: "#c2c2ca",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
    maxWidth: "90%",
  },
  heroFoot: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  heroPill: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  heroPillText: {
    color: "#e0e0e5",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  searchBox: {
    alignItems: "center",
    backgroundColor: "#17171d",
    borderColor: "#303039",
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: "row",
    height: 54,
    marginHorizontal: 18,
    paddingHorizontal: 14,
  },
  searchInput: {
    color: Colors.Secondary300,
    flex: 1,
    fontSize: 13,
    height: "100%",
    marginLeft: 10,
  },
  searchHint: {
    borderColor: "#393941",
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  searchHintText: {
    color: "#85858e",
    fontSize: 7,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  clearButton: { padding: 3 },
  suggestionSection: { marginTop: 17, paddingHorizontal: 20 },
  suggestionLabel: {
    color: "#888891",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 9,
  },
  suggestionList: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
  suggestionChip: {
    alignItems: "center",
    backgroundColor: "#17171d",
    borderColor: "#2b2b34",
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  suggestionPressed: { opacity: 0.7 },
  suggestionText: { color: "#dedee3", fontSize: 10, fontWeight: "600" },
  resultsHeading: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  resultsCopy: { flex: 1, paddingRight: 12 },
  resultsTitle: { color: Colors.Secondary300, fontSize: 17, fontWeight: "800" },
  resultsSubtitle: { color: Colors.Secondary200, fontSize: 10, marginTop: 4 },
  resultIcon: {
    alignItems: "center",
    borderRadius: 12,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  grid: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingHorizontal: 8,
  },
  loadingState: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 260,
  },
  loadingText: { color: Colors.Secondary200, fontSize: 11, marginTop: 12 },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 240,
    paddingHorizontal: 30,
  },
  emptyIcon: {
    alignItems: "center",
    backgroundColor: "#202027",
    borderRadius: 23,
    height: 58,
    justifyContent: "center",
    width: 58,
  },
  emptyTitle: {
    color: Colors.Secondary300,
    fontSize: 16,
    fontWeight: "800",
    marginTop: 14,
  },
  emptyDescription: {
    color: Colors.Secondary200,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 6,
    maxWidth: 250,
    textAlign: "center",
  },
  pagination: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 18,
    marginTop: 18,
    paddingVertical: 10,
  },
  pageButton: {
    alignItems: "center",
    backgroundColor: "#17171d",
    borderColor: "#2b2b34",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 9,
  },
  pageButtonDisabled: { opacity: 0.5 },
  pageButtonPressed: { opacity: 0.75 },
  pageButtonText: { color: Colors.Secondary300, fontSize: 10, fontWeight: "700" },
  pageButtonTextDisabled: { color: "#65656e" },
  pageIndicator: { color: Colors.Secondary300, fontSize: 11, fontWeight: "800" },
  pageDivider: { color: Colors.Secondary200, fontWeight: "400" },
});
