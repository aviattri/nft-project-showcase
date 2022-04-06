import { useEffect, useState } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { COLORS, NFTData } from "../constants";
import { NFTCard, HomeHeader, FocusedStatusBar } from "../components";

const Home = ({ navigation }) => {
  const [nftData, setNftData] = useState(NFTData);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
    if (!searchValue.length) return setNftData(NFTData);
    const filteredData = nftData.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (filteredData.length) {
      setNftData(filteredData);
    } else {
      setNftData(nftData);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setNftData(NFTData);
      setSearchValue("");
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={nftData}
            renderItem={({ item }) => <NFTCard data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <HomeHeader onSearch={handleSearch} searchValue={searchValue} />
            }
          />
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
