import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { StyleSheet, useColorScheme, View } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    // TEMP DEBUG — wrapper neutro (flex:1) só para medir o espaço total dado ao NativeTabs
    <View
      style={styles.debugRoot}
      onLayout={(e) => {
        const { x, y, width, height } = e.nativeEvent.layout
        console.log('[DEBUG] TAB_CONTAINER onLayout', { x, y, width, height })
      }}
    >
      <NativeTabs
        backgroundColor={colors.background}
        indicatorColor={colors.backgroundElement}
        labelStyle={{ selected: { color: colors.text } }}>
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            src={require('@/assets/images/tabIcons/home.png')}
            renderingMode="template"
          />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="players">
          <NativeTabs.Trigger.Label>Players</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            src={require('@/assets/images/tabIcons/explore.png')}
            renderingMode="template"
          />
        </NativeTabs.Trigger>
      </NativeTabs>
    </View>
  );
}

const styles = StyleSheet.create({
  debugRoot: {
    flex: 1,
  },
});
