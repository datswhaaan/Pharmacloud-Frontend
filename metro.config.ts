import { getDefaultConfig } from "metro-config";
import type { MetroConfig } from "metro-config";

const config = (async (): Promise<MetroConfig> => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve(
        "react-native-svg-transformer"
      ),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
    },
  };
})();

export default config;