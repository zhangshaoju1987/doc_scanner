import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

const MusicRoute = () => <Text>测试页面1</Text>;

const AlbumsRoute = () => <Text>测试页面2</Text>;

const RecentsRoute = () => <Text>测试页面3</Text>;

export default Certificate = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Music', icon: 'target-account' },
    { key: 'albums', title: 'Albums', icon: 'target-account' },
    { key: 'recents', title: 'Recents', icon: 'target-account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
  });

  return (
    <BottomNavigation
      style={{display:"flex",overflow:"hidden"}}
      barStyle={{ height: 80,
        backgroundColor: '#694fad',
        justifyContent: 'center',}}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};